import { createFileRoute } from "@tanstack/react-router";
import { ProjectSlideshow } from "@/components/ProjectSlideshow";
import { byCategory } from "@/data/projects";

export const Route = createFileRoute("/personal")({
  head: () => ({
    meta: [
      { title: "Personal Projects — Rhea Voss 3D" },
      { name: "description", content: "Self-initiated 3D experiments and worlds." },
      { property: "og:title", content: "Personal Projects — Rhea Voss 3D" },
      { property: "og:description", content: "Self-initiated 3D experiments and worlds." },
    ],
  }),
  component: () => <ProjectSlideshow projects={byCategory("personal")} title="Personal Projects" />,
});
