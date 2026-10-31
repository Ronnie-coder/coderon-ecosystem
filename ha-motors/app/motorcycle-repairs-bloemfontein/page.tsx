import type { Metadata } from "next";
import Link from "next/link";
import { InlinePhotos, ServicePage } from "@/components/sections/ServicePage";
import { WhatsAppButton } from "@/components/ui/Button";
import { PhotoCard } from "@/components/ui/PhotoCard";
import { motorcycleFaqs } from "@/lib/content/faqs";
import { routes } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Motorcycle Repairs Bloemfontein | Mobile Mechanic | H A Motors" },
  description:
    "Mobile motorcycle repairs and services in Bloemfontein. Electrical faults, carburettor and engine rebuilds, tyres. All brands, we come to you. WhatsApp for a quote.",
  alternates: { canonical: routes.motorcycle },
  openGraph: { url: routes.motorcycle, title: "Motorcycle Repairs in Bloemfontein | H A Motors" },
};

export default function MotorcycleRepairsPage() {
  return (
    <ServicePage
      vehicle="motorcycle"
      path={routes.motorcycle}
      crumb="Motorcycle repairs"
      h1={<>Motorcycle Repairs in Bloemfontein, We Come to You</>}
      intro="Services, electrical faults, engine work and tyres for every make of motorcycle. Adrich does call-outs anywhere in Bloem, so you don't have to push a dead bike anywhere."
      heroPhoto="carburettor-rebuild"
      faqs={motorcycleFaqs}
      faqTitle="Motorcycle repair questions"
      ctaTitle="Bike giving you trouble? WhatsApp Adrich now."
    >
      <h2>A motorbike mechanic who comes to you</h2>
      <p>
        Most motorcycle problems don&apos;t need a trip across town. As a mobile motorcycle mechanic in Bloemfontein, we bring
        the tools to your house, your work or wherever the bike stopped. If the job is bigger than a roadside fix, we&apos;ll
        tell you upfront and arrange a drop-off instead. Either way, the call-out fee depends on distance and is already in
        your quote.
      </p>

      <h2>Motorcycle services</h2>
      <p>
        A good service is the cheapest repair you&apos;ll ever pay for. Depending on the bike and its mileage, a service
        typically covers the engine oil and filter, air filter, spark plugs, chain clean, adjustment and lube, brake pads and
        fluid, cables, lights and a check of the tyres and suspension. We&apos;ll tell you what we found, what can wait and
        what can&apos;t.
      </p>

      <h2>Electrical fault finding</h2>
      <p>
        Electrical faults are the ones that drive riders mad: a battery that keeps going flat, lights that flicker, a bike
        that cranks but won&apos;t fire, or one that dies at a robot and won&apos;t restart. These usually come down to the
        charging system, a tired regulator or stator, a corroded connector or damaged wiring. We trace the actual fault
        instead of throwing parts at it.
      </p>
      <InlinePhotos photos={["motorcycle-wiring-repair"]} />

      <h2>Engine and carburettor repairs</h2>
      <p>
        Signs your engine needs attention: blue smoke, oil where it shouldn&apos;t be, a ticking or knocking top end, loss of
        compression or a bike that runs fine cold and badly hot. We do top-end rebuilds, carburettor rebuilds, and replace
        seals and gaskets. A carburettor that&apos;s been standing with old fuel is one of the most common reasons a bike
        won&apos;t idle or starts and then stalls; a proper strip, clean and rebuild usually sorts it.
      </p>
      <InlinePhotos photos={["cylinder-head-removed", "piston-new-gasket"]} />
      <InlinePhotos photos={["oil-seal-replacement"]} />

      <h2>Motorcycle tyres</h2>
      <p>
        Check your tread and pressures often, especially if you ride every day. Look for cracking on the sidewalls, flat spots
        in the centre from long straight commutes, and anything stuck in the tread. Old rubber goes hard and loses grip even
        when the tread looks fine, and Bloem&apos;s hot summers don&apos;t help. We change and check tyres so you can ride with
        confidence.
      </p>

      <div className="not-prose my-12 grid items-center gap-6 rounded-2xl bg-ink p-6 text-white sm:grid-cols-[1fr_1.2fr] sm:p-8 on-dark">
        <PhotoCard photo="honda-delivery-bike-teardown" sizes="(min-width: 640px) 300px, 85vw" className="w-full" />
        <div>
          <h2 className="font-heading text-3xl font-extrabold uppercase text-brand-yellow">Delivery riders</h2>
          <p className="mt-3 text-white/90">
            When your bike is your income, fast turnaround matters. Every day off the road costs you. Tell us it&apos;s a
            delivery bike and we&apos;ll give you the earliest slot we can. Need wheels while yours is being fixed? We also{" "}
            <Link href={routes.rental} className="font-semibold text-brand-yellow underline underline-offset-2">
              rent delivery scooters from R550 a week
            </Link>
            .
          </p>
          <WhatsAppButton vehicle="motorcycle" tone="yellow" className="mt-5">Get back on the road</WhatsAppButton>
        </div>
      </div>

      <h2>How the call-out works</h2>
      <p>
        WhatsApp the make, model and problem, ideally with a photo or short video. You&apos;ll get a quote with the call-out
        included. Then we either fix it where the bike is or arrange a drop-off. We&apos;re open on weekends, and weekdays are by
        appointment. We also look after{" "}
        <Link href={routes.scooter}>scooters</Link> and <Link href={routes.quad}>quad bikes</Link>.
      </p>
    </ServicePage>
  );
}
