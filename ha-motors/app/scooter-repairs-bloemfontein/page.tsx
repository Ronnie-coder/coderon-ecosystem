import type { Metadata } from "next";
import Link from "next/link";
import { InlinePhotos, ServicePage } from "@/components/sections/ServicePage";
import { scooterFaqs } from "@/lib/content/faqs";
import { routes } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Scooter Repairs Bloemfontein | Mobile Scooter Mechanic | H A Motors" },
  description:
    "Scooter repairs and services in Bloemfontein. Starting problems, electrical faults, engine work and tyres for all scooter brands. We come to you. WhatsApp for a quote.",
  alternates: { canonical: routes.scooter },
  openGraph: { url: routes.scooter, title: "Scooter Repairs in Bloemfontein | H A Motors" },
};

export default function ScooterRepairsPage() {
  return (
    <ServicePage
      vehicle="scooter"
      path={routes.scooter}
      crumb="Scooter repairs"
      h1={<>Scooter Repairs in Bloemfontein, We Come to You</>}
      intro="From small commuter scooters to 200cc delivery workhorses, all brands. If your scooter won't start, cuts out or is overdue for a service, Adrich comes to you anywhere in Bloem."
      heroPhoto="honda-scooter-finished"
      faqs={scooterFaqs}
      faqTitle="Scooter repair questions"
      ctaTitle="Scooter giving you trouble? WhatsApp Adrich now."
    >
      <h2>Scooters work hard. They need a scooter mechanic who gets it.</h2>
      <p>
        A scooter doing deliveries in Bloemfontein can cover more distance in a month than some cars, mostly in stop-start
        traffic and summer heat. That wears out the parts most riders never see: the drive belt, the clutch and rollers in the
        variator, brake pads and the battery. Catching these early is far cheaper than a breakdown halfway through a shift.
      </p>

      <h2>Common scooter faults we fix</h2>
      <ul>
        <li><strong>Won&apos;t start or hard to start:</strong> weak battery, fouled plug, a blocked carburettor jet or a fuel problem.</li>
        <li><strong>Cuts out or stalls at idle:</strong> often a dirty carburettor, air leak or idle setting.</li>
        <li><strong>Revs but doesn&apos;t pull:</strong> a worn or slipping drive belt, clutch or variator rollers.</li>
        <li><strong>Squealing or grinding brakes:</strong> pads worn down, or discs and drums that need attention.</li>
        <li><strong>Lights, indicators or hooter not working:</strong> a blown fuse, bad earth, broken wire or charging fault.</li>
      </ul>

      <h2>What a scooter service covers</h2>
      <p>
        Every scooter is different, but a service typically includes an oil change, air filter, spark plug, a look at the drive
        belt and transmission, brakes, tyres and pressures, lights and electrics, and a test ride. If your scooter does delivery
        work, it needs servicing more often than one that only pops to the shops, so ask us what makes sense for how you ride.
      </p>

      <h2>Full strip-downs and rebuilds</h2>
      <p>
        Sometimes a scooter needs more than a service. When it does, we strip it right down, fix what&apos;s worn or broken and put
        it back together properly. Here&apos;s one of those jobs in progress:
      </p>
      <InlinePhotos photos={["scooter-stripped", "scooter-reassembly"]} label="Work in progress: scooter repair, step 1 and step 2" />

      <h2>Electrical and engine trouble signs</h2>
      <p>
        Watch for a battery that dies after a few days of standing, dim lights at idle, a starter that clicks without turning, or
        a check light that won&apos;t go off. On the engine side, look for smoke, oil leaks, a rattling noise from the engine or
        drive side, or power that fades when it gets hot. Any of these is worth a WhatsApp before it becomes a breakdown.
      </p>

      <h2>Scooter tyres</h2>
      <p>
        Scooter wheels are small, so the tyres wear quickly and every millimetre of tread matters, especially on wet roads or
        painted lines. Keep them at the right pressure, and replace them before the tread is gone or if you see cracks or bulges.
      </p>

      <h2>How the call-out works</h2>
      <p>
        WhatsApp us the make, model and what&apos;s happening. You&apos;ll get a quote with the call-out included, and then we fix it
        at your place or arrange a drop-off. Need a scooter for work while yours is out? Ask about{" "}
        <Link href={routes.rental}>scooter rental in Bloemfontein</Link>. We also do{" "}
        <Link href={routes.motorcycle}>motorcycle repairs</Link> and <Link href={routes.quad}>quad bike repairs</Link>.
      </p>
    </ServicePage>
  );
}
