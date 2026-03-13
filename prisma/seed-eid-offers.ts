import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const eidOffers = [
    {
      nameAr: 'كروت أعمال فاخرة',
      nameEn: 'Premium Business Cards',
      descriptionAr: 'كروت أعمال بتصميم حصري وطباعة فاخرة مع لمسات ذهبية - عرض العيد!',
      descriptionEn: 'Exclusive design business cards with premium printing and gold foil accents - Eid Special!',
      price: 250.0,
      offerPrice: 175.0,
      category: 'business-cards',
      image: '/assets/offer_business_cards.webp',
      offerImage: '/assets/offer_business_cards.webp',
      isEidOffer: true,
    },
    {
      nameAr: 'بروشورات ثلاثية الطي',
      nameEn: 'Tri-fold Brochures Pack',
      descriptionAr: 'بروشورات احترافية ثلاثية الطي - 500 نسخة بسعر خاص للعيد',
      descriptionEn: '500 professional tri-fold brochures at a special Eid price',
      price: 800.0,
      offerPrice: 550.0,
      category: 'brochures',
      image: '/assets/offer_brochures.webp',
      offerImage: '/assets/offer_brochures.webp',
      isEidOffer: true,
    },
    {
      nameAr: 'باكج هوية تجارية كاملة',
      nameEn: 'Full Branding Package',
      descriptionAr: 'هوية تجارية كاملة تشمل لوغو + كروت + ليترهيد + بروشور بتصميم واحد متناسق',
      descriptionEn: 'Complete brand identity: Logo + Cards + Letterhead + Brochure in a unified design',
      price: 3500.0,
      offerPrice: 2450.0,
      category: 'design',
      image: '/assets/offer_branding.webp',
      offerImage: '/assets/offer_branding.webp',
      isEidOffer: true,
    },
    {
      nameAr: 'علب هدايا مخصصة للعيد',
      nameEn: 'Custom Eid Gift Boxes',
      descriptionAr: 'علب هدايا فاخرة بتصميم إسلامي مميز - مثالية لهدايا العيد للشركات',
      descriptionEn: 'Luxury gift boxes with elegant Islamic design - Perfect for corporate Eid gifts',
      price: 1200.0,
      offerPrice: 850.0,
      category: 'packaging',
      image: '/assets/offer_gift_boxes.webp',
      offerImage: '/assets/offer_gift_boxes.webp',
      isEidOffer: true,
    },
    {
      nameAr: 'لوحات إعلانية رول أب',
      nameEn: 'Roll-up Banner Stands',
      descriptionAr: 'لوحات رول أب 85×200 سم بطباعة عالية الجودة - عرض خاص للعيد',
      descriptionEn: '85x200cm roll-up banner stands with high-quality print - Eid Special Offer',
      price: 450.0,
      offerPrice: 299.0,
      category: 'signage',
      image: '/assets/offer_rollup.webp',
      offerImage: '/assets/offer_rollup.webp',
      isEidOffer: true,
    },
  ];

  for (const offer of eidOffers) {
    await prisma.product.create({ data: offer });
    console.log(`✅ Created: ${offer.nameEn}`);
  }

  console.log('\\n🎉 All Eid offers seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
