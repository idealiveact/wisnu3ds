import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { StartAProject } from "@/components/StartAProjectSection";

export const Route = createFileRoute("/start-a-project")({
  head: () =>
    pageHead({
      title: "Start a Project — Wisnu Kesuma 3D",
      description:
        "Describe your booth, stage or exhibition idea in plain words and get a clear project brief back — written with AI, then sent straight to Wisnu Kesuma.",
      path: "/start-a-project",
    }),
  component: StartAProject,
});
