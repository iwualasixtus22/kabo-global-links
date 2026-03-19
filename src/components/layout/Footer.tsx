export default function Footer() {
  return (
    <footer style={{ background: '#0f172a', color: 'white', padding: '4rem 0 2rem', marginTop: '4rem' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
        <div>
          <h3 style={{ marginBottom: '1rem' }}><span style={{ color: '#22c55e' }}>KABO</span> GLOBAL LINKS</h3>
          <p style={{ color: '#94a3b8' }}>Connecting you with premium service providers across Nigeria.</p>
        </div>
        <div>
          <h4 style={{ marginBottom: '1rem' }}>Contact Info</h4>
          <p style={{ color: '#94a3b8' }}>Phone: 08143779339</p>
          <p style={{ color: '#94a3b8' }}>Founder: Ihebom Precious Uzoma</p>
        </div>
      </div>
      <div className="container" style={{ textAlign: 'center', marginTop: '4rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', color: '#64748b' }}>
        <p>&copy; {new Date().getFullYear()} Kabo Global Links. All rights reserved.</p>
      </div>
    </footer>
  );
}
