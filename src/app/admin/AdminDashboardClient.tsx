'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { updateRequestStatus } from './actions';

export default function AdminDashboardClient({ initialRequests, user }: { initialRequests: any[], user: any }) {
  const router = useRouter();
  const [requests, setRequests] = useState(initialRequests);
  const [isUpdating, setIsUpdating] = useState(false);

  // Stats calculation
  const total = requests.length;
  const pending = requests.filter(r => r.status === 'PENDING').length;
  const inProgress = requests.filter(r => r.status === 'IN_PROGRESS').length;
  const completed = requests.filter(r => r.status === 'COMPLETED').length;

  useEffect(() => {
    setRequests(initialRequests);
  }, [initialRequests]);

  useEffect(() => {
    const interval = setInterval(() => {
      router.refresh();
    }, 30000);
    return () => clearInterval(interval);
  }, [router]);

  async function handleAccept(requestId: string) {
    if (isUpdating) return;
    setIsUpdating(true);
    const result = await updateRequestStatus(requestId, 'IN_PROGRESS', user.id);
    if (!result.success) alert(result.error);
    setIsUpdating(false);
  }

  async function handleComplete(requestId: string) {
    if (isUpdating) return;
    setIsUpdating(true);
    const result = await updateRequestStatus(requestId, 'COMPLETED');
    if (!result.success) alert(result.error);
    setIsUpdating(false);
  }

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'PENDING': return { bg: '#fef3c7', color: '#92400e', label: 'Pending' };
      case 'IN_PROGRESS': return { bg: '#dcfce7', color: '#166534', label: 'Processing' };
      case 'COMPLETED': return { bg: '#f1f5f9', color: '#475569', label: 'Completed' };
      default: return { bg: '#f1f5f9', color: '#475569', label: status };
    }
  };

  return (
    <div className="container" style={{ padding: '3rem 0 6rem' }}>
      {/* Header & Stats Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
             <span style={{ fontSize: '1.5rem' }}>👋</span>
             <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Welcome Back, {user.name}</h1>
          </div>
          <p style={{ color: '#64748b' }}>
            Account Role: <span style={{ color: '#22c55e', fontWeight: 700 }}>{user.role}</span> • You are managing Nigeria's elite service network.
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <StatCard label="Total" value={total} color="#0f172a" />
          <StatCard label="Pending" value={pending} color="#f59e0b" />
          <StatCard label="Active" value={inProgress} color="#22c55e" />
          <StatCard label="Done" value={completed} color="#64748b" />
        </div>
      </div>

      {/* Main Table Content */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Customer</th>
                <th style={thStyle}>Service Requested</th>
                <th style={thStyle}>Contact Info</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Assigned Provider</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.length === 0 ? (
                <tr>
                   <td colSpan={7} style={{ padding: '5rem', textAlign: 'center', color: '#94a3b8' }}>
                     No service requests found in your jurisdiction.
                   </td>
                </tr>
              ) : (
                requests.map((req) => {
                  const status = getStatusStyle(req.status);
                  return (
                    <tr key={req.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s' }}>
                      <td style={tdStyle}>{new Date(req.createdAt).toLocaleDateString()}</td>
                      <td style={tdStyle}>
                        <div style={{ fontWeight: 700, color: '#0f172a' }}>{req.customerName}</div>
                      </td>
                      <td style={tdStyle}>
                        <span style={{ background: '#f1f5f9', padding: '0.4rem 0.8rem', borderRadius: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>
                          {req.serviceType}
                        </span>
                      </td>
                      <td style={tdStyle}>
                        <div style={{ fontSize: '0.85rem', color: '#475569' }}>{req.email}</div>
                        <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{req.phone}</div>
                      </td>
                      <td style={tdStyle}>
                        <span style={{ 
                          padding: '0.4rem 0.75rem', 
                          borderRadius: '100px', 
                          fontSize: '0.75rem', 
                          fontWeight: 800, 
                          textTransform: 'uppercase',
                          background: status.bg, 
                          color: status.color 
                        }}>
                          {status.label}
                        </span>
                      </td>
                      <td style={tdStyle}>
                        {req.provider ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ width: '2rem', height: '2rem', background: '#e2e8f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>👤</div>
                            <div>
                               <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{req.provider.name}</div>
                               <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Active Specialist</div>
                            </div>
                          </div>
                        ) : (
                          <span style={{ color: '#94a3b8', fontStyle: 'italic', fontSize: '0.85rem' }}>Unassigned</span>
                        )}
                      </td>
                      <td style={tdStyle}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          {req.status === 'PENDING' && (user.role === 'ADMIN' || user.role === 'PROVIDER') && (
                            <button 
                              onClick={() => handleAccept(req.id)}
                              disabled={isUpdating}
                              className="btn btn-primary" 
                              style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', borderRadius: '0.5rem' }}
                            >
                              Accept Job
                            </button>
                          )}
                          {req.status === 'IN_PROGRESS' && (user.role === 'ADMIN' || req.providerId === user.id) && (
                            <button 
                              onClick={() => handleComplete(req.id)}
                              disabled={isUpdating}
                              className="btn" 
                              style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', borderRadius: '0.5rem', background: '#0f172a', color: 'white', border: 'none' }}
                            >
                              Finalize
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div className="card" style={{ padding: '1.5rem 2rem', border: '1px solid #f1f5f9', boxShadow: 'none', background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', marginBottom: '0.25rem', letterSpacing: '1px' }}>{label}</div>
      <div style={{ fontSize: '1.75rem', fontWeight: 900, color: color }}>{value}</div>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  padding: '1.25rem',
  fontSize: '0.85rem',
  fontWeight: 700,
  color: '#475569',
  textTransform: 'uppercase',
  letterSpacing: '1px'
};

const tdStyle: React.CSSProperties = {
  padding: '1.25rem',
  fontSize: '0.95rem',
  color: '#475569',
  verticalAlign: 'middle'
};
