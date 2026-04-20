import { Button } from "@/components/ui/button";
import { useRevealOnScroll } from "@/hooks/useIntersectionObserver";
import { Link } from "@tanstack/react-router";
import { useRef, useState } from "react";

/* ─── Service data ─────────────────────────────────────────────────────────── */

const services = [
  {
    title: "SEO & Search Visibility",
    tagline: "Get found. Stay found. Turn search traffic into revenue.",
    tier: "Core",
    tierColor: "bg-primary/10 text-primary border-primary/20",
    gradient: "from-primary/20 to-primary/5",
    border: "border-primary/15 hover:border-primary/45",
    glow: "shadow-[0_0_30px_oklch(0.68_0.24_308_/_0.2)]",
    deliverables: [
      "Full technical SEO audit & roadmap",
      "Keyword strategy & competitive gap analysis",
      "On-page optimization & schema markup",
      "Authority link-building campaigns",
    ],
  },
  {
    title: "Paid Media & PPC",
    tagline: "Ads that earn more than they cost.",
    tier: "Performance",
    tierColor: "bg-secondary/10 text-secondary border-secondary/20",
    gradient: "from-secondary/20 to-secondary/5",
    border: "border-secondary/15 hover:border-secondary/45",
    glow: "shadow-[0_0_30px_oklch(0.72_0.19_200_/_0.2)]",
    deliverables: [
      "Google & Microsoft Ads campaigns",
      "Meta, LinkedIn & TikTok advertising",
      "Retargeting funnel architecture",
      "Weekly performance reports & ROAS tracking",
    ],
  },
  {
    title: "Brand Strategy",
    tagline: "A clear identity so the right customers choose you first.",
    tier: "Foundation",
    tierColor: "bg-accent/10 text-accent border-accent/20",
    gradient: "from-accent/20 to-accent/5",
    border: "border-accent/15 hover:border-accent/45",
    glow: "shadow-[0_0_30px_oklch(0.65_0.22_260_/_0.2)]",
    deliverables: [
      "Brand positioning & messaging framework",
      "Visual identity system & style guide",
      "Tone of voice & communication playbook",
      "Competitor analysis & differentiation strategy",
    ],
  },
  {
    title: "Content Marketing",
    tagline: "Content people actually read — and act on.",
    tier: "Core",
    tierColor: "bg-primary/10 text-primary border-primary/20",
    gradient: "from-primary/15 to-secondary/5",
    border: "border-primary/15 hover:border-secondary/35",
    glow: "shadow-[0_0_30px_oklch(0.68_0.24_308_/_0.15)]",
    deliverables: [
      "Long-form blog & thought leadership content",
      "Email nurture sequences & newsletters",
      "Video scripts & multimedia production",
      "SEO-optimized landing page copy",
    ],
  },
  {
    title: "Social Media Management",
    tagline: "Consistent presence on the channels your customers actually use.",
    tier: "Growth",
    tierColor: "bg-secondary/10 text-secondary border-secondary/20",
    gradient: "from-secondary/15 to-primary/5",
    border: "border-secondary/15 hover:border-primary/35",
    glow: "shadow-[0_0_30px_oklch(0.72_0.19_200_/_0.15)]",
    deliverables: [
      "Monthly content calendar & creative direction",
      "Daily community management & engagement",
      "Influencer & creator partnership outreach",
      "Paid social strategy & boosting",
    ],
  },
  {
    title: "Growth Marketing",
    tagline: "All channels working together, all pointing toward growth.",
    tier: "Premium",
    tierColor: "bg-accent/10 text-accent border-accent/20",
    gradient: "from-accent/15 to-primary/8",
    border: "border-accent/15 hover:border-primary/35",
    glow: "shadow-[0_0_30px_oklch(0.65_0.22_260_/_0.15)]",
    deliverables: [
      "Conversion rate optimization (CRO)",
      "A/B testing frameworks & experimentation",
      "Customer journey mapping & funnel analysis",
      "Growth hacking & viral loop engineering",
    ],
  },
];

/* ─── Methodology steps ─────────────────────────────────────────────────── */

const methodology = [
  {
    step: "01",
    label: "Research",
    desc: "We start by understanding your market properly — who you're competing with, who your best customers actually are, and what's already working in your space.",
    color: "text-primary",
    bg: "from-primary/15 to-transparent",
    border: "border-primary/25",
  },
  {
    step: "02",
    label: "Strategy",
    desc: "Before anything goes live, we agree on a clear plan — which channels make sense, what success looks like, and how we're measuring it.",
    color: "text-accent",
    bg: "from-accent/15 to-transparent",
    border: "border-accent/25",
  },
  {
    step: "03",
    label: "Execute",
    desc: "We launch carefully, not quickly. Tracking is in place, everything's been reviewed, and we're watching performance from day one.",
    color: "text-secondary",
    bg: "from-secondary/15 to-transparent",
    border: "border-secondary/25",
  },
  {
    step: "04",
    label: "Measure",
    desc: "Regular performance reviews, clear reporting, and a habit of cutting what isn't working and doubling down on what is.",
    color: "text-primary",
    bg: "from-primary/15 to-transparent",
    border: "border-primary/25",
  },
];

