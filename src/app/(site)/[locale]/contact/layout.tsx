import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  titleAr: "تواصل معنا — مطبعة بلاك بير",
  titleEn: "Contact Us — BlackBear Print House",
  descriptionAr:
    "تواصل مع مطبعة بلاك بير في الدوحة، قطر. اتصل بنا أو أرسل رسالة للحصول على استشارة مجانية حول خدمات الطباعة والتغليف",
  descriptionEn:
    "Contact BlackBear Print House in Doha, Qatar. Call us or send a message for free consultation on printing and packaging services",
  path: "/contact",
  keywords: [
    "تواصل مع مطبعة قطر", "رقم مطبعة الدوحة", "عنوان مطبعة بلاك بير",
    "هاتف مطبعة قطر", "إيميل مطبعة الدوحة",
    "contact printing company qatar", "doha print house phone",
    "blackbear print contact", "printing company address doha",
  ],
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
