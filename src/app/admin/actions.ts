'use server';

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateRequestStatus(requestId: string, status: string, providerId?: string) {
  try {
    const data: any = { status };
    if (providerId) {
      data.providerId = providerId;
    }

    await db.serviceRequest.update({
      where: { id: requestId },
      data,
    });

    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('Update request error:', error);
    return { success: false, error: 'Failed to update request' };
  }
}
