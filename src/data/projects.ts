import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import hero from "@/assets/hero.jpg";
import pertaminaTerminal from "@/assets/pertamina-hut-64-terminal.jpg.asset.json";

/**
 * Tambahkan project baru cukup dengan menambah objek ke array `projects`.
 * Ganti gambar placeholder dengan file di src/assets lalu import di atas.
 */
export type CategoryId = "work" | "technical-art" | "personal";

export const categories: Record<CategoryId, { label: string; path: "/work" | "/technical-art" | "/personal"; intro: string }> = {
  work: { label: "Work", path: "/work", intro: "Commercial visualization & client projects." },
  "technical-art": { label: "Technical Art", path: "/technical-art", intro: "Shaders, tools, rigs and procedural systems." },
  personal: { label: "Personal Projects", path: "/personal", intro: "Experiments and self-initiated worlds." },
};

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
  gallery: string[];
}

export const projects: Project[] = [
  {
    slug: "pertamina-hut-64",
    title: "Pertamina HUT ke-64",
    category: "work",
    year: "2021",
    client: "Pertamina",
    role: "3D Artist",
    software: ["3ds Max 2018", "V-Ray", "Photoshop", "CorelDRAW"],
    summary:
      "A floating LPG terminal suspended above the clouds, made for Pertamina's 64th anniversary.",
    description:
      "A commemorative visualization built for Pertamina's 64th anniversary in 2021. The scene lifts a working LPG terminal off the map and sets it on a floating island in the sky: two tankers moored at the jetty, a row of cylindrical storage tanks, spherical gas holders, the plant building, and a large Pertamina sign carved into the hillside. Water pours out of the inland bay and falls over the island's edge into the cloud layer below. Modelled and rendered in 3ds Max 2018 with V-Ray, then composited and finished in Photoshop, with the anniversary graphic layout prepared in CorelDRAW.",
    cover: pertaminaTerminal.url,
    gallery: [pertaminaTerminal.url],
  },
  { slug: "sonic-product", title: "Sonic Product Launch", category: "work", year: "2025", client: "Audio Brand Co.", role: "Product Artist", software: ["Blender", "Cycles", "Substance Painter"], summary: "Hero product renders for a headphone launch campaign.", description: "Placeholder description. Describe modelling accuracy, shading pipeline and campaign usage.", cover: p1, gallery: [p1, hero, p2] },
  { slug: "cyber-bust", title: "Cyber Bust Shader Study", category: "technical-art", year: "2025", client: "Internal R&D", role: "Technical Artist", software: ["ZBrush", "Houdini", "Unreal Engine"], summary: "Procedural wear shader and turntable rig.", description: "Placeholder description. Document the node setup, performance targets and reusable tools.", cover: p2, gallery: [p2, p1] },
  { slug: "procedural-forest", title: "Procedural Forest Tool", category: "technical-art", year: "2024", client: "Game Studio X", role: "Tools Developer", software: ["Houdini", "Unreal Engine", "Python"], summary: "Scatter system for large forest biomes.", description: "Placeholder description. Explain the HDA parameters, artist workflow and results.", cover: p3, gallery: [p3, hero] },
  { slug: "lantern-shrine", title: "Lantern Shrine", category: "personal", year: "2026", client: "Personal", role: "Environment Artist", software: ["Unreal Engine", "Megascans", "Blender"], summary: "Misty forest shrine at dusk.", description: "Placeholder description. Share the story, references and what you learned.", cover: p3, gallery: [p3, p2, hero] },
  { slug: "quiet-concrete", title: "Quiet Concrete", category: "personal", year: "2024", client: "Personal", role: "3D Artist", software: ["Blender", "Eevee"], summary: "Mood study on light and mass.", description: "Placeholder description.", cover: hero, gallery: [hero, p1] },
];

export const byCategory = (c: CategoryId) => projects.filter((p) => p.category === c);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export { hero as heroImage };
