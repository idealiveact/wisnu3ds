import { createFileRoute } from "@tanstack/react-router";
import p2 from "@/assets/p2.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Rhea Voss 3D" },
      { name: "description", content: "About Rhea Voss, 3D artist and visualizer." },
      { property: "og:title", content: "About — Rhea Voss 3D" },
      { property: "og:description", content: "Background, skills and toolset." },
    ],
  }),
  component: About,
});

const skills = ["Blender", "3ds Max", "Houdini", "Unreal Engine", "ZBrush", "Substance", "Corona / V-Ray", "Python"];

function About() {
  return (
    <section className="grid min-h-screen gap-12 px-6 pt-28 pb-16 md:grid-cols-2 md:px-10">
      <div>
        <p className="eyebrow">About</p>
        <h1 className="fade-up mt-4 font-display text-5xl font-bold leading-[0.95] text-foreground md:text-7xl">
          Light is the <span className="text-primary">material</span>.
        </h1>
        <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
          Placeholder bio. I'm a 3D artist and visualizer with 8+ years of experience in architectural visualization, product rendering and real-time technical art.
        </p>
        <p className="eyebrow mt-10">Toolset</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {skills.map((s) => <li key={s} className="chip">{s}</li>)}
        </ul>
      </div>
      <img src={p2} alt="Sample work" width={1600} height={1008} loading="lazy" className="h-full max-h-[80vh] w-full rounded-sm object-cover" />
    </section>
  );
}
