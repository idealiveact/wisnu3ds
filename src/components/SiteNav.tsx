import { Link } from "@tanstack/react-router";
import { useState } from "react";

const links = [
  { to: "/work", label: "Work" },
  { to: "/technical-art", label: "Technical Art" },
  { to: "/personal", label: "Personal" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-10">
      <Link to="/" className="font-display text-lg font-bold tracking-tight text-foreground">
        R<span className="text-primary">.</span>VOSS
      </Link>
      <nav className="hidden gap-8 md:flex">
        {links.map((l) => (
          <Link key={l.to} to={l.to} className="nav-link" activeProps={{ "data-active": "true" }}>
            {l.label}
          </Link>
        ))}
      </nav>
      <button className="nav-link md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
        {open ? "Close" : "Menu"}
      </button>
      {open && (
        <div className="absolute inset-x-0 top-full flex flex-col gap-4 border-y border-border bg-background/95 px-6 py-6 backdrop-blur md:hidden">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="font-display text-2xl text-foreground">
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
