"use client";

// Recent work: rotates through every project (not just one), every 6 seconds.
// Pauses on hover/focus and has a pause button (WCAG 2.2.2). No autoplay when animations are off.
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { FiArrowLeft, FiArrowRight, FiPause, FiPlay } from 'react-icons/fi';
import BrowserFrame from '@/components/ui/BrowserFrame';
import CountUp from '@/components/ui/CountUp';
import { liveProjects } from '@/data/playroomData';
import { useTheme } from '@/contexts/ThemeContext';

const INTERVAL = 6000;

export default function WorkShowcase() {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [paused, setPaused] = useState(false);
  const { motion } = useTheme();
  const total = liveProjects.length;
  const project = liveProjects[index];
  const autoplay = motion !== 'reduce' && !paused && !hovered;

  const go = useCallback((dir: 1 | -1) => setIndex((i) => (i + dir + total) % total), [total]);

  useEffect(() => {
    if (!autoplay) return;
    const id = setTimeout(() => go(1), INTERVAL);
    return () => clearTimeout(id);
  }, [autoplay, index, go]);

  return (
    <section aria-labelledby="work-title" className="section" data-snap>
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-6" data-reveal>
          <div>
            <p className="eyebrow">Recent work</p>
            <h2 id="work-title" className="h-section mt-3">
              Real businesses, <span className="accent">real</span> websites.
            </h2>
          </div>
          <Link href="/playroom/" className="btn-ghost">
            See all our work <FiArrowRight aria-hidden="true" />
          </Link>
        </div>

        <div
          className="mt-10 grid gap-6 lg:grid-cols-[1.7fr_1fr]"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
          data-reveal
        >
          {/* Screenshot */}
          <div className="card-pop relative p-4 md:p-5" aria-roledescription="carousel" aria-label="Projects">
            <div className="mb-4 flex items-center justify-between gap-3">
              <span className="chip border-gold bg-gold text-[#16130E]">
                {index + 1} / {total}
              </span>
              <span className="truncate text-sm font-semibold text-ink/70">
                {project.sector} · {project.location}
              </span>
            </div>
            <div className="relative">
              {liveProjects.map((p, i) => (
                <div
                  key={p.id}
                  aria-hidden={i !== index}
                  className={`transition-opacity duration-700 ${i === index ? 'relative opacity-100' : 'pointer-events-none absolute inset-0 opacity-0'}`}
                >
                  <BrowserFrame
                    src={p.imageUrl}
                    alt={`Homepage of the ${p.title} website`}
                    url={p.liveUrl.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>

            {/* Controls + progress */}
            <div className="mt-4 flex items-center gap-3">
              <button type="button" onClick={() => go(-1)} aria-label="Previous project" className="grid h-10 w-10 place-items-center rounded-full border border-line hover:bg-ink/5">
                <FiArrowLeft aria-hidden="true" />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Next project" className="grid h-10 w-10 place-items-center rounded-full border border-line hover:bg-ink/5">
                <FiArrowRight aria-hidden="true" />
              </button>
              <div className="flex flex-1 gap-1.5" aria-hidden="true">
                {liveProjects.map((p, i) => (
                  <span key={p.id} className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink/15">
                    {i === index && (
                      <span
                        key={`${index}-${autoplay}`}
                        className="block h-full origin-left rounded-full bg-ink"
                        style={autoplay ? { animation: `progress ${INTERVAL}ms linear both` } : { transform: 'scaleX(1)' }}
                      />
                    )}
                    {i < index && <span className="block h-full rounded-full bg-ink/40" />}
                  </span>
                ))}
              </div>
              {motion !== 'reduce' && (
                <button
                  type="button"
                  onClick={() => setPaused((p) => !p)}
                  aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
                  className="grid h-10 w-10 place-items-center rounded-full border border-line hover:bg-ink/5"
                >
                  {paused ? <FiPlay aria-hidden="true" /> : <FiPause aria-hidden="true" />}
                </button>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-6" aria-live={autoplay ? 'off' : 'polite'}>
            <div key={project.id} className="card flex flex-1 animate-fade-up flex-col p-6 md:p-7">
              <p className="eyebrow">{project.category}</p>
              <h3 className="mt-3 text-3xl font-semibold tracking-tight">{project.title}</h3>
              <p className="mt-3 text-ink/75">{project.description}</p>
              <div className="mt-auto flex flex-wrap gap-2 pt-6">
                {project.tech.map((t) => (
                  <span key={t} className="chip border-line">{t}</span>
                ))}
              </div>
            </div>

            {project.stat ? (
              <div key={`${project.id}-stat`} className="card animate-fade-up border-gold bg-gold p-6 text-[#16130E]">
                <p className="text-xs font-bold uppercase tracking-[0.18em]">{project.stat.label}</p>
                <p className="mt-2 flex items-baseline gap-3 text-5xl font-semibold tracking-tight md:text-6xl">
                  <span className="text-[#16130E]/55 line-through decoration-[3px]">{project.stat.before}</span>
                  <span aria-hidden="true">→</span>
                  <CountUp from={project.stat.before} to={project.stat.after} />
                </p>
                <p className="mt-1 font-serif text-lg italic">before and after our rebuild</p>
              </div>
            ) : null}

            <Link href={project.caseStudyUrl || project.liveUrl} className="btn-primary w-full">
              Read the {project.title} story <FiArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
