import { createFileRoute } from "@tanstack/react-router";
import { HomeNavigationMap } from "@/components/HomeNavigationMap";
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
    <section className="home-map-page relative min-h-svh overflow-hidden">
      <img src={heroImage} alt="" width={1410} height={752} fetchPriority="high" className="hero-zoom absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-scrim" />
      <div className="home-map-layout relative z-10 px-6 pb-12 pt-28 md:px-10">
      <div className="home-map-intro">
        <p className="hero-eyebrow fade-up">3D Designer</p>
        <h1 className="fade-up slide-lead mt-4 font-display text-3xl font-bold leading-[0.9] text-foreground md:text-[4.5rem]">
          Wisnu<br />Kesuma<span className="text-primary">.</span>
        </h1>
        <p className="fade-up slide-lead mt-6 max-w-xl text-muted-foreground md:text-lg">
          Hi, I'm a Senior 3D Event &amp; Exhibition Designer based in Jakarta. I've been in the event and BTL world
          for 15+ years, designing booths and stages for brand activations, from small setups to big exhibitions like
          IIMS, GIIAS, and PRJ. I love figuring out practical, budget-friendly ways to turn ideas into real spaces.
          Still learning every day, and always happy to work with good people.
        </p>
      </div>
      <HomeNavigationMap />
      </div>
    </section>
  );
}
