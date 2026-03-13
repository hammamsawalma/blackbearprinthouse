/**
 * Prisma Seed Script — Creates initial admin user.
 * 
 * Run with: npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed.ts
 * Or add to package.json: "prisma": { "seed": "ts-node prisma/seed.ts" }
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@blackbear.qa';
  const password = 'BlackBear@2026!'; // Change in production!
  const saltRounds = 12;

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = await prisma.user.upsert({
    where: { email },
    update: { password: hashedPassword },
    create: {
      name: 'Admin',
      email,
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log(`✅ Admin user seeded: ${user.email} (id: ${user.id})`);
  console.log(`🔑 Password: ${password}`);
  console.log('⚠️  Change this password immediately in production!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
