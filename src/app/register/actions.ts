'use server';

import { getPrisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function registerUser(formData: FormData) {
  const email = (formData.get('email') as string)?.toLowerCase();
  const password = formData.get('password') as string;
  const name = formData.get('name') as string;
  const role = formData.get('role') as string; // ADMIN, PROVIDER, USER

  console.log('--- REGISTRATION ATTEMPT START ---');
  console.log('Email:', email);
  if (!email || !password) {
    return { success: false, error: 'Email and password are required' };
  }

  try {
    console.log('Getting Prisma instance...');
    const prisma = getPrisma();
    console.log('Prisma instance obtained.');

    console.log('Checking for existing user...');
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    console.log('Existing user check done:', existingUser ? 'Found' : 'Not found');

    if (existingUser) {
      return { success: false, error: 'User already exists' };
    }

    console.log('Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed.');

    console.log('Creating user in DB...');
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role as any,
      },
    });

    if (!newUser) {
      throw new Error('Database returned null after user creation');
    }

    console.log('User created successfully in DB with ID:', newUser.id);
    return { success: true };
  } catch (error: any) {
    console.error('CRITICAL REGISTRATION ERROR:', error);
    if (error.message?.includes('Connection') || error.message?.includes('terminated')) {
      return { success: false, error: 'Database is currently offline. Please try again later.' };
    }
    return { success: false, error: 'Failed to register: ' + error.message };
  } finally {
    console.log('--- REGISTRATION ATTEMPT END ---');
  }
}
