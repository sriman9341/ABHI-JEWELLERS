"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitQuotation(userId: string, items: { productId: string; quantity: number }[], customerNotes?: string) {
  try {
    const quotation = await prisma.quotation.create({
      data: {
        userId,
        status: "PENDING",
        customerNotes,
        items: {
          create: items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
      include: { items: true },
    });
    
    // In a real application, trigger Notifications here (Email, SMS)
    
    revalidatePath("/admin/quotations");
    revalidatePath("/dashboard/quotations");
    
    return { success: true, quotation };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateQuotationStatus(id: string, status: string, adminNotes?: string) {
  try {
    const quotation = await prisma.quotation.update({
      where: { id },
      data: {
        status,
        ...(adminNotes ? { adminNotes } : {}),
      },
    });
    revalidatePath("/admin/quotations");
    revalidatePath(`/dashboard/quotations/${id}`);
    
    return { success: true, quotation };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function sendQuotationPrice(id: string, finalOfferedPrice: number, adminNotes?: string) {
  try {
    const quotation = await prisma.quotation.update({
      where: { id },
      data: {
        status: "PRICE_SENT",
        finalOfferedPrice,
        ...(adminNotes ? { adminNotes } : {}),
      },
    });
    
    // In a real application, trigger Notifications here (Email, SMS)
    
    revalidatePath("/admin/quotations");
    revalidatePath(`/dashboard/quotations/${id}`);
    
    return { success: true, quotation };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getQuotations(userId?: string) {
  const where = userId ? { userId } : {};
  return prisma.quotation.findMany({
    where,
    include: {
      user: true,
      items: {
        include: { product: true }
      }
    },
    orderBy: { createdAt: "desc" },
  });
}
