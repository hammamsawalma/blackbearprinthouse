const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('BlackBear@2026', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@blackbear.qa' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@blackbear.qa',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('Admin user created/verified:', admin.email);

  // Seed a few sample products
  const products = [
    { id: 'bc-standard', nameAr: 'كروت أعمال ستاندرد', nameEn: 'Standard Business Cards', descriptionAr: 'كروت أعمال احترافية 90×50 مم', descriptionEn: 'Professional business cards 90×50mm', price: 150, category: 'business-cards' },
    { id: 'bc-premium', nameAr: 'كروت أعمال بريميوم', nameEn: 'Premium Business Cards', descriptionAr: 'كروت أعمال مع طلاء UV وحواف ذهبية', descriptionEn: 'Business cards with UV coating and gold edges', price: 300, category: 'business-cards' },
    { id: 'flyer-a5', nameAr: 'فلاير A5', nameEn: 'A5 Flyer', descriptionAr: 'فلاير دعائي A5 طباعة وجهين', descriptionEn: 'A5 promotional flyer double-sided', price: 200, category: 'brochures' },
    { id: 'roll-up', nameAr: 'رول أب ستاند', nameEn: 'Roll-up Stand', descriptionAr: 'ستاند رول أب 85×200 سم', descriptionEn: 'Roll-up stand 85×200cm', price: 250, category: 'signage' },
    { id: 'sticker-a4', nameAr: 'ملصقات A4', nameEn: 'A4 Stickers', descriptionAr: 'ملصقات لاصقة A4 مطبوعة بالألوان', descriptionEn: 'A4 full-color adhesive stickers', price: 100, category: 'stickers' },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { id: p.id },
      update: {},
      create: p,
    });
  }

  console.log(`Seeded ${products.length} products`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
