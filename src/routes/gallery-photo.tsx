import { createFileRoute } from "@tanstack/react-router";
import { galleryPhotos } from "@/data/gallery";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/gallery-photo")({
  head: () =>
    pageHead({
      title: "Gallery Photo — Wisnu Kesuma | 3D Designer",
      description: "A curated photo gallery of 3D renders and behind-the-scenes shots by Wisnu Kesuma.",
      path: "/gallery-photo",
    }),
  component: GalleryPhoto,
});

function GalleryPhoto() {
  return (
    <section className="min-h-screen px-6 pt-28 pb-16 md:px-10">
      <p className="eyebrow">Gallery Photo</p>
      <h1 className="fade-up mt-4 font-display text-5xl font-bold leading-[0.95] text-foreground md:text-7xl">
        Selected <span className="text-primary">photos</span>.
      </h1>
      {galleryPhotos.length === 0 ? (
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
          A curated photo gallery is on its way — renders and behind-the-scenes shots will appear here soon.
        </p>
      ) : (
        <div className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {galleryPhotos.map((photo, k) => (
            <figure key={photo.src + k} className="mb-6 break-inside-avoid">
              <img
                src={photo.src}
                alt={photo.title}
                width={photo.width}
                height={photo.height}
                loading={k === 0 ? "eager" : "lazy"}
                decoding="async"
                className="h-auto w-full rounded-sm bg-muted"
              />
              <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-border pt-3">
                <span className="font-display text-xl font-bold text-foreground md:text-2xl">{photo.title}</span>
                <span className="eyebrow shrink-0">{photo.year}</span>
              </figcaption>
              {photo.caption && (
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{photo.caption}</p>
              )}
            </figure>
          ))}
        </div>
      )}
    </section>
  );
}
