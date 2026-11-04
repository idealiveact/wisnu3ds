import hero from "@/assets/hero-activation-booth.jpg.asset.json";
import pertaminaTerminal from "@/assets/pertamina-hut-64-terminal.jpg.asset.json";
import pertaminaEnergyPark from "@/assets/pertamina-hut-64-energy-park-2021.jpg.asset.json";
import pertaminaOffshore from "@/assets/pertamina-hut-64-offshore-platform-2021.jpg.asset.json";
import pertaminaTss from "@/assets/pertamina-tss-virtual-2022.jpg.asset.json";
import pertaminaKeroncong from "@/assets/pertamina-keroncong-pavilion-2025.webp.asset.json";
import pertaminaEcorun from "@/assets/pertamina-ecorun-fest-booth-2025.jpg.asset.json";
import pertaminaKartiniStage from "@/assets/pertamina-kartini-stage-2025.jpg.asset.json";
import pertaminaKartiniGate from "@/assets/pertamina-kartini-gate-2025.jpg.asset.json";
import pertaminaPasarRakyatGate from "@/assets/pertamina-pasar-rakyat-gate-2026.jpg.asset.json";
import pertaminaPasarRakyatStage from "@/assets/pertamina-pasar-rakyat-stage-2026.webp.asset.json";
import samsungBooth1 from "@/assets/samsung-note20-booth-1.jpg.asset.json";
import samsungBooth2 from "@/assets/samsung-note20-booth-2.jpg.asset.json";
import samsungBooth3 from "@/assets/samsung-note20-booth-3.jpg.asset.json";
import homePreview from "@/assets/home-preview-activation.jpg.asset.json";
import pertaminaPreview from "@/assets/pertamina-preview.jpg.asset.json";
import samsungPreview from "@/assets/samsung-preview.jpg.asset.json";

/**
 * Tambahkan project baru cukup dengan menambah objek ke array `projects`.
 * Ganti gambar placeholder dengan file di src/assets lalu import di atas.
 * Setiap gambar galeri punya label judul + tahun (wajib) dan caption (opsional),
 * supaya pengunjung bisa membedakan satu render dengan render lainnya.
 */
export type CategoryId = "work";

export const categories: Record<CategoryId, { label: string; path: "/work"; intro: string }> = {
  work: { label: "Work", path: "/work", intro: "Commercial visualization & client projects." },
};

export interface GalleryItem {
  /** URL gambar (asset CDN atau import dari src/assets). */
  src: string;
  /** Label judul yang tampil di bawah gambar. */
  title: string;
  /** Tahun render/produksi gambar ini. */
  year: string;
  /** Keterangan singkat opsional (lokasi, tanggal, isi scene). */
  caption?: string;
  /** Dimensi asli gambar, dipakai agar tidak terpotong dan layout tidak melompat. */
  width: number;
  height: number;
}

export interface Project {
  slug: string;
  title: string;
  category: CategoryId;
  year: string;
  client: string;
  role: string;
  software: string[];
  summary: string;
  description: string;
  cover: string;
  /** A 1200×630 rendition of the cover for search and sharing. */
  shareImage: string;
  gallery: GalleryItem[];
}

