import { business } from "./business";
import type { Faq } from "./content/faqs";
import { absoluteUrl, siteUrl } from "./site";

const id = `${siteUrl}/#business`;

/** Sitewide MotorcycleRepair schema. Service-area business: no street address. */
export function businessSchema() {
  const b = business;
  return {
    "@context": "https://schema.org",
    "@type": "MotorcycleRepair",
    "@id": id,
    name: b.name,
    description: `Mobile motorcycle, scooter and quad bike mechanic doing call-outs anywhere in ${b.area.city}, plus weekly delivery scooter rentals.`,
    url: siteUrl,
    telephone: b.phone.e164,
    email: b.email,
    logo: absoluteUrl("/icon-512.png"),
    image: absoluteUrl("/opengraph-image.png"),
    priceRange: "Quote only",
    address: {
      "@type": "PostalAddress",
      addressLocality: b.area.city,
      addressRegion: b.area.region,
      addressCountry: b.area.country,
    },
    areaServed: {
      "@type": "City",
      name: b.area.city,
      containedInPlace: { "@type": "State", name: b.area.region },
    },
    openingHoursSpecification: b.hours.schema.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days.map((d) => `https://schema.org/${d}`),
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: [...b.sameAs],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Repairs and scooter rental",
      itemListElement: [
        ...b.repairs.services.map((s) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.name,
            description: `${s.blurb} All brands of motorcycles, scooters and quad bikes. Quote only.`,
            areaServed: { "@type": "City", name: b.area.city },
          },
        })),
        {
          "@type": "Offer",
          name: `${b.rental.model} scooter rental`,
          url: absoluteUrl("/scooter-rental-bloemfontein"),
          price: String(b.rental.priceWeekly),
          priceCurrency: b.rental.currency,
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: String(b.rental.priceWeekly),
            priceCurrency: b.rental.currency,
            unitCode: "WEE",
            referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "WEE" },
          },
          itemOffered: {
            "@type": "Service",
            name: "Weekly scooter rental",
            description: "Maintenance, servicing and insurance included. Damage or repairs from rider negligence are for the rider's account.",
          },
        },
      ],
    },
    // No aggregateRating until real reviews exist.
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}
