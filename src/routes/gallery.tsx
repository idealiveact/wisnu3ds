import { createFileRoute } from "@tanstack/react-router";
import { Maximize2 } from "lucide-react";
import { useState } from "react";

import walkthroughPreview from "@/assets/samsung-note20-walkthrough-2020-preview.jpg.asset.json";
import { GalleryLightbox } from "@/components/GalleryLightbox";
import { galleryEntries } from "@/data/gallery";
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

function Gallery() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

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
            Thank you for taking the time to view them. Click any picture or film to open it full size, then use the
            arrows to move between them.
          </p>
          <div className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3">
            {galleryEntries.map((entry, k) => (
              <figure key={entry.src + k} className="mb-6 break-inside-avoid">
                {entry.kind === "video" ? (
                  <div className="relative">
                    <video
                      src={entry.src}
                      poster={entry.poster}
                      width={entry.width}
                      height={entry.height}
                      controls
                      playsInline
                      preload="metadata"
                      className="h-auto w-full rounded-sm bg-muted"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setIndex(k);
                        setOpen(true);
                      }}
                      aria-label={`Open ${entry.title} full size`}
                      className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full border border-border bg-background/75 text-foreground backdrop-blur transition hover:border-primary hover:text-primary"
                    >
                      <Maximize2 className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setIndex(k);
                      setOpen(true);
                    }}
                    aria-label={`Open ${entry.title} full size`}
                    className="group relative block w-full cursor-zoom-in overflow-hidden rounded-sm"
                  >
                    <img
                      src={entry.src}
                      alt={entry.title}
                      width={entry.width}
                      height={entry.height}
                      loading={k === 0 ? "eager" : "lazy"}
                      decoding="async"
                      className="h-auto w-full rounded-sm bg-muted transition duration-500 group-hover:scale-[1.02]"
                    />
                    <span className="pointer-events-none absolute inset-0 grid place-items-center bg-background/55 opacity-0 transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                      <span className="chip bg-background/85 text-foreground">View full size</span>
                    </span>
                  </button>
                )}
                <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-border pt-3">
                  <span className="font-display text-xl font-bold text-foreground md:text-2xl">
                    {entry.title}
                    {entry.kind === "video" && <span className="eyebrow ml-3">Video</span>}
                  </span>
                  <span className="eyebrow shrink-0">{entry.year}</span>
                </figcaption>
                {entry.caption && (
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{entry.caption}</p>
                )}
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
