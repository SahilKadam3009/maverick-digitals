import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRevealOnScroll } from "@/hooks/useIntersectionObserver";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  FileText,
  Globe,
  Lightbulb,
  Megaphone,
  PenLine,
  Rocket,
  Search,
  Share2,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useRef, useState } from "react";

/* ─── Service data ─────────────────────────────────────────────── */
const services = [
  {
    icon: Search,
    title: "SEO & Search Visibility",
    tagline: "Dominate organic search at scale",
    tier: "Core",
    tierColor: "bg-primary/20 text-primary border-primary/30",
    gradient: "from-primary/25 to-primary/5",
    border: "border-primary/20 hover:border-primary/50",
    glow: "shadow-[0_0_30px_oklch(0.68_0.24_308_/_0.25)]",
    deliverables: [
      "Full technical SEO audit & roadmap",
      "Keyword strategy & competitive gap analysis",
      "On-page optimization & schema markup",
      "Authority link-building campaigns",
    ],
  },
  {
    icon: BarChart3,
    title: "Paid Media & PPC",
    tagline: "Ad spend turned into predictable revenue",
    tier: "Performance",
    tierColor: "bg-secondary/20 text-secondary border-secondary/30",
    gradient: "from-secondary/25 to-secondary/5",
    border: "border-secondary/20 hover:border-secondary/50",
    glow: "shadow-[0_0_30px_oklch(0.72_0.19_200_/_0.25)]",
    deliverables: [
      "Google & Microsoft Ads campaigns",
      "Meta, LinkedIn & TikTok advertising",
      "Retargeting funnel architecture",
      "Weekly performance reports & ROAS tracking",
    ],
  },
  {
    icon: PenLine,
    title: "Brand Strategy",
    tagline: "Identity that commands market authority",
    tier: "Foundation",
    tierColor: "bg-accent/20 text-accent border-accent/30",
    gradient: "from-accent/25 to-accent/5",
    border: "border-accent/20 hover:border-accent/50",
    glow: "shadow-[0_0_30px_oklch(0.65_0.22_260_/_0.25)]",
    deliverables: [
      "Brand positioning & messaging framework",
      "Visual identity system & style guide",
      "Tone of voice & communication playbook",
      "Competitor analysis & differentiation strategy",
    ],
  },
  {
    icon: FileText,
    title: "Content Marketing",
    tagline: "Stories that captivate and convert",
    tier: "Core",
    tierColor: "bg-primary/20 text-primary border-primary/30",
    gradient: "from-primary/20 to-secondary/5",
    border: "border-primary/20 hover:border-secondary/40",
    glow: "shadow-[0_0_30px_oklch(0.68_0.24_308_/_0.2)]",
    deliverables: [
      "Long-form blog & thought leadership content",
      "Email nurture sequences & newsletters",
      "Video scripts & multimedia production",
      "SEO-optimized landing page copy",
    ],
  },
  {
    icon: Share2,
    title: "Social Media Management",
    tagline: "Communities that engage and buy",
    tier: "Growth",
    tierColor: "bg-secondary/20 text-secondary border-secondary/30",
    gradient: "from-secondary/20 to-primary/5",
    border: "border-secondary/20 hover:border-primary/40",
    glow: "shadow-[0_0_30px_oklch(0.72_0.19_200_/_0.2)]",
    deliverables: [
      "Monthly content calendar & creative direction",
      "Daily community management & engagement",
      "Influencer & creator partnership outreach",
      "Paid social strategy & boosting",
    ],
  },
  {
    icon: TrendingUp,
    title: "Growth Marketing",
    tagline: "Full-funnel growth engineered for scale",
    tier: "Premium",
    tierColor: "bg-accent/20 text-accent border-accent/30",
    gradient: "from-accent/20 to-primary/10",
    border: "border-accent/20 hover:border-primary/40",
    glow: "shadow-[0_0_30px_oklch(0.65_0.22_260_/_0.2)]",
    deliverables: [
      "Conversion rate optimization (CRO)",
      "A/B testing frameworks & experimentation",
      "Customer journey mapping & funnel analysis",
      "Growth hacking & viral loop engineering",
    ],
  },
];

