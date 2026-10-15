import { Metadata } from 'next';
import ServicesClient from './ServicesClient';

export const metadata: Metadata = {
  title: 'Services: Website Fixes, New Websites, Care Plans & Custom Software',
  description:
    'Website fixes, new websites with local SEO set-up, monthly website care, and custom software for growing businesses. Clear prices, plain English.',
  alternates: {
    canonical: '/services/',
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}