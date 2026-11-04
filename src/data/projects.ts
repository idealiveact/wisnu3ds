import hero from "@/assets/hero-activation-booth.jpg.asset.json";
import pertaminaTerminal from "@/assets/pertamina-hut-64-terminal.jpg.asset.json";
import pertaminaEnergyPark from "@/assets/pertamina-hut-64-energy-park-2021.jpg.asset.json";
import pertaminaOffshore from "@/assets/pertamina-hut-64-offshore-platform-2021.jpg.asset.json";
import pertaminaTss from "@/assets/pertamina-tss-virtual-2022.jpg.asset.json";
import pertaminaKeroncong from "@/assets/pertamina-keroncong-pavilion-2025.webp.asset.json";
import pertaminaEcorun from "@/assets/pertamina-ecorun-fest-booth-2025.jpg.asset.json";
import pertaminaKartiniStage from "@/assets/pertamina-kartini-stage-2025.jpg.asset.json";
import pertaminaPisHutRi from "@/assets/pertamina-pis-hut-ri-2023.jpg.asset.json";
import pertaminaJavaJazz from "@/assets/pertamina-java-jazz-booth-2024.jpg.asset.json";
import pertaminaPasarRakyatStage from "@/assets/pertamina-pasar-rakyat-stage-2026.webp.asset.json";
import samsungBooth1 from "@/assets/samsung-note20-booth-1.jpg.asset.json";
import samsungBooth2 from "@/assets/samsung-note20-booth-2.jpg.asset.json";
import samsungBooth3 from "@/assets/samsung-note20-booth-3.jpg.asset.json";
import samsungDealerBooth from "@/assets/samsung-digital-dealer-mini-booth-2017.jpg.asset.json";
import samsungTvAvInterior from "@/assets/samsung-tv-av-interior-2020.jpg.asset.json";
import samsungTvAvSeaside from "@/assets/samsung-tv-av-seaside-infinity-pool-2020.jpg.asset.json";
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
      "A collection of commercial visualization work for Pertamina from 2021 to 2026: anniversary key visuals, a virtual exhibition environment, event stages, festival displays and exhibition booths.",
    description:
      "An ongoing collaboration with Pertamina: anniversary key visuals, a virtual exhibition environment, and artwork for stages, festival displays and exhibition booths. Each piece asks the same thing of a 3D artist — take a very large, very technical company and reduce it to one image that people recognize at a glance.\n\nThe anniversary key visual lifts a working LPG terminal off the map and sets it on a floating island in the sky: two tankers moored at the jetty, a row of cylindrical storage tanks, spherical gas holders, the plant building, and a large Pertamina sign carved into the hillside. Water pours out of the inland bay and falls over the island's edge into the cloud layer below, which lets heavy infrastructure read as weightless without hiding any of the equipment that makes it real. Two companion studies from the same series — a floating \"Energy Park\" island and an offshore platform — sit beside it.\n\nThe rest of the gallery follows the same brief as the collaboration continues: Pertamina TSS Virtual, a hexagonal virtual exhibition environment whose floating districts stand for Human Capital, Asset Management, ICT, Master Data Operation and Shared Services; an Independence Day display for Pertamina International Shipping, where a tanker sails over a layered coral reef beneath the campaign slogan; a MyPertamina activation booth at the BNI Java Jazz Festival, built as a walkthrough of stepped arches, oversized speaker graphics and an LED light tunnel; a joglo-style Pertamina pavilion for Indonesia Keroncong Festival in Borobudur Magelang; a MyPertamina Ecorun Fest activation booth with a living green wall; the Pertamina Kartini stage built around the tagline \"Energi dari Hati\"; and MyPertamina Pasar Rakyat, an Independence Day market at Hutan Kota GBK Jakarta, shown here as its main stage.\n\nEverything in this group follows one pipeline: modelled and rendered in 3ds Max 2018 with V-Ray, then composited and finished in Photoshop, with graphic layout and print-ready artwork prepared in CorelDRAW.",
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
        src: pertaminaPisHutRi.url,
        title: "Pertamina International Shipping — Independence Day Display",
        year: "2023",
        caption: "Photo backdrop for the 78th Independence Day: a slogan panel beside a layered ocean diorama, with a tanker riding over a coral reef.",
        width: 1672,
        height: 940,
      },
      {
        src: pertaminaJavaJazz.url,
        title: "MyPertamina Java Jazz Festival — Activation Booth",
        year: "2024",
        caption: "Walkthrough activation stand with stepped arches, oversized speaker graphics, an LED light tunnel and a MyPertamina app screen.",
        width: 1672,
        height: 941,
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
    slug: "samsung",
    title: "SAMSUNG Project",
    category: "work",
    year: "2017–2020",
    client: "Samsung (office project)",
    role: "3D Artist",
    software: ["3ds Max 2018", "V-Ray", "Photoshop"],
    summary:
      "Samsung work from 2017 to 2020: a digital-dealer showroom stand, the Galaxy Note20 virtual launch booth, and lifestyle interior visualisations for the TV & AV line.",
    description:
      "A run of Samsung work from 2017 to 2020: a compact digital-dealer showroom stand, the Galaxy Note20 virtual launch booth, and interior visualisations made for the brand's TV & AV line.\n\nThe earliest piece is a small-footprint stand for a Samsung digital dealer: a curved structure in pale oak and white, edged in Samsung blue, with two demo stations — Smart Car and Gear VR — set under a curved canopy carrying illuminated 3D lettering, and a Gear S3 plinth to the side. Blue LED strip lighting around the base of the platform does most of the work at trade-show floor level, pulling people in from across a hall.\n\nThe Galaxy Note20 virtual booth is the largest of the group. The circular stand is wrapped by a floating rose-gold ring with light strips and a hexagonal light ceiling, echoing the Mystic Bronze colour of the phone. Inside are a central Galaxy Note20 display wall with an oversized S Pen, a 'Powerful Phone' demo counter, a 'Doodling Contest' area, and a 'Work & Play Experience' zone that pairs a lounge corner (Power to Work) with a racing-simulator gaming setup (Power to Play).\n\nThe TV & AV interiors take a different route: instead of a stand, the product is placed inside an aspirational home — a double-height residence foyer with a marble floor medallion, fluted columns, a gold sunburst mirror and a glass wall onto a tropical garden, and an oceanfront villa deck where a teak poolside runs to an infinity pool and a beach. Both are built as complete environments — furniture, planting, daylight and reflective surfaces — rather than a product shot on a plain background.\n\nEverything in this group follows one pipeline: modelled and rendered in 3ds Max 2018 with V-Ray, then composited and finished in Photoshop.",
    cover: samsungBooth1.url,
    shareImage: samsungPreview.url,
    gallery: [
      {
        src: samsungDealerBooth.url,
        title: "Digital Dealer Mini Booth",
        year: "2017",
        caption: "Compact Samsung Digital Showroom stand: Smart Car and Gear VR demo stations under an illuminated canopy, with a Gear S3 plinth and blue LED perimeter lighting.",
        width: 1524,
        height: 1032,
      },
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
      {
        src: samsungTvAvInterior.url,
        title: "TV & AV Campaign — Residence Foyer",
        year: "2020",
        caption: "Lifestyle interior for the TV & AV campaign: a double-height residence foyer with a marble floor medallion, fluted columns, a gold sunburst mirror and a glass wall onto a tropical garden.",
        width: 1672,
        height: 941,
      },
      {
        src: samsungTvAvSeaside.url,
        title: "TV & AV Campaign — Seaside Infinity Pool",
        year: "2020",
        caption: "Oceanfront villa deck: a teak poolside running to an infinity pool and a beach, with a timber entertainment unit holding an outdoor screen.",
        width: 1672,
        height: 941,
      },
    ],
  },
];

export const byCategory = (c: CategoryId) => projects.filter((p) => p.category === c);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const heroImage = hero.url;
export const heroShareImage = homePreview.url;
