import walkthrough2020 from "@/assets/samsung-note20-walkthrough-2020.mp4.asset.json";
import walkthrough2020Poster from "@/assets/optimized/samsung-note20-walkthrough-2020-poster.webp.asset.json";
import sialPavilion2015 from "@/assets/optimized/sial-interfood-indofood-pavilion-2015.webp.asset.json";
import prjRumahIndofoodNight from "@/assets/optimized/prj-rumah-indofood-night-2015.webp.asset.json";
import bogasariIsland2017 from "@/assets/sial-interfood-bogasari-island-booth-2017.jpg.asset.json";
import ahm2018 from "@/assets/ahm-honda-jakarta-fair-2018.mp4.asset.json";
import ahm2018Poster from "@/assets/optimized/ahm-honda-jakarta-fair-2018-poster.webp.asset.json";
import suzuki2023 from "@/assets/suzuki-iims-2023.mp4.asset.json";
import suzuki2023Poster from "@/assets/optimized/suzuki-iims-2023-poster.webp.asset.json";
import suzuki2025 from "@/assets/suzuki-iims-ewx-2025.mp4.asset.json";
import suzuki2025Poster from "@/assets/optimized/suzuki-iims-ewx-2025-poster.webp.asset.json";
import sahakaryaPavilion2025 from "@/assets/injourney-sahakarya-pavilion-2025.jpg.asset.json";
import sahakaryaCanopy2025 from "@/assets/injourney-sahakarya-canopy-2025.jpg.asset.json";
import indofoodFacade2018 from "@/assets/optimized/indofood-rumah-indofood-facade-2018.webp.asset.json";
import ahmBigbikeLounge2018 from "@/assets/optimized/ahm-jakarta-fair-2018-bigbike-lounge.webp.asset.json";
import ahmFacadeNight2019 from "@/assets/optimized/ahm-jakarta-fair-2019-facade-night.webp.asset.json";
import ahmGiassGenio2019 from "@/assets/optimized/ahm-giass-2019-genio-floor.webp.asset.json";
import suzukiHybridMall2022 from "@/assets/optimized/suzuki-ertiga-hybrid-mall-2022.webp.asset.json";
import natashaHairSeries from "@/assets/optimized/natasha-hair-series-mall-stage.webp.asset.json";

/**
 * Entri untuk halaman Gallery.
 *
 * Foto:  { kind: "photo", src, title, year, caption, width, height }
 * Film:  { kind: "video", src, poster, title, year, caption, width, height }
 *
 * Tambahkan cukup dengan menambah objek ke array `galleryEntries`.
 * width & height memakai dimensi asli media supaya layout tidak melompat.
 */
export interface GalleryEntry {
  kind: "photo" | "video";
  src: string;
  /** Gambar pembuka untuk film; wajib ada agar kartu film tidak pernah kosong. */
  poster?: string;
  title: string;
  year: string;
  caption?: string;
  width: number;
  height: number;
}

