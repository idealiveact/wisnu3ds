import { createFileRoute } from "@tanstack/react-router";
import { WorkCarousel } from "@/components/WorkCarousel";
import { byCategory } from "@/data/projects";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/work")({
  head: () => pageHead({ title: "Work — Wisnu Kesuma 3D", description: "Explore Wisnu Kesuma's 3D booth, exhibition and brand activation projects for Samsung and Pertamina.", path: "/work", image: byCategory("work")[0]?.cover }),
  component: () => <WorkCarousel projects={byCategory("work")} />,
});
