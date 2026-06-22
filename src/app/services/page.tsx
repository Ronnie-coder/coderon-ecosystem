import { Metadata } from 'next';
import ServicesClient from './ServicesClient';

export const metadata: Metadata = {
  title: 'Services',
  description: "Driving the digital future with a suite of robust, modern technology solutions.",
  alternates: {
    canonical: '/services',
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}