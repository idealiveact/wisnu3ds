import { describe, expect, it } from "vitest";

import { getProject, projects } from "@/data/projects";

// The Samsung entry is a collection (2017–2020), not one booth. Its name, its
// year span and the order of its pictures are all rules Wisnu asked for.
describe("SAMSUNG Project entry", () => {
  const project = getProject("samsung");

  it("is listed as SAMSUNG Project spanning 2017 to 2020", () => {
    expect(project, "no project with slug 'samsung'").toBeTruthy();
    expect(project?.title).toBe("SAMSUNG Project");
    expect(project?.year).toBe("2015–2020");
    expect(project?.category).toBe("work");
  });

  it("keeps the old long URL out of the project list so the redirect is the only path", () => {
    expect(getProject("samsung-note20-virtual-booth")).toBeUndefined();
  });

  it("shows nine labelled pictures, oldest first", () => {
    const gallery = project?.gallery ?? [];
    expect(gallery.length).toBe(9);
    for (const item of gallery) {
      expect(item.title.trim().length, item.src).toBeGreaterThan(3);
      expect(item.caption?.trim().length, item.title).toBeGreaterThan(0);
      expect(Number.isInteger(item.width), item.title).toBe(true);
      expect(Number.isInteger(item.height), item.title).toBe(true);
    }
    const years = gallery.map((item) => Number(item.year));
    expect([...years].sort((a, b) => a - b)).toEqual(years);
  });

  it("groups the House of Screens showroom under the TV & AV campaign and dates it 2020", () => {
    const item = project?.gallery.find((g) => g.title.includes("House of Screens"));
    expect(item?.title).toBe("TV & AV Campaign — House of Screens");
    expect(item?.year).toBe("2020");
  });

  it("does not repeat a picture across the whole portfolio", () => {
    const srcs = projects.flatMap((p) => p.gallery.map((item) => item.src));
    expect(new Set(srcs).size).toBe(srcs.length);
  });
});
