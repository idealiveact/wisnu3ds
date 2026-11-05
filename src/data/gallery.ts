import walkthrough2020 from "@/assets/samsung-note20-walkthrough-2020.mp4.asset.json";
import walkthrough2020Poster from "@/assets/samsung-note20-walkthrough-2020-poster.jpg.asset.json";
import lobbyPis2023 from "@/assets/pertamina-pis-hut-ri-2023-lobby.jpg.asset.json";
import sialPavilion2015 from "@/assets/sial-interfood-indofood-pavilion-2015.jpg.asset.json";
import sialPavilionFloor2015 from "@/assets/sial-interfood-indofood-pavilion-floor-2015.jpg.asset.json";
import prjRumahIndofoodNight from "@/assets/prj-rumah-indofood-night-2015.jpg.asset.json";
import bogasariIsland2017 from "@/assets/sial-interfood-bogasari-island-booth-2017.jpg.asset.json";
import bogasariAwards2017 from "@/assets/sial-interfood-bogasari-awards-2017.jpg.asset.json";

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
    caption:
      "A temple-roof pavilion for the Indofood group at SIAL Interfood: a swept, blue-tiled pagoda roof hung with red lanterns above open bakery counters carrying Palmia and Indomilk, with the Indofood sign on the white pavilion beside it.",
    width: 1920,
    height: 1280,
  },
  {
    kind: "photo",
    src: sialPavilionFloor2015.url,
    title: "SIAL Interfood — Pavilion Floor",
    year: "2015",
    caption:
      "The same pavilion at peak hours: visitors lined up at the glass pastry cases and refrigerated displays under the painted rafters, with video screens and the lantern line running above the counter.",
    width: 1920,
    height: 1080,
  },
  {
    kind: "photo",
    src: prjRumahIndofoodNight.url,
    title: "Rumah Indofood at the Jakarta Fair — Night",
    year: "2015",
    caption:
      "The two-storey Rumah Indofood pavilion after dark: winged \"Jelajah Kuliner Indonesia\" signs either side of a glowing Indomie screen, food counters and menu lightboxes wrapping the ground floor, and the crowd moving past in long exposure.",
    width: 1920,
    height: 1280,
  },
  {
    kind: "photo",
    src: bogasariIsland2017.url,
    title: "SIAL Interfood — Bogasari Island Booth",
    year: "2017",
    caption:
      "A circular blue-and-white island booth for Bogasari: a curved canopy with illuminated lettering, a hot-air-balloon display dressed with country names and brand marks, and a central island of bread and pastries under angled screens.",
    width: 1920,
    height: 1440,
  },
  {
    kind: "photo",
    src: bogasariAwards2017.url,
    title: "Three Years of Best Booth Awards",
    year: "2015–2017",
    caption:
      "Three plaques side by side on the Bogasari counter: Best Stand Award, Best Stand Design at SIAL Interfood Indonesia 2016, and Favourite Stand at SIAL Interfood Indonesia 2017 — three consecutive years of best booth.",
    width: 1920,
    height: 1280,
  },
  {
    kind: "video",
    src: walkthrough2020.url,
    poster: walkthrough2020Poster.url,
    title: "Galaxy Note20 Virtual Booth — Walkthrough Film",
    year: "September 2020",
    caption:
      "A one-minute twenty-one second camera walkthrough of the Galaxy Note20 virtual launch booth: past the rose-gold ring and the central display wall, through the 'Power to Work' lounge, the 'Power to Play' racing simulator, and the Galaxy Creation doodling station with its oversized S Pen.",
    width: 1920,
    height: 1080,
  },
  {
    kind: "photo",
    src: lobbyPis2023.url,
    title: "Pertamina International Shipping — Independence Day Display",
    year: "August 2023",
    caption:
      "A lobby installation for the 78th Independence Day: a transparent acrylic panel carrying the campaign slogan beside a tiered ocean diorama, with a tanker riding over layered coral reef, a whale shark, turtles and tropical fish.",
    width: 1448,
    height: 1086,
  },
];
