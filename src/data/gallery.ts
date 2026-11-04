import walkthrough2020 from "@/assets/samsung-note20-walkthrough-2020.mp4.asset.json";
import walkthrough2020Poster from "@/assets/samsung-note20-walkthrough-2020-poster.jpg.asset.json";
import lobbyPis2023 from "@/assets/pertamina-pis-hut-ri-2023-lobby.jpg.asset.json";

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
