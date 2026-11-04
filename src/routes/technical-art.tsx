import { createFileRoute, redirect } from "@tanstack/react-router";

// The Technical Art menu was retired; keep the old public URL working by
// redirecting visitors (and search engines) to the Work section.
export const Route = createFileRoute("/technical-art")({
  beforeLoad: () => {
    throw redirect({ to: "/work", replace: true });
  },
});
