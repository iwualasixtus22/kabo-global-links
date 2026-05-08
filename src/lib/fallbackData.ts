export const FALLBACK_CATEGORIES = [
  {
    id: 'f1',
    name: 'Construction',
    icon: '🏗️',
    services: [
      { id: 's1', name: 'Elite Branding', description: 'Premium visual identity and space branding for corporate excellence.', price: 250000 },
      { id: 's2', name: 'Structural Audit', description: 'Comprehensive structural integrity assessments and safety reporting.', price: 150000 },
    ]
  },
  {
    id: 'f2',
    name: 'Home Services',
    icon: '🏠',
    services: [
      { id: 's3', name: 'Premium Cleaning', description: 'High-end deep cleaning and sanitization for luxury residences.', price: 50000 },
      { id: 's4', name: 'Smart Home Setup', description: 'Next-gen automation for lighting, security, and climate control.', price: 120000 },
    ]
  },
  {
    id: 'f3',
    name: 'Tech Solutions',
    icon: '💻',
    services: [
      { id: 's5', name: 'Web Development', description: 'Bespoke high-performance digital platforms and web ecosystems.', price: 500000 },
      { id: 's6', name: 'IT Support', description: '24/7 priority technical coordination and infrastructure management.', price: 80000 },
    ]
  }
];

export const FALLBACK_REQUESTS = [
  {
    id: 'r1',
    customerName: 'Amina Adebayo',
    email: 'amina@example.com',
    phone: '08012345678',
    serviceType: 'Luxury Office Branding',
    status: 'IN_PROGRESS',
    createdAt: new Date().toISOString(),
    provider: { name: 'Kunle Olawale' }
  },
  {
    id: 'r2',
    customerName: 'Emeka Okafor',
    email: 'emeka@example.com',
    phone: '08087654321',
    serviceType: 'Premium Home Cleaning',
    status: 'PENDING',
    createdAt: new Date().toISOString(),
    provider: null
  }
];
