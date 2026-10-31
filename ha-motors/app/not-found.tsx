import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink, WhatsAppButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { routes } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <Container className="max-w-3xl text-center">
        <p className="font-heading text-8xl font-extrabold text-brand-yellow italic">404</p>
        <h1 className="mt-2 text-5xl font-extrabold uppercase sm:text-6xl">This page broke down</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg">
          The page you&apos;re looking for isn&apos;t here. Your bike, on the other hand, we can probably fix.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <WhatsAppButton tone="yellow" className="text-lg">WhatsApp Adrich</WhatsAppButton>
          <ButtonLink href="/" tone="greenOutline" className="text-lg">Back to home</ButtonLink>
        </div>
        <nav aria-label="Popular pages" className="mt-10">
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 font-semibold text-brand-green-dark">
            <li><Link className="underline underline-offset-2" href={routes.motorcycle}>Motorcycle repairs</Link></li>
            <li><Link className="underline underline-offset-2" href={routes.scooter}>Scooter repairs</Link></li>
            <li><Link className="underline underline-offset-2" href={routes.quad}>Quad bike repairs</Link></li>
            <li><Link className="underline underline-offset-2" href={routes.rental}>Scooter rental</Link></li>
            <li><Link className="underline underline-offset-2" href={routes.contact}>Contact</Link></li>
          </ul>
        </nav>
      </Container>
    </section>
  );
}
