import "dotenv/config";
import { db } from "../src/lib/prisma";

async function main() {
  const categories = [
    {
      name: "Construction & Building",
      icon: "🏗",
      services: ["Electrical & Plumbing", "Painting & Roofing", "Borehole & Fabrication"]
    },
    {
      name: "Home Services",
      icon: "🏠",
      services: ["Deep Cleaning", "AC & Generator Repair", "CCTV & Pest Control"]
    },
    {
      name: "Office & Business",
      icon: "💼",
      services: ["Branding & IT Services", "Website Design", "Business Registration"]
    },
    {
      name: "Logistics",
      icon: "🚚",
      services: ["Fast Delivery", "Truck Hire", "Relocation Services"]
    }
  ];

  for (const cat of categories) {
    const category = await db.category.upsert({
      where: { name: cat.name },
      update: {},
      create: {
        name: cat.name,
        icon: cat.icon,
      }
    });

    for (const s of cat.services) {
      await db.service.upsert({
        where: { id: `seed-${cat.name}-${s}` }, // Use a stable ID for seeding
        update: { name: s },
        create: {
          id: `seed-${cat.name}-${s}`,
          name: s,
          categoryId: category.id
        }
      });
    }
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
