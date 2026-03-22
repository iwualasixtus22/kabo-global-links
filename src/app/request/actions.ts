'use server';

import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function submitServiceRequest(formData: FormData) {
  const session = await getServerSession(authOptions);
  
  const customerName = formData.get('customerName') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const serviceType = formData.get('serviceType') as string;
  const details = formData.get('details') as string;

  if (!customerName || !email || !phone || !serviceType) {
    throw new Error('Missing required fields');
  }

  try {
    const data: any = {
      customerName,
      email,
      phone,
      serviceType,
      details: details || '',
    };

    if (session?.user) {
      data.customerId = (session.user as any).id;
    }

    await db.serviceRequest.create({ data });

    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('Request submission error:', error);
    return { success: false, error: 'Failed to submit request' };
  }
}
