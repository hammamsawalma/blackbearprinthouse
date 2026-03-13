import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  titleAr: "أعمالنا — بورتفوليو مطبعة بلاك بير",
  titleEn: "Our Work — BlackBear Print House Portfolio",
  descriptionAr:
    "تصفح أعمالنا المميزة في الطباعة والتغليف وتصميم الهويات البصرية. مشاريع لشركات ومؤسسات رائدة في قطر والخليج",
  descriptionEn:
    "Browse our featured work in printing, packaging, and brand identity design. Projects for leading companies and institutions across Qatar and the Gulf",
  path: "/portfolio",
  keywords: [
    "أعمال مطبعة قطر", "بورتفوليو طباعة الدوحة",
    "مشاريع طباعة قطر", "نماذج أعمال مطبعة بلاك بير",
    "printing portfolio qatar", "print house work doha",
    "printing projects qatar", "blackbear portfolio",
  ],
});

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
