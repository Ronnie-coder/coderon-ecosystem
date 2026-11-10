import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { PageHero } from "@/components/sections/PageHero";
import { WhatsAppButton } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { readyPhotos, workPhotoKeys, type PhotoKey } from "@/lib/photos";
import { routes } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Gallery | Motorcycle & Scooter Repairs in Bloemfontein | H A Motors" },
  description:
    "Real photos of H A Motors repair work in Bloemfontein: carburettor rebuilds, engine and electrical repairs, scooter rebuilds, quad bikes and our SYM rental scooters.",
  alternates: { canonical: routes.gallery },
  openGraph: { url: routes.gallery, title: "Gallery of real repair work | H A Motors" },
};

const rentalKeys: PhotoKey[] = ["sym-jet14-front", "sym-jet14-side"];

export default function GalleryPage() {
  const photos = readyPhotos([...workPhotoKeys, ...rentalKeys]);
  return (
    <>
      <PageHero
        crumbs={[{ name: "Gallery", path: routes.gallery }]}
        eyebrow="Real jobs, real bikes"
        title={
          <>
            Our work in <span className="text-brand-yellow">photos</span>
          </>
        }
        intro={<p>Every photo is from an actual job. Filter by vehicle, and tap any photo to see it bigger.</p>}
        actions={<WhatsAppButton tone="yellow" className="text-lg">Get a Quote on WhatsApp</WhatsAppButton>}
      />
      <Section bg="paper" labelledBy="gallery-title">
        <h2 id="gallery-title" className="sr-only">
          Photo gallery
        </h2>
        <GalleryGrid photos={photos} filters />
      </Section>
      <CtaBand title="Want your bike to be next? WhatsApp Adrich." />
    </>
  );
}
