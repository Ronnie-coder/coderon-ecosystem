import type { VehicleType } from "@/lib/business";
import { CallButton, WhatsAppButton } from "../ui/Button";
import { Container } from "../ui/Section";

export function CtaBand({
  title = "Bike giving you trouble? WhatsApp Adrich now.",
  text = "Send a photo and a quick description. You'll get a quote with the call-out included.",
  intent = "repair",
  vehicle,
  buttonLabel,
}: {
  title?: string;
  text?: string;
  intent?: "repair" | "rental";
  vehicle?: VehicleType;
  buttonLabel?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="on-dark relative overflow-hidden bg-ink py-16 text-white sm:py-20">
      <div aria-hidden="true" className="stripe-bg absolute -top-10 -right-24 h-40 w-96 rotate-6 opacity-90" />
      <Container className="relative">
        <h2 id="cta-title" className="max-w-3xl text-4xl font-extrabold uppercase sm:text-6xl">{title}</h2>
        <p className="mt-4 max-w-2xl text-lg text-white/85">{text}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <WhatsAppButton intent={intent} vehicle={vehicle} tone="yellow" className="text-lg">
            {buttonLabel ?? (intent === "rental" ? "Check availability on WhatsApp" : "Get a Quote on WhatsApp")}
          </WhatsAppButton>
          <CallButton intent={intent} tone="whiteOutline" />
        </div>
      </Container>
    </section>
  );
}
