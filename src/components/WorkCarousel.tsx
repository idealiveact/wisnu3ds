import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import type { Project } from "@/data/projects";

export function WorkCarousel({ projects }: { projects: Project[] }) {
  const track = useRef<HTMLDivElement>(null);
  const pointer = useRef<{ x: number; y: number; left: number } | null>(null);
  const dragged = useRef(false);
  const [active, setActive] = useState(0);

  function go(index: number) {
    const element = track.current;
    const card = element?.children[index];
    if (!element || !(card instanceof HTMLElement)) return;
    element.scrollTo({ left: card.offsetLeft - element.offsetLeft, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  const selected = projects[active];
  return (
    <section className="work-collection relative isolate min-h-svh overflow-hidden bg-background pb-10 pt-28 md:pt-32">
      {selected && <img key={selected.slug} src={selected.cover} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover opacity-25" />}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-background/65" />
      <header className="mx-auto flex max-w-[1600px] items-end justify-between gap-5 px-6 md:px-10">
        <div>
          <p className="text-xs font-semibold uppercase text-primary">Selected projects</p>
          <h1 className="mt-3 font-display text-5xl font-bold leading-none tracking-normal md:text-7xl">Work</h1>
        </div>
        <span className="pb-1 text-sm text-muted-foreground">{String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
      </header>

      <div
        ref={track}
        role="region"
        aria-label="Work projects"
        aria-roledescription="carousel"
        tabIndex={0}
        className="work-track mt-10 flex gap-6 overflow-x-auto px-6 pb-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:gap-8 md:px-10"
        onScroll={() => {
          const element = track.current;
          if (!element) return;
          let closest = 0;
          let distance = Infinity;
          Array.from(element.children).forEach((child, index) => {
            if (!(child instanceof HTMLElement)) return;
            const difference = Math.abs(child.offsetLeft - element.offsetLeft - element.scrollLeft);
            if (difference < distance) { closest = index; distance = difference; }
          });
          setActive(closest);
        }}
        onKeyDown={(event) => {
          if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
          event.preventDefault();
          go(Math.max(0, Math.min(projects.length - 1, active + (event.key === "ArrowRight" ? 1 : -1))));
        }}
        onPointerDown={(event) => {
          dragged.current = false;
          if (event.pointerType !== "mouse" || event.button !== 0 || !track.current) return;
          pointer.current = { x: event.clientX, y: event.clientY, left: track.current.scrollLeft };
        }}
        onPointerMove={(event) => {
          const start = pointer.current;
          if (!start || !track.current) return;
          if (event.buttons !== 1) { pointer.current = null; return; }
          const dx = event.clientX - start.x;
          if (Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(event.clientY - start.y)) {
            dragged.current = true;
            track.current.scrollLeft = start.left - dx;
          }
        }}
        onPointerUp={() => { pointer.current = null; }}
        onPointerLeave={() => { pointer.current = null; }}
        onClickCapture={(event) => { if (dragged.current) { event.preventDefault(); event.stopPropagation(); } }}
      >
        {projects.map((project, index) => (
          <Link
            key={project.slug}
            to="/projects/$slug"
            params={{ slug: project.slug }}
            preload={false}
            draggable={false}
            className="work-cover group relative block shrink-0 overflow-hidden rounded-lg border border-border bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={`Open ${project.title}`}
            onDragStart={(event) => event.preventDefault()}
          >
            <img src={project.cover} alt={project.title} loading={index < 2 ? "eager" : "lazy"} decoding="async" draggable={false} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none" />
            <div className="pointer-events-none absolute inset-0 bg-scrim" />
            <div className="absolute inset-x-0 top-0 flex items-center justify-between p-6">
              <span className="slide-label tracking-normal">{String(index + 1).padStart(2, "0")}</span>
              <ArrowUpRight className="size-6 text-foreground" aria-hidden="true" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <p className="slide-lead mb-3 text-sm text-primary">{project.year}</p>
              <h2 className="slide-lead font-display text-3xl font-bold leading-tight tracking-normal md:text-4xl">{project.title}</h2>
              <p className="slide-lead mt-3 text-sm text-muted-foreground">{project.client}</p>
            </div>
          </Link>
        ))}
      </div>

      <footer className="mx-auto mt-5 flex max-w-[1600px] items-center justify-between gap-6 px-6 md:px-10">
        <div className="flex gap-2" aria-label="Select project">
          {projects.map((project, index) => <Button key={project.slug} variant="ghost" size="icon" onClick={() => go(index)} aria-label={`Show ${project.title}`} aria-pressed={active === index} title={project.title}><span className={`h-1 w-6 ${active === index ? "bg-primary" : "bg-border"}`} /></Button>)}
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="icon" className="size-12 rounded-full" onClick={() => go(active - 1)} disabled={active === 0} aria-label="Previous project" title="Previous project"><ArrowLeft /></Button>
          <Button variant="outline" size="icon" className="size-12 rounded-full" onClick={() => go(active + 1)} disabled={active === projects.length - 1} aria-label="Next project" title="Next project"><ArrowRight /></Button>
        </div>
      </footer>
    </section>
  );
}