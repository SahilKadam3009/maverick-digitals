import { Button } from "@/components/ui/button";
import { useRevealOnScroll } from "@/hooks/useIntersectionObserver";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";

function FloatingShape({
  className,
  style,
}: {
  className: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      style={style}
    />
  );
}

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      hue: number;
    }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
        hue: Math.random() > 0.5 ? 308 : 200,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `oklch(0.7 0.22 ${p.hue} / ${p.opacity})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

export function HeroSection() {
  const { ref: badgeRef, style: badgeStyle } = useRevealOnScroll(0);
  const { ref: headRef, style: headStyle } = useRevealOnScroll(150);
  const { ref: subRef, style: subStyle } = useRevealOnScroll(300);
  const { ref: ctaRef, style: ctaStyle } = useRevealOnScroll(450);

  const scrollToContent = () => {
    document
      .getElementById("services-preview")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 grid-glow-bg noise-overlay">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-primary/12 rounded-full blur-[140px] animate-float" />
        <div
          className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px] animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent/6 rounded-full blur-[160px] animate-float"
          style={{ animationDelay: "1s" }}
        />
        {/* Thin neon rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] rounded-full border border-primary/10 opacity-60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full border border-secondary/8 opacity-40" />
      </div>

      {/* Particle field */}
      <ParticleField />

      {/* 3D floating geometric accents */}
      <FloatingShape
        className="w-16 h-16 border border-primary/25 rotate-45 animate-float opacity-40"
        style={{
          top: "20%",
          left: "8%",
          animationDelay: "0.5s",
          boxShadow: "0 0 20px oklch(0.68 0.24 308 / 0.2)",
        }}
      />
      <FloatingShape
        className="w-8 h-8 border border-secondary/30 rotate-12 animate-float opacity-50"
        style={{
          top: "35%",
          right: "10%",
          animationDelay: "1.2s",
          boxShadow: "0 0 16px oklch(0.72 0.19 200 / 0.2)",
        }}
      />
      <FloatingShape
        className="w-24 h-24 border border-accent/15 rounded-full animate-float opacity-30"
        style={{
          bottom: "25%",
          left: "12%",
          animationDelay: "0.8s",
        }}
      />
      <FloatingShape
        className="w-10 h-10 gradient-neon-purple rotate-45 animate-float opacity-20"
        style={{
          top: "18%",
          right: "22%",
          animationDelay: "1.8s",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl">
        {/* Floating badge */}
        <div
          ref={badgeRef as React.RefObject<HTMLDivElement>}
          style={badgeStyle}
          className="inline-flex items-center gap-2 glassmorphic px-5 py-2 mb-10 text-xs font-semibold text-primary tracking-wide"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Digital Marketing Agency · Mumbai, India
          <span
            className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"
            style={{ animationDelay: "0.5s" }}
          />
        </div>

        {/* Headline */}
        <h1
          ref={headRef as React.RefObject<HTMLDivElement>}
          style={headStyle}
          className="font-display text-center text-balance"
        >
          <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.92] text-foreground mb-2">
            Transform Your
          </span>
          <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.92] gradient-text-purple mb-2">
            Digital Presence
          </span>
          <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.92] text-foreground/70">
            — Maverick.
          </span>
        </h1>

        <p
          ref={subRef as React.RefObject<HTMLDivElement>}
          style={subStyle}
          className="mt-8 text-muted-foreground max-w-xl text-lg leading-relaxed"
        >
          A digital agency harnessing data-driven strategies and cinematic
          creativity to build brands that dominate their markets.
        </p>

        <div
          ref={ctaRef as React.RefObject<HTMLDivElement>}
          style={ctaStyle}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <Link to="/services" data-ocid="hero-cta-primary">
            <Button
              size="lg"
              className="gradient-neon-purple text-background font-semibold glow-neon hover:scale-105 transition-smooth border-0 px-8 h-12 text-base"
            >
              Get Started
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
          <Link to="/case-studies" data-ocid="hero-cta-secondary">
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-foreground hover:bg-white/5 hover:border-primary/40 transition-smooth px-8 h-12 text-base"
            >
              View Work
            </Button>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        type="button"
        onClick={scrollToContent}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-smooth group z-10"
        aria-label="Scroll to content"
      >
        <span className="text-xs font-medium tracking-widest uppercase opacity-60">
          Scroll
        </span>
        <ChevronDown
          size={18}
          className="animate-bounce group-hover:text-primary"
        />
      </button>
    </section>
  );
}
