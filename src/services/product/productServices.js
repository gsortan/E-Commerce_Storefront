"use server";

import { prisma } from "../../lib/prisma.js";
import { requireUserId } from "@/lib/auth.js";
import { requireAdmin } from "@/lib/auth.js";

export async function createProduct(data) { 
  await requireAdmin();

  return prisma.product.create({
    data,
  });
}

export async function getShopProducts(skipVal, takeVal, searchTerm) {
  await requireUserId();

  const isNumeric = searchTerm ? /^[0-9]+$/.test(searchTerm) : false;

  const searchFilter = searchTerm
    ? isNumeric
      ? { id: Number(searchTerm) }
      : { title: { contains: searchTerm, mode: "insensitive" } }
    : {};
 
  const where = {
    status: "ACTIVE",
    ...searchFilter,
  };

  const [products, totalCount] = await prisma.$transaction([
    prisma.product.findMany({
      where,
      skip: skipVal,
      take: takeVal,
      orderBy: { id: "desc" },
    }),
    prisma.product.count({ where }),
  ]);

  return {
    products: products.map((p) => ({
      ...p,
      price: Number(p.price),
    })),
    totalCount,
  };
}

export async function getShopProductById(id) {
  await requireUserId();

  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
  });

  if (!product || product.status !== "ACTIVE") {
    return null;
  }

  return {
    ...product,
    price: product.price.toString(),
  };
}

export async function getAdminProducts(
  skipVal,
  takeVal,
  searchTerm,
  status,
  stockValue
) {
  await requireAdmin();

  const isNumeric = searchTerm ? /^[0-9]+$/.test(searchTerm) : false;

  const searchFilter = searchTerm
    ? isNumeric
      ? { id: Number(searchTerm) }
      : { title: { contains: searchTerm, mode: "insensitive" } }
    : {};

  const statusFilter = status ? { status } : {};

  let stockFilter = {};
  if (stockValue === "IN_STOCK") stockFilter = { stock: { gt: 0 } };
  if (stockValue === "LOW_STOCK") stockFilter = { stock: { gt: 0, lte: 5 } };
  if (stockValue === "OUT_OF_STOCK") stockFilter = { stock: 0 };

  const where = {
    ...searchFilter,
    ...statusFilter,
    ...stockFilter,
  };

  const [products, totalCount] = await prisma.$transaction([
    prisma.product.findMany({
      where,
      skip: skipVal,
      take: takeVal,
      orderBy: { id: "desc" },
    }),
    prisma.product.count({ where }),
  ]);

  return {
    products: products.map((p) => ({
      ...p,
      price: Number(p.price),
    })),
    totalCount,
  };
}

export async function getAdminProductById(id) {
  await requireAdmin();

  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
  });

  if (!product) return null;

  return {
    ...product,
    price: product.price.toString(),
  };
}



export async function updateProduct(id, updatedProd) {
  await requireAdmin();

  const updatedProduct = await prisma.product.update({
    where: {
      id: id,
    },
    data: {
      ...updatedProd,
    },
  });

  return updatedProduct;
}
