import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import type { Project } from "@/data/projects";

const SLIDE_MS = 1100;

/** Horizontal cover slider: the centred cover grows and is ready to open; the page background shows it blurred and dark. */
export function WorkCarousel({ projects }: { projects: Project[] }) {
  const track = useRef<HTMLDivElement>(null);
  const animating = useRef(false);
  const [active, setActive] = useState(0);
  const current = projects[active];

  function go(index: number) {
    const element = track.current;
    const card = element?.children[index];
    if (!element || !(card instanceof HTMLElement)) return;
    const target = card.offsetLeft - (element.clientWidth - card.offsetWidth) / 2;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { element.scrollLeft = target; return; }
    // Slow, eased glide instead of the browser's quick smooth scroll.
    const start = element.scrollLeft;
    const t0 = performance.now();
    animating.current = true;
    element.style.scrollSnapType = "none";
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / SLIDE_MS);
      const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      element.scrollLeft = start + (target - start) * e;
      if (p < 1) requestAnimationFrame(step);
      else { animating.current = false; element.style.scrollSnapType = ""; }
    };
    setActive(index);
    requestAnimationFrame(step);
  }

  function onScroll() {
    const element = track.current;
    if (!element || animating.current) return;
    const middle = element.scrollLeft + element.clientWidth / 2;
    let closest = 0;
    let distance = Infinity;
    Array.from(element.children).forEach((child, index) => {
      if (!(child instanceof HTMLElement)) return;
      const d = Math.abs(child.offsetLeft + child.offsetWidth / 2 - middle);
      if (d < distance) { closest = index; distance = d; }
    });
    setActive(closest);
  }

  return (
    <section className="work-collection relative isolate flex h-svh flex-col overflow-hidden bg-background pt-24">
      {/* Blurred, darkened backdrop of the centred project */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {projects.map((project, index) => (
          <img key={project.slug} src={project.cover} alt="" loading={index === 0 ? "eager" : "lazy"} className="work-backdrop absolute inset-0 h-full w-full object-cover" data-active={active === index} />
        ))}
        <span className="work-backdrop-shade absolute inset-0" />
      </div>

      <h1 className="sr-only">Built with care. Shown with gratitude.</h1>

      <div className="relative flex flex-1">
      <Button variant="outline" size="icon" className="work-arrow work-arrow-left absolute top-1/2 z-10 size-12 -translate-y-1/2 rounded-full" onClick={() => go(active - 1)} disabled={active === 0} aria-label="Previous project"><ArrowLeft /></Button>
      <Button size="icon" className="work-arrow work-arrow-right absolute top-1/2 z-10 size-12 -translate-y-1/2 rounded-full" onClick={() => go(active + 1)} disabled={active === projects.length - 1} aria-label="Next project"><ArrowRight /></Button>
      <div
        ref={track}
        role="region"
        aria-label="Work projects"
        aria-roledescription="carousel"
        tabIndex={0}
        className="work-htrack flex flex-1 items-center overflow-x-auto focus-visible:outline-none"
        onScroll={onScroll}
        onKeyDown={(event) => {
          if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
          event.preventDefault();
          go(Math.max(0, Math.min(projects.length - 1, active + (event.key === "ArrowRight" ? 1 : -1))));
        }}
      >
        {projects.map((project, index) => (
          <Link
            key={project.slug}
            to="/projects/$slug"
            params={{ slug: project.slug }}
            preload={false}
            className="work-hcard group relative block overflow-hidden rounded-lg bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            data-active={active === index}
            aria-label={`Open ${project.title}`}
            onClick={(event) => { if (active !== index) { event.preventDefault(); go(index); } }}
          >
            <img src={project.cover} alt={project.title} loading={index < 3 ? "eager" : "lazy"} decoding="async" draggable={false} className="h-full w-full object-cover" />
            <span className="work-vcard-shade absolute inset-0" aria-hidden="true" />
            <span className="work-vcard-title absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-6">
              <span className="font-display text-xl font-bold leading-tight md:text-3xl">{project.title}</span>
              <span className="work-cover-open flex size-11 shrink-0 items-center justify-center rounded-full transition-transform group-hover:-rotate-45" aria-hidden="true"><ArrowUpRight className="size-5" /></span>
            </span>
          </Link>
        ))}
      </div>
      </div>

      <footer className="mx-auto flex w-full max-w-[1600px] items-end justify-between gap-6 px-6 pb-20 md:px-10 md:pb-28">
        <div>
          <p className="flex items-center gap-3 text-xs font-semibold uppercase text-muted-foreground"><span className="h-px w-8 bg-primary" aria-hidden="true" />Selected projects</p>
          <p className="mt-3 font-display text-5xl font-semibold leading-none text-primary md:text-6xl">{String(active + 1).padStart(2, "0")}<span className="ml-2 text-base text-muted-foreground">/ {String(projects.length).padStart(2, "0")}</span></p>
          {current && <p className="mt-3 text-sm text-muted-foreground">{current.client} · {current.role} · {current.year}</p>}
        </div>
        <div className="flex flex-col items-end gap-4">
          <ul className="hidden text-right md:block">
            {projects.map((project, index) => (
              <li key={project.slug}>
                <button type="button" onClick={() => go(index)} aria-current={active === index} className={`font-display text-lg leading-snug transition-colors ${active === index ? "text-foreground" : "text-muted-foreground/60 hover:text-primary"}`}>{project.title}</button>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </section>
  );
}
