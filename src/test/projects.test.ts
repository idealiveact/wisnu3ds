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

// Wisnu's rule: every Work folder opens with one unbroken paragraph of exactly
// 699 characters, so a new folder never lands with a different-length write-up.
describe("Work opening paragraphs", () => {
  it("keeps every project description to one unbroken 699-character paragraph", () => {
    expect(projects.length).toBeGreaterThan(0);
    for (const project of projects) {
      expect(project.description.length, project.title).toBe(699);
      expect(project.description.includes("\n"), project.title).toBe(false);
    }
  });
});

describe("Indofood Project entry", () => {
  const project = getProject("indofood");

  it("is listed as Indofood Project, 2018, for client Indofood", () => {
    expect(project, "no project with slug 'indofood'").toBeTruthy();
    expect(project?.title).toBe("Indofood Project");
    expect(project?.year).toBe("2018");
    expect(project?.client).toBe("Indofood");
    expect(project?.category).toBe("work");
  });

  it("shows both labelled renders of the 20 x 20 m pavilion", () => {
    const gallery = project?.gallery ?? [];
    expect(gallery.length).toBe(2);
    for (const item of gallery) {
      expect(item.title.trim().length, item.src).toBeGreaterThan(3);
      expect(item.caption?.trim().length, item.title).toBeGreaterThan(0);
      expect(item.year).toBe("2018");
      expect(Number.isInteger(item.width), item.title).toBe(true);
      expect(Number.isInteger(item.height), item.title).toBe(true);
    }
  });
});

// Wisnu's rule: the Injourney folder holds the Booth Exhibition Sub Holding
// 2024 series (five numbered pictures, number one being the Pola study) plus
// the four Sahakarya 2025 festival renders that follow them.
describe("Injourney entry", () => {
  const project = getProject("injourney");

  it("is listed as Injourney, 2024–2025, for client InJourney", () => {
    expect(project, "no project with slug 'injourney'").toBeTruthy();
    expect(project?.title).toBe("Injourney");
    expect(project?.year).toBe("2024–2025");
    expect(project?.client).toBe("InJourney");
    expect(project?.category).toBe("work");
  });

  it("shows nine numbered pictures with Pola first and Sahakarya last", () => {
    const gallery = project?.gallery ?? [];
    expect(gallery.length).toBe(9);
    expect(gallery[0]?.title).toBe("1 — Pola");
    gallery.forEach((item, index) => {
      expect(item.title.startsWith(`${index + 1} — `), item.title).toBe(true);
      expect(item.caption?.trim().length, item.title).toBeGreaterThan(0);
      expect(item.year).toBe(index < 5 ? "2024" : "2025");
    });
    expect(gallery[8]?.title).toContain("Sahakarya");
  });
});
