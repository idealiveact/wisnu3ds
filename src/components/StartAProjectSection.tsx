import { Link } from "@tanstack/react-router";
import { BriefBuilder } from "@/components/BriefBuilder";



export function StartAProject() {
  return (
    <section className="flex min-h-screen flex-col px-6 pt-28 pb-20 md:px-10 md:pt-36">
      <p className="eyebrow">Let's Talk</p>
      <h1 className="fade-up mt-4 max-w-3xl text-balance font-display text-5xl font-bold leading-[0.95] text-foreground md:text-7xl">
        Describe your idea,<br />get a clear <span className="text-primary">brief</span>.
      </h1>
      <p className="mt-5 max-w-xl text-muted-foreground">
        Write freely — booth size, event, brand, deadline, budget. AI turns your notes into a brief you can send straight to Wisnu.
      </p>

      <BriefBuilder />

      <p className="mt-14 max-w-xl text-sm text-muted-foreground">
        Rather talk first? <Link to="/contact" className="text-primary underline underline-offset-4">Email Wisnu directly</Link>{" "}
        or reach him on LinkedIn, Instagram, Behance and YouTube.
      </p>
    </section>
  );
}
