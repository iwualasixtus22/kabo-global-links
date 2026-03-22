import Link from "next/link";
import { db } from "@/lib/prisma";

export default async function Home() {
  const categories = await db.category.findMany({
    include: {
      services: {
        take: 3
      }
    }
  });

  return (
    <div className="animate-fade-in">
      {/* Premium Hero Section */}
      <section style={{ 
        padding: '8rem 0', 
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Decorative Elements */}
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '400px', height: '400px', background: 'rgba(34, 197, 94, 0.05)', borderRadius: '50%', filter: 'blur(80px)' }}></div>
        <div style={{ position: 'absolute', bottom: '-5%', left: '-5%', width: '300px', height: '300px', background: 'rgba(15, 23, 42, 0.03)', borderRadius: '50%', filter: 'blur(60px)' }}></div>

        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', alignItems: 'center', gap: '5rem', position: 'relative' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <span style={{ width: '2rem', height: '2px', background: '#22c55e' }}></span>
              <span style={{ color: '#22c55e', fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px' }}>
                Nigeria's Elite Service Network
              </span>
            </div>
            <h1 style={{ fontSize: '4.5rem', lineHeight: 1, color: '#0f172a', marginBottom: '2rem', fontWeight: 900, letterSpacing: '-2px' }}>
              The Gold Standard in <span style={{ 
                background: 'linear-gradient(to right, #22c55e, #10b981)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent' 
              }}>Service Coordination.</span>
            </h1>
            <p style={{ fontSize: '1.4rem', color: '#64748b', marginBottom: '3rem', maxWidth: '600px', lineHeight: 1.5 }}>
              Connecting high-net-worth individuals, premium households, and vision-driven businesses with the most verified professionals in Nigeria.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <Link href="/services" className="btn btn-primary" style={{ padding: '1.25rem 2.5rem', fontSize: '1.2rem', borderRadius: '1rem', boxShadow: '0 10px 15px -3px rgba(34, 197, 94, 0.3)' }}>
                View Elite Services
              </Link>
              <Link href="/register" className="btn" style={{ background: 'white', color: '#0f172a', padding: '1.25rem 2.5rem', fontSize: '1.2rem', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
                Join the Network
              </Link>
            </div>
            
            <div style={{ marginTop: '4rem', display: 'flex', gap: '3rem', borderTop: '1px solid #e2e8f0', paddingTop: '2.5rem' }}>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>1,200+</div>
                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Verified Experts</div>
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>15k+</div>
                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Successful Links</div>
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>24/7</div>
                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>VIP Coordination</div>
              </div>
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{ 
              width: '100%', 
              minHeight: '550px', 
              background: '#e2e8f0', 
              borderRadius: '2.5rem', 
              overflow: 'hidden', 
              boxShadow: '0 30px 50px -12px rgba(0, 0, 0, 0.2)',
              border: '8px solid white'
            }}>
              <img 
                src="/partnership.png" 
                alt="Kabo Global Links Elite Partnership" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
              />
            </div>
            
            {/* Float Cards */}
            <div className="card" style={{ 
              position: 'absolute', 
              top: '10%', 
              left: '-3rem', 
              padding: '1.5rem', 
              background: 'rgba(255, 255, 255, 0.9)', 
              backdropFilter: 'blur(10px)',
              borderRadius: '1.5rem',
              maxWidth: '220px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            }}>
               <div style={{ color: '#22c55e', fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.25rem' }}>★ 4.9/5</div>
               <div style={{ color: '#64748b', fontSize: '0.85rem' }}>Avg. Professional Rating</div>
            </div>

            <div className="card" style={{ 
              position: 'absolute', 
              bottom: '10%', 
              right: '-2rem', 
              padding: '1.5rem', 
              background: 'rgba(15, 23, 42, 0.95)', 
              borderRadius: '1.5rem',
              color: 'white',
              maxWidth: '240px',
              border: 'none',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
            }}>
               <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem' }}>LATEST COMPLETION</div>
               <div style={{ fontWeight: 600 }}>Luxury Office Branding in Victoria Island</div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Services Teaser */}
      <section style={{ padding: '10rem 0', background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem', fontWeight: 800 }}>Explore Our <span style={{ color: '#22c55e' }}>Premium Categories</span></h2>
            <p style={{ color: '#64748b', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>Curated services designed for precision, speed, and absolute quality.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
            {categories.map((category) => (
              <Link 
                href="/services" 
                key={category.id} 
                className="card" 
                style={{ 
                  textDecoration: 'none', 
                  color: 'inherit',
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  textAlign: 'center',
                  background: 'linear-gradient(to bottom, #ffffff, #f8fafc)',
                  border: '1px solid #f1f5f9'
                }}
              >
                <div style={{ 
                  fontSize: '3.5rem', 
                  width: '6rem', 
                  height: '6rem', 
                  background: 'white', 
                  borderRadius: '2rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  marginBottom: '2rem',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)'
                }}>
                  {category.icon || '🛠️'}
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{category.name}</h3>
                <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                  Top-tier {category.name.toLowerCase()} solutions for discerning clients.
                </p>
                <span style={{ color: '#22c55e', fontWeight: 700, fontSize: '0.9rem' }}>Learn More →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* High-End CTA */}
      <section style={{ padding: '0 0 10rem' }}>
        <div className="container">
          <div style={{ 
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', 
            padding: '6rem 4rem', 
            borderRadius: '3rem', 
            textAlign: 'center', 
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 30px 60px -15px rgba(15, 23, 42, 0.4)'
          }}>
            <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '300px', height: '300px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '50%', filter: 'blur(50px)' }}></div>
            <h2 style={{ fontSize: '3.5rem', marginBottom: '2rem', fontWeight: 800, letterSpacing: '-1px' }}>Ready to Experience Excellence?</h2>
            <p style={{ fontSize: '1.4rem', marginBottom: '4rem', opacity: 0.8, maxWidth: '700px', margin: '0 auto 4rem' }}>
              Connect with Nigeria's best hands today. Our coordination team is standing by to ensure your project is a masterpiece.
            </p>
            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/services" className="btn btn-primary" style={{ padding: '1.25rem 4rem', fontSize: '1.2rem', borderRadius: '1rem' }}>
                Book a Service
              </Link>
              <Link href="/register" className="btn" style={{ border: '1px solid rgba(255, 255, 255, 0.2)', color: 'white', padding: '1.25rem 4rem', fontSize: '1.2rem', borderRadius: '1rem' }}>
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
