'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    setIsSubmitting(false);
    if (!result?.error) {
      router.push('/admin');
    } else {
      setError('Invalid email or password');
    }
  }

  return (
    <div className="container" style={{ padding: '6rem 0' }}>
      <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Account <span style={{ color: '#22c55e' }}>Login</span></h1>
        
        {error && <div style={{ color: '#ef4444', marginBottom: '1.5rem', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            <label style={{ fontWeight: 600 }}>Email Address</label>
            <input type="email" name="email" required style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }} placeholder="john@example.com" />
          </div>

          <div style={{ display: 'grid', gap: '0.5rem' }}>
            <label style={{ fontWeight: 600 }}>Password</label>
            <input type="password" name="password" required style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }} placeholder="••••••••" />
          </div>

          <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ padding: '1rem', width: '100%' }}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p style={{ marginTop: '1.5rem', textAlign: 'center', color: '#64748b' }}>
          Don't have an account? <a href="/register" style={{ color: '#22c55e' }}>Register</a>
        </p>
      </div>
    </div>
  );
}
