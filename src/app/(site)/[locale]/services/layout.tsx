import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  titleAr: "خدماتنا — مطبعة بلاك بير",
  titleEn: "Our Services — BlackBear Print House",
  descriptionAr:
    "خدمات طباعة شاملة في قطر: طباعة أوفست، ديجيتال، تغليف مخصص، كروت أعمال، بروشورات، لوحات إعلانية، هوية بصرية، كروت زفاف ودعوات. أفضل مطبعة في الدوحة",
  descriptionEn:
    "Comprehensive printing services in Qatar: offset, digital, custom packaging, business cards, brochures, signage, brand identity, wedding cards. Best print house in Doha",
  path: "/services",
  keywords: [
    "خدمات طباعة قطر", "خدمات مطبعة الدوحة", "طباعة أوفست قطر",
    "طباعة ديجيتال الدوحة", "تغليف مخصص قطر", "كروت أعمال قطر",
    "بروشورات قطر", "لوحات إعلانية الدوحة", "هوية بصرية قطر",
    "printing services qatar", "offset printing doha",
    "digital printing qatar", "business cards qatar", "brochures qatar",
    "custom packaging doha", "brand identity qatar", "signage qatar",
  ],
});

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
