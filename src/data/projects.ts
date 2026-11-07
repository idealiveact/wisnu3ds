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
import samsungJfc from "@/assets/samsung-jember-fashion-carnaval-2015.jpg.asset.json";
import samsungNote8 from "@/assets/samsung-note8-do-bigger-things-2017.jpg.asset.json";
import samsungHouseOfScreens from "@/assets/samsung-house-of-screens.jpg.asset.json";
import indofoodEntrance from "@/assets/indofood-rumah-indofood-entrance-2018.jpg.asset.json";
import indofoodScoreboard from "@/assets/indofood-rumah-indofood-scoreboard-2018.jpg.asset.json";
import indofoodPreview from "@/assets/indofood-preview.jpg.asset.json";
import injourneyPola from "@/assets/injourney-pola-2024.jpg.asset.json";
import injourneyRetail from "@/assets/injourney-retail-2024.jpg.asset.json";
import injourneyHospitality from "@/assets/injourney-hospitality-2024.jpg.asset.json";
import injourneyAviation from "@/assets/injourney-aviation-2024.jpg.asset.json";
import injourneyDestination from "@/assets/injourney-destination-2024.jpg.asset.json";
import injourneyPreview from "@/assets/injourney-preview.jpg.asset.json";
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
      "An ongoing collaboration with Pertamina: anniversary key visuals, a virtual exhibition environment, and artwork for stages, displays, and exhibition booths. The 64th-anniversary visual lifts a working LPG terminal onto a floating island above the clouds, with tankers at the jetty and a Pertamina sign carved into the hillside. Later work follows the same brief: Pertamina TSS Virtual, an Independence Day display for Pertamina International Shipping, a MyPertamina booth at the BNI Java Jazz Festival, a joglo pavilion at the Keroncong Festival, an Ecorun Fest stand, the Kartini stage, and the Pasar Rakyat main stage. All made in 3ds Max 2018 with V-Ray, then finished in Photoshop and CorelDRAW.",
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
    year: "2015–2020",
    client: "Samsung (office project)",
    role: "3D Artist",
    software: ["3ds Max 2018", "V-Ray", "Photoshop"],
    summary:
      "Samsung work from 2015 to 2020: a carnival activation booth, a digital-dealer showroom stand, a Galaxy Note8 photo experience, the Galaxy Note20 virtual launch booth, and showroom and lifestyle visualisations made for the brand's TV & AV campaign.",
    description:
      "A body of Samsung work from 2015 to 2020, built while in-house at an activation agency. It opens with the big Samsung Galaxy booth for Jember Fashion Carnaval, a compact digital-dealer stand with Smart Car and Gear VR demo stations, and a Galaxy Note8 'Do bigger things' photo experience drawn like a life-size pen sketch. In 2020 the brief moved online: the Galaxy Note20 virtual launch booth, a circular stand with a floating rose-gold ring, a presenter desk and 'Power to Work' and 'Power to Play' zones, followed by a showroom building and two lifestyle interiors made for the brand's TV & AV campaign. Everything was modelled and rendered in 3ds Max 2018 with V-Ray, then finished in Photoshop.",
    cover: samsungBooth1.url,
    shareImage: samsungPreview.url,
    gallery: [
      {
        src: samsungJfc.url,
        title: "Jember Fashion Carnaval — Galaxy Booth",
        year: "2015",
        caption: "Samsung Galaxy activation booth at Jember Fashion Carnaval: an open walkthrough stand with peacock and carnival-costume graphics, cyan light strips and phone display counters.",
        width: 1410,
        height: 752,
      },
      {
        src: samsungDealerBooth.url,
        title: "Digital Dealer Mini Booth",
        year: "2017",
        caption: "Compact Samsung Digital Showroom stand: Smart Car and Gear VR demo stations under an illuminated canopy, with a Gear S3 plinth and blue LED perimeter lighting.",
        width: 1524,
        height: 1032,
      },
      {
        src: samsungNote8.url,
        title: "Galaxy Note8 — 'Do Bigger Things' Photo Experience",
        year: "2017",
        caption: "Campaign photo spot: a life-size room drawn like a pen sketch, with a real framed screen at its centre and an oversized blue S Pen leaning against the set.",
        width: 1366,
        height: 768,
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
        src: samsungHouseOfScreens.url,
        title: "TV & AV Campaign — House of Screens",
        year: "2020",
        caption: "Campaign showroom building: a two-storey Samsung showroom with a glass corner facade, a timber entrance terrace and a 'House of Screens' monument sign, with The Frame TVs and large-format displays visible straight through the glass from the street.",
        width: 1672,
        height: 941,
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
  {
    slug: "indofood",
    title: "Indofood Project",
    category: "work",
    year: "2018",
    client: "Indofood",
    role: "3D Artist",
    software: ["3ds Max 2018", "V-Ray", "Photoshop", "CorelDRAW"],
    summary:
      "A 20 x 20 metre Rumah Indofood noodle pavilion at the Jakarta Fair (PRJ) 2018: a two-storey, stadium-shaped activation with noodle counters, brand displays and a roofline of flags.",
    description: `A 20 x 20 metre food pavilion built for Rumah Indofood at the Jakarta Fair (PRJ) in 2018: an open-air, two-storey structure shaped like a small stadium, with a circular plan, an open truss ring roof carried on round white pylons, and floodlight banks mounted along the ribs. The ground floor holds noodle serving counters and retail displays for Indomie, Pop Mie, Noodlez and PlenTop, while a mezzanine deck above is reached via the central staircase. Branding runs the full height of the build: a large stadium-shaped header reading "Rumah Indofood - Jelajah Kuliner Indonesia", a Garuda panel marking Sector 1, Indonesian and Indofood flags along the roofline, and a scoreboard showing 20 over 18.`,
    cover: indofoodEntrance.url,
    shareImage: indofoodPreview.url,
    gallery: [
      {
        src: indofoodEntrance.url,
        title: "Rumah Indofood — Main Pavilion",
        year: "2018",
        caption: "Front view of the 20 x 20 metre pavilion: the stadium-shaped \"Rumah Indofood - Jelajah Kuliner Indonesia\" header above a central staircase, a Garuda panel marking Sector 1, and Pop Mie, Indomie and PlenTop counters along the ground floor.",
        width: 1448,
        height: 1086,
      },
      {
        src: indofoodScoreboard.url,
        title: "Rumah Indofood — Scoreboard Corner",
        year: "2018",
        caption: "Corner of the same pavilion: a central scoreboard reading 20 and 18, flanked by two \"Rumah Indofood\" header signs, curved fascia panels for Pop Mie and Indomie, and PlenTop counters below.",
        width: 1448,
        height: 1086,
      },
    ],
  },
  {
    slug: "injourney",
    title: "Injourney",
    category: "work",
    year: "2024",
    client: "InJourney",
    role: "3D Artist",
    software: ["3ds Max 2018", "V-Ray", "Photoshop", "CorelDRAW"],
    summary:
      "Booth Exhibition Sub Holding 2024: a series of exhibition booths for InJourney and its four sub-holdings — Retail, Hospitality, Aviation and Destination Management — all built on one shared timber-arch pattern.",
    description:
      "A set of exhibition booths designed in 2024 for InJourney, the state-owned aviation and tourism holding and its four sub-holdings. The series opens with the pola: a study of curved timber arches that became the shared visual language of every stand. InJourney Retail presents travel fashion and merchandise under a woven canopy. InJourney Hospitality carries a yellow The Meru Bali counter beside panels of hotel and township figures. InJourney Aviation turns the arches into an airport lounge with a neon LOUNGE sign and a flight information board. InJourney Destination Management places a Borobudur diorama and TMII letters on a grass floor. Modelled in 3ds Max with V-Ray, finished in Photoshop.",
    cover: injourneyPola.url,
    shareImage: injourneyPreview.url,
    gallery: [
      {
        src: injourneyPola.url,
        title: "1 — Pola",
        year: "2024",
        caption: "The pattern study: curved timber arches arranged in four clusters, the shared visual language of every InJourney stand.",
        width: 1366,
        height: 768,
      },
      {
        src: injourneyRetail.url,
        title: "2 — InJourney Retail",
        year: "2024",
        caption: "Travel fashion and merchandise booth with a teal arch, a woven canopy pergola and a \"Transforming Travel into Experiences\" screen.",
        width: 1672,
        height: 941,
      },
      {
        src: injourneyHospitality.url,
        title: "3 — InJourney Hospitality",
        year: "2024",
        caption: "Hospitality stand with a yellow The Meru Bali counter and stools, beside panels of hotel, township and workforce figures.",
        width: 1672,
        height: 941,
      },
      {
        src: injourneyAviation.url,
        title: "4 — InJourney Aviation",
        year: "2024",
        caption: "Airport lounge booth with a neon LOUNGE sign, a flight information board and circular seating under the timber arches.",
        width: 1672,
        height: 940,
      },
      {
        src: injourneyDestination.url,
        title: "5 — InJourney Destination Management",
        year: "2024",
        caption: "Destination management stand: a Borobudur diorama and TMII letters on a grass floor, framed by Smart, Culture and Green Tour cubes.",
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
