import { createFileRoute } from "@tanstack/react-router";
import { ProjectSlideshow } from "@/components/ProjectSlideshow";
import { byCategory } from "@/data/projects";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — Rhea Voss 3D" },
      { name: "description", content: "Commercial 3D visualization and client projects." },
      { property: "og:title", content: "Work — Rhea Voss 3D" },
      { property: "og:description", content: "Commercial 3D visualization and client projects." },
    ],
  }),
  component: () => <ProjectSlideshow projects={byCategory("work")} title="Work" />,
});
