"use server";

import { prisma } from "../../lib/prisma.js";
import { requireUserId } from "@/lib/auth.js";


export async function getAllProducts( searchTerm) {
  await requireUserId();

  const where = searchTerm
    ? {
      title: { contains: searchTerm, mode: "insensitive" }
      }
    : undefined;


  const products = await prisma.product.findMany({where});

  return products.map((product) => ({
    ...product,
    price: Number(product.price),
  }));
}



export async function getProduct(id) {
  await requireUserId();
  const convertedId = Number(id);
  const product = await prisma.product.findUnique({
    where: { id: convertedId },
  });

  return {
    ...product,
    price: product.price.toString(),
  };
}
