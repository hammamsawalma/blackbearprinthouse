import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  titleAr: "من نحن — مطبعة بلاك بير",
  titleEn: "About Us — BlackBear Print House",
  descriptionAr:
    "تعرّف على مطبعة بلاك بير — خبرة تمتد لسنوات في مجال الطباعة والتغليف في قطر. فريق متخصص من المبدعين في الدوحة يحوّل أفكارك إلى واقع مطبوع",
  descriptionEn:
    "Learn about BlackBear Print House — Years of experience in printing and packaging in Qatar. A specialized creative team in Doha transforming your ideas into printed reality",
  path: "/about",
  keywords: [
    "من نحن مطبعة بلاك بير", "عن المطبعة", "مطبعة قطر رائدة",
    "فريق الطباعة الدوحة", "خبرة الطباعة قطر",
    "about blackbear print house", "printing company story qatar",
    "doha printing team", "qatar printing expertise",
  ],
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
