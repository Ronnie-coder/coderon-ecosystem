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
    logoUrl: '/images/logos/gifted-tours.webp',
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
    logoUrl: '/images/logos/palmsure.webp',
    logoAlt: 'Palmsure Insurance Brokers logo',
    logoWidth: 120,
    logoHeight: 120,
    // Their review, received Oct 2026.
    quote:
      'Coderon did an exceptional job redesigning our website for Palmsure Insurance Brokers! They seamlessly integrated our client portal link directly into the site, making access effortless for our clients. The team built out clean, structured service pages, set up our basic local SEO to boost our visibility, and ensured all necessary legal documentation was properly integrated to keep the site fully compliant. Their attention to detail, technical skill, and understanding of our industry made the entire process smooth and efficient. Highly recommend Coderon for any web development and digital solutions!',
    authorName: 'Palmsure Insurance Brokers',
    authorRole: 'Insurance brokers, South Africa',
    siteUrl: 'https://www.palmsure.co.za/',
  },
];