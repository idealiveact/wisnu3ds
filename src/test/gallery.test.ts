import { describe, expect, it } from "vitest";

import { stepIndex } from "@/components/GalleryLightbox";
import { galleryEntries } from "@/data/gallery";

// Every entry on the Gallery page must carry its own label, date and note,
// otherwise visitors see an unlabeled picture or film they cannot attribute to a project.
describe("Gallery entries", () => {
  it("lists at least one entry", () => {
    expect(galleryEntries.length).toBeGreaterThan(0);
  });

  it("gives every entry a name, a date and a short note", () => {
    for (const entry of galleryEntries) {
      expect(entry.title.trim().length, entry.src).toBeGreaterThan(3);
      expect(entry.year.trim().length, entry.title).toBeGreaterThan(0);
      expect(entry.caption?.trim().length, entry.title).toBeGreaterThan(0);
      expect(Number.isInteger(entry.width), entry.title).toBe(true);
      expect(Number.isInteger(entry.height), entry.title).toBe(true);
      expect(entry.width, entry.title).toBeGreaterThan(0);
      expect(entry.height, entry.title).toBeGreaterThan(0);
    }
  });

  it("gives every film a cover still so its card is never an empty box", () => {
    const films = galleryEntries.filter((entry) => entry.kind === "video");
    expect(films.length).toBeGreaterThan(0);
    for (const film of films) {
      expect(film.poster?.trim().length, film.title).toBeGreaterThan(0);
    }
  });

  it("has no two entries with the same picture or film", () => {
    const srcs = galleryEntries.map((entry) => entry.src);
    expect(new Set(srcs).size).toBe(srcs.length);
  });
});
