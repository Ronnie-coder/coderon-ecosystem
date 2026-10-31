import { business } from "@/lib/business";
import { Icon } from "../ui/Icon";
import { Eyebrow, H2, Section } from "../ui/Section";

export function HoursArea({ bg = "muted" }: { bg?: "muted" | "paper" }) {
  return (
    <Section bg={bg} labelledBy="hours-title">
      <Eyebrow>Hours and service area</Eyebrow>
      <H2 id="hours-title">When and where</H2>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <Icon name="clock" className="h-8 w-8 text-brand-green-dark" />
          <h3 className="mt-3 text-2xl font-bold uppercase">Hours</h3>
          <dl className="mt-3 space-y-2">
            <div className="flex flex-wrap justify-between gap-2 border-b border-ink/10 pb-2">
              <dt className="font-semibold">Saturday and Sunday</dt>
              <dd>08:00 to 17:00</dd>
            </div>
            <div className="flex flex-wrap justify-between gap-2">
              <dt className="font-semibold">Monday to Friday</dt>
              <dd>By appointment</dd>
            </div>
          </dl>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <Icon name="area" className="h-8 w-8 text-brand-green-dark" />
          <h3 className="mt-3 text-2xl font-bold uppercase">Service area</h3>
          <p className="mt-3 text-lg font-semibold">Serving all of {business.area.city}.</p>
          <p className="mt-1 text-ink-soft">
            Call-outs anywhere in {business.area.nickname} ({business.area.city}, {business.area.municipality}), or arrange a drop-off.{" "}
            {business.callOutFee}
          </p>
        </div>
      </div>
    </Section>
  );
}
