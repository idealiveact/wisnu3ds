import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { Contact } from "@/components/ContactSection";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      title: "About & Contact — Wisnu Kesuma 3D Designer",
      description:
        "Wisnu Kesuma — senior 3D designer with 15+ years in exhibition booth and event design, from small setups to IIMS, GIIAS and PRJ. Background, toolset and direct contact.",
      path: "/contact",
    }),
  component: Contact,
});
