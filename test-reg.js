const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();
async function run() {
  try {
    const email = 'test@example.com';
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: 'Test User',
        role: 'USER',
      },
    });
    console.log('USER REGISTERED SUCCESSFULLY:', user.email);
  } catch (err) {
    console.error('REGISTRATION FAILED:', err);
  } finally {
    process.exit(0);
  }
}
run();
