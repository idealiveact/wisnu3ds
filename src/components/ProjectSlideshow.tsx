import { Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";

const pad = (n: number) => String(n).padStart(2, "0");

export function ProjectSlideshow({ projects, title }: { projects: Project[]; title: string }) {
  const [i, setI] = useState(0);
  const total = projects.length;
  const go = useCallback((d: number) => setI((v) => (v + d + total) % total), [total]);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  // preload next image
  useEffect(() => {
    const next = projects[(i + 1) % total];
    if (next) new Image().src = next.cover;
  }, [i, projects, total]);

  const p = projects[i];
  if (!p) return null;

  return (
    <section
      className="relative h-[100svh] w-full overflow-hidden bg-background"
      onTouchStart={(e) => (touchX.current = e.touches[0]?.clientX ?? null)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = (e.changedTouches[0]?.clientX ?? touchX.current) - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <img
        key={p.slug}
        src={p.cover}
        alt={p.title}
        width={1600}
        height={1008}
        decoding="async"
        className="slide-in absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-scrim" />

      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-10 md:px-10 md:pb-14">
        <p className="slide-label mb-4">{title}</p>
        <div key={p.slug + "t"} className="fade-up max-w-3xl">
          <h1 className="slide-lead font-display text-5xl font-bold leading-[0.95] text-foreground md:text-8xl">{p.title}</h1>
          <p className="slide-lead mt-4 max-w-xl text-muted-foreground md:text-lg">{p.summary}</p>
          <Link to="/projects/$slug" params={{ slug: p.slug }} className="btn-ember mt-6">
            View project →
          </Link>
        </div>

        <div className="mt-10 flex items-end justify-between border-t border-border pt-5">
          <div className="font-display text-foreground">
            <span className="text-4xl font-bold text-primary">{pad(i + 1)}</span>
            <span className="text-muted-foreground"> / {pad(total)}</span>
          </div>
          <div className="hidden gap-2 md:flex">
            {projects.map((x, k) => (
              <button key={x.slug} aria-label={`Project ${k + 1}`} onClick={() => setI(k)} className="dot" data-active={k === i} />
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={() => go(-1)} className="btn-ghost-round" aria-label="Previous">←</button>
            <button onClick={() => go(1)} className="btn-ghost-round" aria-label="Next">→</button>
          </div>
        </div>
      </div>
    </section>
  );
}
