import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRevealOnScroll } from "@/hooks/useIntersectionObserver";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Send } from "lucide-react";
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
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Rich animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/12 via-background to-secondary/10" />
      <div className="absolute inset-0 grid-glow-bg opacity-30" />

      {/* Large blobs */}
      <div className="absolute -top-20 left-1/4 w-96 h-96 bg-primary/18 rounded-full blur-[130px] animate-float" />
      <div
        className="absolute -bottom-20 right-1/4 w-80 h-80 bg-secondary/15 rounded-full blur-[110px] animate-float"
        style={{ animationDelay: "1.5s" }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-accent/8 rounded-full blur-[120px]" />

      {/* Thin neon ring accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-primary/10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-secondary/6 pointer-events-none" />

      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        style={style}
        className="relative max-w-3xl mx-auto text-center"
      >
        <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-5">
          Ready to Grow?
        </p>
        <h2 className="font-display font-bold text-4xl md:text-6xl text-foreground mb-6 text-balance leading-[1.1]">
          Ready to Dominate Mumbai's{" "}
          <span className="gradient-text-purple">Digital Landscape?</span>
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed mb-12 max-w-xl mx-auto">
          Join 50+ Mumbai businesses that trust Maverick Digitals to grow their
          brand, drive leads, and scale revenue. Let's build something
          extraordinary together.
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
              className="flex-1 bg-card/60 border-white/15 focus:border-primary/50 placeholder:text-muted-foreground/50 h-12"
              data-ocid="cta-email-input"
            />
            <Button
              type="submit"
              size="lg"
              className="gradient-neon-purple text-background font-semibold glow-neon hover:scale-105 transition-smooth border-0 h-12 px-6 whitespace-nowrap"
              data-ocid="cta-email-submit"
            >
              Get Strategy Call
              <Send size={14} className="ml-2" />
            </Button>
          </form>
        ) : (
          <div className="glassmorphic border-primary/30 px-8 py-4 inline-flex items-center gap-3 mb-8 text-primary font-semibold">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            We'll reach out within 24 hours!
          </div>
        )}

        {/* Secondary CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/contact" data-ocid="cta-section-primary">
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-foreground hover:bg-white/5 hover:border-primary/40 transition-smooth px-8 h-12 text-base"
            >
              Book a Discovery Call
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
          <Link to="/case-studies" data-ocid="cta-section-secondary">
            <Button
              size="lg"
              variant="ghost"
              className="text-muted-foreground hover:text-foreground hover:bg-white/5 transition-smooth px-8 h-12 text-base"
            >
              See Our Work
            </Button>
          </Link>
        </div>

        {/* Social proof */}
        <div className="mt-12 flex items-center justify-center gap-6 text-xs text-muted-foreground/70 flex-wrap">
          <span>✦ No lock-in contracts</span>
          <span>✦ Results-focused approach</span>
          <span>✦ 97% client retention rate</span>
        </div>
      </div>
    </section>
  );
}
