import { createFileRoute, Link } from "@tanstack/react-router";
import { heroImage, heroShareImage } from "@/data/projects";
import { pageHead } from "@/lib/seo";
import { WorkCarousel } from "@/components/WorkCarousel";
import { Gallery } from "@/components/GallerySection";
import { Personal } from "@/components/PersonalSection";
import { Contact } from "@/components/ContactSection";
import { StartAProject } from "@/components/StartAProjectSection";
import { byCategory } from "@/data/projects";
import { useEffect } from "react";

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
  useEffect(() => {
    document.documentElement.classList.add("portfolio-scroll");
    return () => document.documentElement.classList.remove("portfolio-scroll");
  }, []);
  useEffect(() => {
    // Measure titles independently: long galleries must not freeze their headings.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-portfolio-section]"));
    const titles = Array.from(document.querySelectorAll<HTMLElement>(
      "[data-portfolio-section] h1:not(.sr-only), [data-portfolio-section] h2, [data-portfolio-section] .hero-eyebrow, [data-portfolio-section] .eyebrow, [data-portfolio-section] .work-vcard-title, [data-portfolio-section] .work-section-label",
    ));
    const offsets = new Map<HTMLElement, number>();
    titles.forEach((title) => title.setAttribute("data-parallax-title", ""));
    const update = () => {
      frame = 0;
      const height = window.innerHeight;
      const mobile = window.innerWidth < 768;
      for (const el of sections) {
        const p = Math.max(-1, Math.min(1, el.getBoundingClientRect().top / height));
        el.style.setProperty("--p", p.toFixed(3));
      }
      for (const title of titles) {
        const rect = title.getBoundingClientRect();
        const top = rect.top - (offsets.get(title) ?? 0);
        const progress = Math.max(-0.15, Math.min(1, (top - height * 0.22) / (height * 0.78)));
        const cover = title.classList.contains("work-vcard-title");
        const y = -progress * (cover ? 24 : mobile ? 100 : 180);
        offsets.set(title, y);
        title.style.setProperty("--title-y", `${y.toFixed(2)}px`);
        title.style.setProperty("--title-x", `${(cover ? 0 : progress * (mobile ? 8 : 32)).toFixed(2)}px`);
      }
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      titles.forEach((title) => {
        title.removeAttribute("data-parallax-title");
        title.style.removeProperty("--title-y");
        title.style.removeProperty("--title-x");
      });
    };
  }, []);
  return (
    <div className="portfolio-flow">
    <section id="home" data-portfolio-section className="relative h-[100svh] overflow-hidden">
      <img src={heroImage} alt="" width={1410} height={752} fetchPriority="high" className="hero-zoom absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-scrim" />
      <div className="absolute inset-0 md:hidden [background:linear-gradient(to_top,oklch(0.12_0.005_60/0.92)_0%,oklch(0.12_0.005_60/0.75)_38%,oklch(0.12_0.005_60/0.35)_62%,oklch(0.12_0.005_60/0)_85%)]" />
      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-16 md:px-10 md:pb-24">
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
        <div className="fade-up mt-8 flex flex-wrap gap-3">
          <Link to="/" hash="work" className="btn-ember">Explore work ↓</Link>
          <Link to="/" hash="contact" className="btn-outline">Get in touch</Link>
        </div>
      </div>
    </section>
    <div id="work" data-portfolio-section data-ghost="WORK" className="parallax-section"><WorkCarousel projects={byCategory("work")} /></div>
    <div id="gallery" data-portfolio-section data-ghost="GALLERY" className="parallax-section"><Gallery /></div>
    <div id="personal" data-portfolio-section data-ghost="PERSONAL" className="parallax-section"><Personal /></div>
    <div id="contact" data-portfolio-section data-ghost="CONTACT" className="parallax-section"><Contact /></div>
    <div id="start-a-project" data-portfolio-section data-ghost="START" className="parallax-section"><StartAProject /></div>
    </div>
  );
}
