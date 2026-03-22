import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminDashboardClient from "./AdminDashboardClient";

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
    // Providers should see PENDING requests OR requests assigned to them
    where.OR = [
      { status: 'PENDING' },
      { providerId: (session.user as any).id }
    ];
  }
  // ADMIN role has no where clause (sees all)

  const requests = await db.serviceRequest.findMany({
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

  return (
    <div className="container" style={{ padding: '4rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <h1 style={{ margin: 0 }}>Service <span style={{ color: '#22c55e' }}>Requests</span> Dashboard</h1>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontWeight: 700 }}>{session.user?.name}</div>
          <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{(session.user as any).role}</div>
        </div>
      </div>
      
      <AdminDashboardClient initialRequests={requests as any} user={session.user as any} />
    </div>
  );
}
