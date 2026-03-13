import type { Metadata } from "next";
import { Inter, Playfair_Display, Noto_Kufi_Arabic } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import JsonLd from "@/components/seo/JsonLd";
import "@/styles/globals.css";

/* ─── Font Loading ─── */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-kufi",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

/* ─── Generate static params for locales ─── */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/* ─── Metadata ─── */
export const metadata: Metadata = {
  title: {
    default: "مطبعة بلاك بير | BlackBear Print House — مطبعة قطر",
    template: "%s | مطبعة بلاك بير — BlackBear Print House",
  },
  description:
    "مطبعة بلاك بير — أفضل مطبعة في قطر. خدمات طباعة احترافية في الدوحة: طباعة أوفست، ديجيتال، تغليف مخصص، هويات بصرية، كروت أعمال، بروشورات، لوحات إعلانية. BlackBear Print House — Qatar's premier printing company. Professional offset, digital printing, custom packaging & branding in Doha.",
  keywords: [
    /* ── Arabic Keywords ── */
    "مطبعة قطر", "مطبعة الدوحة", "مطابع قطر", "مطابع الدوحة",
    "مطبعة بلاك بير", "طباعة قطر", "طباعة الدوحة",
    "طباعة أوفست قطر", "طباعة ديجيتال قطر", "طباعة كبيرة الحجم قطر",
    "كروت أعمال قطر", "كروت أعمال الدوحة", "بروشورات قطر",
    "تغليف مخصص قطر", "علب مخصصة الدوحة", "أكياس ورقية قطر",
    "هوية بصرية قطر", "تصميم جرافيك الدوحة",
    "لوحات إعلانية قطر", "ستيكرات الدوحة", "طباعة ملصقات قطر",
    "كروت زفاف قطر", "دعوات أعراس الدوحة",
    "طباعة كتالوجات قطر", "طباعة مجلات الدوحة",
    /* ── English Keywords ── */
    "printing qatar", "print house qatar", "printing company qatar",
    "print house doha", "printing services doha", "printing company doha",
    "blackbear print house", "blackbear printing qatar",
    "offset printing qatar", "digital printing qatar", "large format printing doha",
    "business cards qatar", "business cards doha", "brochure printing qatar",
    "custom packaging qatar", "custom boxes doha", "paper bags qatar",
    "brand identity qatar", "graphic design doha",
    "signage qatar", "stickers doha", "poster printing qatar",
    "wedding cards qatar", "invitation printing doha",
    "catalog printing qatar", "booklet printing doha",
  ],
  authors: [{ name: "BlackBear Print House" }],
  creator: "BlackBear Print House",
  publisher: "BlackBear Print House",
  alternates: {
    canonical: "/",
    languages: {
      "ar": "/ar",
      "en": "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_QA",
    alternateLocale: "en_US",
    url: "https://print.blackbear.qa",
    siteName: "مطبعة بلاك بير | BlackBear Print House",
    title: "مطبعة بلاك بير | BlackBear Print House — أفضل مطبعة في قطر",
    description:
      "خدمات طباعة احترافية في الدوحة، قطر — طباعة أوفست، ديجيتال، تغليف مخصص، هويات بصرية، كروت أعمال، بروشورات. Professional printing in Doha, Qatar.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "مطبعة بلاك بير — BlackBear Print House | مطبعة قطر",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@BlackBearPrint",
    creator: "@BlackBearPrint",
    title: "مطبعة بلاك بير | BlackBear Print House",
    description:
      "أفضل مطبعة في قطر — طباعة أوفست، ديجيتال، تغليف، هويات بصرية. Professional printing services in Doha, Qatar.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE",
  },
};

/* ─── Localized Layout ─── */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as "ar" | "en")) {
    notFound();
  }

  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${inter.variable} ${playfair.variable} ${notoKufiArabic.variable}`}
    >
      <body>
        <JsonLd />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