export const galleryEntries: GalleryEntry[] = [
  {
    kind: "photo",
    src: sialPavilion2015.url,
    title: "SIAL Interfood — Palmia Pavilion",
    year: "2015",
    caption: "A blue-tiled pagoda roof hung with red lanterns above Palmia and Indomilk bakery counters.",
    width: 1920,
    height: 1280,
  },
  {
    kind: "photo",
    src: prjRumahIndofoodNight.url,
    title: "Rumah Indofood at the Jakarta Fair — Night",
    year: "2015",
    caption: "The two-storey pavilion after dark, its Indomie screen glowing above the food counters.",
    width: 1920,
    height: 1280,
  },
  {
    kind: "photo",
    src: bogasariIsland2017.url,
    title: "SIAL Interfood — Bogasari Island Booth",
    year: "2017",
    caption: "A round blue-and-white booth with a hot-air-balloon display and a central bread island.",
    width: 1920,
    height: 1440,
  },
  {
    kind: "video",
    src: ahm2018.url,
    poster: ahm2018Poster.url,
    title: "Astra Honda Motor at the Jakarta Fair",
    year: "June 2018",
    caption: "A walk through the red-and-white Honda hall: a high steel roof, hanging lights and busy crowds.",
    width: 1280,
    height: 720,
  },
  {
    kind: "video",
    src: walkthrough2020.url,
    poster: walkthrough2020Poster.url,
    title: "Galaxy Note20 Virtual Booth — Walkthrough Film",
    year: "September 2020",
    caption: "A camera walkthrough of the Note20 virtual booth, from the display wall to the S Pen station.",
    width: 1920,
    height: 1080,
  },
  {
    kind: "video",
    src: suzuki2023.url,
    poster: suzuki2023Poster.url,
    title: "Suzuki Booth Exhibition at IIMS",
    year: "February 2023",
    caption: "The stage reveal at the Suzuki booth, with a new SUV unveiled before a crowd of cameras.",
    width: 1920,
    height: 1080,
  },
  {
    kind: "video",
    src: suzuki2025.url,
    poster: suzuki2025Poster.url,
    title: "Suzuki eWX Reveal at IIMS",
    year: "February 2025",
    caption: "The eWX concept unveiled on a glowing green turntable beneath a wide LED screen.",
    width: 1920,
    height: 1080,
  },
  {
    kind: "photo",
    src: sahakaryaPavilion2025.url,
    title: "Injourney Sahakarya 2025 — Festival Pavilion",
    year: "2025",
    caption: "The open-air pavilion on the lawn, framed by penjor poles and shaded by the old trees.",
    width: 1280,
    height: 720,
  },
  {
    kind: "photo",
    src: sahakaryaCanopy2025.url,
    title: "Injourney Sahakarya 2025 — Under the Canopy",
    year: "2025",
    caption: "Guests in traditional dress beneath the rattan canopy, with the temple rising behind.",
    width: 1280,
    height: 854,
  },
  {
    kind: "photo",
    src: indofoodFacade2018.url,
    title: "Rumah Indofood at the Jakarta Fair — Facade",
    year: "2018",
    caption: "The white facade under its blue dome roof, with Sarimi banners over the entrance.",
    width: 1920,
    height: 1440,
  },
  {
    kind: "photo",
    src: ahmBigbikeLounge2018.url,
    title: "Astra Honda Motor at the Jakarta Fair — Big Bike Lounge",
    year: "2018",
    caption: "The big bike lounge, with the Gold Wing on its platform under warm spotlights.",
    width: 1920,
    height: 1280,
  },
  {
    kind: "photo",
    src: ahmFacadeNight2019.url,
    title: "Astra Honda Motor at the Jakarta Fair — Night Facade",
    year: "2019",
    caption: "The white booth at night, its red wing logo lit above the entrance.",
    width: 1920,
    height: 1286,
  },
  {
    kind: "photo",
    src: ahmGiassGenio2019.url,
    title: "Honda at GIASS — Genio Floor",
    year: "2019",
    caption: "Crowds around the Genio display on the Honda floor.",
    width: 1536,
    height: 1024,
  },
  {
    kind: "photo",
    src: suzukiHybridMall2022.url,
    title: "Suzuki Ertiga Hybrid — Mall Exhibition",
    year: "2022",
    caption: "The Ertiga Hybrid display seen from the mall's upper floor.",
    width: 1920,
    height: 1280,
  },
  {
    kind: "photo",
    src: natashaHairSeries.url,
    title: "Natasha Hair Series — Mall Atrium Stage",
    year: "—",
    caption: "The Natasha Hair Series stage and seating, filling the mall atrium.",
    width: 1536,
    height: 1024,
  },
];

/**
 * Display order for the Gallery page: films first, then photos.
 * Each group keeps the order it was written in, so adding a film or a
 * photo never disturbs the other group. The grid and the full-size viewer
 * both read this array, so clicking a card always opens the right entry.
 */
export const galleryOrdered: GalleryEntry[] = [
  ...galleryEntries.filter((entry) => entry.kind === "video"),
  ...galleryEntries.filter((entry) => entry.kind === "photo"),
];
