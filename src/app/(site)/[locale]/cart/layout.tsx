import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  titleAr: "سلة المشتريات",
  titleEn: "Shopping Cart",
  descriptionAr: "سلة مشتريات مطبعة بلاك بير",
  descriptionEn: "BlackBear Print House shopping cart",
  path: "/cart",
  noIndex: true,
});

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
