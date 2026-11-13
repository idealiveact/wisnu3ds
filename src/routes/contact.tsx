import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      title: "About & Contact — Wisnu Kesuma 3D Designer",
      description:
        "Wisnu Kesuma — senior 3D designer with 15+ years in exhibition booth and event design, from small setups to IIMS, GIIAS and PRJ. Background, toolset and direct contact.",
      path: "/contact",
    }),
  component: Contact,
});

const software = ["3ds Max", "V-Ray", "SketchUp", "Adobe Photoshop", "CorelDRAW"];
const aiTools = ["ChatGPT", "Gemini", "Claude", "Meshy", "Lovable"];

const socials = [
  { label: "Gmail", href: "mailto:wisnu3ds@gmail.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/wisnu-kesuma-b1564426/" },
  { label: "Instagram", href: "https://www.instagram.com/wisnu3ds/" },
  { label: "Behance", href: "https://www.behance.net/wisnu3ds" },
  { label: "YouTube", href: "https://www.youtube.com/@wisnu3ds" },
  { label: "TikTok", href: "https://www.tiktok.com/@wisnu3ds" },
];

function Contact() {
  return (
    <div className="px-6 pt-28 pb-16 md:px-10 md:pb-24">
      <div className="mx-auto w-full max-w-3xl">
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

      <div className="mx-auto mt-20 w-full max-w-3xl border-t border-border pt-16 md:mt-28 md:pt-20">
        <p className="eyebrow">Contact</p>
        <h2 className="fade-up mt-4 font-display text-5xl font-bold leading-[0.95] text-foreground md:text-7xl">
          Let's build<br />something <span className="text-primary">real</span>.
        </h2>
        <a href="mailto:wisnu3ds@gmail.com" className="mt-10 inline-block font-display text-2xl text-foreground underline decoration-primary underline-offset-8 md:text-4xl">
          wisnu3ds@gmail.com
        </a>
        <div className="mt-10 flex flex-wrap gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="btn-outline"
              {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {s.label}
            </a>
          ))}
        </div>

        <div className="mt-16 rounded-lg border border-border bg-card p-6 text-card-foreground md:p-8">
          <p className="eyebrow">Project brief assistant</p>
          <h3 className="mt-3 font-display text-2xl font-bold md:text-3xl">Not sure what to write yet?</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Jot down the rough idea on the Start a Project page — booth size, event, brand, deadline, budget. It turns your
            notes into a clear brief and sends it straight to Wisnu, no email app needed.
          </p>
          <Link to="/start-a-project" className="btn-ember mt-6">Start a project</Link>
        </div>
      </div>
    </div>
  );
}
