import teriosEv from "@/assets/personal-terios-ev-concept.png.asset.json";
import teriosEvFilm from "@/assets/personal-terios-ev-concept.mp4.asset.json";
import rangga1 from "@/assets/personal-rangga-concept-1.jpg.asset.json";
import rangga2 from "@/assets/personal-rangga-concept-2.jpg.asset.json";
import ranggaPhotoshop from "@/assets/personal-rangga-concept-photoshop.png.asset.json";
import lexyHeadlamp from "@/assets/personal-yamaha-lexy-headlamp.jpg.asset.json";
import lexyConcept from "@/assets/personal-yamaha-lexy-concept.jpg.asset.json";
import mt25One from "@/assets/personal-yamaha-mt25-1.png.asset.json";
import mt25Two from "@/assets/personal-yamaha-mt25-2.png.asset.json";
import mt25Assembly from "@/assets/personal-yamaha-mt25-assembly.mp4.asset.json";

import teriosPoster from "@/assets/poster-terios-ev-film.jpg";
import mt25Poster from "@/assets/poster-mt25-assembly-film.jpg";
import type { GalleryEntry } from "@/data/gallery";

/**
 * Entries for the Personal page — self-initiated hobby studies,
 * modelled in 3ds Max, rendered with V-Ray, finished with AI,
 * and shared on YouTube. Same shape as GalleryEntry so the
 * shared grid and lightbox can display them.
 */
export const personalEntries: GalleryEntry[] = [
  {
    kind: "photo",
    src: teriosEv.url,
    title: "Terios EV Concept — 3dsmax - Vray - AI",
    year: "",
    caption: "A hybrid Terios study shown as a cutaway, with the powertrain and floor battery packs visible.",
    width: 1672,
    height: 941,
  },
  {
    kind: "video",
    src: teriosEvFilm.url,
    poster: teriosPoster,
    title: "Terios EV Concept — 3dsmax - Vray - AI (film)",
    year: "",
    caption: "A short turntable of the EV study, modelled in 3ds Max and rendered with V-Ray.",
    width: 1280,
    height: 720,
  },
  {
    kind: "photo",
    src: rangga1.url,
    title: "Rangga Concept — 3dsmax - Vray - AI 1",
    year: "",
    caption: "A boxy off-road camper with a retro stripe, parked in a concrete studio.",
    width: 1365,
    height: 768,
  },
  {
    kind: "photo",
    src: rangga2.url,
    title: "Rangga Concept — 3dsmax - Vray - AI 2",
    year: "",
    caption: "The silver and sunset-stripe variants side by side under the studio fluorescents.",
    width: 1365,
    height: 768,
  },
  {
    kind: "photo",
    src: ranggaPhotoshop.url,
    title: "Rangga Concept — 3dsmax - Vray - Photoshop CS",
    year: "",
    caption: "A clean side elevation of the boxy SUV, finished in Photoshop.",
    width: 1200,
    height: 1200,
  },
  {
    kind: "photo",
    src: lexyHeadlamp.url,
    title: "Yamaha New Headlamp Lexy Concept — 3dsmax - Vray - AI render",
    year: "",
    caption: "A close study of the Lexy face: twin LED blades around a central lamp.",
    width: 1365,
    height: 768,
  },
  {
    kind: "photo",
    src: lexyConcept.url,
    title: "Yamaha New Lexy Concept — 3dsmax - Vray - AI render",
    year: "",
    caption: "The blue maxi-scooter concept with gold wheels in a dark studio.",
    width: 1365,
    height: 768,
  },
  {
    kind: "photo",
    src: mt25One.url,
    title: "Yamaha MT25 Concept — 3dsmax - Vray - AI render 1",
    year: "",
    caption: "The blue-and-silver naked bike concept, front three-quarter in soft studio light.",
    width: 1672,
    height: 941,
  },
  {
    kind: "photo",
    src: mt25Two.url,
    title: "Yamaha MT25 Concept — 3dsmax - Vray - AI render 2",
    year: "",
    caption: "The same study from behind, showing the tail and the blue wheels.",
    width: 1672,
    height: 941,
  },
  {
    kind: "video",
    src: mt25Assembly.url,
    poster: mt25Poster,
    title: "Yamaha MT25 Concept — 3dsmax - Vray - AI render assembly",
    year: "",
    caption: "The MT25 concept coming together piece by piece, rendered with V-Ray and AI.",
    width: 1280,
    height: 720,
  },
];
