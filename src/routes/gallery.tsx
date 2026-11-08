import { createFileRoute } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { useRef, useState, type MouseEvent } from "react";

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
 * Susunan kolase tersebar (seperti index view michaelgatt.com):
 * tiap karya melayang di kanvas gelap dengan ukuran, posisi, dan rotasi berbeda.
 * depth mengatur seberapa jauh karya ikut bergeser saat kursor bergerak.
 */
const scatter: { top: string; left: string; width: string; rotate: number; depth: number }[] = [
  { top: "1%", left: "4%", width: "21%", rotate: -3, depth: 0.9 },
  { top: "6%", left: "37%", width: "26%", rotate: 2, depth: 0.5 },
  { top: "3%", left: "72%", width: "20%", rotate: -2, depth: 1.1 },
  { top: "23%", left: "13%", width: "18%", rotate: 3, depth: 0.6 },
  { top: "25%", left: "54%", width: "24%", rotate: -1, depth: 1.0 },
  { top: "36%", left: "80%", width: "16%", rotate: 4, depth: 0.7 },
  { top: "41%", left: "29%", width: "20%", rotate: -4, depth: 1.2 },
  { top: "49%", left: "59%", width: "22%", rotate: 2, depth: 0.5 },
  { top: "55%", left: "7%", width: "24%", rotate: -2, depth: 0.8 },
  { top: "67%", left: "37%", width: "18%", rotate: 3, depth: 1.1 },
  { top: "71%", left: "69%", width: "24%", rotate: -3, depth: 0.6 },
  { top: "81%", left: "19%", width: "20%", rotate: 2, depth: 1.0 },
];

/** Kanvas bergerak pelan mengikuti kursor; tiap karya ikut sejauh depth-nya. */
function parallax(event: MouseEvent<HTMLElement>) {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;
  el.style.setProperty("--mx", x.toFixed(3));
  el.style.setProperty("--my", y.toFixed(3));
}

function resetParallax(event: MouseEvent<HTMLElement>) {
  event.currentTarget.style.setProperty("--mx", "0");
  event.currentTarget.style.setProperty("--my", "0");
}

function EntryCaption({ entry }: { entry: GalleryEntry }) {
  return (
    <figcaption className="mt-2 flex items-baseline justify-between gap-3">
      <span className="min-w-0 truncate text-xs font-semibold text-foreground md:text-sm">{entry.title}</span>
      <span className="eyebrow shrink-0">{entry.year}</span>
    </figcaption>
  );
}

function Gallery() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

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
            Thank you for taking the time to view them. Click any picture or film to open it full size, then use the
            arrows to move between them.
          </p>

          {/* Kanvas kolase tersebar — laptop */}
          <div
            ref={canvasRef}
            onMouseMove={parallax}
            onMouseLeave={resetParallax}
            className="relative mt-14 hidden h-[1500px] md:block lg:h-[1750px]"
          >
            {galleryEntries.map((entry, k) => {
              const s = scatter[k % scatter.length];
              return (
                <figure
                  key={entry.src + k}
                  className="group absolute transition-transform duration-700 ease-out will-change-transform"
                  style={{
                    top: s.top,
                    left: s.left,
                    width: s.width,
                    transform: `translate(calc(var(--mx, 0) * ${s.depth * 36}px), calc(var(--my, 0) * ${s.depth * 26}px)) rotate(${s.rotate}deg)`,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => openAt(k)}
                    aria-label={`Open ${entry.title} full size`}
                    className="relative block w-full cursor-zoom-in transition duration-500 ease-out group-hover:z-20 group-hover:scale-[1.06] group-hover:shadow-2xl"
                  >
                    <img
                      src={entry.kind === "video" ? entry.poster : entry.src}
                      alt={entry.title}
                      width={entry.width}
                      height={entry.height}
                      loading={k < 4 ? "eager" : "lazy"}
                      decoding="async"
                      className="h-auto w-full rounded-sm bg-muted"
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
                  <EntryCaption entry={entry} />
                </figure>
              );
            })}
          </div>

          {/* Kolase sederhana dua kolom — HP */}
          <div className="mt-12 grid grid-cols-2 items-start gap-x-4 gap-y-8 md:hidden">
            {galleryEntries.map((entry, k) => (
              <figure key={entry.src + k} className={k % 3 === 0 ? "col-span-2" : k % 2 === 0 ? "mt-6" : ""}>
                <button
                  type="button"
                  onClick={() => openAt(k)}
                  aria-label={`Open ${entry.title} full size`}
                  className="relative block w-full cursor-zoom-in"
                  style={{ transform: `rotate(${k % 2 === 0 ? -1.5 : 1.5}deg)` }}
                >
                  <img
                    src={entry.kind === "video" ? entry.poster : entry.src}
                    alt={entry.title}
                    width={entry.width}
                    height={entry.height}
                    loading={k < 2 ? "eager" : "lazy"}
                    decoding="async"
                    className="h-auto w-full rounded-sm bg-muted"
                  />
                  {entry.kind === "video" && (
                    <span className="absolute inset-0 grid place-items-center">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-background/70 text-foreground backdrop-blur">
                        <Play className="h-4 w-4 fill-current" />
                      </span>
                    </span>
                  )}
                </button>
                <EntryCaption entry={entry} />
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
