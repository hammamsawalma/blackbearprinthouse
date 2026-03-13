import { type LucideIcon, CreditCard, BookOpen, FileText, Tag, Gift, Layers, Award, Package } from 'lucide-react';

export interface Product {
  id: string;
  slug: string;
  icon: LucideIcon;
  ar: { name: string; desc: string };
  en: { name: string; desc: string };
  price: number;
  currency: 'QAR';
  category: 'stationery' | 'marketing' | 'events' | 'packaging';
  customizable: boolean;
}

export const productCategories = {
  stationery: { ar: 'قرطاسية', en: 'Stationery' },
  marketing: { ar: 'تسويق', en: 'Marketing' },
  events: { ar: 'مناسبات', en: 'Events' },
  packaging: { ar: 'تغليف', en: 'Packaging' },
};

export const products: Product[] = [
  { id: '1', slug: 'business-cards-500', icon: CreditCard, category: 'stationery', customizable: true, price: 150, currency: 'QAR', ar: { name: 'كروت أعمال (500 كرت)', desc: 'طباعة 500 كرت عمل أحادي أو ثنائي الوجه - ورق 350 جرام مع تشطيب لامع أو مات' }, en: { name: 'Business Cards (500 pcs)', desc: '500 single or double-sided cards - 350gsm with glossy or matte finish' } },
  { id: '2', slug: 'letterhead-pack', icon: FileText, category: 'stationery', customizable: true, price: 200, currency: 'QAR', ar: { name: 'حزمة ورق رسمي', desc: '100 ورقة رسمية A4 + 100 ظرف مع طباعة بالهوية البصرية' }, en: { name: 'Letterhead Pack', desc: '100 A4 letterheads + 100 envelopes printed with brand identity' } },
  { id: '3', slug: 'brochure-trifold-500', icon: Layers, category: 'marketing', customizable: true, price: 350, currency: 'QAR', ar: { name: 'بروشور ثلاثي الطي (500 نسخة)', desc: '500 بروشور ثلاثي الطي - ورق 170 جرام لامع مع تصميم جاهز' }, en: { name: 'Tri-fold Brochure (500 pcs)', desc: '500 tri-fold brochures - 170gsm glossy with ready design' } },
  { id: '4', slug: 'flyers-a5-1000', icon: Layers, category: 'marketing', customizable: true, price: 180, currency: 'QAR', ar: { name: 'فلايرات A5 (1000 نسخة)', desc: '1000 فلاير A5 - ثنائي الوجه، ورق 170 جرام لامع' }, en: { name: 'A5 Flyers (1000 pcs)', desc: '1000 A5 flyers - double-sided, 170gsm glossy' } },
  { id: '5', slug: 'wedding-invitation-100', icon: Award, category: 'events', customizable: true, price: 800, currency: 'QAR', ar: { name: 'دعوة زفاف فاخرة (100 دعوة)', desc: '100 دعوة زفاف بتصميم حصري - ورق فاخر مع تشطيب فويل ذهبي وظرف' }, en: { name: 'Luxury Wedding Invitation (100 pcs)', desc: '100 exclusive wedding invitations - premium paper with gold foil and envelope' } },
  { id: '6', slug: 'sticker-roll-custom', icon: Tag, category: 'packaging', customizable: true, price: 120, currency: 'QAR', ar: { name: 'رول ملصقات مخصصة', desc: '500 ملصقة مقاوم للماء بحجم 5×5 سم - مثالية للمنتجات والتغليف' }, en: { name: 'Custom Sticker Roll', desc: '500 waterproof stickers 5×5cm - perfect for products and packaging' } },
  { id: '7', slug: 'gift-box-premium', icon: Package, category: 'packaging', customizable: true, price: 25, currency: 'QAR', ar: { name: 'علبة هدية فاخرة', desc: 'علبة هدية مخصصة بطباعة كاملة - مقاس 20×20×10 سم مع تشطيبات فاخرة' }, en: { name: 'Premium Gift Box', desc: 'Custom gift box with full print - 20×20×10cm with premium finishes' } },
  { id: '8', slug: 'promo-pen-100', icon: Gift, category: 'marketing', customizable: true, price: 250, currency: 'QAR', ar: { name: 'أقلام دعائية (100 قلم)', desc: '100 قلم حبر بشعار شركتك - طباعة بالليزر على أقلام جودة عالية' }, en: { name: 'Promo Pens (100 pcs)', desc: '100 branded ink pens - laser engraved on premium quality pens' } },
  { id: '9', slug: 'calendar-wall', icon: BookOpen, category: 'stationery', customizable: true, price: 45, currency: 'QAR', ar: { name: 'تقويم حائط مخصص', desc: 'تقويم حائط A3 - 13 صفحة بتصميم وصور مخصصة' }, en: { name: 'Custom Wall Calendar', desc: 'A3 wall calendar - 13 pages with custom design and images' } },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
