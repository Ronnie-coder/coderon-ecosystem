// A section breaker: a line that draws out from the Coderon mark when it scrolls into view.
export default function SectionBreak() {
  return (
    <div aria-hidden="true" className="container" data-reveal>
      <div className="section-break flex items-center gap-5 py-2">
        <span className="section-break__line h-[2px] flex-1 origin-right bg-line/25" />
        <span className="grid h-12 w-12 place-items-center rounded-full border-2 border-line bg-card text-[var(--logo-accent)] transition-transform duration-700 [.is-revealed_&]:rotate-[360deg]">
          <svg viewBox="10 10 44 44" className="h-6 w-6">
            <path d="M44.5 21.5 A16 16 0 1 0 44.5 42.5" fill="none" stroke="currentColor" strokeWidth={7} strokeLinecap="round" />
            <rect x="43" y="28" width="7" height="8" rx="1.5" fill="currentColor" />
          </svg>
        </span>
        <span className="section-break__line h-[2px] flex-1 origin-left bg-line/25" />
      </div>
    </div>
  );
}