export const projects: Project[] = [
  {
    slug: "pertamina",
    title: "Several Pertamina Projects",
    category: "work",
    year: "2021–2026",
    client: "Pertamina",
    role: "3D Artist",
    software: ["3ds Max 2018", "V-Ray", "Photoshop", "CorelDRAW"],
    summary:
      "A collection of commercial visualization work for Pertamina from 2021 to 2026: anniversary key visuals, a virtual exhibition environment, event stages, entrance gates and exhibition booths.",
    description:
      "An ongoing collaboration with Pertamina: anniversary key visuals, a virtual exhibition environment, and artwork for stages, entrance gates and exhibition booths. Each piece asks the same thing of a 3D artist — take a very large, very technical company and reduce it to one image that people recognize at a glance.\n\nThe anniversary key visual lifts a working LPG terminal off the map and sets it on a floating island in the sky: two tankers moored at the jetty, a row of cylindrical storage tanks, spherical gas holders, the plant building, and a large Pertamina sign carved into the hillside. Water pours out of the inland bay and falls over the island's edge into the cloud layer below, which lets heavy infrastructure read as weightless without hiding any of the equipment that makes it real. Two companion studies from the same series — a floating \"Energy Park\" island and an offshore platform — sit beside it.\n\nThe rest of the gallery follows the same brief as the collaboration continues: Pertamina TSS Virtual, a hexagonal virtual exhibition environment whose floating districts stand for Human Capital, Asset Management, ICT, Master Data Operation and Shared Services; a joglo-style Pertamina pavilion for Indonesia Keroncong Festival in Borobudur Magelang; a MyPertamina Ecorun Fest activation booth with a living green wall; the Pertamina Kartini stage and entrance gate built around the tagline \"Energi dari Hati\"; and MyPertamina Pasar Rakyat, an Independence Day market at Hutan Kota GBK Jakarta, shown here as its bamboo-wrapped entrance gate and its main stage.\n\nEverything in this group follows one pipeline: modelled and rendered in 3ds Max 2018 with V-Ray, then composited and finished in Photoshop, with graphic layout and print-ready artwork prepared in CorelDRAW.",
    cover: pertaminaTerminal.url,
    shareImage: pertaminaPreview.url,
    gallery: [
      {
        src: pertaminaTerminal.url,
        title: "64th Anniversary — Floating LPG Terminal",
        year: "2021",
        caption: "Key visual for Pertamina's 64th anniversary: a working LPG terminal lifted onto a floating island above the cloud layer.",
        width: 1366,
        height: 768,
      },
      {
        src: pertaminaEnergyPark.url,
        title: "64th Anniversary — Energy Park",
        year: "2021",
        caption: "Floating festival island with a Ferris wheel, concert stage, games corner and a solar yacht at the dock.",
        width: 1920,
        height: 1080,
      },
      {
        src: pertaminaOffshore.url,
        title: "64th Anniversary — Offshore Platform",
        year: "2021",
        caption: "Offshore platform study from the same anniversary series.",
        width: 1280,
        height: 720,
      },
      {
        src: pertaminaTss.url,
        title: "Pertamina TSS Virtual",
        year: "2022",
        caption: "Virtual exhibition environment: hexagonal districts for Human Capital, Asset Management, ICT, Master Data Operation and Shared Services.",
        width: 1920,
        height: 1080,
      },
      {
        src: pertaminaKeroncong.url,
        title: "Indonesia Keroncong Festival Pavilion",
        year: "2025",
        caption: "Joglo-style pavilion with an espresso bar and LED backdrop, Borobudur Magelang, 16 December 2025.",
        width: 1672,
        height: 941,
      },
      {
        src: pertaminaEcorun.url,
        title: "MyPertamina Ecorun Fest Booth",
        year: "2025",
        caption: "Points-redemption activation booth with a living green wall and an \"Energizing You\" neon sign.",
        width: 1672,
        height: 941,
      },
      {
        src: pertaminaKartiniStage.url,
        title: "Pertamina Kartini — Stage",
        year: "2025",
        caption: "\"Energi dari Hati\" stage set with layered arches, batik cloud motifs and 3D floral sculptures.",
        width: 1672,
        height: 940,
      },
      {
        src: pertaminaKartiniGate.url,
        title: "Pertamina Kartini — Entrance Gate",
        year: "2025",
        caption: "Foyer facade framing two portals with batik motifs, a neon flower outline and a 3D lotus.",
        width: 1672,
        height: 940,
      },
      {
        src: pertaminaPasarRakyatGate.url,
        title: "MyPertamina Pasar Rakyat — Entrance Gate",
        year: "2026",
        caption: "Bamboo-wrapped archway at Hutan Kota GBK Jakarta, 16–17 August 2026.",
        width: 1280,
        height: 720,
      },
      {
        src: pertaminaPasarRakyatStage.url,
        title: "MyPertamina Pasar Rakyat — Main Stage",
        year: "2026",
        caption: "\"Pesta Meriah, Hadiah Melimpah!\" — truss stage with line arrays and mascot fascia panels.",
        width: 1671,
        height: 941,
      },
    ],
  },
  {
    slug: "samsung-note20-virtual-booth",
    title: "Samsung Galaxy Note20 Virtual Booth",
    category: "work",
    year: "2020",
    client: "Samsung (office project)",
    role: "3D Artist",
    software: ["3ds Max 2018", "V-Ray", "Photoshop"],
    summary: "A rose-gold virtual exhibition booth for the Samsung Galaxy Note20 launch.",
    description:
      "A virtual exhibition booth designed for the Samsung Galaxy Note20 launch in 2020. The circular stand is wrapped by a floating rose-gold ring with light strips and a hexagonal light ceiling, echoing the Mystic Bronze colour of the phone. Inside are a central Galaxy Note20 display wall with an oversized S Pen, a 'Powerful Phone' demo counter, a 'Doodling Contest' area, and a 'Work & Play Experience' zone that pairs a lounge corner (Power to Work) with a racing-simulator gaming setup (Power to Play). Modelled and rendered in 3ds Max 2018 with V-Ray, finished in Photoshop.",
    cover: samsungBooth1.url,
    shareImage: samsungPreview.url,
    gallery: [
      {
        src: samsungBooth1.url,
        title: "Full Booth Overview",
        year: "2020",
        caption: "Front view of the circular stand, its floating rose-gold ring and the central Galaxy Note20 display wall.",
        width: 1920,
        height: 1080,
      },
      {
        src: samsungBooth2.url,
        title: "Presenter Desk & S Pen",
        year: "2020",
        caption: "Central presenter desk with the oversized S Pen and the phone display station.",
        width: 1920,
        height: 1080,
      },
      {
        src: samsungBooth3.url,
        title: "Work & Play Experience",
        year: "2020",
        caption: "The 'Power to Work' lounge corner beside the 'Power to Play' racing simulator.",
        width: 1920,
        height: 1080,
      },
    ],
  },
];

export const byCategory = (c: CategoryId) => projects.filter((p) => p.category === c);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const heroImage = hero.url;
export const heroShareImage = homePreview.url;
