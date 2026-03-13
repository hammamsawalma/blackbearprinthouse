import type { Metadata } from "next";

const SITE_URL = "https://print.blackbear.qa";
const OG_IMAGE = "/og-image.png";

/**
 * Helper to create per-page metadata with OpenGraph & Twitter Card tags.
 * All pages inherit the base metadata from the locale layout; this merges page-specific overrides.
 */
export function createPageMetadata({
  titleAr,
  titleEn,
  descriptionAr,
  descriptionEn,
  path,
  keywords = [],
  noIndex = false,
}: {
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
}): Metadata {
  const fullTitle = `${titleAr} | ${titleEn}`;
  const fullDescription = `${descriptionAr}. ${descriptionEn}`;

  return {
    title: fullTitle,
    description: fullDescription,
    keywords,
    alternates: {
      canonical: path,
      languages: {
        ar: `/ar${path}`,
        en: `/en${path}`,
      },
    },
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url: `${SITE_URL}${path}`,
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${titleAr} — ${titleEn}`,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: descriptionAr,
      images: [OG_IMAGE],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
