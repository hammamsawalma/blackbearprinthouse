import {
  Printer,
  Zap,
  Package,
  PenTool,
  CreditCard,
  Image,
  Layers,
  Award,
  Gift,
  BookOpen,
  FileText,
  Stamp,
  Flag,
  ShieldCheck,
  Palette,
  Box,
  Tag,
  Sticker,
  Calendar,
  Trophy,
  Megaphone,
  type LucideIcon,
} from 'lucide-react';

export interface Service {
  slug: string;
  icon: LucideIcon;
  ar: {
    name: string;
    shortDesc: string;
    description: string;
  };
  en: {
    name: string;
    shortDesc: string;
    description: string;
  };
  category: 'printing' | 'packaging' | 'design' | 'signage' | 'events' | 'products';
}

export const serviceCategories = {
  printing: { ar: 'طباعة', en: 'Printing' },
  packaging: { ar: 'تغليف', en: 'Packaging' },
  design: { ar: 'تصميم', en: 'Design' },
  signage: { ar: 'لوحات', en: 'Signage' },
  events: { ar: 'مناسبات', en: 'Events' },
  products: { ar: 'منتجات', en: 'Products' },
};

export const services: Service[] = [
  {
    slug: 'offset-printing',
    icon: Printer,
    category: 'printing',
    ar: { name: 'طباعة أوفست', shortDesc: 'طباعة عالية الجودة للكميات الكبيرة', description: 'خدمة الطباعة الأوفست لدينا توفر جودة استثنائية للمشاريع ذات الكميات الكبيرة. نستخدم أحدث ماكينات الأوفست لضمان ألوان دقيقة وتفاصيل واضحة على مختلف أنواع الورق والأحجام.' },
    en: { name: 'Offset Printing', shortDesc: 'High-quality printing for large quantities', description: 'Our offset printing service delivers exceptional quality for high-volume projects. We use state-of-the-art offset machines to ensure accurate colors and sharp details across various paper types and sizes.' },
  },
  {
    slug: 'digital-printing',
    icon: Zap,
    category: 'printing',
    ar: { name: 'طباعة ديجيتال', shortDesc: 'طباعة سريعة ومرنة للكميات الصغيرة', description: 'الطباعة الرقمية المثالية للطلبات العاجلة والكميات المحدودة. نتائج احترافية بسرعة فائقة مع إمكانية تخصيص كل نسخة.' },
    en: { name: 'Digital Printing', shortDesc: 'Fast and flexible for small runs', description: 'Perfect digital printing for urgent orders and limited quantities. Professional results with incredible speed and the ability to customize each copy.' },
  },
  {
    slug: 'business-cards',
    icon: CreditCard,
    category: 'products',
    ar: { name: 'كروت أعمال', shortDesc: 'كروت أعمال أنيقة تترك انطباعاً', description: 'كروت أعمال احترافية بتصاميم عصرية وخامات فاخرة. متوفرة بخيارات متعددة: لمعان، مات، فويل ذهبي/فضي، بارز، وأكثر.' },
    en: { name: 'Business Cards', shortDesc: 'Elegant cards that make an impression', description: 'Professional business cards with modern designs and premium materials. Available in multiple finishes: glossy, matte, gold/silver foil, embossed, and more.' },
  },
  {
    slug: 'brochures-flyers',
    icon: Layers,
    category: 'products',
    ar: { name: 'بروشورات ومطويات', shortDesc: 'بروشورات بتصاميم جذابة ومؤثرة', description: 'بروشورات ومطويات بأحجام وطيات متنوعة. تصميم وطباعة احترافية لعرض خدماتك ومنتجاتك بأفضل صورة.' },
    en: { name: 'Brochures & Flyers', shortDesc: 'Brochures with attractive designs', description: 'Brochures and flyers in various sizes and folds. Professional design and printing to showcase your services and products in the best light.' },
  },
  {
    slug: 'packaging-boxes',
    icon: Package,
    category: 'packaging',
    ar: { name: 'علب وتغليف', shortDesc: 'علب مخصصة وتغليف احترافي', description: 'تصميم وإنتاج علب مخصصة لمنتجاتك. من علب الكرتون البسيطة إلى علب الهدايا الفاخرة مع طباعة عالية الجودة وتشطيبات متميزة.' },
    en: { name: 'Packaging & Boxes', shortDesc: 'Custom boxes and professional packaging', description: 'Design and production of custom boxes for your products. From simple cardboard boxes to luxury gift boxes with high-quality printing and premium finishes.' },
  },
  {
    slug: 'graphic-design',
    icon: PenTool,
    category: 'design',
    ar: { name: 'تصميم جرافيك', shortDesc: 'تصميم هويات بصرية ومواد تسويقية', description: 'فريق تصميم محترف يقدم حلولاً إبداعية لهويتك البصرية، شعارات، مواد تسويقية، ومحتوى رقمي يعكس علامتك التجارية.' },
    en: { name: 'Graphic Design', shortDesc: 'Brand identity and marketing materials', description: 'A professional design team providing creative solutions for your visual identity, logos, marketing materials, and digital content that reflects your brand.' },
  },
  {
    slug: 'signage',
    icon: Image,
    category: 'signage',
    ar: { name: 'لوحات إعلانية', shortDesc: 'لوحات خارجية وداخلية بتقنيات حديثة', description: 'لوحات إعلانية داخلية وخارجية بأحجام مختلفة. رول أب، ستاندات، لوحات مضيئة، فينيل، وأكثر.' },
    en: { name: 'Signage & Banners', shortDesc: 'Indoor and outdoor signage', description: 'Indoor and outdoor advertising signage in various sizes. Roll-ups, stands, illuminated signs, vinyl, and more.' },
  },
  {
    slug: 'invitations',
    icon: Award,
    category: 'events',
    ar: { name: 'دعوات ومناسبات', shortDesc: 'كروت دعوة لجميع المناسبات', description: 'كروت دعوة فاخرة لحفلات الزفاف، أعياد الميلاد، المناسبات الرسمية وغيرها. تصاميم حصرية مع خامات فاخرة وتشطيبات مميزة.' },
    en: { name: 'Invitations & Events', shortDesc: 'Invitation cards for all occasions', description: 'Luxury invitation cards for weddings, birthdays, official events, and more. Exclusive designs with premium materials and distinctive finishes.' },
  },
  {
    slug: 'catalogs',
    icon: BookOpen,
    category: 'products',
    ar: { name: 'كتالوجات', shortDesc: 'كتالوجات منتجات احترافية', description: 'تصميم وطباعة كتالوجات منتجات بجودة عالية. عرض منتجاتك وخدماتك بطريقة احترافية وجذابة.' },
    en: { name: 'Catalogs', shortDesc: 'Professional product catalogs', description: 'Design and print high-quality product catalogs. Showcase your products and services in a professional and attractive way.' },
  },
  {
    slug: 'letterheads-envelopes',
    icon: FileText,
    category: 'products',
    ar: { name: 'ورق رسمي وأظرف', shortDesc: 'هوية مؤسسية متكاملة للمراسلات', description: 'ورق رسمي وأظرف مطبوعة بهويتك البصرية. نوفر جميع مستلزمات المراسلات الرسمية بجودة عالية.' },
    en: { name: 'Letterheads & Envelopes', shortDesc: 'Complete corporate stationery', description: 'Letterheads and envelopes printed with your brand identity. We provide all official correspondence supplies in high quality.' },
  },
  {
    slug: 'stamps',
    icon: Stamp,
    category: 'products',
    ar: { name: 'أختام', shortDesc: 'أختام رسمية وشخصية', description: 'أختام بأنواعها: مطاطية، ذاتية الحبر، خشبية. تصميم وتنفيذ أختام رسمية للشركات والمؤسسات.' },
    en: { name: 'Stamps', shortDesc: 'Official and personal stamps', description: 'All types of stamps: rubber, self-inking, wooden. Design and production of official stamps for companies and organizations.' },
  },
  {
    slug: 'flags-banners',
    icon: Flag,
    category: 'signage',
    ar: { name: 'أعلام ورايات', shortDesc: 'أعلام مخصصة للفعاليات والشركات', description: 'طباعة أعلام ورايات مخصصة بألوان زاهية ومقاومة للعوامل الجوية. مثالية للفعاليات والمعارض والديكور.' },
    en: { name: 'Flags & Banners', shortDesc: 'Custom flags for events and companies', description: 'Print custom flags and banners with vibrant, weather-resistant colors. Perfect for events, exhibitions, and decoration.' },
  },
  {
    slug: 'stickers-labels',
    icon: Tag,
    category: 'products',
    ar: { name: 'ملصقات وليبلات', shortDesc: 'ملصقات مخصصة لجميع الاستخدامات', description: 'ملصقات وليبلات بأحجام وأشكال مخصصة. مقاومة للماء والحرارة، مثالية للمنتجات والتغليف.' },
    en: { name: 'Stickers & Labels', shortDesc: 'Custom stickers for all uses', description: 'Custom stickers and labels in various sizes and shapes. Water and heat resistant, perfect for products and packaging.' },
  },
  {
    slug: 'gift-items',
    icon: Gift,
    category: 'events',
    ar: { name: 'هدايا دعائية', shortDesc: 'هدايا مخصصة بشعار شركتك', description: 'مجموعة واسعة من الهدايا الدعائية المخصصة: أقلام، أكواب، دفاتر، حقائب، وأكثر. جميعها مطبوعة بشعارك وألوانك.' },
    en: { name: 'Promotional Gifts', shortDesc: 'Custom gifts with your company logo', description: 'Wide range of custom promotional gifts: pens, mugs, notebooks, bags, and more. All printed with your logo and brand colors.' },
  },
  {
    slug: 'large-format',
    icon: Megaphone,
    category: 'signage',
    ar: { name: 'طباعة كبيرة الحجم', shortDesc: 'طباعة بانرات وملصقات عملاقة', description: 'طباعة كبيرة الحجم للبانرات والملصقات العملاقة والديكورات. جودة عالية مع ألوان زاهية تدوم طويلاً.' },
    en: { name: 'Large Format Printing', shortDesc: 'Large banners and giant posters', description: 'Large format printing for banners, giant posters, and decorations. High quality with vibrant, long-lasting colors.' },
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServicesByCategory(category: Service['category']): Service[] {
  return services.filter((s) => s.category === category);
}
