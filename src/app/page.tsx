import Link from "next/link";

export default function Home() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section style={{ padding: '6rem 0', background: 'radial-gradient(circle at 10% 20%, rgba(34, 197, 94, 0.05) 0%, transparent 50%)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', alignItems: 'center', gap: '4rem' }}>
          <div>
            <span style={{ display: 'inline-block', padding: '0.4rem 1rem', background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1.5rem' }}>
              NIGERIA'S #1 SERVICE NETWORK
            </span>
            <h1 style={{ fontSize: '3.5rem', lineHeight: 1.1, color: '#0f172a', marginBottom: '1.5rem', fontWeight: 700 }}>
              Seamless Access to <span style={{ color: '#22c55e' }}>Quality Services</span>
            </h1>
            <p style={{ fontSize: '1.25rem', color: '#64748b', marginBottom: '2.5rem', maxWidth: '540px' }}>
              Connecting individuals, households, and businesses with trusted, verified, and affordable professionals.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <Link href="/request" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>Get Started</Link>
              <Link href="#services" className="btn" style={{ border: '2px solid #0f172a', color: '#0f172a' }}>Explore Services</Link>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ width: '100%', height: '400px', background: '#e2e8f0', borderRadius: '1.5rem', overflow: 'hidden' }}>
              {/* Image would go here */}
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                [Service Integration Image]
              </div>
            </div>
            <div className="card" style={{ position: 'absolute', bottom: '-2rem', left: '-2rem', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', minWidth: '200px' }}>
              <div style={{ width: '3rem', height: '3rem', background: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                ✓
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.25rem' }}>100% Verified</div>
                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Professionals</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" style={{ padding: '8rem 0', background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Comprehensive <span style={{ color: '#22c55e' }}>Service Solutions</span></h2>
            <p style={{ color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>From construction to logistics, we coordinate the best hands for your needs.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
            {[
              { title: "Construction & Building", icon: "🏗", items: ["Electrical & Plumbing", "Painting & Roofing", "Borehole & Fabrication"] },
              { title: "Home Services", icon: "🏠", items: ["Deep Cleaning", "AC & Generator Repair", "CCTV & Pest Control"] },
              { title: "Office & Business", icon: "💼", items: ["Branding & IT Services", "Website Design", "Business Registration"] },
              { title: "Logistics", icon: "🚚", items: ["Fast Delivery", "Truck Hire", "Relocation Services"] }
            ].map((service, i) => (
              <div key={i} className="card">
                <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>{service.icon}</div>
                <h3 style={{ marginBottom: '1.5rem' }}>{service.title}</h3>
                <ul style={{ listStyle: 'none' }}>
                  {service.items.map((item, j) => (
                    <li key={j} style={{ color: '#64748b', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: '#22c55e' }}>•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '4rem 0 8rem' }}>
        <div className="container">
          <div style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', padding: '4rem', borderRadius: '1.5rem', textAlign: 'center', color: 'white' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Ready to Experience Quality Service?</h2>
            <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', opacity: 0.9 }}>Tell us what you need and we'll connect you with the right professional.</p>
            <Link href="/request" className="btn" style={{ background: 'white', color: '#22c55e', padding: '1rem 3rem', fontSize: '1.1rem' }}>
              Book a Service Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
