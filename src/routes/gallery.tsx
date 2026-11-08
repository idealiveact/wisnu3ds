import { createFileRoute } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { useState } from "react";

import walkthroughPreview from "@/assets/samsung-note20-walkthrough-2020-preview.jpg.asset.json";
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

/**
 * Kubah cembung: baris foto kotak berjejer rapat, tetapi seluruh susunan
 * melengkung ke arah penonton — tengah menonjol, tepi mundur dan miring,
 * baris atas menunduk, baris bawah menengadah.
 */
const DESKTOP_COLS = 4;
const MOBILE_COLS = 2;

/** Skala & kemiringan per posisi kolom (laptop, 4 kolom): tepi mundur, tengah menonjol. */
const colBulge = [0.88, 0.97, 0.97, 0.88];
const colTilt = [10, 3, -3, -10];

/** Kemiringan baris (rotateX derajat): atas menunduk, bawah menengadah, makin ke tepi makin dalam. */
function rowTilt(row: number, rows: number): number {
  if (rows <= 1) return 0;
  const center = (rows - 1) / 2;
  return ((center - row) / center) * 6;
}

function EntryCaption({ entry }: { entry: GalleryEntry }) {
  return (
    <figcaption className="mt-2 flex items-baseline justify-between gap-3">
      <span className="min-w-0 truncate text-xs font-semibold text-foreground md:text-sm">{entry.title}</span>
      <span className="eyebrow shrink-0">{entry.year}</span>
    </figcaption>
  );
}

function Tile({ entry, onOpen }: { entry: GalleryEntry; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Open ${entry.title} full size`}
      className="relative block aspect-square w-full cursor-zoom-in overflow-hidden rounded-sm bg-muted transition duration-500 ease-out group-hover:z-20 group-hover:scale-[1.06] group-hover:shadow-2xl"
    >
      <img
        src={entry.kind === "video" ? entry.poster : entry.src}
        alt={entry.title}
        width={entry.width}
        height={entry.height}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
      {entry.kind === "video" && (
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-background/70 text-foreground backdrop-blur transition group-hover:bg-primary group-hover:text-primary-foreground">
            <Play className="h-5 w-5 fill-current" />
          </span>
        </span>
      )}
      <span className="pointer-events-none absolute inset-0 bg-background/45 opacity-0 transition duration-300 group-hover:opacity-100" />
    </button>
  );
}

function Gallery() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const openAt = (k: number) => {
    setIndex(k);
    setOpen(true);
  };

  const desktopRows = Math.ceil(galleryEntries.length / DESKTOP_COLS);
  const mobileRows = Math.ceil(galleryEntries.length / MOBILE_COLS);

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

          {/* Kubah cembung — laptop: 4 kolom kotak, baris melengkung */}
          <div className="mt-14 hidden md:block" style={{ perspective: "1400px" }}>
            {Array.from({ length: desktopRows }, (_, row) => (
              <div
                key={row}
                className="grid grid-cols-4 gap-2"
                style={{
                  transform: `rotateX(${rowTilt(row, desktopRows)}deg)`,
                  transformStyle: "preserve-3d",
                  marginTop: row === 0 ? 0 : "-1.5rem",
                }}
              >
                {galleryEntries.slice(row * DESKTOP_COLS, row * DESKTOP_COLS + DESKTOP_COLS).map((entry, c) => (
                  <figure
                    key={entry.src}
                    className="group transition-transform duration-700 ease-out will-change-transform"
                    style={{
                      transform: `scale(${colBulge[c]}) rotateY(${colTilt[c]}deg)`,
                    }}
                  >
                    <Tile entry={entry} onOpen={() => openAt(row * DESKTOP_COLS + c)} />
                    <EntryCaption entry={entry} />
                  </figure>
                ))}
              </div>
            ))}
          </div>

          {/* Kubah cembung — HP: 2 kolom kotak, baris melengkung */}
          <div className="mt-12 md:hidden" style={{ perspective: "900px" }}>
            {Array.from({ length: mobileRows }, (_, row) => (
              <div
                key={row}
                className="grid grid-cols-2 gap-2"
                style={{
                  transform: `rotateX(${rowTilt(row, mobileRows)}deg)`,
                  transformStyle: "preserve-3d",
                  marginTop: row === 0 ? 0 : "-1rem",
                }}
              >
                {galleryEntries.slice(row * MOBILE_COLS, row * MOBILE_COLS + MOBILE_COLS).map((entry, c) => (
                  <figure
                    key={entry.src}
                    className="group"
                    style={{ transform: `scale(0.94) rotateY(${c === 0 ? 8 : -8}deg)` }}
                  >
                    <Tile entry={entry} onOpen={() => openAt(row * MOBILE_COLS + c)} />
                    <EntryCaption entry={entry} />
                  </figure>
                ))}
              </div>
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
