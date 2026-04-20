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

export function Navbar() {
  const location = useLocation();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const prevScrollY = useRef(0);
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  // PillNav colors adapt to theme
  const pillNavBaseColor = isDark ? "#1a1a2e" : "#111111";
  const pillNavPillColor = isDark ? "#7c3aed" : "#7c3aed";
  const pillNavPillTextColor = isDark ? "#ffffff" : "#ffffff";

  // Scroll: hide/show + track scrolled state for glassmorphic depth
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 24);

      if (currentScrollY < 10) {
        setHidden(false);
      } else if (currentScrollY > prevScrollY.current + 4) {
        setHidden(true);
      } else if (currentScrollY < prevScrollY.current - 4) {
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
      {/* ── Desktop layout ─────────────────────────────────────────────── */}
      <div
        className="hidden md:flex max-w-7xl mx-auto px-5 sm:px-8 items-center justify-between py-3.5"
        style={{
          filter: scrolled
            ? isDark
              ? "drop-shadow(0 4px 20px rgba(0,0,0,0.45))"
              : "drop-shadow(0 4px 16px rgba(0,0,0,0.10))"
            : "none",
          transition: "filter 0.3s ease",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group z-[100] relative"
          data-ocid="nav-logo"
        >
          <div className="relative group-hover:scale-110 transition-all duration-300">
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

        {/* Centered PillNav */}
        <PillNav
          items={navItems}
          activeHref={activeHref}
          baseColor={pillNavBaseColor}
          pillColor={pillNavPillColor}
          hoveredPillTextColor={isDark ? "#ffffff" : "#ffffff"}
          pillTextColor={pillNavPillTextColor}
          initialLoadAnimation={false}
          className=""
        />

        {/* Desktop: Theme Toggle + CTA */}
        <div className="flex items-center gap-3 z-[100] relative">
          {/* Text-based theme toggle */}
          <button
            type="button"
            data-ocid="theme-toggle"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="navbar-theme-btn px-3"
            style={
              {
                "--btn-border": isDark
                  ? "rgba(167,139,250,0.35)"
                  : "rgba(124,58,237,0.3)",
                "--btn-bg": isDark
                  ? "rgba(26,26,46,0.85)"
                  : "rgba(255,255,255,0.85)",
                "--btn-color": isDark ? "#c4b5fd" : "#7c3aed",
                "--btn-shadow-hover": isDark
                  ? "0 0 14px rgba(139,92,246,0.45)"
                  : "0 0 14px rgba(124,58,237,0.3)",
              } as React.CSSProperties
            }
          >
            <span className="text-xs font-semibold tracking-wide">
              {isDark ? "Light" : "Dark"}
            </span>
          </button>

          <Link to="/contact" data-ocid="nav-cta">
            <Button
              size="sm"
              className="gradient-neon-purple text-background font-semibold glow-neon hover:scale-105 transition-all duration-300 border-0"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>

      {/* ── Mobile layout: logo left, hamburger right ───────────────────── */}
      <div
        className="md:hidden flex items-center justify-between px-4 py-3"
        style={{
          background: isDark
            ? scrolled
              ? "rgba(10,10,18,0.96)"
              : "rgba(15,15,15,0.88)"
            : scrolled
              ? "rgba(255,255,255,0.97)"
              : "rgba(255,255,255,0.88)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: isDark
            ? "1px solid rgba(255,255,255,0.07)"
            : "1px solid rgba(0,0,0,0.07)",
          boxShadow: scrolled
            ? isDark
              ? "0 4px 24px rgba(0,0,0,0.4)"
              : "0 4px 16px rgba(0,0,0,0.08)"
            : "none",
          transition: "background 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        {/* Mobile Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group z-[100] relative"
          data-ocid="nav-logo-mobile"
        >
          <div className="relative group-hover:scale-110 transition-all duration-300">
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

        {/* Right side: theme toggle + hamburger */}
        <div className="flex items-center gap-2">
          {/* Mobile theme toggle — text label */}
          <button
            type="button"
            data-ocid="mobile-theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="navbar-theme-btn px-2.5"
            style={
              {
                "--btn-border": isDark
                  ? "rgba(167,139,250,0.35)"
                  : "rgba(124,58,237,0.3)",
                "--btn-bg": isDark
                  ? "rgba(26,26,46,0.85)"
                  : "rgba(255,255,255,0.85)",
                "--btn-color": isDark ? "#c4b5fd" : "#7c3aed",
                "--btn-shadow-hover": isDark
                  ? "0 0 14px rgba(139,92,246,0.45)"
                  : "0 0 14px rgba(124,58,237,0.3)",
              } as React.CSSProperties
            }
          >
            <span className="text-[11px] font-semibold tracking-wide">
              {isDark ? "Light" : "Dark"}
            </span>
          </button>

          {/* Hamburger via PillNav (mobile-only button + dropdown) */}
          <PillNav
            items={navItems}
            activeHref={activeHref}
            baseColor={pillNavBaseColor}
            pillColor={pillNavPillColor}
            hoveredPillTextColor={isDark ? "#ffffff" : "#1a1a2e"}
            pillTextColor={pillNavPillTextColor}
            initialLoadAnimation={false}
            onMobileMenuClick={() => {}}
            theme={theme}
            onToggleTheme={toggleTheme}
          />
        </div>
      </div>
    </nav>
  );
}
