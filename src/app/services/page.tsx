import { db } from "@/lib/prisma";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { FALLBACK_CATEGORIES } from "@/lib/fallbackData";

export default async function ServicesPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login?callbackUrl=/services');
  }

  let categories = [];
  try {
    categories = await db.category.findMany({
      include: {
        services: true
      }
    });
    if (categories.length === 0) categories = FALLBACK_CATEGORIES;
  } catch (error) {
    console.error("Database connection failed in Services:", error);
    categories = FALLBACK_CATEGORIES;
  }

  return (
    <div className="container" style={{ padding: '4rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 800 }}>
          Our Professional <span style={{ color: '#22c55e' }}>Services</span>
        </h1>
        <p style={{ color: '#64748b', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
          Explore our wide range of premium services, tailored to meet your construction, home, and business needs in Nigeria.
        </p>
      </div>

      <div style={{ display: 'grid', gap: '5rem' }}>
        {categories.map((category) => (
          <div key={category.id}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
              <span style={{ fontSize: '2.5rem' }}>{category.icon || '🛠️'}</span>
              <h2 style={{ fontSize: '2rem', borderBottom: '4px solid #22c55e', paddingBottom: '0.5rem' }}>
                {category.name}
              </h2>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              {category.services.map((service) => (
                <div key={service.id} className="card" style={{ display: 'flex', flexDirection: 'column', transition: 'transform 0.3s ease' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: '#0f172a' }}>{service.name}</h3>
                    <p style={{ color: '#64748b', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                      {(service as any).description || "Expertly rendered professional service across our network."}
                    </p>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#22c55e', marginBottom: '2rem' }}>
                      {service.price > 0 ? `From ₦${service.price.toLocaleString()}` : "Price Varies"}
                    </div>
                  </div>
                  <Link 
                    href={`/request?service=${encodeURIComponent(service.name)}`} 
                    className="btn btn-primary" 
                    style={{ textAlign: 'center', padding: '0.75rem' }}
                  >
                    Select & Book Now
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <section style={{ marginTop: '8rem', padding: '4rem', background: '#0f172a', borderRadius: '2rem', color: 'white', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Don't see what you need?</h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '2.5rem', opacity: 0.8 }}>We offer custom solutions for complex projects.</p>
        <Link href="/request" className="btn btn-primary" style={{ padding: '1rem 3rem' }}>Contact Sales</Link>
      </section>
    </div>
  );
}
