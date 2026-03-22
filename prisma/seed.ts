import "dotenv/config";
import { db } from "../src/lib/prisma";

async function main() {
  const categories = [
    {
      name: "Construction & Building",
      icon: "🏗",
      services: [
        { name: "Electrical & Plumbing", price: 15000, description: "Professional wiring and piping solutions." },
        { name: "Painting & Roofing", price: 25000, description: "Exterior and interior finishing." },
        { name: "Borehole & Fabrication", price: 120000, description: "Full water system setup." }
      ]
    },
    {
      name: "Home Services",
      icon: "🏠",
      services: [
        { name: "Deep Cleaning", price: 10000, description: "Full house sanitation." },
        { name: "AC & Generator Repair", price: 12000, description: "Routine maintenance and fixing." },
        { name: "CCTV & Pest Control", price: 35000, description: "Security and hygiene solutions." }
      ]
    },
    {
      name: "Office & Business",
      icon: "💼",
      services: [
        { name: "Branding & Logo Design", price: 20000, description: "Professional identity creation." },
        { name: "Website Design", price: 150000, description: "Custom dynamic site development." },
        { name: "Business Registration", price: 30000, description: "CAC and tax documentation." }
      ]
    },
    {
      name: "Logistics",
      icon: "🚚",
      services: [
        { name: "Fast Delivery", price: 2500, description: "Intra-city rapid parcels." },
        { name: "Truck Hire", price: 45000, description: "Daily or trip-based haulage." },
        { name: "Relocation Services", price: 80000, description: "Safe packing and moving." }
      ]
    }
  ];

  for (const cat of categories) {
    const category = await db.category.upsert({
      where: { name: cat.name },
      update: { icon: cat.icon },
      create: {
        name: cat.name,
        icon: cat.icon,
      }
    });

    for (const s of cat.services) {
      await db.service.upsert({
        where: { id: `seed-${cat.name}-${s.name}` },
        update: { 
          name: s.name, 
          price: s.price,
          description: s.description 
        },
        create: {
          id: `seed-${cat.name}-${s.name}`,
          name: s.name,
          price: s.price,
          description: s.description,
          categoryId: category.id
        }
      });
    }
  }

  console.log("Seeding finished with prices.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
