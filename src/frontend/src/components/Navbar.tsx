import { MaverickLogo } from "@/components/MaverickLogo";
import PillNav from "@/components/PillNav";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";
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

function SunIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export function Navbar() {
  const location = useLocation();
  const [hidden, setHidden] = useState(false);
  const prevScrollY = useRef(0);
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  // PillNav colors adapt to theme
  const pillNavBaseColor = isDark ? "#1a1a2e" : "#ffffff";
  const pillNavPillColor = isDark ? "#7c3aed" : "#7c3aed";
  const pillNavPillTextColor = isDark ? "#ffffff" : "#ffffff";

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
      {/* ── Desktop layout ── */}
      <div className="hidden md:flex max-w-7xl mx-auto px-4 sm:px-6 items-center justify-between py-3 sm:py-4">
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
        <PillNav
          items={navItems}
          activeHref={activeHref}
          baseColor={pillNavBaseColor}
          pillColor={pillNavPillColor}
          hoveredPillTextColor="#ffffff"
          pillTextColor={pillNavPillTextColor}
          initialLoadAnimation={false}
          className=""
        />

        {/* Desktop: Theme Toggle + CTA */}
        <div className="flex items-center gap-3 z-[100] relative">
          <button
            type="button"
            data-ocid="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`
              w-9 h-9 rounded-full flex items-center justify-center
              border transition-all duration-300
              ${
                isDark
                  ? "border-purple-500/50 text-purple-300 hover:border-purple-400 hover:text-purple-200 hover:shadow-[0_0_12px_oklch(0.68_0.24_308/0.5)] bg-[#1a1a2e]/80"
                  : "border-purple-400/60 text-purple-600 hover:border-purple-500 hover:text-purple-700 hover:shadow-[0_0_12px_oklch(0.55_0.26_308/0.35)] bg-white/80"
              }
              backdrop-blur-sm hover:scale-110
            `}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          <Link to="/contact" data-ocid="nav-cta">
            <Button
              size="sm"
              className="gradient-neon-purple text-background font-semibold glow-neon hover:scale-105 transition-smooth border-0"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>

      {/* ── Mobile layout: logo left, hamburger right via PillNav ── */}
      <div
        className="md:hidden flex items-center justify-between px-5 py-3"
        style={{
          background: isDark ? "rgba(15,15,15,0.92)" : "rgba(255,255,255,0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: isDark
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid rgba(0,0,0,0.08)",
        }}
      >
        {/* Mobile Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group z-[100] relative"
          data-ocid="nav-logo-mobile"
        >
          <div className="relative group-hover:scale-110 transition-smooth">
            <MaverickLogo
              size={26}
              className="drop-shadow-[0_0_6px_oklch(0.68_0.24_308/0.5)]"
            />
          </div>
          <span className="font-display font-bold text-base tracking-tight">
            <span className="text-foreground">Maverick</span>
            <span className="text-primary"> Digitals</span>
          </span>
        </Link>

        {/* Mobile Hamburger (PillNav renders only the button + dropdown) */}
        <PillNav
          items={navItems}
          activeHref={activeHref}
          baseColor={pillNavBaseColor}
          pillColor={pillNavPillColor}
          hoveredPillTextColor="#ffffff"
          pillTextColor={pillNavPillTextColor}
          initialLoadAnimation={false}
          onMobileMenuClick={() => {}}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      </div>
    </nav>
  );
}
