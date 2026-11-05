import walkthrough2020 from "@/assets/samsung-note20-walkthrough-2020.mp4.asset.json";
import walkthrough2020Poster from "@/assets/samsung-note20-walkthrough-2020-poster.jpg.asset.json";
import lobbyPis2023 from "@/assets/pertamina-pis-hut-ri-2023-lobby.jpg.asset.json";
import sialPavilion2015 from "@/assets/sial-interfood-indofood-pavilion-2015.jpg.asset.json";
import sialPavilionFloor2015 from "@/assets/sial-interfood-indofood-pavilion-floor-2015.jpg.asset.json";
import prjRumahIndofoodNight from "@/assets/prj-rumah-indofood-night-2015.jpg.asset.json";
import bogasariIsland2017 from "@/assets/sial-interfood-bogasari-island-booth-2017.jpg.asset.json";
import bogasariAwards2017 from "@/assets/sial-interfood-bogasari-awards-2017.jpg.asset.json";
import ahm2018 from "@/assets/ahm-honda-jakarta-fair-2018.mp4.asset.json";
import ahm2018Poster from "@/assets/ahm-honda-jakarta-fair-2018-poster.jpg.asset.json";
import suzuki2023 from "@/assets/suzuki-iims-2023.mp4.asset.json";
import suzuki2023Poster from "@/assets/suzuki-iims-2023-poster.jpg.asset.json";
import suzuki2025 from "@/assets/suzuki-iims-ewx-2025.mp4.asset.json";
import suzuki2025Poster from "@/assets/suzuki-iims-ewx-2025-poster.jpg.asset.json";

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
    src: sialPavilionFloor2015.url,
    title: "SIAL Interfood — Pavilion Floor",
    year: "2015",
    caption: "Peak hours at the pavilion: visitors queueing at the pastry cases under the lantern line.",
    width: 1920,
    height: 1080,
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
    kind: "photo",
    src: bogasariAwards2017.url,
    title: "Three Years of Best Booth Awards",
    year: "2015–2017",
    caption: "Three plaques on the Bogasari counter — three consecutive years of best booth.",
    width: 1920,
    height: 1280,
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
    kind: "photo",
    src: lobbyPis2023.url,
    title: "Pertamina International Shipping — Independence Day Display",
    year: "August 2023",
    caption: "An acrylic slogan panel beside an ocean diorama with a tanker riding over a coral reef.",
    width: 1448,
    height: 1086,
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
];
