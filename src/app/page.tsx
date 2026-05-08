import Link from "next/link";
import { db } from "@/lib/prisma";
import { FALLBACK_CATEGORIES } from "@/lib/fallbackData";

export default async function Home() {
  let categories = [];
  try {
    categories = await db.category.findMany({
      include: {
        services: {
          take: 3
        }
      }
    });
    if (categories.length === 0) categories = FALLBACK_CATEGORIES;
  } catch (error) {
    console.error("Database connection failed:", error);
    categories = FALLBACK_CATEGORIES;
  }

  return (
    <div className="animate-fade-in">
      {/* Premium Hero Section */}
      <section style={{ 
        padding: '8rem 0', 
        background: 'transparent',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Decorative Elements */}
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '400px', height: '400px', background: 'rgba(34, 197, 94, 0.05)', borderRadius: '50%', filter: 'blur(80px)' }}></div>
        <div style={{ position: 'absolute', bottom: '-5%', left: '-5%', width: '300px', height: '300px', background: 'rgba(15, 23, 42, 0.03)', borderRadius: '50%', filter: 'blur(60px)' }}></div>

        <div className="container hero-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', alignItems: 'center', gap: '5rem', position: 'relative' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <span style={{ width: '2rem', height: '2px', background: '#22c55e' }}></span>
              <span style={{ color: '#22c55e', fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px' }}>
                Nigeria's Elite Service Network
              </span>
            </div>
            <h1 style={{ fontSize: 'min(4.5rem, 12vw)', lineHeight: 1, color: '#f8fafc', marginBottom: '2rem', fontWeight: 900, letterSpacing: '-2px' }}>
              The Gold Standard in <span style={{ 
                background: 'linear-gradient(to right, #06b6d4, #22c55e)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent' 
              }}>Service Coordination.</span>
            </h1>
            <p style={{ fontSize: '1.4rem', color: '#cbd5e1', marginBottom: '3rem', maxWidth: '600px', lineHeight: 1.5 }}>
              Connecting high-net-worth individuals, premium households, and vision-driven businesses with the most verified professionals in Nigeria.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <Link href="/services" className="btn btn-primary" style={{ padding: '1.25rem 2.5rem', fontSize: '1.2rem', borderRadius: '1rem', boxShadow: '0 10px 15px -3px rgba(34, 197, 94, 0.3)' }}>
                View Elite Services
              </Link>
              <Link href="/register" className="btn" style={{ background: 'rgba(255,255,255,0.1)', color: '#f8fafc', padding: '1.25rem 2.5rem', fontSize: '1.2rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' }}>
                Join the Network
              </Link>
            </div>
            
            <div style={{ marginTop: '4rem', display: 'flex', gap: '3rem', borderTop: '1px solid #e2e8f0', paddingTop: '2.5rem' }}>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#06b6d4' }}>1,200+</div>
                <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Verified Experts</div>
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#06b6d4' }}>15k+</div>
                <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Successful Links</div>
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#06b6d4' }}>24/7</div>
                <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>VIP Coordination</div>
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
      <section style={{ padding: '10rem 0', background: 'transparent' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem', fontWeight: 800, color: '#f8fafc' }}>Explore Our <span style={{ color: '#06b6d4' }}>Premium Categories</span></h2>
            <p style={{ color: '#94a3b8', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>Curated services designed for precision, speed, and absolute quality.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
            {categories.map((category) => (
              <Link 
                href="/services" 
                key={category.id} 
                className="card glass-card" 
                style={{ 
                  textDecoration: 'none', 
                  color: 'inherit',
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  textAlign: 'center',
                  background: 'rgba(15, 23, 42, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <div style={{ 
                  fontSize: '3.5rem', 
                  width: '6rem', 
                  height: '6rem', 
                  background: 'rgba(255, 255, 255, 0.05)', 
                  borderRadius: '2rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  marginBottom: '2rem',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  {category.icon || '🛠️'}
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#f8fafc' }}>{category.name}</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                  Top-tier {category.name.toLowerCase()} solutions for discerning clients.
                </p>
                <span style={{ color: '#06b6d4', fontWeight: 700, fontSize: '0.9rem' }}>Learn More →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* High-End CTA */}
      <section style={{ padding: '0 0 10rem' }}>
        <div className="container">
          <div style={{ 
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.8) 100%)', 
            backdropFilter: 'blur(10px)',
            padding: '6rem 4rem', 
            borderRadius: '3rem', 
            textAlign: 'center', 
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 30px 60px -15px rgba(15, 23, 42, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
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
