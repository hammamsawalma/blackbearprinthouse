import type { Metadata } from "next";
import { Inter, Playfair_Display, Noto_Kufi_Arabic } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Poster Generator",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PostersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${inter.variable} ${playfair.variable} ${notoKufiArabic.variable}`}
    >
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#000",
          color: "#fff",
          overflow: "hidden",
          width: "100vw",
          height: "100vh",
        }}
      >
        <main
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            backgroundColor: "#0A0A0B",
            overflow: "hidden",
          }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
