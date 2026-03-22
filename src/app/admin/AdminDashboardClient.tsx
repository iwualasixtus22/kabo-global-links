'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { updateRequestStatus } from './actions';

export default function AdminDashboardClient({ initialRequests, user }: { initialRequests: any[], user: any }) {
  const router = useRouter();
  const [requests, setRequests] = useState(initialRequests);
  const [isUpdating, setIsUpdating] = useState(false);

  // Sync with server data changes
  useEffect(() => {
    setRequests(initialRequests);
  }, [initialRequests]);

  // Auto-refresh every 30 seconds to show latest status changes
  useEffect(() => {
    const interval = setInterval(() => {
      router.refresh();
    }, 30000); // 30 seconds
    return () => clearInterval(interval);
  }, [router]);

  async function handleAccept(requestId: string) {
    setIsUpdating(true);
    const result = await updateRequestStatus(requestId, 'IN_PROGRESS', user.id);
    setIsUpdating(false);

    if (result.success) {
      // Local update to avoid full reload
      setRequests(prev => prev.map(req => 
        req.id === requestId ? { ...req, status: 'IN_PROGRESS', provider: user } : req
      ));
    } else {
      alert('Error updating request');
    }
  }

  async function handleComplete(requestId: string) {
    setIsUpdating(true);
    const result = await updateRequestStatus(requestId, 'COMPLETED');
    setIsUpdating(false);

    if (result.success) {
      setRequests(prev => prev.map(req => 
        req.id === requestId ? { ...req, status: 'COMPLETED' } : req
      ));
    }
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '0.75rem', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
        <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
          <tr>
            <th style={{ padding: '1.25rem', textAlign: 'left' }}>Customer</th>
            <th style={{ padding: '1.25rem', textAlign: 'left' }}>Service</th>
            <th style={{ padding: '1.25rem', textAlign: 'left' }}>Contact</th>
            <th style={{ padding: '1.25rem', textAlign: 'left' }}>Status / Assigned</th>
            <th style={{ padding: '1.25rem', textAlign: 'left' }}>Date</th>
            <th style={{ padding: '1.25rem', textAlign: 'left' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>No requests found yet.</td>
            </tr>
          ) : (
            requests.map((req) => (
              <tr key={req.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '1.25rem' }}>
                  <div style={{ fontWeight: 700 }}>{req.customerName}</div>
                </td>
                <td style={{ padding: '1.25rem' }}>
                  <div style={{ fontWeight: 600, color: '#0f172a' }}>{req.serviceType}</div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem' }}>{req.details}</div>
                </td>
                <td style={{ padding: '1.25rem' }}>
                  <div style={{ fontSize: '0.9rem' }}>{req.email}</div>
                  <div style={{ fontSize: '0.9rem', color: '#64748b' }}>{req.phone}</div>
                </td>
                <td style={{ padding: '1.25rem' }}>
                  <span style={{ 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '100px', 
                    fontSize: '0.75rem', 
                    fontWeight: 700, 
                    display: 'inline-block',
                    marginBottom: '0.5rem',
                    background: 
                      req.status === 'PENDING' ? '#fef3c7' : 
                      req.status === 'IN_PROGRESS' ? '#dbeafe' : '#dcfce7', 
                    color: 
                      req.status === 'PENDING' ? '#92400e' : 
                      req.status === 'IN_PROGRESS' ? '#1e40af' : '#166534' 
                  }}>
                    {req.status}
                  </span>
                  {req.provider && (
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                      Assigned: {req.provider.name}
                    </div>
                  )}
                </td>
                <td style={{ padding: '1.25rem', color: '#64748b', fontSize: '0.9rem' }}>
                  {new Date(req.createdAt).toLocaleDateString()}
                </td>
                <td style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {req.status === 'PENDING' && (user.role === 'ADMIN' || user.role === 'PROVIDER') && (
                      <button 
                        onClick={() => handleAccept(req.id)}
                        disabled={isUpdating}
                        className="btn btn-primary" 
                        style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                      >
                        Accept
                      </button>
                    )}
                    {req.status === 'IN_PROGRESS' && (user.role === 'ADMIN' || req.providerId === user.id) && (
                      <button 
                        onClick={() => handleComplete(req.id)}
                        disabled={isUpdating}
                        className="btn btn-primary" 
                        style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                      >
                        Complete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
