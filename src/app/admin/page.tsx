import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminDashboardClient from "./AdminDashboardClient";
import { FALLBACK_REQUESTS } from "@/lib/fallbackData";

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const where: any = {};
  const userRole = (session.user as any).role;
  
  if (userRole === 'USER') {
    where.customerId = (session.user as any).id;
  } else if (userRole === 'PROVIDER') {
    where.OR = [
      { status: 'PENDING' },
      { providerId: (session.user as any).id }
    ];
  }

  let requests = [];
  try {
    requests = await db.serviceRequest.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        provider: {
          select: {
            name: true,
            email: true,
          }
        }
      }
    });
    if (requests.length === 0) requests = FALLBACK_REQUESTS;
  } catch (error) {
    console.error("Database connection failed in Admin:", error);
    requests = FALLBACK_REQUESTS;
  }

  return (
    <div className="bg-light" style={{ minHeight: '100vh', paddingTop: '2rem' }}>
       <AdminDashboardClient 
         initialRequests={requests as any} 
         user={{ 
           id: (session.user as any).id, 
           name: session.user?.name, 
           role: userRole 
         }} 
       />
    </div>
  );
}