/* ─── Methodology steps ─────────────────────────────────────────── */
const methodology = [
  {
    step: "01",
    label: "Research",
    icon: Search,
    desc: "Deep-dive market analysis, competitor audits, and audience profiling to uncover untapped opportunities.",
    color: "text-primary",
    bg: "from-primary/20 to-transparent",
    border: "border-primary/30",
  },
  {
    step: "02",
    label: "Strategy",
    icon: Lightbulb,
    desc: "Data-informed go-to-market plan with clear KPIs, channel mix, and a 90-day execution roadmap.",
    color: "text-accent",
    bg: "from-accent/20 to-transparent",
    border: "border-accent/30",
  },
  {
    step: "03",
    label: "Execute",
    icon: Rocket,
    desc: "Precision launch across all channels with creative production, campaign management, and continuous iteration.",
    color: "text-secondary",
    bg: "from-secondary/20 to-transparent",
    border: "border-secondary/30",
  },
  {
    step: "04",
    label: "Measure",
    icon: BarChart3,
    desc: "Live dashboards, attribution modeling, and bi-weekly performance reviews to optimize every dollar.",
    color: "text-primary",
    bg: "from-primary/20 to-transparent",
    border: "border-primary/30",
  },
];

/* ─── Industries ────────────────────────────────────────────────── */
const industries = [
  { icon: Globe, label: "SaaS & Tech" },
  { icon: TrendingUp, label: "E-Commerce" },
  { icon: Megaphone, label: "D2C Brands" },
  { icon: Zap, label: "Startups" },
  { icon: FileText, label: "Professional Services" },
  { icon: BarChart3, label: "Finance & Fintech" },
  { icon: Share2, label: "Healthcare" },
  { icon: PenLine, label: "Education" },
];

