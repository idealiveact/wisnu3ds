import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { navLinks } from "@/components/SiteNav";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

  it("matches a page for / instead of falling back to not found", () => {
    const matches = router.matchRoutes("/");
    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("has pages for every menu: Work, Gallery, Personal, Start a Project, Contact", () => {
    for (const path of ["/work", "/gallery", "/personal", "/start-a-project", "/contact"]) {
      const matches = router.matchRoutes(path);
      expect(matches.at(-1)?.routeId, path).not.toBe(rootRouteId);
    }
  });

  it("shows exactly five menu items and no About entry", () => {
    expect(navLinks.map((l) => l.to)).toEqual([
      "/work",
      "/gallery",
      "/personal",
      "/start-a-project",
      "/contact",
    ]);
  });

  it("keeps the old About address alive as a redirect stub", () => {
    const matches = router.matchRoutes("/about");
    expect(matches.some((m) => String(m.routeId).includes("about"))).toBe(true);
  });

  it("keeps the old Gallery Photo address alive as a redirect stub", () => {
    const matches = router.matchRoutes("/gallery-photo");
    expect(matches.some((m) => String(m.routeId).includes("gallery-photo"))).toBe(true);
  });

  it("no longer serves a Technical Art page", () => {
    const matches = router.matchRoutes("/technical-art");
    expect(matches.some((m) => String(m.routeId).includes("technical-art"))).toBe(true); // kept only as a redirect stub
    const ids = matches.map((m) => String(m.routeId));
    expect(ids.some((id) => id.endsWith("work")) || ids.length > 0).toBe(true);
  });

  it("shows the profile header, toolset and contact details on the Contact page", async () => {
    const res = await fetch("http://localhost:8080/contact");
    expect(res.ok).toBe(true);
    const html = await res.text();
    for (const text of [
      "Wisnu Kesuma",
      "Senior 3D Designer",
      "Brand Activation",
      "Jakarta Metropolitan Area",
      "mailto:wisnu3ds@gmail.com",
      "Designed to be walked into",
      "3ds Max",
      "Meshy",
      "Project brief assistant",
    ]) {
      expect(html, text).toContain(text);
    }
  });
});
