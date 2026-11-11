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

// The Suzuki folder holds the IIMS booths across four years: three renders of
// the 2022 stand, two of 2023, two of the 2024 booth, then three of the 2025
// stand, sorted by year and numbered within each event. Wisnu's rule: the first
// 2025 photo carries just its number.
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
      "Booth Exhibition IIMS 2022 — 2 cafeteria",
      "Booth Exhibition IIMS 2022 — 3 beach zone",
      "Booth Exhibition IIMS 2023 — 1 front view",
      "Booth Exhibition IIMS 2023 — 2 Bird View",
      "SUZUKI BOOTH EXHIBITION 2024 — 1 main display",
      "SUZUKI BOOTH EXHIBITION 2024 — 2 jimny off-road zone",
      "SUZUKI BOOTH EXHIBITION IIMS 2025 — 1",
      "SUZUKI BOOTH EXHIBITION IIMS 2025 — 2 collection corner",
      "SUZUKI BOOTH EXHIBITION IIMS 2025 — 3 safety support",
    ]);
    const expectedYears = ["2022", "2022", "2022", "2023", "2023", "2024", "2024", "2025", "2025", "2025"];
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

  it("is listed as Indofood Project, 2015–2018, for client Indofood", () => {
    expect(project, "no project with slug 'indofood'").toBeTruthy();
    expect(project?.title).toBe("Indofood Project");
    expect(project?.year).toBe("2015–2018");
    expect(project?.client).toBe("Indofood");
    expect(project?.category).toBe("work");
  });

  it("shows six labelled renders oldest first, the 2018 pavilion still the cover", () => {
    const gallery = project?.gallery ?? [];
    expect(gallery.map((item) => item.title)).toEqual([
      "Booth PRJ 2015 — UMKM zone layout",
      "Booth PRJ 2016 — UMKM zone layout",
      "Bogasari — 1 three booth themes",
      "Rumah Indofood — Main Pavilion",
      "Rumah Indofood — Scoreboard Corner",
      "Booth PRJ 2018 — UMKM zone layout",
    ]);
    const expectedYears = ["2015", "2016", "2015–2017", "2018", "2018", "2018"];
    gallery.forEach((item, index) => {
      expect(item.year, item.title).toBe(expectedYears[index]);
      expect(item.caption?.trim().length, item.title).toBeGreaterThan(0);
      expect(Number.isInteger(item.width), item.title).toBe(true);
      expect(Number.isInteger(item.height), item.title).toBe(true);
      const [, , name = ""] = item.title.match(/^(.*) — \d+ (.*)$/) ?? [];
      if (name) expect(name, item.title).toBe(name.toLowerCase());
    });
    expect(project?.cover).toBe(gallery[3]?.src);
  });
});

// The Others folder gathers the coffee house interior and the smaller riding-gear
// and helmet booths that do not belong to a single big client: 2017 to 2026.
describe("Others entry", () => {
  const project = getProject("others");

  it("is listed as Others, 2017–2026", () => {
    expect(project, "no project with slug 'others'").toBeTruthy();
    expect(project?.title).toBe("Others");
    expect(project?.year).toBe("2017–2026");
    expect(project?.category).toBe("work");
  });

  it("shows nine labelled renders, the coffee house first", () => {
    const gallery = project?.gallery ?? [];
    expect(gallery.map((item) => item.title)).toEqual([
      "Waroeng Caffe 27 — 1 dining lounge",
      "Waroeng Caffe 27 — 2 lounge to bar",
      "Waroeng Caffe 27 — 3 espresso bar",
      "Waroeng Caffe 27 — 4 entrance counter",
      "Waroeng Caffe 27 — 5 reading corner",
      "Deride 2022 — 1 smk & studds helmets booth",
      "Juragan Helm 2025 — 1 macna & hjc booth",
      "Juragan Helm 2026 — 1 airoh, macna, hjc & xpd booth",
      "Deride 2026 — 1 multi-brand booth",
    ]);
    for (const item of gallery) {
      expect(item.title.trim().length, item.src).toBeGreaterThan(3);
      expect(item.caption?.trim().length, item.title).toBeGreaterThan(0);
      expect(Number.isInteger(item.width), item.title).toBe(true);
      expect(Number.isInteger(item.height), item.title).toBe(true);
    }
    for (const item of gallery.slice(0, 5)) {
      const name = item.title.replace(/^.* — \d+ /, "");
      expect(name, item.title).toBe(name.toLowerCase());
      expect(item.year, item.title).toBe("2017");
    }
    const allYears = gallery.map((item) => Number(item.year));
    expect([...allYears].sort((a, b) => a - b)).toEqual(allYears);
  });

  it("opens the folder on the coffee house", () => {
    const gallery = project?.gallery ?? [];
    expect(project?.cover).toBe(gallery[0]?.src);
  });

  it("names the coffee house in the opening paragraph", () => {
    expect(project?.description).toContain("Waroeng Caffe 27");
  });
});

// The Astra Honda Motor folder holds the Honda booths of 2018 and 2019:
// PRJ 2018 (two facades), IIMS 2019 (four views), GIASS 2019, then PRJ 2019
// (two facade studies), sorted by year and numbered within each event.
describe("Astra Honda Motor entry", () => {
  const project = getProject("astra-honda-motor");

  it("is listed as Astra Honda Motor, 2018–2019, for client Astra Honda Motor", () => {
    expect(project, "no project with slug 'astra-honda-motor'").toBeTruthy();
    expect(project?.title).toBe("Astra Honda Motor");
    expect(project?.year).toBe("2018–2019");
    expect(project?.client).toBe("Astra Honda Motor");
    expect(project?.category).toBe("work");
  });

  it("shows nine labelled renders sorted by year, PRJ 2018 first then IIMS, GIASS and PRJ 2019", () => {
    const gallery = project?.gallery ?? [];
    expect(gallery.map((item) => item.title)).toEqual([
      "Booth PRJ 2018 — 1 main facade",
      "Booth PRJ 2018 — 2 side facade",
      "Booth Exhibition IIMS 2019 — 1 full booth",
      "Booth Exhibition IIMS 2019 — 2 main stage",
      "Booth Exhibition IIMS 2019 — 3 lounge",
      "Booth Exhibition IIMS 2019 — 4 cafe corner",
      "Booth Exhibition GIASS 2019 — 1 main facade",
      "Booth PRJ 2019 — 1 red facade",
      "Booth PRJ 2019 — 2 black facade",
    ]);
    const expectedYears = ["2018", "2018", "2019", "2019", "2019", "2019", "2019", "2019", "2019"];
    gallery.forEach((item, index) => {
      expect(item.year).toBe(expectedYears[index]);
      expect(item.caption?.trim().length, item.title).toBeGreaterThan(0);
      expect(Number.isInteger(item.width), item.title).toBe(true);
      expect(Number.isInteger(item.height), item.title).toBe(true);
      const name = item.title.replace(/^.* — \d+ /, "");
      expect(name, item.title).toBe(name.toLowerCase());
    });
  });

  it("opens the folder on the IIMS 2019 full booth view", () => {
    expect(project?.cover).toBe(project?.gallery[2]?.src);
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
