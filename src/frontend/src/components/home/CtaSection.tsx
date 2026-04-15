import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRevealOnScroll } from "@/hooks/useIntersectionObserver";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle, Send } from "lucide-react";
import { useState } from "react";

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
    <section className="relative py-24 sm:py-36 px-4 sm:px-6 overflow-hidden">
      {/* Rich background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/8" />
      <div className="absolute inset-0 grid-glow-bg opacity-25" />

      {/* Blobs */}
      <div className="absolute -top-24 left-1/4 w-96 h-96 bg-primary/14 rounded-full blur-[140px] animate-float" />
      <div
        className="absolute -bottom-24 right-1/4 w-80 h-80 bg-secondary/12 rounded-full blur-[120px] animate-float"
        style={{ animationDelay: "1.5s" }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[320px] bg-accent/6 rounded-full blur-[130px]" />

      {/* Decorative rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full border border-primary/8 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] rounded-full border border-secondary/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] h-[760px] rounded-full border border-accent/3 pointer-events-none" />

      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        style={style}
        className="relative max-w-3xl mx-auto text-center"
      >
        <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-5 inline-flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Ready to Grow?
        </p>

        <h2 className="font-display font-bold text-4xl md:text-6xl text-foreground mb-6 text-balance leading-[1.08]">
          Let's grow your{" "}
          <span className="gradient-text-purple">brand online.</span>
        </h2>

        <p className="text-muted-foreground text-lg leading-relaxed mb-12 max-w-xl mx-auto">
          40+ brands across India and globally. If you're serious about growing
          online, let's find out what's possible for yours.
        </p>

        {/* Email capture */}
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-stretch gap-3 max-w-md mx-auto mb-8"
          >
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-card/70 dark:bg-card/50 border-border hover:border-primary/30 focus:border-primary/50 placeholder:text-muted-foreground/50 text-foreground h-12 rounded-xl"
              data-ocid="cta-email-input"
            />
            <Button
              type="submit"
              size="lg"
              className="gradient-neon-purple text-white font-semibold glow-neon hover:scale-105 transition-smooth border-0 h-12 px-7 whitespace-nowrap rounded-xl"
              data-ocid="cta-email-submit"
            >
              Get Strategy Call
              <Send size={14} className="ml-2" />
            </Button>
          </form>
        ) : (
          <div className="glassmorphic border-primary/25 px-8 py-4 inline-flex items-center gap-3 mb-8 text-primary font-semibold rounded-xl">
            <CheckCircle size={16} className="shrink-0" />
            We'll reach out within 24 hours!
          </div>
        )}

        {/* Secondary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link to="/contact" data-ocid="cta-section-primary">
            <Button
              size="lg"
              variant="outline"
              className="border-border hover:border-primary/40 text-foreground hover:bg-primary/5 transition-smooth px-8 h-12 text-base rounded-xl"
            >
              Book a Discovery Call
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
          <Link to="/case-studies" data-ocid="cta-section-secondary">
            <Button
              size="lg"
              variant="ghost"
              className="text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth px-8 h-12 text-base rounded-xl"
            >
              See Our Work
            </Button>
          </Link>
        </div>

        {/* Social proof strip */}
        <div className="flex items-center justify-center gap-5 text-xs text-muted-foreground/65 flex-wrap">
          <span className="flex items-center gap-1.5">
            <CheckCircle size={12} className="text-primary/60" />
            No lock-in contracts
          </span>
          <span className="w-1 h-1 rounded-full bg-muted-foreground/25" />
          <span className="flex items-center gap-1.5">
            <CheckCircle size={12} className="text-primary/60" />
            Results before long-term commitment
          </span>
          <span className="w-1 h-1 rounded-full bg-muted-foreground/25" />
          <span className="flex items-center gap-1.5">
            <CheckCircle size={12} className="text-primary/60" />
            97% client retention
          </span>
        </div>
      </div>
    </section>
  );
}
