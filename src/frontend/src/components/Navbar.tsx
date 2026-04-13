import { MaverickLogo } from "@/components/MaverickLogo";
import { Button } from "@/components/ui/button";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isScrolled } = useScrollPosition(20);
  const location = useLocation();

  const pathname = location.pathname;
  // Close drawer when route changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is the only dep we want
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isActive = (href: string) =>
    href === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(href);

  return (
    <>
      <nav
        data-ocid="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "glassmorphic shadow-elevated py-3"
            : "bg-transparent border-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group"
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

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                data-ocid={`nav-link-${link.label.toLowerCase()}`}
                className={`relative px-4 py-2 text-sm font-medium transition-smooth rounded-md group ${
                  isActive(link.href)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full gradient-neon-purple" />
                )}
                <span className="absolute inset-0 rounded-md bg-primary/0 group-hover:bg-primary/5 transition-smooth" />
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/contact" data-ocid="nav-cta">
              <Button
                size="sm"
                className="gradient-neon-purple text-background font-semibold glow-neon hover:scale-105 transition-smooth border-0"
              >
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setIsOpen(!isOpen);
            }}
            className="md:hidden p-2 rounded-lg glassmorphic text-foreground transition-smooth"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            data-ocid="nav-mobile-toggle"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          role="button"
          tabIndex={0}
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setIsOpen(false);
          }}
          aria-label="Close menu"
        />
        {/* Drawer */}
        <div
          className={`absolute top-0 right-0 h-full w-72 glassmorphic border-l border-white/10 flex flex-col p-8 gap-6 transition-transform duration-500 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          data-ocid="nav-mobile-drawer"
        >
          <div className="mt-16 flex flex-col gap-2">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                to={link.href}
                style={{ transitionDelay: isOpen ? `${i * 50}ms` : "0ms" }}
                className={`px-4 py-3 rounded-lg text-base font-medium transition-smooth ${
                  isActive(link.href)
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                } ${isOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-auto">
            <Link to="/contact" className="block">
              <Button className="w-full gradient-neon-purple text-background font-semibold glow-neon border-0">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
