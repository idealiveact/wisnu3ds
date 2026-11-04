import { createFileRoute, redirect } from "@tanstack/react-router";

// The page was renamed from "Gallery Photo" to "Gallery"; this stub keeps
// links and bookmarks to the old address working.
export const Route = createFileRoute("/gallery-photo")({
  beforeLoad: () => {
    throw redirect({ to: "/gallery", replace: true });
  },
});
