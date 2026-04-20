import BallpitBackground from "@/components/home/BallpitBackground";
import { useRevealOnScroll } from "@/hooks/useIntersectionObserver";
import { Link } from "@tanstack/react-router";

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

const stats = [
  { value: "15M+", label: "Organic Views" },
  { value: "40+", label: "Brands Scaled" },
  { value: "200%+", label: "Average ROI" },
  { value: "2X+", label: "Revenue Growth" },
];

export function HeroSection() {
  const { ref: headRef, style: headStyle } = useRevealOnScroll(0);
  const { ref: subRef, style: subStyle } = useRevealOnScroll(200);
  const { ref: statsRef, style: statsStyle } = useRevealOnScroll(360);
  const { ref: ctaRef, style: ctaStyle } = useRevealOnScroll(480);

  const scrollToContent = () => {
    document
      .getElementById("services-preview")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 grid-glow-bg noise-overlay">
      {/* Ambient gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-24 w-[560px] h-[560px] bg-primary/10 rounded-full blur-[150px] animate-float" />
        <div
          className="absolute bottom-1/4 -right-24 w-[440px] h-[440px] bg-secondary/8 rounded-full blur-[130px] animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] bg-accent/5 rounded-full blur-[180px] animate-float"
          style={{ animationDelay: "1s" }}
        />
        {/* Thin neon ring accents */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full border border-primary/8 opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-secondary/6 opacity-30" />
      </div>

      {/* Ballpit — UNTOUCHED */}
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

      {/* Floating geometric accents */}
      <FloatingShape
        className="w-16 h-16 border border-primary/20 rotate-45 animate-float opacity-35"
        style={{
          top: "18%",
          left: "7%",
          animationDelay: "0.5s",
          boxShadow: "0 0 24px oklch(0.68 0.24 308 / 0.15)",
        }}
      />
      <FloatingShape
        className="w-8 h-8 border border-secondary/25 rotate-12 animate-float opacity-40"
        style={{
          top: "34%",
          right: "9%",
          animationDelay: "1.2s",
          boxShadow: "0 0 16px oklch(0.72 0.19 200 / 0.15)",
        }}
      />
      <FloatingShape
        className="w-24 h-24 border border-accent/12 rounded-full animate-float opacity-25"
        style={{ bottom: "28%", left: "11%", animationDelay: "0.8s" }}
      />
      <FloatingShape
        className="w-10 h-10 gradient-neon-purple rotate-45 animate-float opacity-15 rounded-sm"
        style={{ top: "16%", right: "21%", animationDelay: "1.8s" }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl w-full">
        {/* Tag label */}
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          style={headStyle}
          className="flex flex-col items-center gap-7"
        >
          <span className="tag-label">Mumbai-Based Growth Agency</span>

          {/* Oversized editorial headline */}
          <h1
            className="font-display font-black text-center"
            style={{ letterSpacing: "var(--tracking-tight)" }}
          >
            <span
              className="block text-foreground"
              style={{
                fontSize: "var(--font-size-display)",
                lineHeight: "0.9",
                letterSpacing: "var(--tracking-tight)",
              }}
            >
              We Scale
            </span>
            <span
              className="block text-foreground"
              style={{
                fontSize: "var(--font-size-display)",
                lineHeight: "0.9",
                letterSpacing: "var(--tracking-tight)",
              }}
            >
              Brands&nbsp;That
            </span>
            <span
              className="block gradient-text-purple"
              style={{
                fontSize: "var(--font-size-display)",
                lineHeight: "1.0",
                letterSpacing: "var(--tracking-tight)",
              }}
            >
              Demand&nbsp;Attention
            </span>
          </h1>
        </div>

        {/* Subheadline */}
        <div
          ref={subRef as React.RefObject<HTMLDivElement>}
          style={subStyle}
          className="mt-8 flex flex-col items-center gap-2"
        >
          <p
            className="text-foreground/80 max-w-2xl font-body"
            style={{
              fontSize: "var(--font-size-body-lg)",
              lineHeight: "var(--line-height-relaxed)",
            }}
          >
            We're a small team in Mumbai that's helped over 40 brands grow
            online — through SEO, paid campaigns, and content that actually
            connects with people.
          </p>
          <p
            className="text-muted-foreground max-w-xl"
            style={{
              fontSize: "var(--font-size-sm)",
              lineHeight: "var(--line-height-body)",
            }}
          >
            We help ambitious brands scale through high-conversion strategy,
            storytelling, and execution. Blending creativity, psychology, and
            data to drive measurable business outcomes.
          </p>
        </div>

        {/* Proof stats strip */}
        <div
          ref={statsRef as React.RefObject<HTMLDivElement>}
          style={statsStyle}
          className="mt-8 w-full max-w-2xl"
        >
          <div className="glass-card px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
            {stats.map((stat, i) => (
              <div
                key={stat.value}
                className="flex sm:flex-col items-center sm:items-center gap-3 sm:gap-0.5 flex-1"
              >
                <span
                  className="font-display font-black gradient-text-purple"
                  style={{
                    fontSize: "var(--font-size-h4)",
                    lineHeight: "1",
                    fontVariantNumeric: "tabular-nums",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {stat.value}
                </span>
                <span
                  className="text-muted-foreground font-medium uppercase"
                  style={{
                    fontSize: "var(--font-size-xs)",
                    letterSpacing: "var(--tracking-wide)",
                  }}
                >
                  {stat.label}
                </span>
                {i < stats.length - 1 && (
                  <div className="hidden sm:block absolute right-0 top-1/4 bottom-1/4 w-px bg-border/40" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA buttons */}
        <div
          ref={ctaRef as React.RefObject<HTMLDivElement>}
          style={ctaStyle}
          className="mt-8 flex flex-col sm:flex-row items-center gap-4"
        >
          <Link to="/services" data-ocid="hero-cta-primary">
            <button
              type="button"
              className="btn-primary text-base px-9 h-12"
              data-ocid="hero-get-started-button"
            >
              Get Started
            </button>
          </Link>
          <Link to="/case-studies" data-ocid="hero-cta-secondary">
            <button
              type="button"
              className="btn-secondary text-base px-9 h-12"
              data-ocid="hero-view-work-button"
            >
              View Work
            </button>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        type="button"
        onClick={scrollToContent}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-smooth group z-10"
        aria-label="Scroll to content"
        data-ocid="hero-scroll-indicator"
      >
        <span
          className="font-body font-medium opacity-50 uppercase"
          style={{
            fontSize: "var(--font-size-xs)",
            letterSpacing: "var(--tracking-widest)",
          }}
        >
          Scroll
        </span>
        <span
          className="text-lg leading-none"
          style={{ animation: "heroBounce 2s ease-in-out infinite" }}
          aria-hidden="true"
        >
          ↓
        </span>
      </button>

      {/* Gradient bottom transition into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, oklch(var(--background)) 100%)",
        }}
        aria-hidden="true"
      />

      <style>{`
        @keyframes heroBounce {
          0%, 100% { transform: translateY(0); }
          40% { transform: translateY(6px); }
          60% { transform: translateY(3px); }
        }
      `}</style>
    </section>
  );
}
