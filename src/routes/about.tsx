import { createFileRoute, redirect } from "@tanstack/react-router";

// The About section now lives on the Contact page; this stub keeps links,
// bookmarks and search results pointing at the old address working.
export const Route = createFileRoute("/about")({
  beforeLoad: () => {
    throw redirect({ to: "/contact", replace: true });
  },
});
