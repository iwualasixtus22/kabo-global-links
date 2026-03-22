import "dotenv/config";
import { db } from "../src/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const adminEmail = "admin@kabo.com";
  
  const existingAdmin = await db.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await db.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: "Main Admin",
        role: "ADMIN" as any,
      },
    });
    console.log("Default admin created: admin@kabo.com / admin123");
  } else {
    console.log("Admin already exists.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
