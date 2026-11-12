import { Link } from "@tanstack/react-router";
import { BriefcaseBusiness, Images, Sparkles, UserRound, PenLine, Mail, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const destinations = [
  { label: "Work", to: "/work", icon: BriefcaseBusiness, position: "work" },
  { label: "Gallery", to: "/gallery", icon: Images, position: "gallery" },
  { label: "Personal", to: "/personal", icon: Sparkles, position: "personal" },
  { label: "About", to: "/about", icon: UserRound, position: "about" },
  { label: "Start a Project", to: "/start-a-project", icon: PenLine, position: "project" },
  { label: "Contact", to: "/contact", icon: Mail, position: "contact" },
] as const;

/** A small, browser-safe schematic: native links, no map SDK or media downloads. */
export function HomeNavigationMap() {
  return (
    <nav className="home-map" aria-label="Portfolio navigation map">
      <svg className="home-map-lines" viewBox="0 0 600 440" preserveAspectRatio="none" aria-hidden="true">
        <path className="home-map-guide" d="M30 120H570M30 320H570M100 30V410M500 30V410" />
        <path className="home-map-route" d="M300 220V80H120M300 220V80H480M300 220H80M300 220H520M300 220V360H120M300 220V360H480" />
        <path className="home-map-travel" d="M120 80H300V220H520M80 220H300V360H480" />
      </svg>
      <div className="home-map-center" aria-hidden="true">
        <span className="home-map-center-mark">W<span>.</span>K</span>
        <span className="home-map-center-label">3D Designer</span>
      </div>
      {destinations.map(({ label, to, icon: Icon, position }, index) => (
        <Button key={to} asChild variant="ghost" className={`home-map-stop home-map-stop-${position}`}>
          <Link to={to} preload={false} aria-label={`Explore ${label}`}>
            <span className="home-map-stop-icon"><Icon strokeWidth={1.5} /></span>
            <span className="home-map-stop-name"><span className="home-map-stop-number">0{index + 1}</span>{label}</span>
            <ArrowUpRight className="home-map-stop-arrow" aria-hidden="true" />
          </Link>
        </Button>
      ))}
    </nav>
  );
}