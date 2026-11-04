import { describe, expect, it } from "vitest";

import { galleryPhotos } from "@/data/gallery";

// Every photo on the Gallery Photo page must carry its own label, date and note,
// otherwise visitors see an unlabeled picture they cannot attribute to a project.
describe("Gallery Photo entries", () => {
  it("lists at least one photo", () => {
    expect(galleryPhotos.length).toBeGreaterThan(0);
  });

  it("gives every photo a name, a date and a short note", () => {
    for (const photo of galleryPhotos) {
      expect(photo.title.trim().length, photo.src).toBeGreaterThan(3);
      expect(photo.year.trim().length, photo.title).toBeGreaterThan(0);
      expect(photo.caption?.trim().length, photo.title).toBeGreaterThan(0);
      expect(Number.isInteger(photo.width), photo.title).toBe(true);
      expect(Number.isInteger(photo.height), photo.title).toBe(true);
      expect(photo.width, photo.title).toBeGreaterThan(0);
      expect(photo.height, photo.title).toBeGreaterThan(0);
    }
  });

  it("has no two photos with the same picture", () => {
    const srcs = galleryPhotos.map((photo) => photo.src);
    expect(new Set(srcs).size).toBe(srcs.length);
  });
});
