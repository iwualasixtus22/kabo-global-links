'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from './actions';

export default function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(event.currentTarget);
    const result = await registerUser(formData);

    setIsSubmitting(false);
    if (result.success) {
      router.push('/login');
    } else {
      setError(result.error || 'Registration failed');
    }
  }

  return (
    <div className="container" style={{ padding: '6rem 0' }}>
      <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Create <span style={{ color: '#22c55e' }}>Account</span></h1>
        
        {error && <div style={{ color: '#ef4444', marginBottom: '1.5rem', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            <label style={{ fontWeight: 600 }}>Full Name</label>
            <input name="name" required style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }} placeholder="John Doe" />
          </div>

          <div style={{ display: 'grid', gap: '0.5rem' }}>
            <label style={{ fontWeight: 600 }}>Email Address</label>
            <input type="email" name="email" required style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }} placeholder="john@example.com" />
          </div>

          <div style={{ display: 'grid', gap: '0.5rem' }}>
            <label style={{ fontWeight: 600 }}>Password</label>
            <input type="password" name="password" required style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }} placeholder="••••••••" />
          </div>

          <div style={{ display: 'grid', gap: '0.5rem' }}>
            <label style={{ fontWeight: 600 }}>Role</label>
            <select name="role" required style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}>
              <option value="USER">User (Customer)</option>
              <option value="PROVIDER">Service Provider</option>
              <option value="ADMIN">Administrator</option>
            </select>
          </div>

          <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ padding: '1rem', width: '100%' }}>
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p style={{ marginTop: '1.5rem', textAlign: 'center', color: '#64748b' }}>
          Already have an account? <a href="/login" style={{ color: '#22c55e' }}>Login</a>
        </p>
      </div>
    </div>
  );
}
