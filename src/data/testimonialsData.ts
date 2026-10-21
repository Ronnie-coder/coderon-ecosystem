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
  // Palmsure: add their real review here when it arrives (no placeholder quotes on the live site).
];