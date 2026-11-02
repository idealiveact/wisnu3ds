import { createFileRoute } from "@tanstack/react-router";
import { ProjectSlideshow } from "@/components/ProjectSlideshow";
import { byCategory } from "@/data/projects";

export const Route = createFileRoute("/technical-art")({
  head: () => ({
    meta: [
      { title: "Technical Art — Wisnu Kesuma 3D" },
      { name: "description", content: "Shaders, tools and procedural systems by Wisnu Kesuma." },
      { property: "og:title", content: "Technical Art — Rhea Voss 3D" },
      { property: "og:description", content: "Shaders, tools and procedural systems." },
    ],
  }),
  component: () => <ProjectSlideshow projects={byCategory("technical-art")} title="Technical Art" />,
});
