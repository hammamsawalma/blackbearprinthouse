import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://print.blackbear.qa"),
  title: {
    default: "مطبعة بلاك بير | BlackBear Print House",
    template: "%s | مطبعة بلاك بير",
  },
  description: "مطبعة بلاك بير — خدمات طباعة احترافية في الدوحة، قطر",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
