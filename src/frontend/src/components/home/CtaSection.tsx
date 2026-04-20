import { Input } from "@/components/ui/input";
import { useRevealOnScroll } from "@/hooks/useIntersectionObserver";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

const TRUST_POINTS = [
  "No lock-in contracts",
  "Results before long-term commitment",
  "97% client retention",
  "Direct access to founders",
];

export function CtaSection() {
  const { ref, style } = useRevealOnScroll(0);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="relative py-24 sm:py-40 px-4 sm:px-6 overflow-hidden">
      {/* Layered background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, oklch(var(--primary)/0.08) 0%, oklch(var(--background)) 40%, oklch(var(--secondary)/0.07) 100%)",
        }}
      />
      <div className="absolute inset-0 grid-glow-bg opacity-20" />

      {/* Floating ambient blobs */}
      <div
        className="absolute -top-32 left-1/4 w-[28rem] h-[28rem] bg-primary/12 rounded-full blur-[160px] animate-float"
        style={{ animationDuration: "7s" }}
      />
      <div
        className="absolute -bottom-32 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[140px] animate-float"
        style={{ animationDelay: "1.5s", animationDuration: "9s" }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[360px] bg-accent/5 rounded-full blur-[150px]" />

      {/* Decorative rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-primary/7 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] rounded-full border border-secondary/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[820px] h-[820px] rounded-full border border-accent/3 pointer-events-none" />

      {/* Diagonal texture lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, oklch(var(--foreground)) 0px, oklch(var(--foreground)) 1px, transparent 1px, transparent 40px)",
        }}
      />

      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        style={style}
        className="relative max-w-3xl mx-auto text-center"
      >
        {/* Section tag */}
        <span className="tag-label mb-8 inline-flex">
          <span
            className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"
            aria-hidden="true"
          />
          Ready to Grow?
        </span>

        {/* Headline */}
        <h2
          className="font-display font-black text-foreground mb-6 text-balance leading-[1.06]"
          style={{
            fontSize: "clamp(2.4rem, 5vw, 4.2rem)",
            letterSpacing: "-0.03em",
          }}
        >
          Let's grow your{" "}
          <span className="gradient-text-purple">brand online.</span>
        </h2>

        <p className="text-muted-foreground text-body-lg leading-relaxed mb-12 max-w-xl mx-auto">
          40+ brands across India and globally. If you're serious about growing
          online, let's find out what's possible for yours.
        </p>

        {/* Email capture form */}
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-stretch gap-3 max-w-md mx-auto mb-10"
          >
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-card/80 dark:bg-card/50 border-border hover:border-primary/35 focus:border-primary/60 placeholder:text-muted-foreground/50 text-foreground h-13 rounded-2xl text-sm px-5"
              data-ocid="cta-email-input"
            />
            <button
              type="submit"
              className="btn-primary whitespace-nowrap h-13 px-7 rounded-2xl text-sm"
              data-ocid="cta-email-submit"
            >
              Get Strategy Call
            </button>
          </form>
        ) : (
          <div
            className="glass-card px-8 py-4 inline-flex items-center gap-3 mb-10 text-primary font-semibold rounded-2xl"
            style={{ borderColor: "oklch(var(--primary)/0.3)" }}
            data-ocid="cta-success-state"
          >
            We'll reach out within 24 hours!
          </div>
        )}

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link to="/contact" data-ocid="cta-section-primary">
            <button
              type="button"
              className="btn-primary px-9 h-[3.25rem] text-sm rounded-2xl"
            >
              Book a Discovery Call
            </button>
          </Link>
          <Link to="/case-studies" data-ocid="cta-section-secondary">
            <button
              type="button"
              className="btn-secondary px-8 h-[3.25rem] text-sm rounded-2xl"
            >
              See Our Work
            </button>
          </Link>
        </div>

        {/* Trust signal strip */}
        <div
          className="glass-card inline-flex flex-wrap items-center justify-center gap-x-6 gap-y-3 px-8 py-4 rounded-2xl"
          style={{ borderColor: "oklch(var(--border)/0.6)" }}
        >
          {TRUST_POINTS.map((point, i) => (
            <span
              key={point}
              className="flex items-center gap-2 text-xs text-muted-foreground"
            >
              {i > 0 && (
                <span
                  className="w-1 h-1 rounded-full bg-muted-foreground/25 hidden sm:inline-block"
                  aria-hidden="true"
                />
              )}
              <span
                className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0"
                aria-hidden="true"
              />
              {point}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
