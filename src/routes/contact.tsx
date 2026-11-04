import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Wisnu Kesuma 3D" },
      { name: "description", content: "Get in touch with Wisnu Kesuma for 3D visualization and technical art projects." },
      { property: "og:title", content: "Contact — Wisnu Kesuma 3D" },
      { property: "og:description", content: "Available for freelance and studio collaborations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

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
        {[
          { label: "LinkedIn", href: "https://www.linkedin.com/in/wisnu-kesuma-b1564426/" },
          { label: "Gmail", href: "mailto:wisnu3ds@gmail.com" },
          { label: "Instagram", href: "https://www.instagram.com/wisnu3ds/" },
          { label: "Behance", href: "https://www.behance.net/wisnu3ds" },
          { label: "YouTube", href: "https://www.youtube.com/@wisnu3ds" },
        ].map((s) => (
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
    </section>
  );
}