/* ─── 3D Tilt Card ──────────────────────────────────────────────── */
function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const { ref, style } = useRevealOnScroll(index * 90);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const Icon = service.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
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
        transform: `${style.transform ?? ""} perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.03 : 1})`,
        transition: hovered
          ? "transform 0.1s ease-out, box-shadow 0.3s"
          : "transform 0.5s cubic-bezier(0.4,0,0.2,1), box-shadow 0.5s, opacity 0.6s",
      }}
      className={`group relative glassmorphic ${service.border} cursor-default overflow-hidden ${hovered ? service.glow : ""}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      data-ocid={`service-card-${index}`}
    >
      {/* Gradient overlay on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-lg transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-0"}`}
      />

      {/* Shimmer edge */}
      <div
        className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`}
      />

      <div className="relative p-7">
        {/* Icon + tier */}
        <div className="flex items-start justify-between mb-5">
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center`}
          >
            <Icon size={22} className="text-foreground" />
          </div>
          <Badge
            variant="outline"
            className={`text-xs font-semibold ${service.tierColor} border`}
          >
            {service.tier}
          </Badge>
        </div>

        <h3 className="font-display font-bold text-xl text-foreground mb-1">
          {service.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-5">{service.tagline}</p>

        {/* Divider */}
        <div className="h-px bg-white/8 mb-5" />

        {/* Deliverables */}
        <ul className="space-y-2.5">
          {service.deliverables.map((d) => (
            <li key={d} className="flex items-start gap-2.5 text-sm">
              <CheckCircle2
                size={14}
                className="text-primary mt-0.5 shrink-0"
              />
              <span className="text-muted-foreground leading-snug">{d}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ─── Methodology Step ──────────────────────────────────────────── */
function MethodStep({
  step,
  index,
}: {
  step: (typeof methodology)[0];
  index: number;
}) {
  const { ref, style } = useRevealOnScroll(index * 120);
  const Icon = step.icon;
  const isLast = index === methodology.length - 1;

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={style}
      className="relative flex flex-col items-center text-center"
      data-ocid={`method-step-${index}`}
    >
      {/* Connector line */}
      {!isLast && (
        <div className="hidden lg:block absolute top-10 left-[calc(50%+3rem)] right-[calc(-50%+3rem)] h-px">
          <div className="h-px w-full bg-gradient-to-r from-white/20 via-white/10 to-transparent" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/20" />
        </div>
      )}

      {/* Step number + icon */}
      <div className="relative mb-5">
        <div
          className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.bg} border ${step.border} flex items-center justify-center glassmorphic`}
        >
          <Icon size={28} className={step.color} />
        </div>
        <div
          className={`absolute -top-2 -right-2 w-6 h-6 rounded-full glassmorphic border ${step.border} flex items-center justify-center`}
        >
          <span className={`text-[10px] font-bold font-mono ${step.color}`}>
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

/* ─── Main page ─────────────────────────────────────────────────── */
export function Services() {
  const { ref: titleRef, style: titleStyle } = useRevealOnScroll(0);
  const { ref: methodTitleRef, style: methodTitleStyle } = useRevealOnScroll(0);
  const { ref: industryTitleRef, style: industryTitleStyle } =
    useRevealOnScroll(0);
  const { ref: ctaRef, style: ctaStyle } = useRevealOnScroll(0);

  return (
    <div className="relative pt-20 sm:pt-24 pb-20 overflow-hidden">
      {/* Global background */}
      <div className="absolute inset-0 grid-glow-bg opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* ── Hero ───────────────────────────────────────────────── */}
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          style={titleStyle}
          className="mb-20 max-w-4xl"
          data-ocid="services-hero"
        >
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-6 h-px bg-primary inline-block" />
            What We Do
          </p>
          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-7xl text-foreground leading-[1.05] mb-6">
            Our <span className="gradient-text-purple">Services</span>
            <br />
            <span className="text-muted-foreground text-4xl md:text-5xl font-medium">
              Built for Market Dominance
            </span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
            Maverick Digitals combines data science, creative excellence, and
            battle-tested strategy to deliver marketing that doesn't just look
            good — it scales your business.
          </p>
        </div>

        {/* ── Service Cards ───────────────────────────────────────── */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-28"
          data-ocid="services-grid"
        >
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>

        {/* ── Methodology ─────────────────────────────────────────── */}
        <section className="mb-28" data-ocid="methodology-section">
          {/* Heading */}
          <div
            ref={methodTitleRef as React.RefObject<HTMLDivElement>}
            style={methodTitleStyle}
            className="mb-16 text-center"
          >
            <p className="text-secondary text-sm font-semibold uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
              <span className="w-6 h-px bg-secondary inline-block" />
              How We Work
              <span className="w-6 h-px bg-secondary inline-block" />
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
              The Maverick{" "}
              <span className="gradient-text-cyan">Methodology</span>
            </h2>
            <p className="text-muted-foreground text-base max-w-xl mx-auto">
              Every engagement follows a proven 4-phase process that turns
              ambiguity into clarity, and clarity into results.
            </p>
          </div>

          {/* Steps */}
          <div className="relative glassmorphic-dark border border-white/8 rounded-2xl p-6 sm:p-10 md:p-14">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 to-transparent rounded-2xl pointer-events-none" />

            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
              {methodology.map((step, i) => (
                <MethodStep key={step.label} step={step} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Industries ───────────────────────────────────────────── */}
        <section className="mb-28" data-ocid="industries-section">
          <div
            ref={industryTitleRef as React.RefObject<HTMLDivElement>}
            style={industryTitleStyle}
            className="mb-12"
          >
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-6 h-px bg-accent inline-block" />
              Industries We Serve
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
              Deep vertical{" "}
              <span className="gradient-text-purple">expertise</span>
            </h2>
            <p className="text-muted-foreground text-base max-w-xl">
              We've driven growth across competitive markets — so we speak your
              industry's language from day one.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {industries.map((ind, i) => (
              <IndustryPill key={ind.label} industry={ind} index={i} />
            ))}
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────────── */}
        <section
          ref={ctaRef as React.RefObject<HTMLDivElement>}
          style={ctaStyle}
          className="relative rounded-2xl overflow-hidden"
          data-ocid="services-cta"
        >
          {/* Neon background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/15 to-secondary/20" />
          <div className="absolute inset-0 grid-glow-bg opacity-30" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-primary/15 blur-[80px]" />
          <div className="absolute inset-0 border border-white/10 rounded-2xl" />

          <div className="relative px-6 sm:px-10 py-12 sm:py-16 md:py-20 text-center">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-4">
              Ready to Scale?
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-6xl text-foreground mb-6 leading-tight">
              Let's Build Something{" "}
              <span className="gradient-text-purple">Extraordinary</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-lg mx-auto">
              Book a free strategy call with Maverick Digitals and get a custom
              growth plan built for your business goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="gradient-neon-purple text-background font-bold glow-neon hover:scale-105 transition-smooth border-0 px-10 h-13 text-base"
                  data-ocid="cta-primary-btn"
                >
                  Book Strategy Call
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
              <Link to="/case-studies">
                <Button
                  size="lg"
                  variant="outline"
                  className="glassmorphic border-white/20 hover:border-primary/40 text-foreground hover:text-primary transition-smooth px-10 h-13 text-base font-semibold"
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

/* ─── Industry pill ─────────────────────────────────────────────── */
function IndustryPill({
  industry,
  index,
}: {
  industry: (typeof industries)[0];
  index: number;
}) {
  const { ref, style } = useRevealOnScroll(index * 60);
  const Icon = industry.icon;

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={style}
      className="group glassmorphic border border-white/10 hover:border-primary/30 p-5 rounded-xl flex items-center gap-3 transition-smooth hover:bg-primary/5 cursor-default"
      data-ocid={`industry-pill-${index}`}
    >
      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-smooth">
        <Icon size={16} className="text-primary" />
      </div>
      <span className="font-semibold text-sm text-foreground leading-tight">
        {industry.label}
      </span>
    </div>
  );
}
