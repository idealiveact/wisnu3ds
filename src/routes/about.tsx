import { createFileRoute } from "@tanstack/react-router";
import p2 from "@/assets/p2.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Wisnu Kesuma 3D" },
      { name: "description", content: "Wisnu Kesuma — creative designer with 15+ years in exhibition booth and event design, from small setups to IIMS, GIIAS and PRJ." },
      { property: "og:title", content: "About — Wisnu Kesuma 3D" },
      { property: "og:description", content: "Background, skills and toolset." },
      { property: "og:type", content: "profile" },
    ],
  }),
  component: About,
});

const software = ["3ds Max", "V-Ray", "SketchUp", "Adobe Photoshop", "CorelDRAW"];
const aiTools = ["ChatGPT", "Gemini", "Claude", "Meshy", "Lovable"];

function About() {
  return (
    <section className="grid min-h-screen gap-12 px-6 pt-28 pb-16 md:grid-cols-2 md:px-10">
      <div>
        <p className="eyebrow">About</p>
        <h1 className="fade-up mt-4 font-display text-5xl font-bold leading-[0.95] text-foreground md:text-7xl">
          Light is the <span className="text-primary">material</span>.
        </h1>
        <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
          Creative designer with 15+ years of experience in the creative industry, specializing in exhibition
          booth and event design. Started as a freelancer and has worked since 2008 at Beeactivator, Dwisapta
          Dentsu, Indonesia5, Dyacomm, ASSI, and the regional media group Tribun.
        </p>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          Experienced in delivering designs across all budget levels, from low to large-scale projects, including
          major exhibitions such as IIMS, GIIAS, and PRJ. Skilled at maximizing materials to make booths more
          cost-efficient without compromising visual impact.
        </p>
        <p className="eyebrow mt-10">Software</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {software.map((s) => <li key={s} className="chip">{s}</li>)}
        </ul>
        <p className="eyebrow mt-8">AI</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {aiTools.map((s) => <li key={s} className="chip">{s}</li>)}
        </ul>
      </div>
      <img src={p2} alt="Sample work" width={1600} height={1008} loading="lazy" className="h-full max-h-[80vh] w-full rounded-sm object-cover" />
    </section>
  );
}
