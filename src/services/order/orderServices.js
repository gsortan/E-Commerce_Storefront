"use server";

import { prisma } from "../../lib/prisma.js";
import { getAllMatchingUsers } from "@/lib/getAllMatchingUsers.js";
import { requireAdmin } from "@/lib/auth.js";
import { requireUserId } from "@/lib/auth.js";

export async function createOrder(order) {
  await prisma.order.upsert({
    where: { stripeSessionId: order.sessionId },
    update: {},
    create: {
      userId: order.userId,
      items: { create: order.items },
      stripeSessionId: order.sessionId,
      totalAmount: order.totalAmount,
      shipName: order.shipName,
      shipAddressLine1: order.shipAddressLine1,
      shipAddressLine2: order.shipAddressLine2,
      shipCity: order.shipCity,
      shipRegion: order.shipRegion,
      shipPostalCode: order.shipPostalCode,
      shipCountry: order.shipCountry,
    },
  });
}

export async function getLowestOrderYear() {
  await requireAdmin();
  const lowestYearOrder = await prisma.order.findFirst({
    orderBy: {
      createdAt: "asc",
    },
  });

  return lowestYearOrder.createdAt.getFullYear();
}

export async function getTotalRevenue() {
  await requireAdmin();
  const resultRevenue = await prisma.order.aggregate({
    _sum: {
      totalAmount: true,
    },
  });

  return resultRevenue._sum.totalAmount.toString();
}

export async function getOrderById(id) {

  await requireAdmin();
  const convertedId = Number(id);

  const order = await prisma.order.findUnique({
    where: { id: convertedId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) return null;

  return {
    ...order,
    totalAmount: order.totalAmount.toString(),
    createdAt: order.createdAt.toISOString(),
    items: order.items.map((it) => ({
      ...it,
      price: it.price.toString(),
      product: {
        ...it.product,
        price: it.product.price.toString(),
      },
    })),
  };
}

export async function getOrders(
  skipVal,
  takeVal,
  uid,
  dateStart,
  dateEnd,
  searchTerm,
) {
  const term = (searchTerm ?? "").trim();
  const isNumeric = term ? /^[0-9]+$/.test(term) : false;

  const sDate = dateStart ? new Date(dateStart) : undefined;
  const eDate = dateEnd ? new Date(dateEnd) : undefined;

  const createdAtFilter =
    sDate && eDate ? { gte: sDate, lte: eDate } : undefined;

  let OR = [];

  if (term) {
    if (isNumeric) {
      OR.push({ id: Number(term) });
    }

    const matchingUsers = await getAllMatchingUsers(term);
    const clerkIds = matchingUsers.map((u) => u.id);

    if (clerkIds.length > 0) {
      OR.push({ userId: { in: clerkIds } });
    }
  }

  if (term && OR.length === 0) {
    return { orders: [], totalCount: 0 };
  }

  const where = {
    ...(uid ? { userId: uid } : {}),
    ...(createdAtFilter ? { createdAt: createdAtFilter } : {}),
    ...(OR.length > 0 ? { OR } : {}),
  };

  const [orders, totalCount] = await prisma.$transaction([
    prisma.order.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: skipVal,
      take: takeVal,
      include: { items: { include: { product: true } } },
    }),
    prisma.order.count({ where }),
  ]);

  return {
    orders: orders.map((o) => ({
      ...o,
      totalAmount: o.totalAmount.toString(),
      createdAt: o.createdAt.toISOString(),
      items: o.items.map((it) => ({
        ...it,
        price: it.price.toString(),
        product: { ...it.product, price: it.product.price.toString() },
      })),
    })),
    totalCount,
  };
}

export async function getMyOrders(skipVal, takeVal, dateStart, dateEnd) {
  const uid = requireUserId();

  const sDate = dateStart ? new Date(dateStart) : undefined;
  const eDate = dateEnd ? new Date(dateEnd) : undefined;

  const createdAtFilter =
    sDate && eDate ? { gte: sDate, lte: eDate } : undefined;

  const where = {
    userId: uid,
    ...(createdAtFilter ? { createdAt: createdAtFilter } : {}),
  };

  const [orders, totalCount] = await prisma.$transaction([
    prisma.order.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: skipVal,
      take: takeVal,
      include: { items: { include: { product: true } } },
    }),
    prisma.order.count({ where }),
  ]);

  return {
    orders: orders.map((o) => ({
      ...o,
      totalAmount: o.totalAmount.toString(),
      createdAt: o.createdAt.toISOString(),
      items: o.items.map((it) => ({
        ...it,
        price: it.price.toString(),
        product: { ...it.product, price: it.product.price.toString() },
      })),
    })),
    totalCount,
  };
}

export async function getMyOrderById(id) {
  const uid = requireUserId();
  const convertedId = Number(id);

  const order = await prisma.order.findUnique({
    where: { id: convertedId },
    include: { items: { include: { product: true } } },
  });

  if (!order) return null;
  if (order.userId !== uid) throw new Error("FORBIDDEN");

  return {
    ...order,
    totalAmount: order.totalAmount.toString(),
    createdAt: order.createdAt.toISOString(),
    items: order.items.map((it) => ({
      ...it,
      price: it.price.toString(),
      product: { ...it.product, price: it.product.price.toString() },
    })),
  };
}

function ymd(d) {
  return d.toISOString().slice(0, 10);
}
function ym(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`; // YYYY-MM
}
function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}
function addMonths(date, n) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + n);
  return d;
}

export async function getRevenueSeries({ mode }) {
  const now = new Date();

  let start, end, bucket;
  if (mode === "7d") {
    end = now;
    start = addDays(now, -6);
    bucket = "day";
  } else {
    end = now;
    start = addMonths(now, -5);
    bucket = "month";
  }

  const orders = await prisma.order.findMany({
    where: {
      createdAt: { gte: start, lte: end },
    },
    select: { createdAt: true, totalAmount: true },
    orderBy: { createdAt: "asc" },
  });

  const sums = new Map();
  for (const o of orders) {
    const key = bucket === "day" ? ymd(o.createdAt) : ym(o.createdAt);
    const amt = Number(o.totalAmount);
    sums.set(key, (sums.get(key) ?? 0) + amt);
  }

  const series = [];
  if (bucket === "day") {
    for (let i = 0; i < 7; i++) {
      const d = addDays(start, i);
      const key = ymd(d);
      series.push({
        label: key,
        revenue: Number((sums.get(key) ?? 0).toFixed(2)),
      });
    }
  } else {
    const s = new Date(start.getFullYear(), start.getMonth(), 1);
    for (let i = 0; i < 6; i++) {
      const d = addMonths(s, i);
      const key = ym(d);
      series.push({
        label: key,
        revenue: Number((sums.get(key) ?? 0).toFixed(2)),
      });
    }
  }

  return series;
}
