import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { StartAProject } from "@/components/StartAProjectSection";

export const Route = createFileRoute("/start-a-project")({
  head: () =>
    pageHead({
      title: "Let's Talk — Wisnu Kesuma 3D",
      description:
        "Tell Wisnu Kesuma about your booth, stage or exhibition in plain words and get a clear project brief back — written with AI, then sent straight to him.",
      path: "/start-a-project",
    }),
  component: StartAProject,
});
