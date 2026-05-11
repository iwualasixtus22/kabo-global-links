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
    console.log('ACCEPT BUTTON CLICKED for ID:', requestId);
    if (requestId.startsWith('fallback-')) {
      alert('This is a DEMO request. To test database actions, please create a REAL request from the home page.');
      return;
    }
    if (isUpdating) return;
    setIsUpdating(true);
    try {
      const result = await updateRequestStatus(requestId, 'IN_PROGRESS', user.id);
      if (!result.success) alert(result.error);
    } catch (err) {
      console.error('Accept job failed:', err);
    } finally {
      setIsUpdating(false);
    }
  }

  async function handleComplete(requestId: string) {
    console.log('FINALIZE BUTTON CLICKED for ID:', requestId);
    if (requestId.startsWith('fallback-')) {
      alert('This is a DEMO request. To test database actions, please create a REAL request from the home page.');
      return;
    }
    if (isUpdating) return;
    setIsUpdating(true);
    try {
      const result = await updateRequestStatus(requestId, 'COMPLETED');
      if (!result.success) alert(result.error);
    } catch (err) {
      console.error('Finalize job failed:', err);
    } finally {
      setIsUpdating(false);
    }
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem', flexWrap: 'wrap', gap: '2rem', flexDirection: 'column' }}>
        <div style={{ width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
             <span style={{ fontSize: '1.5rem' }}>👋</span>
             <h1 style={{ fontSize: 'clamp(1.75rem, 6vw, 2.5rem)', fontWeight: 800, color: '#ffffff', wordBreak: 'break-word' }}>Welcome Back, {user.name}</h1>
          </div>
          <p style={{ color: '#94a3b8' }}>
            Account Role: <span style={{ color: '#06b6d4', fontWeight: 700 }}>{user.role}</span> • You are managing Nigeria's elite service network.
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', width: '100%' }}>
          <StatCard label="Total" value={total} color="#ffffff" />
          <StatCard label="Pending" value={pending} color="#fcd34d" />
          <StatCard label="Active" value={inProgress} color="#34d399" />
          <StatCard label="Done" value={completed} color="#94a3b8" />
        </div>
      </div>

      {/* Main Table Content */}
      <div className="glass-card" style={{ padding: 0, overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.5)', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.07)' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(255, 255, 255, 0.05)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
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
                        <div style={{ fontWeight: 700, color: '#ffffff' }}>{req.customerName}</div>
                      </td>
                      <td style={tdStyle}>
                        <span style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#f8fafc', padding: '0.4rem 0.8rem', borderRadius: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>
                          {req.serviceType}
                        </span>
                      </td>
                      <td style={tdStyle}>
                        <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>{req.email}</div>
                        <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{req.phone}</div>
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
                        {req.id.startsWith('fallback-') ? (
                          <span style={{ color: '#94a3b8', fontStyle: 'italic', fontSize: '0.85rem' }}>System Generated</span>
                        ) : req.provider ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                             <div style={{ width: '2rem', height: '2rem', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>👤</div>
                            <div>
                               <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc' }}>{req.provider.name}</div>
                               <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Active Specialist</div>
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
                              style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', borderRadius: '0.5rem', background: '#ffffff', color: '#0f172a', border: 'none', fontWeight: 600 }}
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
    <div className="glass-card" style={{ flex: '1 1 min(120px, 100%)', padding: '1rem', border: '1px solid rgba(255, 255, 255, 0.5)', boxShadow: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', marginBottom: '0.25rem', letterSpacing: '1px' }}>{label}</div>
      <div style={{ fontSize: '1.5rem', fontWeight: 900, color: color }}>{value}</div>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  padding: '1.25rem',
  fontSize: '0.85rem',
  fontWeight: 700,
  color: '#94a3b8',
  textTransform: 'uppercase',
  letterSpacing: '1px'
};

const tdStyle: React.CSSProperties = {
  padding: '1.25rem',
  fontSize: '0.95rem',
  color: '#cbd5e1',
  verticalAlign: 'middle'
};
