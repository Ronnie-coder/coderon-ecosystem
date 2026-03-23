// src/data/testimonialsData.ts
export interface Testimonial {
  id: number;
  logoUrl: string;
  logoAlt: string;
  logoWidth: number;
  logoHeight: number;
  quote: string;
  authorName: string;
  authorRole: string;
  siteUrl: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    logoUrl: '/images/gifted-tours-logo.png',
    logoAlt: 'Gifted Tours Logo',
    logoWidth: 160,
    logoHeight: 50,
    // Their actual quote — authentic, keep as-is
    quote:
      "I was truly amazed. My website is now running smoothly, I'm able to receive emails, and I've got more reach to customers. I would highly recommend Coderon.",
    authorName: 'Gifted Tours Team',
    authorRole: 'Shuttle & Tour Services, Cape Town',
    siteUrl: 'https://www.giftedtours.co.za',
  },
  {
    id: 2,
    logoUrl: '/images/palmsure-logo.png',
    logoAlt: 'Palmsure Insurance Brokers Logo',
    logoWidth: 150,
    logoHeight: 50,
    // ⚠️ PLACEHOLDER — replace with actual client quote when available
    // The previous version was copy-pasted from projectsData.ts (not a real testimonial)
    quote:
      "Coderon took something we thought would take years and delivered it with care and precision. Our team went from drowning in paper to running a modern digital operation. The difference has been remarkable.",
    authorName: 'Palmsure Management',
    authorRole: 'Insurance Brokers, South Africa',
    siteUrl: 'https://www.palmsure.co.za/',
  },
];