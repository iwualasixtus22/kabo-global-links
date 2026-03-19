'use strict';
'use server';

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitServiceRequest(formData: FormData) {
  const customerName = formData.get('customerName') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const serviceType = formData.get('serviceType') as string;
  const details = formData.get('details') as string;

  if (!customerName || !email || !phone || !serviceType) {
    throw new Error('Missing required fields');
  }

  try {
    await db.serviceRequest.create({
      data: {
        customerName,
        email,
        phone,
        serviceType,
        details: details || '',
      },
    });

    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('Request submission error:', error);
    return { success: false, error: 'Failed to submit request' };
  }
}
