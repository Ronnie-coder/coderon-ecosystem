/**
 * Single source of truth for every business detail on the site.
 * Pages, schema, footer and forms all read from here. Do not hard-code these anywhere else.
 */

export type VehicleType = "motorcycle" | "scooter" | "quad";

export type Review = {
  name: string;
  text: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  source: string; // e.g. "Google"
};

export type OpeningHours = {
  days: readonly ("Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday")[];
  opens: string; // HH:MM
  closes: string; // HH:MM
};

export const business = {
  name: "H A Motors",
  tagline: "Mobile bike mechanic",
  owner: "Adrich",

  phone: {
    display: "+27 61 104 3739",
    local: "061 104 3739",
    e164: "+27611043739",
    tel: "tel:+27611043739",
    whatsappNumber: "27611043739",
  },

  /** Swap for "adrich@hamotors.co.za" once the domain mailbox exists. */
  email: "haringwiadrich@gmail.com",

  /** Service-area business. Never add a street address. */
  area: {
    city: "Bloemfontein",
    nickname: "Bloem",
    municipality: "Mangaung",
    region: "Free State",
    country: "ZA",
    countryName: "South Africa",
  },

  hours: {
    summary: "Weekends 08:00 to 17:00. Weekdays by appointment.",
    weekend: "Saturday and Sunday, 08:00 to 17:00",
    weekdays: "Monday to Friday, by appointment only",
    schema: [{ days: ["Saturday", "Sunday"], opens: "08:00", closes: "17:00" }] as readonly OpeningHours[],
  },

  callOutFee: "Call-out fee depends on distance, and we include it in your quote upfront.",

  repairs: {
    vehicles: ["motorcycles", "scooters", "quad bikes"],
    brands: "All brands",
    services: [
      {
        key: "service",
        name: "Services and maintenance",
        short: "Services",
        blurb: "Oil, filters, plugs, chains, brakes and a proper once-over so your bike stays reliable.",
      },
      {
        key: "electrical",
        name: "Electrical fault finding and repairs",
        short: "Electrical Faults",
        blurb: "Won't start, no lights, flat battery again? We trace the fault and fix it properly.",
      },
      {
        key: "engine",
        name: "Engine repairs",
        short: "Engine Repairs",
        blurb: "Top-end rebuilds, carburettor rebuilds, seals and gaskets. Done right the first time.",
      },
      {
        key: "tyres",
        name: "Tyres",
        short: "Tyres",
        blurb: "Tyre changes and checks so you grip the road, whether you commute or deliver all day.",
      },
    ],
  },

  rental: {
    fleetSize: 3,
    model: "SYM Jet 14 200cc",
    colour: "white",
    priceWeekly: 550,
    priceDisplay: "R550",
    currency: "ZAR",
    scarcity: "Only 3 scooters, enquire early.",
    included: ["The scooter", "Maintenance", "Servicing", "Insurance"],
    riderResponsibility: [
      "Repairs caused by rider negligence",
      "Damage caused by rider negligence",
    ],
    requirements: ["Valid ID", "Valid driver's licence", "Proof of address"],
    audience: "Delivery riders (food and grocery delivery apps, couriers) and commuters",
    /**
     * TODO: confirm SYM Jet 14 200cc specs with Adrich. Do not invent figures.
     * `null` renders as "To be confirmed" on the rental page.
     */
    specs: [
      { label: "Model", value: "SYM Jet 14" },
      { label: "Engine", value: "200cc" },
      { label: "Colour", value: "White" },
      { label: "Fuel tank", value: null },
      { label: "Seat height", value: null },
      { label: "Under-seat storage", value: null },
    ] as { label: string; value: string | null }[],
  },

  /** From Adrich's own answers (Nov 2026). First person, in Adrich's voice. */
  about: [
    "I'm Adrich, and I've been working on bikes since 2017. I learned the trade in a bike shop, where I worked on a lot of Honda, Big Boy, Suzuki and Lifan bikes.",
    "Engines and electrical faults are what I do best, and nothing beats getting a dead bike running again. If your bike has been standing or someone told you it's not worth fixing, send me a photo.",
    "I started H A Motors out of passion. I want riders in Bloem to get the best service, whether you ride for fun or your bike is how you earn a living, and I want to grow H A Motors into something big, one job done properly at a time.",
    "When I'm not fixing bikes, I'm riding one: a SYM Jet 200.",
  ],

  /** Short facts from Adrich, used around the site. */
  experience: {
    since: 2017,
    background: "Learned the trade working in a bike shop",
    brands: ["Honda", "Big Boy", "Suzuki", "Lifan"],
    strengths: ["Engines", "Electrical faults", "Getting dead bikes running again"],
    rides: "SYM Jet 200",
  },

  /** Real reviews only. Never invent, generate or paraphrase. Leave empty until real ones exist. */
  reviews: [] as Review[],

  /** TODO: paste the Google Business Profile "Ask for reviews" link once the profile is verified. */
  googleReviewUrl: "",

  /** TODO: add the Google Business Profile URL (and any socials) once they exist. */
  sameAs: [] as string[],

  credit: { name: "Coderon", url: "https://coderon.co.za" },
} as const;

export const whatsappBase = `https://wa.me/${business.phone.whatsappNumber}`;
