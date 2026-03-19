import { db } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

interface RequestItem {
  id: string;
  customerName: string;
  serviceType: string;
  email: string;
  phone: string;
  status: string;
  createdAt: Date;
}

export default async function AdminPage() {
  const requests = await db.serviceRequest.findMany({
    orderBy: { createdAt: 'desc' },
  }) as unknown as RequestItem[];

  return (
    <div className="container" style={{ padding: '4rem 0' }}>
      <h1 style={{ marginBottom: '2rem' }}>Service <span style={{ color: '#22c55e' }}>Requests</span> Dashboard</h1>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '0.75rem', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
          <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
            <tr>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Customer</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Service</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Contact</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>No requests found yet.</td>
              </tr>
            ) : (
              requests.map((req) => (
                <tr key={req.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '1rem' }}>{req.customerName}</td>
                  <td style={{ padding: '1rem' }}>{req.serviceType}</td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontSize: '0.9rem' }}>{req.email}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{req.phone}</div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '100px', 
                      fontSize: '0.75rem', 
                      fontWeight: 700, 
                      background: req.status === 'PENDING' ? '#fef3c7' : '#dcfce7', 
                      color: req.status === 'PENDING' ? '#92400e' : '#166534' 
                    }}>
                      {req.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', color: '#64748b', fontSize: '0.9rem' }}>
                    {new Date(req.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
