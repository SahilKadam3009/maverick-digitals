import { MaverickLogo } from "@/components/MaverickLogo";
import BallpitBackground from "@/components/home/BallpitBackground";
import { Button } from "@/components/ui/button";
import { useRevealOnScroll } from "@/hooks/useIntersectionObserver";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown } from "lucide-react";

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
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 grid-glow-bg noise-overlay">
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

      {/* Ballpit background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          zIndex: 0,
        }}
      >
        <BallpitBackground
          count={100}
          gravity={0.01}
          friction={0.9975}
          wallBounce={0.95}
          followCursor={false}
          colors={[0xa855f7, 0x3b82f6, 0x06b6d4]}
        />
      </div>

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
        {/* Brand identity mark */}
        <div
          ref={badgeRef as React.RefObject<HTMLDivElement>}
          style={badgeStyle}
          className="flex flex-col items-center gap-4 mb-10"
        >
          {/* Large logo mark with animated glow */}
          <div
            className="relative"
            style={{
              filter:
                "drop-shadow(0 0 18px oklch(0.68 0.24 308 / 0.55)) drop-shadow(0 0 36px oklch(0.72 0.19 200 / 0.25))",
              animation: "float 4s ease-in-out infinite",
            }}
          >
            <MaverickLogo size={64} />
          </div>

          {/* Thin rule + label line */}
          <div className="flex items-center gap-4">
            <span className="block w-12 h-px bg-primary/40" />
            <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-primary/80">
              Mumbai-based&nbsp;Digital&nbsp;Marketing&nbsp;Agency
            </span>
            <span className="block w-12 h-px bg-primary/40" />
          </div>
        </div>

        {/* Editorial headline */}
        <h1
          ref={headRef as React.RefObject<HTMLDivElement>}
          style={headStyle}
          className="font-display text-center"
        >
          {/* Oversized display line 1 */}
          <span className="block text-[clamp(3rem,9vw,6.5rem)] font-black leading-[0.88] tracking-[-0.03em] text-foreground">
            We Scale
          </span>
          {/* Display line 2 */}
          <span className="block text-[clamp(3rem,9vw,6.5rem)] font-black leading-[0.88] tracking-[-0.03em] text-foreground">
            Brands&nbsp;That
          </span>
          {/* Gradient accent line */}
          <span className="block text-[clamp(3rem,9vw,6.5rem)] font-black leading-[0.88] tracking-[-0.03em] gradient-text-purple">
            Demand&nbsp;Attention
          </span>
        </h1>

        {/* Accent subheadline — smaller, elegant */}
        <div
          ref={subRef as React.RefObject<HTMLDivElement>}
          style={subStyle}
          className="mt-9 flex flex-col items-center gap-3"
        >
          <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
            We're a small team in Mumbai that's helped over 40 brands grow
            online — through SEO, paid campaigns, and content that actually
            connects with people.
          </p>
          <p className="text-muted-foreground/60 max-w-2xl text-sm leading-relaxed">
            We help ambitious brands scale through high-conversion strategy,
            storytelling, and execution. Blending creativity, psychology, and
            data to drive measurable business outcomes.
          </p>
          {/* Proof stats strip */}
          <div className="grid grid-cols-2 sm:flex sm:items-center sm:gap-6 gap-3 mt-4 text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground/70 w-full sm:w-auto">
            <span className="flex items-center gap-1.5 justify-center sm:justify-start">
              <span className="text-primary font-bold text-sm">15M+</span>{" "}
              Organic Views
            </span>
            <span className="hidden sm:block w-px h-4 bg-border/40" />
            <span className="flex items-center gap-1.5 justify-center sm:justify-start">
              <span className="text-primary font-bold text-sm">40+</span> Brands
              Scaled
            </span>
            <span className="hidden sm:block w-px h-4 bg-border/40" />
            <span className="flex items-center gap-1.5 justify-center sm:justify-start">
              <span className="text-primary font-bold text-sm">200%+</span>{" "}
              Average ROI
            </span>
            <span className="hidden sm:block w-px h-4 bg-border/40" />
            <span className="flex items-center gap-1.5 justify-center sm:justify-start">
              <span className="text-primary font-bold text-sm">2X+</span>{" "}
              Revenue Growth
            </span>
          </div>
        </div>

        {/* CTA buttons */}
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
