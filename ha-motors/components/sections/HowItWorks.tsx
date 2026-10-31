import { Eyebrow, H2, Section } from "../ui/Section";

const steps = [
  { title: "WhatsApp us", text: "Send a photo or describe the problem. Make and model helps." },
  { title: "Get your quote", text: "A clear quote with the call-out fee already included. No surprises." },
  { title: "We fix it", text: "At your place, anywhere in Bloemfontein, or arrange a drop-off." },
];

export function HowItWorks() {
  return (
    <Section bg="paper" labelledBy="how-title">
      <Eyebrow>How it works</Eyebrow>
      <H2 id="how-title">Three steps. That&apos;s it.</H2>
      <ol className="mt-10 grid gap-5 md:grid-cols-3">
        {steps.map((s, i) => (
          <li key={s.title} className="relative rounded-2xl border-2 border-ink/10 bg-white p-6">
            <span aria-hidden="true" className="font-heading text-7xl leading-none font-extrabold text-brand-yellow italic">
              {i + 1}
            </span>
            <h3 className="mt-2 text-2xl font-bold uppercase">
              <span className="sr-only">Step {i + 1}: </span>
              {s.title}
            </h3>
            <p className="mt-2 text-ink-soft">{s.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
