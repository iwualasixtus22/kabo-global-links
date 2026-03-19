import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient;

export function getPrisma() {
  if (!prisma) {
    prisma = new PrismaClient({
      log: ['query'],
    });
  }
  return prisma;
}

// Lazy access property for convenience
export const db = {
  get serviceRequest() {
    return getPrisma().serviceRequest;
  }
}
