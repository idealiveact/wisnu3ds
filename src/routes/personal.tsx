import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/personal")({
  head: () =>
    pageHead({
      title: "Personal Projects — Wisnu Kesuma | 3D Designer",
      description: "Self-initiated 3D experiments and worlds by Wisnu Kesuma.",
      path: "/personal",
    }),
  component: Personal,
});

function Personal() {
  return (
    <section className="flex min-h-screen flex-col justify-center px-6 pt-28 pb-16 md:px-10">
      <p className="eyebrow">Personal</p>
      <h1 className="fade-up mt-4 font-display text-5xl font-bold leading-[0.95] text-foreground md:text-8xl">
        Personal <span className="text-primary">projects</span>.
      </h1>
      <p className="fade-up mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
        This space is still being prepared — self-initiated experiments and personal worlds will appear here soon.
      </p>
    </section>
  );
}
