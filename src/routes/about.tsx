import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import showcase from "@/assets/about-showcase.jpg.asset.json";

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
        <h1 className="fade-up mt-4 font-display text-4xl font-bold leading-[1] text-foreground md:text-5xl">
          Wisnu Kesuma
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Senior 3D Designer <span className="text-primary">|</span> Brand Activation &amp; Exhibition
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Jakarta Metropolitan Area
          <span className="mx-2">·</span>
          <a className="inline-flex items-center gap-1 underline-offset-4 hover:underline" href="mailto:wisnu3ds@gmail.com">
            <Mail size={13} aria-hidden /> wisnu3ds@gmail.com
          </a>
        </p>
        <h2 className="fade-up mt-10 text-balance font-display text-2xl font-bold leading-[1.15] text-foreground lg:text-[28px] xl:text-[38px] 2xl:text-[44px]">
          Designed to be walked into.
          <br />
          Built to <span className="text-primary">bring crowds in</span>.
        </h2>
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
      <img
        src={showcase.url}
        alt="Samsung Galaxy activation booth concept at night, with carnival performers in costume"
        width={1410}
        height={752}
        loading="lazy"
        className="w-full self-start rounded-sm border border-border object-cover"
      />
    </section>
  );
}
