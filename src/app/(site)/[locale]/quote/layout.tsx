import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  titleAr: "طلب عرض سعر — مطبعة بلاك بير",
  titleEn: "Request a Quote — BlackBear Print House",
  descriptionAr:
    "اطلب عرض سعر مجاني لخدمات الطباعة والتغليف من مطبعة بلاك بير في قطر. عروض أسعار سريعة ومنافسة للشركات والأفراد في الدوحة",
  descriptionEn:
    "Request a free quote for printing and packaging services from BlackBear Print House in Qatar. Fast and competitive quotes for businesses and individuals in Doha",
  path: "/quote",
  keywords: [
    "عرض سعر طباعة قطر", "طلب تسعيرة مطبعة الدوحة",
    "أسعار طباعة قطر", "عروض مطبعة بلاك بير",
    "printing quote qatar", "print pricing doha",
    "get quote printing qatar", "blackbear print quote",
  ],
});

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