/* ─── Industries ────────────────────────────────────────────────────────── */

const industryList = [
  "SaaS & Tech",
  "E-Commerce",
  "D2C Brands",
  "Startups",
  "Professional Services",
  "Finance & Fintech",
  "Healthcare",
  "Education",
];

/* ─── Service Card ─────────────────────────────────────────────────────── */

function ServiceCard({
  service,
  index,
}: { service: (typeof services)[0]; index: number }) {
  const { ref, style } = useRevealOnScroll(index * 90);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    setTilt({ x: dy * -10, y: dx * 10 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <div
      ref={(el) => {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
        (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      }}
      style={{
        ...style,
        transform: `${style.transform ?? ""} perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.025 : 1})`,
        transition: hovered
          ? "transform 0.1s ease-out, box-shadow 0.3s"
          : "transform 0.5s cubic-bezier(0.4,0,0.2,1), box-shadow 0.5s, opacity 0.6s",
      }}
      className={`group relative glass-card ${service.border} cursor-default overflow-hidden ${hovered ? service.glow : ""}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      data-ocid={`service.item.${index + 1}`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-lg transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-0"}`}
      />
      <div
        className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`}
      />

      <div className="relative p-7">
        <div className="flex items-start justify-between mb-5">
          <span
            className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${service.tierColor}`}
          >
            {service.tier}
          </span>
        </div>

        <h3 className="font-display font-bold text-xl text-foreground mb-1">
          {service.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-5">{service.tagline}</p>

        <div className="divider-premium mb-5" />

        <ul className="space-y-2.5">
          {service.deliverables.map((d) => (
            <li key={d} className="flex items-start gap-2.5 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 flex-shrink-0" />
              <span className="text-muted-foreground leading-snug">{d}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ─── Methodology Step ─────────────────────────────────────────────────── */

function MethodStep({
  step,
  index,
}: { step: (typeof methodology)[0]; index: number }) {
  const { ref, style } = useRevealOnScroll(index * 120);
  const isLast = index === methodology.length - 1;

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={style}
      className="relative flex flex-col items-center text-center"
      data-ocid={`method.item.${index + 1}`}
    >
      {!isLast && (
        <div className="hidden lg:block absolute top-10 left-[calc(50%+3rem)] right-[calc(-50%+3rem)] h-px">
          <div className="h-px w-full bg-gradient-to-r from-foreground/12 via-foreground/6 to-transparent" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-foreground/12" />
        </div>
      )}
      <div className="relative mb-5">
        <div
          className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.bg} border ${step.border} flex items-center justify-center glass-card`}
        >
          <span className={`font-display font-black text-2xl ${step.color}`}>
            {step.step}
          </span>
        </div>
      </div>
      <h4 className="font-display font-bold text-lg text-foreground mb-2">
        {step.label}
      </h4>
      <p className="text-muted-foreground text-sm leading-relaxed max-w-[200px]">
        {step.desc}
      </p>
    </div>
  );
}

/* ─── Industry Pill ────────────────────────────────────────────────────── */

function IndustryPill({ label, index }: { label: string; index: number }) {
  const { ref, style } = useRevealOnScroll(index * 60);
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={style}
      className="group glass-card border-border/60 hover:border-primary/30 p-5 rounded-xl flex items-center gap-3 transition-smooth hover:bg-primary/5 cursor-default"
      data-ocid={`industry-pill.item.${index + 1}`}
    >
      <span className="font-semibold text-sm text-foreground leading-tight">
        {label}
      </span>
    </div>
  );
}

/* ─── Main page ──────────────────────────────────────────────────────────── */

export function Services() {
  const { ref: titleRef, style: titleStyle } = useRevealOnScroll(0);
  const { ref: methodTitleRef, style: methodTitleStyle } = useRevealOnScroll(0);
  const { ref: industryTitleRef, style: industryTitleStyle } =
    useRevealOnScroll(0);
  const { ref: ctaRef, style: ctaStyle } = useRevealOnScroll(0);

  return (
    <div className="relative pt-20 sm:pt-24 pb-20 overflow-hidden">
      <div className="absolute inset-0 grid-glow-bg opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* ── Hero ──────────────────────────────────────────────────── */}
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          style={titleStyle}
          className="mb-20 max-w-4xl"
          data-ocid="services-hero"
        >
          <span className="tag-label inline-flex mb-5">
            <span className="w-4 h-px bg-primary inline-block mr-1.5" />
            What We Do
          </span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-7xl text-foreground leading-[1.05] mb-6 mt-3">
            Our <span className="gradient-text-purple">Services</span>
            <br />
            <span className="text-muted-foreground text-4xl md:text-5xl font-medium">
              Built for Market Dominance
            </span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
            Maverick Digitals brings together creative thinking, sharp strategy,
            and technical execution to build marketing that doesn't just look
            good — it grows your business.
          </p>
        </div>

        {/* ── Service Cards ─────────────────────────────────────────── */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-28"
          data-ocid="services-grid"
        >
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>

        {/* ── Section divider ───────────────────────────────────────── */}
        <div className="divider-premium mb-24" />

        {/* ── Methodology ───────────────────────────────────────────── */}
        <section className="mb-28" data-ocid="methodology-section">
          <div
            ref={methodTitleRef as React.RefObject<HTMLDivElement>}
            style={methodTitleStyle}
            className="mb-16 text-center"
          >
            <span
              className="tag-label inline-flex mb-5"
              style={{
                background: "oklch(var(--secondary)/0.1)",
                color: "oklch(var(--secondary))",
                borderColor: "oklch(var(--secondary)/0.25)",
              }}
            >
              <span className="w-4 h-px bg-secondary inline-block mr-1.5" />
              How We Work
              <span className="w-4 h-px bg-secondary inline-block ml-1.5" />
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4 mt-3">
              The Maverick{" "}
              <span className="gradient-text-cyan">Methodology</span>
            </h2>
            <p className="text-muted-foreground text-base max-w-xl mx-auto">
              A consistent four-phase approach — same structure, adapted to your
              business — so nothing falls through the cracks.
            </p>
          </div>

          <div className="relative bg-card border border-border/60 rounded-2xl p-6 sm:p-10 md:p-14 shadow-subtle">
            <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 to-transparent rounded-2xl pointer-events-none" />
            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
              {methodology.map((step, i) => (
                <MethodStep key={step.label} step={step} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Section divider ───────────────────────────────────────── */}
        <div className="divider-premium mb-24" />

        {/* ── Industries ────────────────────────────────────────────── */}
        <section className="mb-28" data-ocid="industries-section">
          <div
            ref={industryTitleRef as React.RefObject<HTMLDivElement>}
            style={industryTitleStyle}
            className="mb-12"
          >
            <span
              className="tag-label inline-flex mb-5"
              style={{
                background: "oklch(var(--accent)/0.1)",
                color: "oklch(var(--accent))",
                borderColor: "oklch(var(--accent)/0.25)",
              }}
            >
              <span className="w-4 h-px bg-accent inline-block mr-1.5" />
              Industries We Serve
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4 mt-3">
              Deep vertical{" "}
              <span className="gradient-text-purple">expertise</span>
            </h2>
            <p className="text-muted-foreground text-base max-w-xl">
              We've worked across a range of industries — so we understand the
              dynamics, the customer mindset, and the competitive landscape
              before we start.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {industryList.map((label, i) => (
              <IndustryPill key={label} label={label} index={i} />
            ))}
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────── */}
        <section
          ref={ctaRef as React.RefObject<HTMLDivElement>}
          style={ctaStyle}
          className="relative glass-card rounded-2xl overflow-hidden"
          data-ocid="services-cta"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-accent/10 to-secondary/15" />
          <div className="absolute inset-0 grid-glow-bg opacity-20" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-primary/12 blur-[80px]" />

          <div className="relative px-6 sm:px-10 py-12 sm:py-16 md:py-20 text-center">
            <span className="tag-label inline-flex mb-5">Ready to Scale?</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-6xl text-foreground mb-6 leading-tight mt-3">
              Let's Build Something{" "}
              <span className="gradient-text-purple">Extraordinary</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-lg mx-auto">
              Book a free strategy call and we'll put together a clear growth
              plan for your business — no jargon, no fluff.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="btn-primary border-0 px-10 h-13 text-base"
                  data-ocid="cta-primary-btn"
                >
                  Book Strategy Call
                </Button>
              </Link>
              <Link to="/case-studies">
                <Button
                  size="lg"
                  variant="outline"
                  className="glass-card border-border/60 hover:border-primary/40 text-foreground hover:text-primary transition-smooth px-10 h-13 text-base font-semibold"
                  data-ocid="cta-secondary-btn"
                >
                  View Case Studies
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
