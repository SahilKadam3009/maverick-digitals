import { MaverickLogo } from "@/components/MaverickLogo";
import PillNav from "@/components/PillNav";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

export function Navbar() {
  const location = useLocation();
  const [hidden, setHidden] = useState(false);
  const prevScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setHidden(false);
      } else if (currentScrollY > prevScrollY.current) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      prevScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pathname = location.pathname;
  const activeHref =
    navItems.find((item) =>
      item.href === "/" ? pathname === "/" : pathname.startsWith(item.href),
    )?.href ?? "/";

  return (
    <nav
      data-ocid="navbar"
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group z-[100] relative"
          data-ocid="nav-logo"
        >
          <div className="relative group-hover:scale-110 transition-smooth">
            <MaverickLogo
              size={30}
              className="drop-shadow-[0_0_8px_oklch(0.68_0.24_308/0.6)]"
            />
          </div>
          <span className="font-display font-bold text-lg tracking-tight">
            <span className="text-foreground">Maverick</span>
            <span className="text-primary"> Digitals</span>
          </span>
        </Link>

        {/* Desktop PillNav */}
        <div className="hidden md:block">
          <PillNav
            items={navItems}
            activeHref={activeHref}
            baseColor="#1a1a2e"
            pillColor="#7c3aed"
            hoveredPillTextColor="#ffffff"
            pillTextColor="#ffffff"
            initialLoadAnimation={false}
            className=""
          />
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3 z-[100] relative">
          <Link to="/contact" data-ocid="nav-cta">
            <Button
              size="sm"
              className="gradient-neon-purple text-background font-semibold glow-neon hover:scale-105 transition-smooth border-0"
            >
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile: PillNav handles its own hamburger */}
        <div className="md:hidden relative w-full absolute left-0 top-0">
          <PillNav
            items={navItems}
            activeHref={activeHref}
            baseColor="#1a1a2e"
            pillColor="#7c3aed"
            hoveredPillTextColor="#ffffff"
            pillTextColor="#ffffff"
            initialLoadAnimation={false}
            onMobileMenuClick={() => {}}
          />
        </div>
      </div>
    </nav>
  );
}
