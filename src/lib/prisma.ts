import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined }

export function getPrisma() {
  if (!globalForPrisma.prisma) {
    const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL }) as any
    const adapter = new PrismaPg(pool)
    globalForPrisma.prisma = new PrismaClient({ 
      adapter,
      log: ['query', 'info', 'warn', 'error']
    });
  }
  return globalForPrisma.prisma;
}

// Ensure we get a fresh instance to avoid stale model references
export const db = getPrisma();
