'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="navbar">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '4.5rem' }}>
        <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 700, textDecoration: 'none', color: '#0f172a' }}>
          <span style={{ color: '#22c55e' }}>KABO</span> GLOBAL LINKS
        </Link>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link href="/#services" style={{ textDecoration: 'none', color: '#1e293b', fontWeight: 500 }}>Services</Link>
          
          {session ? (
            <>
              <Link href="/admin" style={{ textDecoration: 'none', color: '#1e293b', fontWeight: 500 }}>Dashboard</Link>
              <button 
                onClick={() => signOut()} 
                style={{ background: 'none', border: 'none', color: '#1e293b', fontWeight: 500, cursor: 'pointer', padding: 0 }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" style={{ textDecoration: 'none', color: '#1e293b', fontWeight: 500 }}>Login</Link>
            </>
          )}

          <Link href="/request" className="btn btn-primary">Book Now</Link>
        </div>
      </div>
    </nav>
  );
}
