import { createFileRoute, Link } from "@tanstack/react-router";
import { heroImage } from "@/data/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Wisnu Kesuma — 3D Artist & Visualizer" },
      { name: "description", content: "Portfolio of Wisnu Kesuma, 3D artist and visualizer crafting cinematic renders, technical art and immersive worlds." },
      { property: "og:title", content: "Wisnu Kesuma — 3D Artist & Visualizer" },
      { property: "og:description", content: "Cinematic 3D visualization, technical art and personal worlds." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <section className="relative h-[100svh] overflow-hidden">
      <img src={heroImage} alt="" width={1920} height={1088} fetchPriority="high" className="hero-zoom absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-scrim" />
      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-16 md:px-10 md:pb-24">
        <p className="eyebrow fade-up">3D Artist · 3D Visualizer</p>
        <h1 className="fade-up mt-4 font-display text-6xl font-bold leading-[0.9] text-foreground md:text-[9rem]">
          Wisnu<br />Kesuma<span className="text-primary">.</span>
        </h1>
        <p className="fade-up mt-6 max-w-lg text-muted-foreground md:text-lg">
          Building light, matter and atmosphere — from architectural visualization to real-time technical art.
        </p>
        <div className="fade-up mt-8 flex flex-wrap gap-3">
          <Link to="/work" className="btn-ember">Explore work →</Link>
          <Link to="/contact" className="btn-outline">Get in touch</Link>
        </div>
      </div>
    </section>
  );
}
