import { useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { GalleryEntry } from "@/data/gallery";

const pad = (n: number) => String(n).padStart(2, "0");

/** Wrap-around index math for the lightbox arrows: 0 - 1 on 3 entries is 2. */
export function stepIndex(current: number, total: number, delta: number) {
  if (total <= 0) return 0;
  return (current + delta + total) % total;
}

export interface GalleryLightboxProps {
  entries: GalleryEntry[];
  /** Index of the entry being shown; ignored while `open` is false. */
  index: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onIndexChange: (index: number) => void;
}

/**
 * Full-screen viewer for the Gallery grid.
 * Opened by clicking a card; closed with Escape, the X, or a click on the backdrop.
 * Arrow keys and swipes move between entries.
 */
export function GalleryLightbox({ entries, index, open, onOpenChange, onIndexChange }: GalleryLightboxProps) {
  const total = entries.length;
  const entry = open ? entries[index] : undefined;

  const go = useCallback(
    (delta: number) => onIndexChange(stepIndex(index, total, delta)),
    [index, total, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  const touchX = useRef<number | null>(null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-dvh w-screen max-w-none flex-col gap-0 rounded-none border-0 bg-background p-0 shadow-none sm:rounded-none">
        <DialogTitle className="sr-only">{entry?.title}</DialogTitle>
        <DialogDescription className="sr-only">{entry?.caption}</DialogDescription>

        {entry && (
          <div
            className="relative flex min-h-0 flex-1 items-center justify-center px-3 pt-12 pb-3"
            onTouchStart={(e) => (touchX.current = e.touches[0]?.clientX ?? null)}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = (e.changedTouches[0]?.clientX ?? touchX.current) - touchX.current;
              if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
              touchX.current = null;
            }}
          >
            {entry.kind === "video" ? (
              <video
                key={entry.src}
                src={entry.src}
                poster={entry.poster}
                width={entry.width}
                height={entry.height}
                controls
                autoPlay
                playsInline
                 className="h-full w-full object-contain bg-muted"
              />
            ) : (
              <img
                key={entry.src}
                src={entry.src}
                alt={entry.title}
                width={entry.width}
                height={entry.height}
                decoding="async"
                 className="h-full w-full object-contain"
              />
            )}

            {total > 1 && (
              <>
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous"
                  className="btn-ghost-round absolute left-4 top-1/2 -translate-y-1/2"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next"
                  className="btn-ghost-round absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </>
            )}
          </div>
        )}

        {entry && (
          <div className="flex max-h-[30dvh] shrink-0 flex-wrap items-baseline justify-between gap-x-6 gap-y-2 overflow-y-auto border-t border-border px-5 py-4">
            <div className="min-w-0">
              <p className="font-display text-xl font-bold text-foreground md:text-2xl">
                {entry.title}
                {entry.kind === "video" && <span className="eyebrow ml-3">Video</span>}
              </p>
              {entry.caption && (
                <p className="mt-1 max-w-3xl text-sm leading-relaxed text-muted-foreground">{entry.caption}</p>
              )}
            </div>
            <div className="flex shrink-0 items-baseline gap-4">
              {entry.year && <span className="eyebrow">{entry.year}</span>}
              <span className="font-display text-lg font-bold text-primary">{pad(index + 1)}</span>
              <span className="eyebrow">{pad(total)}</span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
