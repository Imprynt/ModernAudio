import { SITE_CONFIG } from "@/config/site";

export default function StructuredData() {
  const siteUrl = SITE_CONFIG.url;

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: SITE_CONFIG.name,
    alternateName: [SITE_CONFIG.shortName, SITE_CONFIG.acronym],
    url: siteUrl,
    description: SITE_CONFIG.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: "Delhi",
      postalCode: SITE_CONFIG.address.postalCode,
      addressCountry: "IN",
    },
    ...(SITE_CONFIG.contact.email
      ? {
          contactPoint: {
            "@type": "ContactPoint",
            email: SITE_CONFIG.contact.email,
            contactType: "sales and customer support",
            areaServed: ["Delhi", "NCR", "Pan India"],
            availableLanguage: ["English", "Hindi"],
          },
        }
      : {}),
  };

  const socialUrls = Object.values(SITE_CONFIG.unconfirmed.socials).filter(
    (url): url is string => Boolean(url && url.trim().length > 0)
  );

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#localbusiness`,
    name: SITE_CONFIG.name,
    legalName: SITE_CONFIG.name,
    alternateName: SITE_CONFIG.shortName,
    url: siteUrl,
    image: `${siteUrl}/images/og-image.jpg`,
    description:
      "Commercial, institutional, and hospitality audio system planning, equipment supply, and setup coordination headquartered at Chandni Chowk, Delhi.",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: "Delhi",
      postalCode: SITE_CONFIG.address.postalCode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE_CONFIG.address.geo.latitude,
      longitude: SITE_CONFIG.address.geo.longitude,
    },
    hasMap: SITE_CONFIG.address.mapsUrl,
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: "Delhi",
      },
      {
        "@type": "AdministrativeArea",
        name: "NCR",
      },
      {
        "@type": "Country",
        name: "India",
      },
    ],
    priceRange: "$$",
    telephone: [SITE_CONFIG.contact.phone, SITE_CONFIG.contact.secondaryPhone],
    ...(SITE_CONFIG.contact.email ? { email: SITE_CONFIG.contact.email } : {}),
    ...(SITE_CONFIG.unconfirmed.openingHours
      ? { openingHours: SITE_CONFIG.unconfirmed.openingHours }
      : {}),
    ...(socialUrls.length > 0 ? { sameAs: socialUrls } : {}),
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: SITE_CONFIG.shortName,
    url: siteUrl,
    description: SITE_CONFIG.tagline,
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: SITE_CONFIG.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
