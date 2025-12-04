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
    quote: "I was truly amazed. My website is now running smoothly, I'm able to receive emails, and I've got more reach to customers. I would highly recommend Coderon. I was amazed with the work.",
    authorName: 'Gifted Team',
    authorRole: 'Shuttle & Tour Services',
    siteUrl: 'https://www.giftedtours.co.za',
  },
  {
    id: 2,
    logoUrl: '/images/palmsure-logo.png',
    logoAlt: 'Palmsure Logo',
    logoWidth: 150,
    logoHeight: 50,
    quote: 'Coderon led our complete digital transformation, migrating decades of paper-based processes to a robust web platform. It was more than code; it was about honoring a legacy with purpose-driven technology.',
    authorName: 'Palmsure',
    authorRole: 'Insurance Brokers',
    siteUrl: 'https://www.palmsure.co.za/',
  },
  {
    id: 3,
    logoUrl: '/images/md-travels-logo.png',
    logoAlt: 'MD Travels Logo',
    logoWidth: 140,
    logoHeight: 45,
    quote: "We needed more than just a website; we needed a reliable technical partner. Coderon's full-stack expertise delivered a fast, robust platform and continues to provide the critical support we need to grow.",
    authorName: 'MD Travels',
    authorRole: 'Corporate Transport',
    siteUrl: 'https://mdtravels.co.za/',
  },
];