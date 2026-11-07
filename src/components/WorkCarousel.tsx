import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUp, ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import type { Project } from "@/data/projects";

/** Vertical cover slider: the centred cover grows and is ready to open; details sit left and right. */
export function WorkCarousel({ projects }: { projects: Project[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const current = projects[active];

  function go(index: number) {
    const element = track.current;
    const card = element?.children[index];
    if (!element || !(card instanceof HTMLElement)) return;
    const top = card.offsetTop - (element.clientHeight - card.offsetHeight) / 2;
    element.scrollTo({ top, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  function onScroll() {
    const element = track.current;
    if (!element) return;
    const middle = element.scrollTop + element.clientHeight / 2;
    let closest = 0;
    let distance = Infinity;
    Array.from(element.children).forEach((child, index) => {
      if (!(child instanceof HTMLElement)) return;
      const d = Math.abs(child.offsetTop + child.offsetHeight / 2 - middle);
      if (d < distance) { closest = index; distance = d; }
    });
    setActive(closest);
  }

  return (
    <section className="work-collection relative isolate h-svh overflow-hidden bg-background pt-24">
      <h1 className="sr-only">Built with care. Shown with gratitude.</h1>

      {/* Left details */}
      <div className="pointer-events-none absolute left-6 top-1/2 z-10 hidden w-[22vw] -translate-y-1/2 md:block lg:left-10">
        <p className="flex items-center gap-3 text-xs font-semibold uppercase text-muted-foreground"><span className="h-px w-8 bg-primary" aria-hidden="true" />Selected projects</p>
        <p className="mt-6 font-display text-7xl font-semibold leading-none text-primary">{String(active + 1).padStart(2, "0")}<span className="ml-2 text-base text-muted-foreground">/ {String(projects.length).padStart(2, "0")}</span></p>
        {current && <p className="mt-6 text-sm text-muted-foreground">{current.client} · {current.role}<br />{current.year}</p>}
      </div>

      {/* Right list */}
      <div className="absolute right-6 top-1/2 z-10 hidden w-[20vw] -translate-y-1/2 md:block lg:right-10">
        <ul className="space-y-1">
          {projects.map((project, index) => (
            <li key={project.slug}>
              <button type="button" onClick={() => go(index)} aria-current={active === index} className={`text-left font-display text-lg leading-snug transition-colors ${active === index ? "text-foreground" : "text-muted-foreground/60 hover:text-primary"}`}>{project.title}</button>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex gap-3">
          <Button variant="outline" size="icon" className="size-11 rounded-full" onClick={() => go(active - 1)} disabled={active === 0} aria-label="Previous project"><ArrowUp /></Button>
          <Button size="icon" className="size-11 rounded-full" onClick={() => go(active + 1)} disabled={active === projects.length - 1} aria-label="Next project"><ArrowDown /></Button>
        </div>
      </div>

      <div
        ref={track}
        role="region"
        aria-label="Work projects"
        aria-roledescription="carousel"
        tabIndex={0}
        className="work-vtrack h-full overflow-y-auto focus-visible:outline-none"
        onScroll={onScroll}
        onKeyDown={(event) => {
          if (!["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"].includes(event.key)) return;
          event.preventDefault();
          const step = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
          go(Math.max(0, Math.min(projects.length - 1, active + step)));
        }}
      >
        {projects.map((project, index) => (
          <Link
            key={project.slug}
            to="/projects/$slug"
            params={{ slug: project.slug }}
            preload={false}
            className="work-vcard group relative mx-auto block overflow-hidden rounded-lg bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            data-active={active === index}
            aria-label={`Open ${project.title}`}
            onClick={(event) => { if (active !== index) { event.preventDefault(); go(index); } }}
          >
            <img src={project.cover} alt={project.title} loading={index < 3 ? "eager" : "lazy"} decoding="async" className="h-full w-full object-cover" />
            <span className="work-vcard-shade absolute inset-0" aria-hidden="true" />
            <span className="work-vcard-title absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-6">
              <span className="font-display text-xl font-bold leading-tight md:text-3xl">{project.title}</span>
              <span className="work-cover-open flex size-11 shrink-0 items-center justify-center rounded-full transition-transform group-hover:-rotate-45" aria-hidden="true"><ArrowUpRight className="size-5" /></span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
