import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { Personal } from "@/components/PersonalSection";
import teriosEv from "@/assets/optimized/personal-terios-ev-concept.webp.asset.json";

export const Route = createFileRoute("/personal")({
  head: () =>
    pageHead({
      title: "Personal Projects — Wisnu Kesuma | 3D Designer",
      description:
        "Self-initiated 3D studies by Wisnu Kesuma — vehicle concepts modelled in 3ds Max, rendered with V-Ray, finished with AI and shared on YouTube.",
      path: "/personal",
      image: teriosEv.url,
      imageAlt: "Terios hybrid concept cutaway render in a light studio",
    }),
  component: Personal,
});
