import { createFileRoute } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { useState } from "react";

import teriosEv from "@/assets/personal-terios-ev-concept.png.asset.json";
import { Button } from "@/components/ui/button";
import { GalleryLightbox } from "@/components/GalleryLightbox";
import { personalEntries } from "@/data/personal";
import type { GalleryEntry } from "@/data/gallery";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/personal")({
  head: () =>
    pageHead({
      title: "Personal Projects — Wisnu Kesuma | 3D Designer",
      description:
        "Self-initiated 3D studies by Wisnu Kesuma — vehicle concepts modelled in 3ds Max, rendered with V-Ray, finished with AI and shared on YouTube.",
      path: "/personal",
      image: teriosEv.url,
      imageAlt: "Terios EV concept render in a dark studio",
    }),
  component: Personal,
});

function Tile({ entry, onOpen }: { entry: GalleryEntry; onOpen: () => void }) {
  return (
    <Button
      type="button"
      variant="ghost"
      onClick={onOpen}
      aria-label={`Open ${entry.title} full size`}
      className="gallery-square"
    >
      <img
        src={entry.kind === "video" ? entry.poster : entry.src}
        alt={entry.title}
        width={entry.width}
        height={entry.height}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {entry.kind === "video" && (
        <span className="gallery-play absolute inset-0 grid place-items-center">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-background/70 text-foreground backdrop-blur">
            <Play className="h-5 w-5 fill-current" />
          </span>
        </span>
      )}
      <span className="gallery-square-caption absolute inset-x-0 bottom-0 flex flex-col items-start gap-1 p-4 text-left whitespace-normal">
        <span className="font-display text-sm font-semibold">
          <span className="text-muted-foreground/70">{entry.title.split(" — ")[0]}</span>
          {entry.title.includes(" — ") && (
            <span className="text-foreground"> — {entry.title.split(" — ").slice(1).join(" — ")}</span>
          )}
        </span>
      </span>
      {["top-left", "top-right", "bottom-left", "bottom-right"].map((corner) => (
        <span key={corner} aria-hidden="true" className={`gallery-corner gallery-corner-${corner}`} />
      ))}
    </Button>
  );
}

function Personal() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const openAt = (k: number) => {
    setIndex(k);
    setOpen(true);
  };

  return (
    <section className="min-h-screen px-6 pt-28 pb-16 md:px-10">
      <p className="eyebrow">Personal</p>
      <h1 className="fade-up mt-4 max-w-4xl text-balance font-display text-3xl font-bold leading-[1.08] text-foreground md:text-5xl">
        Personal <span className="text-primary">projects</span>.
      </h1>
      <p className="fade-up mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
        Self-initiated studies made for the joy of it — modelled in 3ds Max, rendered with V-Ray,
        finished with AI, and shared on YouTube.
      </p>

      <div className="gallery-square-grid mt-14" aria-label="Personal projects collection">
        {personalEntries.map((entry, k) => (
          <figure key={entry.src} className="gallery-square-cell">
            <Tile entry={entry} onOpen={() => openAt(k)} />
          </figure>
        ))}
      </div>

      <GalleryLightbox
        entries={personalEntries}
        index={index}
        open={open}
        onOpenChange={setOpen}
        onIndexChange={setIndex}
      />
    </section>
  );
}
