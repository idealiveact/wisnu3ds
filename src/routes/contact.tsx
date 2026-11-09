import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      title: "Contact — Wisnu Kesuma 3D",
      description:
        "Get in touch with Wisnu Kesuma, senior 3D designer for exhibition booths, stages and event visualisation — email, LinkedIn, Instagram, Behance and YouTube.",
      path: "/contact",
    }),
  component: Contact,
});

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
    <section className="flex min-h-screen flex-col justify-center px-6 pt-28 pb-16 md:px-10">
      <p className="eyebrow">Contact</p>
      <h1 className="fade-up mt-4 font-display text-5xl font-bold leading-[0.95] text-foreground md:text-8xl">
        Let's build<br />something <span className="text-primary">real</span>.
      </h1>
      <a href="mailto:wisnu3ds@gmail.com" className="mt-10 font-display text-2xl text-foreground underline decoration-primary underline-offset-8 md:text-4xl">
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

      <div className="mt-16 max-w-3xl rounded-lg border border-border bg-card p-6 text-card-foreground md:p-8">
        <p className="eyebrow">Project brief assistant</p>
        <h2 className="mt-3 font-display text-2xl font-bold md:text-3xl">Not sure what to write yet?</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Jot down the rough idea on the Start a Project page — booth size, event, brand, deadline, budget. It turns your
          notes into a clear brief and sends it straight to Wisnu, no email app needed.
        </p>
        <Link to="/start-a-project" className="btn-ember mt-6">Start a project</Link>
      </div>
    </section>
  );
}
