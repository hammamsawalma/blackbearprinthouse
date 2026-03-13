import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  titleAr: "إتمام الشراء",
  titleEn: "Checkout",
  descriptionAr: "إتمام الشراء — مطبعة بلاك بير",
  descriptionEn: "Checkout — BlackBear Print House",
  path: "/checkout",
  noIndex: true,
});

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
