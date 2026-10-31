import type { Metadata } from "next";
import Link from "next/link";
import { InlinePhotos, ServicePage } from "@/components/sections/ServicePage";
import { PhotoCard } from "@/components/ui/PhotoCard";
import { quadFaqs } from "@/lib/content/faqs";
import { routes } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Quad Bike Repairs Bloemfontein | Quad Service | H A Motors" },
  description:
    "Quad bike repairs and services in Bloemfontein. Sport and utility quads, brakes, winches, electrics, engines and tyres. All brands, call-outs available. WhatsApp for a quote.",
  alternates: { canonical: routes.quad },
  openGraph: { url: routes.quad, title: "Quad Bike Repairs in Bloemfontein | H A Motors" },
};

export default function QuadRepairsPage() {
  return (
    <ServicePage
      vehicle="quad"
      path={routes.quad}
      crumb="Quad bike repairs"
      h1={<>Quad Bike Repairs in Bloemfontein, We Come to You</>}
      intro="Sport quads and utility quads, all brands. Brakes, winches, electrics, engines and tyres. A quad is heavy to move, so Adrich brings the tools to you anywhere in Bloem."
      heroPhoto="quad-front-teardown"
      faqs={quadFaqs}
      faqTitle="Quad bike questions"
      ctaTitle="Quad giving you trouble? WhatsApp Adrich now."
    >
      <h2>Quad bike repairs without the trailer</h2>
      <p>
        Getting a quad onto a bakkie or trailer is a mission, especially if it won&apos;t start. That&apos;s why we do call-outs:
        most quad bike services and many repairs can be done where the quad is parked. If it needs a bigger job, we&apos;ll say so
        in the quote and arrange a drop-off.
      </p>

      <h2>Utility quads: brakes, winches and racks</h2>
      <p>
        Utility quads pull, carry and work hard in dust and mud. That&apos;s tough on brakes, wheel bearings, CV boots and the winch.
        If your brakes feel spongy, pull to one side or squeal, or the winch is slow or dead, it&apos;s time for a look. We strip the
        front end, sort out the brakes and winch, and put it back together so it&apos;s ready to work.
      </p>
      <InlinePhotos photos={["utility-quad-workshop"]} />

      <h2>Sport quads</h2>
      <p>
        Sport quads are built for fun, which means they get ridden hard. Keep an eye on the chain and sprockets, air filter (sand
        and dust kill engines), suspension linkages and steering. A rough idle, popping or a loss of top-end power usually points
        to the carburettor, air filter or a top-end that needs attention.
      </p>
      <div className="not-prose my-8 max-w-xs">
        <PhotoCard photo="yamaha-quad" caption sizes="320px" className="w-full" />
      </div>

      <h2>What a quad service covers</h2>
      <p>
        Depending on the quad, a service includes engine oil and filter, air filter clean or replacement, spark plug, chain or
        shaft drive check, brakes front and rear, steering and suspension, tyre condition and pressures, lights, and the winch on
        utility models. Quads that sit for months between rides need attention too: old fuel and flat batteries are the most common
        reasons they won&apos;t start.
      </p>

      <h2>Electrical and engine warning signs</h2>
      <p>
        Battery flat after a few days, a starter that clicks, lights that dim when you rev, or the winch draining everything: those
        are charging or wiring faults. Smoke, oil leaks, overheating or a knocking engine need attention before they turn a repair
        into a rebuild.
      </p>

      <h2>Quad tyres</h2>
      <p>
        Quad tyres run at low pressures, so a small difference between sides changes how the quad steers. Check pressures with a
        low-pressure gauge, look for cuts and punctures from thorns and stones, and replace tyres when the lugs are worn down.
      </p>

      <h2>How it works</h2>
      <p>
        WhatsApp a photo of the quad, the make and model, the problem, and where it is. You&apos;ll get a quote with the call-out
        included. We also do <Link href={routes.motorcycle}>motorcycle repairs</Link>,{" "}
        <Link href={routes.scooter}>scooter repairs</Link> and <Link href={routes.rental}>scooter rental</Link> in Bloemfontein.
      </p>
    </ServicePage>
  );
}
