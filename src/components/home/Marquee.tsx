import { liveProjects } from '@/data/playroomData';

// Endless ribbon of client names. The list is doubled so the loop is seamless;
// the copy is hidden from screen readers. Pauses on hover; stops when animations are off.
export default function Marquee() {
  const items = liveProjects.map((p) => `${p.title}`);
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-10 pr-10">
      {items.map((name) => (
        <li key={name} className="flex items-center gap-10 whitespace-nowrap">
          <span className="font-serif text-2xl italic md:text-3xl">{name}</span>
          <span aria-hidden="true" className="text-2xl text-[#F2C230]">✦</span>
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label="Clients we have worked with" className="group overflow-hidden border-y-2 border-line bg-[#16130E] py-4 text-[#F2EBDD]">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
        {row(true)}
        {row(true)}
      </div>
    </section>
  );
}
