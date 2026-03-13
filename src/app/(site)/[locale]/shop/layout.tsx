import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  titleAr: "المتجر — اطلب طباعتك أونلاين",
  titleEn: "Shop — Order Prints Online",
  descriptionAr:
    "اطلب منتجاتك المطبوعة أونلاين من مطبعة بلاك بير في قطر — كروت أعمال، ستيكرات، بروشورات، بوسترات، أكياس ورقية بأسعار تنافسية وجودة عالية",
  descriptionEn:
    "Order your printed products online from BlackBear Print House in Qatar — business cards, stickers, brochures, posters, paper bags at competitive prices with premium quality",
  path: "/shop",
  keywords: [
    "شراء مطبوعات أونلاين قطر", "طلب طباعة أونلاين الدوحة",
    "كروت أعمال أونلاين قطر", "ستيكرات أونلاين قطر",
    "أسعار طباعة قطر", "متجر مطبعة الدوحة",
    "order prints online qatar", "buy business cards online doha",
    "online printing qatar", "printing shop doha",
    "sticker printing online qatar", "brochure order qatar",
  ],
});

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
