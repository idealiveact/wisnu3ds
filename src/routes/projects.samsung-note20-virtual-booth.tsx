import { createFileRoute, redirect } from "@tanstack/react-router";

// The Samsung entry is now a collection covering 2017–2020, so its URL was
// shortened to /projects/samsung. Keep the old public URL working for links
// already shared or indexed by search engines.
export const Route = createFileRoute("/projects/samsung-note20-virtual-booth")({
  beforeLoad: () => {
    throw redirect({ to: "/projects/$slug", params: { slug: "samsung" }, replace: true });
  },
});
