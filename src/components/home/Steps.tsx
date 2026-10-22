const steps = [
  { title: 'Free quote', text: 'Tell us what you need on WhatsApp or the form. We ask a few questions and tell you honestly what would help.' },
  { title: 'One fixed price', text: 'You get a clear scope and one price before any work starts. No surprise invoices.' },
  { title: 'Build and launch', text: 'You see progress every week and give feedback. We move your domain and email safely.' },
  { title: 'We stay around', text: 'Free fixes after launch, then a care plan if you want us to keep looking after it.' },
];

export default function Steps() {
  return (
    <section aria-labelledby="steps-title" className="section" data-snap>
      <div className="container">
        <div className="max-w-2xl" data-reveal>
          <p className="eyebrow">How it works</p>
          <h2 id="steps-title" className="h-section mt-3">
            Simple from the <span className="accent">first</span> message.
          </h2>
        </div>
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="card relative p-6" data-reveal>
              <span className="grid h-12 w-12 place-items-center rounded-full border-2 border-ink bg-gold text-xl font-extrabold text-[#16130E] dark:border-gold">
                {i + 1}
              </span>
              <h3 className="mt-5 text-xl font-extrabold">{s.title}</h3>
              <p className="mt-2 text-ink/75">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
