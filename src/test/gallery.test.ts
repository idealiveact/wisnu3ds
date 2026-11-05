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

  // Wisnu's rule: the three plaques in the Bogasari counter photo are three
  // consecutive Best Booth wins, so that photo must say so on the page.
  it("labels the three plaques as three consecutive Best Booth wins", () => {
    const awards = galleryEntries.find((entry) => entry.title.includes("Best Booth"));
    expect(awards, "no gallery entry about the Best Booth awards").toBeTruthy();
    expect(awards?.year).toBe("2015–2017");
    expect(awards?.caption).toContain("three consecutive years");
  });
});

// The full-size viewer is opened by clicking a card, so its arrows must always
// land on a real entry — including wrapping past the first and the last one.
describe("Gallery full-size viewer navigation", () => {
  it("moves forward and backward through the entries", () => {
    expect(stepIndex(0, 3, 1)).toBe(1);
    expect(stepIndex(2, 3, -1)).toBe(1);
  });

  it("wraps around at both ends", () => {
    expect(stepIndex(2, 3, 1)).toBe(0);
    expect(stepIndex(0, 3, -1)).toBe(2);
  });

  it("stays put when there is nothing to move between", () => {
    expect(stepIndex(0, 1, 1)).toBe(0);
    expect(stepIndex(0, 0, 1)).toBe(0);
  });
});
