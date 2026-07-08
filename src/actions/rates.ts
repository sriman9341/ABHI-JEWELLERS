"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getMetalRates() {
  return prisma.metalRate.findMany({
    orderBy: { metalType: "asc" },
  });
}

export async function updateMetalRate(metalType: string, pricePerGram: number, adminId?: string) {
  try {
    const rate = await prisma.metalRate.upsert({
      where: { metalType },
      update: { pricePerGram, updatedBy: adminId },
      create: { metalType, pricePerGram, updatedBy: adminId },
    });
    revalidatePath("/admin/settings");
    revalidatePath("/dashboard");
    revalidatePath("/products");
    
    return { success: true, rate };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
