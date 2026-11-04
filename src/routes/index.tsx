import { createFileRoute, Link } from "@tanstack/react-router";
import { heroImage, heroShareImage } from "@/data/projects";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => pageHead({
    title: "Wisnu Kesuma — Senior 3D Designer | Booth & Event Design",
    description: "Wisnu Kesuma, Senior 3D Designer with 15+ years in brand activation, booth and event design. Explore work for Pertamina, Samsung, IIMS, GIIAS and PRJ.",
    path: "/",
    image: heroShareImage,
    imageAlt: "Samsung Galaxy activation booth render at night with costumed carnival performers",
  }),
  component: Index,
});

function Index() {
  return (
    <section className="relative h-[100svh] overflow-hidden">
      <img src={heroImage} alt="" width={1410} height={752} fetchPriority="high" className="hero-zoom absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-scrim" />
      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-16 md:px-10 md:pb-24">
        <p className="eyebrow fade-up">3D Designer</p>
        <h1 className="fade-up mt-4 font-display text-6xl font-bold leading-[0.9] text-foreground md:text-[9rem]">
          Wisnu<br />Kesuma<span className="text-primary">.</span>
        </h1>
        <p className="fade-up mt-6 max-w-xl text-muted-foreground md:text-lg">
          Senior 3D Designer in brand activation with 15+ years of experience in booth and event design. I enjoy
          finding practical, budget-friendly ways to bring ideas to life, from small setups to exhibitions like IIMS,
          GIIAS, and PRJ.
        </p>
        <div className="fade-up mt-8 flex flex-wrap gap-3">
          <Link to="/work" className="btn-ember">Explore work →</Link>
          <Link to="/contact" className="btn-outline">Get in touch</Link>
        </div>
      </div>
    </section>
  );
}
