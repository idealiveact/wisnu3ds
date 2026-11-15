import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { Gallery } from "@/components/GallerySection";
import walkthroughPreview from "@/assets/optimized/samsung-note20-walkthrough-2020-preview.webp.asset.json";

export const Route = createFileRoute("/gallery")({
  head: () =>
    pageHead({
      title: "Gallery — Wisnu Kesuma | 3D Designer",
      description:
        "Selected renders, installations and walkthrough films by Wisnu Kesuma, 3D designer for exhibition booths, stages and event spaces.",
      path: "/gallery",
      image: walkthroughPreview.url,
      imageAlt: "Still from the Galaxy Note20 virtual booth walkthrough film",
    }),
  component: Gallery,
});
