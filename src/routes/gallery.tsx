import { createFileRoute } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { useState } from "react";

import walkthroughPreview from "@/assets/optimized/samsung-note20-walkthrough-2020-preview.webp.asset.json";
import { Button } from "@/components/ui/button";
import { GalleryLightbox } from "@/components/GalleryLightbox";
import { galleryEntries, type GalleryEntry } from "@/data/gallery";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/gallery")({
  head: () =>
    pageHead({
      title: "Gallery — Wisnu Kesuma | 3D Designer",
      description:
        "Selected renders, installations and walkthrough films by Wisnu Kesuma, 3D designer for exhibition booths, stages and event spaces.",
      path: "/gallery",
      image: walkthroughPreview.url,
      imageAlt: "Still from the Galaxy Note20 virtual booth walkthrough film",
    }),
  component: Gallery,
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
        <span className="text-xs text-primary">{entry.year}</span>
        <span className="font-display text-sm font-semibold">{entry.title}</span>
      </span>
      {["top-left", "top-right", "bottom-left", "bottom-right"].map((corner) => (
        <span key={corner} aria-hidden="true" className={`gallery-corner gallery-corner-${corner}`} />
      ))}
    </Button>
  );
}

function Gallery() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const openAt = (k: number) => {
    setIndex(k);
    setOpen(true);
  };


  return (
    <section className="min-h-screen px-6 pt-28 pb-16 md:px-10">
      <p className="eyebrow">Gallery</p>
      <h1 className="fade-up mt-4 max-w-4xl text-balance font-display text-3xl font-bold leading-[1.08] text-foreground md:text-5xl">
        A collection of works, built through <span className="text-primary">process and dedication</span>.
      </h1>
      <p className="fade-up mt-5 font-display text-2xl font-bold leading-none text-foreground md:text-3xl">
        Selected <span className="text-primary">frames</span>
      </p>
      {galleryEntries.length === 0 ? (
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
          A curated gallery is on its way — renders, installations and walkthrough films will appear here soon.
        </p>
      ) : (
        <>
          <p className="fade-up mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Thank you for taking the time to view them.
          </p>

          <div className="gallery-square-grid mt-14" aria-label="Gallery collection">
            {galleryEntries.map((entry, k) => (
              <figure key={entry.src} className="gallery-square-cell">
                <Tile entry={entry} onOpen={() => openAt(k)} />
              </figure>
            ))}
          </div>

          <GalleryLightbox
            entries={galleryEntries}
            index={index}
            open={open}
            onOpenChange={setOpen}
            onIndexChange={setIndex}
          />
        </>
      )}
    </section>
  );
}
