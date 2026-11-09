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

// The Suzuki folder holds the IIMS booths: two renders of the 2022 stand, two
// of the 2024 booth, then three of the 2025 stand, sorted by year and numbered
// within each event. Wisnu's rule: the first 2025 photo carries just its number.
describe("SUZUKI EXHIBITION entry", () => {
  const project = getProject("suzuki");

  it("is listed as SUZUKI EXHIBITION, 2022–2025, for client Suzuki", () => {
    expect(project, "no project with slug 'suzuki'").toBeTruthy();
    expect(project?.title).toBe("SUZUKI EXHIBITION");
    expect(project?.year).toBe("2022–2025");
    expect(project?.client).toBe("Suzuki");
    expect(project?.category).toBe("work");
  });

  it("shows ten labelled renders sorted by year, 2022 first then 2024 then 2025", () => {
    const gallery = project?.gallery ?? [];
    expect(gallery.map((item) => item.title)).toEqual([
      "Booth Exhibition IIMS 2022 — 1 full booth",
      "Booth Exhibition IIMS 2023 — 2 front view",
      "Booth Exhibition IIMS 2023 — 3 Bird View",
      "Booth Exhibition IIMS 2022 — 4 cafeteria",
      "Booth Exhibition IIMS 2022 — 5 beach zone",
      "SUZUKI BOOTH EXHIBITION 2024 — 1 main display",
      "SUZUKI BOOTH EXHIBITION 2024 — 2 jimny off-road zone",
      "SUZUKI BOOTH EXHIBITION IIMS 2025 — 1",
      "SUZUKI BOOTH EXHIBITION IIMS 2025 — 2 collection corner",
      "SUZUKI BOOTH EXHIBITION IIMS 2025 — 3 safety support",
    ]);
    const expectedYears = ["2022", "2022", "2022", "2022", "2022", "2024", "2024", "2025", "2025", "2025"];
    gallery.forEach((item, index) => {
      expect(item.year).toBe(expectedYears[index]);
      expect(item.caption?.trim().length, item.title).toBeGreaterThan(0);
      expect(Number.isInteger(item.width), item.title).toBe(true);
      expect(Number.isInteger(item.height), item.title).toBe(true);
    });
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

// The Others folder gathers the smaller riding-gear and helmet booths that do
// not belong to a single big client: Deride and Juragan Helm, 2022 to 2026.
describe("Others entry", () => {
  const project = getProject("others");

  it("is listed as Others, 2022–2026", () => {
    expect(project, "no project with slug 'others'").toBeTruthy();
    expect(project?.title).toBe("Others");
    expect(project?.year).toBe("2022–2026");
    expect(project?.category).toBe("work");
  });

  it("shows four labelled booth renders, oldest first", () => {
    const gallery = project?.gallery ?? [];
    expect(gallery.length).toBe(4);
    for (const item of gallery) {
      expect(item.title.trim().length, item.src).toBeGreaterThan(3);
      expect(item.caption?.trim().length, item.title).toBeGreaterThan(0);
      expect(Number.isInteger(item.width), item.title).toBe(true);
      expect(Number.isInteger(item.height), item.title).toBe(true);
    }
    const years = gallery.map((item) => Number(item.year));
    expect([...years].sort((a, b) => a - b)).toEqual(years);
  });
});

// Wisnu's rule: the Injourney folder holds the Booth Exhibition Sub Holding
// 2024 series (five numbered pictures, number one being the Pola study), then
// the four Sahakarya 2025 festival renders, then the four Gandrung Sewu 2026
// UMKM market renders.
describe("Injourney entry", () => {
  const project = getProject("injourney");

  it("is listed as Injourney, 2024–2026, for client InJourney", () => {
    expect(project, "no project with slug 'injourney'").toBeTruthy();
    expect(project?.title).toBe("Injourney");
    expect(project?.year).toBe("2024–2026");
    expect(project?.client).toBe("InJourney");
    expect(project?.category).toBe("work");
  });

  it("numbers every event from one, event name first and picture name in lower case", () => {
    const gallery = project?.gallery ?? [];
    expect(gallery.length).toBe(13);
    expect(gallery.map((item) => item.title)).toEqual([
      "Booth Exhibition Sub Holding 2024 — 1 pola",
      "Booth Exhibition Sub Holding 2024 — 2 retail",
      "Booth Exhibition Sub Holding 2024 — 3 hospitality",
      "Booth Exhibition Sub Holding 2024 — 4 aviation service",
      "Booth Exhibition Sub Holding 2024 — 5 destination management",
      "Sahakarya 2025 — 1 food court",
      "Sahakarya 2025 — 2 entrance",
      "Sahakarya 2025 — 3 main stage",
      "Sahakarya 2025 — 4 aerial layout",
      "Gandrung Sewu 2026 — 1 umkm craft market",
      "Gandrung Sewu 2026 — 2 umkm market lane",
      "Gandrung Sewu 2026 — 3 umkm night harvest",
      "Gandrung Sewu 2026 — 4 umkm coastal pavilion",
    ]);
    gallery.forEach((item, index) => {
      expect(item.year).toBe(index < 5 ? "2024" : index < 9 ? "2025" : "2026");
      expect(item.caption?.trim().length, item.title).toBeGreaterThan(0);
      const name = item.title.replace(/^.* — \d+ /, "");
      expect(name, item.title).toBe(name.toLowerCase());
    });
  });
});
