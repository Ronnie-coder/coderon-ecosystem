import Image from 'next/image';
import Link from 'next/link';
import { liveProjects } from '@/data/playroomData';

// Endless ribbon of client logos and names. The first copy is the real, linked list;
// the repeats are decorative (hidden from screen readers, not focusable) so the loop is seamless.
// Pauses on hover; stops when animations are off.
export default function Marquee() {
  const row = (copy: number) => {
    const decorative = copy > 0;
    return (
      <ul
        key={copy}
        aria-hidden={decorative || undefined}
        className="flex shrink-0 items-center gap-6 pr-6 md:gap-10 md:pr-10"
      >
        {liveProjects.map((p) => (
          <li key={p.id} className="flex items-center gap-6 md:gap-10">
            <Link
              href={p.caseStudyUrl || p.liveUrl}
              tabIndex={decorative ? -1 : undefined}
              className="group/item flex items-center gap-3 whitespace-nowrap rounded-full py-1 pl-1 pr-4 transition-colors hover:bg-white/10"
            >
              {p.logo && (
                <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full border-2 border-[#F2C230] bg-[#FFFDF8] p-1.5 transition-transform duration-300 group-hover/item:rotate-[-8deg] group-hover/item:scale-110 md:h-12 md:w-12">
                  <Image src={p.logo} alt="" width={40} height={40} className="h-full w-full object-contain" />
                </span>
              )}
              <span className="font-serif text-2xl italic md:text-3xl">{p.title}</span>
            </Link>
            <span aria-hidden="true" className="text-2xl text-[#F2C230]">✦</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <section aria-label="Clients we have worked with" className="group overflow-hidden border-y-2 border-line bg-[#16130E] py-3 text-[#F2EBDD]">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {[0, 1, 2, 3].map(row)}
      </div>
    </section>
  );
}
