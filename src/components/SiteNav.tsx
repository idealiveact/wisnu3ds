import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

// Six menu items, top-to-bottom order: Home, Work, Gallery, Personal Project,
// Contact, Let's Talk. About is folded into the Contact page (/about only redirects).
export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Selected Project" },
  { to: "/gallery", label: "Gallery" },
  { to: "/personal", label: "Personal Project" },
  { to: "/contact", label: "Contact" },
  { to: "/start-a-project", label: "Let's Talk" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [section, setSection] = useState("home");
  useEffect(() => {
    if (!isHome) return;
    const update = () => {
      let active = "home";
      document.querySelectorAll<HTMLElement>("[data-portfolio-section]").forEach((element) => {
        if (element.getBoundingClientRect().top <= window.innerHeight * 0.35) active = element.id;
      });
      setSection(active);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [isHome]);
  const sectionId = (path: string) => path === "/" ? "home" : path.slice(1);
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-background/80 px-6 py-5 backdrop-blur md:px-10">
      <Link to="/" className="font-display text-lg font-bold tracking-tight text-foreground">
        WISNU<span className="text-primary">.</span>K
      </Link>
      <nav className="site-nav hidden gap-4 md:flex lg:gap-8">
        {navLinks.map((l) => (
          <Link key={l.to} to={isHome ? "/" : l.to} {...(isHome ? { hash: sectionId(l.to) } : {})} className="nav-link" data-active={isHome ? section === sectionId(l.to) : location.pathname === l.to}>
            {l.label}
          </Link>
        ))}
      </nav>
      <Button variant="ghost" className="nav-link md:hidden" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
        {open ? "Close" : "Menu"}
      </Button>
      {open && (
        <div className="absolute inset-x-0 top-full flex flex-col gap-4 border-y border-border bg-background/95 px-6 py-6 backdrop-blur md:hidden">
          {navLinks.map((l) => (
            <Link key={l.to} to={isHome ? "/" : l.to} {...(isHome ? { hash: sectionId(l.to) } : {})} onClick={() => setOpen(false)} className="font-display text-2xl text-foreground">
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
