export default function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://print.blackbear.qa/#organization",
    "name": "مطبعة بلاك بير | BlackBear Print House",
    "alternateName": ["مطبعة بلاك بير", "BlackBear Print House", "مطبعة قطر", "مطابع الدوحة"],
    "description": "أفضل مطبعة في قطر — خدمات طباعة احترافية في الدوحة: طباعة أوفست، ديجيتال، تغليف مخصص، هويات بصرية. BlackBear Print House — Qatar's premier printing company offering professional offset, digital printing, packaging & branding.",
    "url": "https://print.blackbear.qa",
    "logo": "https://print.blackbear.qa/images/logo.png",
    "image": "https://print.blackbear.qa/og-image.png",
    "telephone": "+974-XXXX-XXXX",
    "email": "info@blackbearprint.qa",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "الدوحة",
      "addressLocality": "Doha",
      "addressRegion": "Doha",
      "addressCountry": "QA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 25.2854,
      "longitude": 51.5310
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "Qatar"
      },
      {
        "@type": "City",
        "name": "Doha"
      }
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      "opens": "08:00",
      "closes": "17:00"
    },
    "priceRange": "$$",
    "currenciesAccepted": "QAR",
    "paymentAccepted": "Credit Card, Debit Card, Bank Transfer",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "خدمات الطباعة | Printing Services",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "طباعة | Printing",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "طباعة أوفست | Offset Printing" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "طباعة ديجيتال | Digital Printing" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "طباعة كبيرة الحجم | Large Format Printing" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "طباعة UV | UV Printing" } }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "منتجات تجارية | Commercial Products",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "كروت أعمال | Business Cards" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "بروشورات ومطويات | Brochures & Flyers" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "كتيبات ومجلات | Booklets & Magazines" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "ملصقات وستيكرات | Stickers & Labels" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "بوسترات ولوحات | Posters & Banners" } }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "تغليف | Packaging",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "علب مخصصة | Custom Boxes" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "علب عطور | Perfume Boxes" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "أكياس ورقية | Paper Bags" } }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "تصميم | Design",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "تصميم جرافيك | Graphic Design" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "هوية بصرية | Brand Identity" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "تصميم عبوات | Packaging Design" } }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "لوحات إعلانية | Signage",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "لوحات خارجية | Outdoor Signage" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "رول أب وستاندات | Roll-up & Stands" } }
          ]
        }
      ]
    },
    "sameAs": [
      // Add social media links when available
      // "https://www.instagram.com/blackbearprint",
      // "https://twitter.com/BlackBearPrint",
      // "https://www.linkedin.com/company/blackbear-print-house",
      // "https://www.facebook.com/blackbearprint"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}
