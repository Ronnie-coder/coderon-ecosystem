import { business } from "@/lib/business";
import { Icon } from "../ui/Icon";

/** Call-out vs drop-off, explained in plain words. */
export function CallOutExplainer() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div data-reveal className="rounded-2xl border-2 border-brand-green-dark bg-white p-6">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-green-dark text-white">
          <Icon name="van" className="h-6 w-6" />
        </span>
        <h3 className="mt-4 text-2xl font-bold uppercase">Call-out: we come to you</h3>
        <p className="mt-2 text-ink-soft">
          At home, at work or where you broke down, anywhere in {business.area.city}. Most services and many repairs are done
          on the spot.
        </p>
        <p className="mt-3 flex items-start gap-2 font-semibold">
          <Icon name="tag" className="mt-0.5 h-5 w-5 shrink-0 text-brand-green-dark" />
          {business.callOutFee}
        </p>
      </div>
      <div data-reveal data-reveal-delay="100" className="rounded-2xl border-2 border-ink/15 bg-white p-6">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-yellow text-ink">
          <Icon name="home" className="h-6 w-6" />
        </span>
        <h3 className="mt-4 text-2xl font-bold uppercase">Drop-off</h3>
        <p className="mt-2 text-ink-soft">
          Prefer to bring it in, or is it a bigger job like an engine rebuild? We&apos;ll arrange a drop-off time that suits you.
          We&apos;ll share the drop-off details when you book.
        </p>
      </div>
    </div>
  );
}
