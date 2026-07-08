"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getProducts(categoryId?: string) {
  const where = categoryId ? { categoryId, deletedAt: null } : { deletedAt: null };
  return prisma.product.findMany({
    where,
    include: {
      category: true,
      images: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function createProduct(data: any) {
  try {
    const product = await prisma.product.create({
      data: {
        ...data,
      },
    });
    revalidatePath("/admin/products");
    return { success: true, product };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateProduct(id: string, data: any) {
  try {
    const product = await prisma.product.update({
      where: { id },
      data,
    });
    revalidatePath("/admin/products");
    return { success: true, product };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function softDeleteProduct(id: string) {
  try {
    await prisma.product.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    revalidatePath("/admin/products");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
