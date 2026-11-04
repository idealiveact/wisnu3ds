import lobbyPis2023 from "@/assets/pertamina-pis-hut-ri-2023-lobby.jpg.asset.json";
import type { GalleryItem } from "@/data/projects";

/**
 * Foto pilihan untuk halaman Gallery Photo.
 * Tambahkan foto cukup dengan menambah objek ke array `photos`
 * (src, title, year, caption opsional, width & height asli gambar).
 */
export const galleryPhotos: GalleryItem[] = [
  {
    src: lobbyPis2023.url,
    title: "Pertamina International Shipping — Independence Day Display",
    year: "August 2023",
    caption:
      "A lobby installation for the 78th Independence Day: a transparent acrylic panel carrying the campaign slogan beside a tiered ocean diorama, with a tanker riding over layered coral reef, a whale shark, turtles and tropical fish.",
    width: 1448,
    height: 1086,
  },
];
