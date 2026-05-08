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
      // NextAuth sometimes prefixes the error message
      const errorMessage = result.error.replace('CredentialsSignin', '').replace('Error: ', '').trim();
      setError(errorMessage || 'Invalid email or password');
    }
  }

  return (
    <div className="container animate-fade-in" style={{ padding: '8rem 0' }}>
      <div className="glass-card" style={{ maxWidth: '450px', margin: '0 auto', padding: '3rem', border: '1px solid rgba(255,255,255,0.1)' }}>
        <h1 style={{ marginBottom: '2.5rem', textAlign: 'center', fontSize: '2.5rem', fontWeight: 800 }}>Account <span style={{ color: '#06b6d4' }}>Login</span></h1>
        
        {error && <div style={{ color: '#ef4444', marginBottom: '1.5rem', textAlign: 'center', background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '0.5rem' }}>{error}</div>}
 
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            <label style={{ fontWeight: 600, color: '#94a3b8' }}>Email Address</label>
            <input type="email" name="email" required style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white' }} placeholder="john@example.com" />
          </div>
 
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            <label style={{ fontWeight: 600, color: '#94a3b8' }}>Password</label>
            <input type="password" name="password" required style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white' }} placeholder="••••••••" />
          </div>
 
          <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ padding: '1rem', width: '100%', fontSize: '1.1rem', marginTop: '1rem' }}>
            {isSubmitting ? 'Verifying...' : 'Login'}
          </button>
        </form>
 
        <p style={{ marginTop: '2rem', textAlign: 'center', color: '#64748b' }}>
          Don't have an account? <a href="/register" style={{ color: '#06b6d4', textDecoration: 'none', fontWeight: 600 }}>Join the Network</a>
        </p>
      </div>
    </div>
  );
}
