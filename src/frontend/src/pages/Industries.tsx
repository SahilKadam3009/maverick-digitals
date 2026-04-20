import { Button } from "@/components/ui/button";
import { useRevealOnScroll } from "@/hooks/useIntersectionObserver";
import { Link } from "@tanstack/react-router";
import { motion, useAnimation, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ── Data ───────────────────────────────────────────────────────────────────

const ORBIT_SATELLITES = [
  { label: "E-Com", angle: 30, orbitR: 110, color: "oklch(0.68 0.24 308)" },
  { label: "SaaS", angle: 150, orbitR: 155, color: "oklch(0.72 0.19 200)" },
  { label: "Health", angle: 270, orbitR: 110, color: "oklch(0.65 0.22 260)" },
  { label: "RE", angle: 60, orbitR: 200, color: "oklch(0.68 0.24 308)" },
  { label: "Fashion", angle: 200, orbitR: 200, color: "oklch(0.72 0.19 200)" },
];

const industries = [
  {
    title: "E-Commerce",
    description:
      "We engineer conversion machines for online brands — ROAS-optimised ad funnels, abandoned cart automation, and loyalty loops that turn buyers into brand advocates.",
    tags: ["Performance Ads", "Email Flows", "CRO", "Loyalty"],
    gradient: "from-primary/25 via-primary/10 to-transparent",
    glowColor: "oklch(0.68 0.24 308 / 0.35)",
    borderGlow: "hover:border-primary/40",
    isFeatured: true,
    caseStudy: {
      client: "LuxeBag Co.",
      result: "+340% organic traffic",
      detail: "6-month SEO + content blitz — from 8K to 35K monthly sessions.",
      metric1: { value: "340%", label: "Traffic lift" },
      metric2: { value: "4.8×", label: "ROAS" },
      metric3: { value: "62%", label: "Lower CAC" },
    },
  },
  {
    title: "SaaS & Tech",
    description:
      "Product-led growth, PLG motion, developer community building and conversion-optimised onboarding funnels that reduce time-to-value and slash churn.",
    tags: ["PLG Strategy", "Dev Marketing", "Onboarding", "Churn Ops"],
    gradient: "from-secondary/25 via-secondary/10 to-transparent",
    glowColor: "oklch(0.72 0.19 200 / 0.35)",
    borderGlow: "hover:border-secondary/40",
    isFeatured: true,
    caseStudy: {
      client: "Stackify SaaS",
      result: "+215% trial-to-paid",
      detail: "Rebuilt onboarding UX + email nurture — MRR doubled in 90 days.",
      metric1: { value: "215%", label: "Trial→Paid" },
      metric2: { value: "3×", label: "MRR growth" },
      metric3: { value: "41%", label: "Churn drop" },
    },
  },
  {
    title: "Healthcare",
    description:
      "HIPAA-aware content strategies, doctor-reputation marketing, and trust-first campaigns that grow patient volumes without compromising compliance.",
    tags: ["Content Authority", "Local SEO", "Patient Growth", "Compliance"],
    gradient: "from-accent/25 via-accent/10 to-transparent",
    glowColor: "oklch(0.65 0.22 260 / 0.35)",
    borderGlow: "hover:border-accent/40",
    isFeatured: true,
    caseStudy: {
      client: "WellnessFirst Clinics",
      result: "+190% patient enquiries",
      detail:
        "Google My Business + SEO overhaul led to 1,200 new bookings in Q1.",
      metric1: { value: "190%", label: "Enquiries" },
      metric2: { value: "5×", label: "GMB views" },
      metric3: { value: "38%", label: "Lower CPL" },
    },
  },
  {
    title: "Real Estate",
    description:
      "Hyper-targeted lead gen for developers and agencies — virtual tour campaigns, retargeting ladders, and visual storytelling that converts browsers to buyers.",
    tags: ["Lead Gen", "Virtual Tours", "Social Ads", "Content"],
    gradient: "from-primary/20 via-accent/10 to-transparent",
    glowColor: "oklch(0.68 0.24 308 / 0.25)",
    borderGlow: "hover:border-primary/30",
    isFeatured: false,
    caseStudy: null,
  },
  {
    title: "Education",
    description:
      "Enrollment funnels, student-retention playbooks, and video marketing that help institutions fill seats and EdTech platforms grow active learners.",
    tags: ["Enrollment", "Retention", "Video", "Landing Pages"],
    gradient: "from-secondary/20 via-primary/10 to-transparent",
    glowColor: "oklch(0.72 0.19 200 / 0.25)",
    borderGlow: "hover:border-secondary/30",
    isFeatured: false,
    caseStudy: null,
  },
  {
    title: "Travel & Hospitality",
    description:
      "Craveable content, reputation management, and local-discovery campaigns that fill tables, hotel rooms, and booking calendars all year round.",
    tags: ["Local SEO", "Reputation", "Influencer", "Seasonal Campaigns"],
    gradient: "from-accent/20 via-secondary/10 to-transparent",
    glowColor: "oklch(0.65 0.22 260 / 0.25)",
    borderGlow: "hover:border-accent/30",
    isFeatured: false,
    caseStudy: null,
  },
  {
    title: "Fashion & Lifestyle",
    description:
      "Culturally sharp brand storytelling, influencer programmes, and editorial content strategies that make lifestyle brands impossible to scroll past.",
    tags: ["Brand Story", "Influencers", "Editorial", "Social Commerce"],
    gradient: "from-primary/20 via-secondary/10 to-transparent",
    glowColor: "oklch(0.68 0.24 308 / 0.25)",
    borderGlow: "hover:border-primary/30",
    isFeatured: false,
    caseStudy: null,
  },
  {
    title: "Coaching & Consulting",
    description:
      "Personal brand elevation, thought leadership campaigns, and client acquisition funnels for experts who are ready to scale their influence and income.",
    tags: ["Personal Brand", "Lead Gen", "Content", "Funnels"],
    gradient: "from-secondary/20 via-accent/10 to-transparent",
    glowColor: "oklch(0.72 0.19 200 / 0.25)",
    borderGlow: "hover:border-secondary/30",
    isFeatured: false,
    caseStudy: null,
  },
];

const statsData = [
  { value: 50, suffix: "+", label: "Brands Served" },
  { value: 12, suffix: "", label: "Industries" },
  { value: 10, suffix: "M+", label: "Revenue Driven", prefix: "$" },
  { value: 340, suffix: "%", label: "Avg Traffic Lift" },
];

// ── Orbit Hero Visual ──────────────────────────────────────────────────────

function OrbitRing({
  radius,
  duration,
  delay,
  dotSize,
  dotColor,
  opacity,
  clockwise = true,
}: {
  radius: number;
  duration: number;
  delay: number;
  dotSize: number;
  dotColor: string;
  opacity: number;
  clockwise?: boolean;
}) {
  return (
    <div
      className="absolute top-1/2 left-1/2 rounded-full border border-white/5"
      style={{
        width: radius * 2,
        height: radius * 2,
        marginLeft: -radius,
        marginTop: -radius,
        opacity,
      }}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(ellipse at center, transparent 60%, ${dotColor} 100%)`,
          opacity: 0.08,
        }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: dotSize,
          height: dotSize,
          background: dotColor,
          boxShadow: `0 0 ${dotSize * 3}px ${dotColor}, 0 0 ${dotSize * 6}px ${dotColor}`,
          top: -dotSize / 2,
          left: "50%",
          marginLeft: -dotSize / 2,
          transformOrigin: `0 calc(${radius}px + ${dotSize / 2}px)`,
        }}
        animate={{ rotate: clockwise ? 360 : -360 }}
        transition={{
          duration,
          delay,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    </div>
  );
}

function HeroOrbitVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute w-20 h-20 rounded-full bg-primary/30 blur-xl" />
      <div className="absolute w-12 h-12 rounded-full bg-secondary/40 blur-lg" />
      <div className="absolute w-6 h-6 rounded-full bg-accent/60 blur-md" />
      <div className="relative z-10 w-16 h-16 rounded-2xl glassmorphic flex items-center justify-center border-primary/30 glow-neon">
        <span className="font-display font-black text-2xl gradient-text-purple">
          M
        </span>
      </div>
      <OrbitRing
        radius={70}
        duration={6}
        delay={0}
        dotSize={8}
        dotColor="oklch(0.68 0.24 308)"
        opacity={0.8}
        clockwise
      />
      <OrbitRing
        radius={110}
        duration={10}
        delay={-2}
        dotSize={6}
        dotColor="oklch(0.72 0.19 200)"
        opacity={0.65}
        clockwise={false}
      />
      <OrbitRing
        radius={155}
        duration={15}
        delay={-5}
        dotSize={10}
        dotColor="oklch(0.65 0.22 260)"
        opacity={0.5}
        clockwise
      />
      <OrbitRing
        radius={200}
        duration={22}
        delay={-8}
        dotSize={5}
        dotColor="oklch(0.68 0.24 308)"
        opacity={0.35}
        clockwise={false}
      />
      {ORBIT_SATELLITES.map(({ label, angle, orbitR, color }, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * orbitR;
        const y = Math.sin(rad) * orbitR;
        return (
          <motion.div
            key={label}
            className="absolute"
            style={{
              left: "50%",
              top: "50%",
              marginLeft: x - 14,
              marginTop: y - 14,
            }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
            transition={{
              duration: 3 + i * 0.7,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          >
            <div
              className="w-8 h-7 rounded-lg flex items-center justify-center glassmorphic-dark"
              style={{
                borderColor: color,
                boxShadow: `0 0 10px ${color}`,
                border: `1px solid ${color}`,
              }}
            >
              <span
                className="font-mono font-bold text-[9px] uppercase tracking-wider leading-none"
                style={{ color }}
              >
                {label}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ── Animated counter ───────────────────────────────────────────────────────

function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
}: { value: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);
  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

// ── Stats bar ──────────────────────────────────────────────────────────────

function StatsBar() {
  const { ref, style } = useRevealOnScroll(0);
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={style}
      className="relative glass-card rounded-2xl p-8 overflow-hidden"
      data-ocid="stats-bar"
    >
      <div className="absolute -left-12 top-0 w-48 h-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute -right-12 top-0 w-48 h-full bg-secondary/10 blur-3xl pointer-events-none" />
      <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {statsData.map(({ value, suffix, label, prefix }, i) => (
          <motion.div
            key={label}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.5 }}
          >
            <div className="font-display font-bold text-3xl md:text-4xl gradient-text-purple mb-1">
              <AnimatedCounter
                value={value}
                suffix={suffix}
                prefix={prefix ?? ""}
              />
            </div>
            <div className="text-sm text-muted-foreground">{label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Industry Card ──────────────────────────────────────────────────────────

function IndustryCard({
  industry,
  index,
}: { industry: (typeof industries)[0]; index: number }) {
  const { ref, style } = useRevealOnScroll(index * 70);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={style}
      data-ocid={`industry.item.${index + 1}`}
      className={`group relative glass-card ${industry.borderGlow} p-6 transition-smooth card-hover overflow-hidden`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${industry.gradient} opacity-0 group-hover:opacity-100 transition-smooth rounded-lg`}
      />
      <div
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none"
        style={{ boxShadow: `inset 0 0 40px ${industry.glowColor}` }}
      />
      <div className="relative z-10">
        <h3 className="font-display font-bold text-lg text-foreground mb-2">
          {industry.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {industry.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {industry.tags.map((tag) => (
            <span key={tag} className="tag-label text-[10px]">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Featured Card ──────────────────────────────────────────────────────────

function FeaturedCard({
  industry,
  index,
}: { industry: (typeof industries)[0]; index: number }) {
  const { ref, style } = useRevealOnScroll(index * 90);
  const cs = industry.caseStudy!;

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={style}
      data-ocid={`featured-industry.item.${index + 1}`}
      className={`group relative glass-card ${industry.borderGlow} overflow-hidden transition-smooth card-hover`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${industry.gradient} opacity-60`}
      />
      <div
        className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-smooth"
        style={{ background: industry.glowColor }}
      />
      <div className="relative z-10 p-7">
        <div className="flex items-center gap-3 mb-5">
          <div>
            <h3 className="font-display font-bold text-xl text-foreground">
              {industry.title}
            </h3>
            <p className="text-xs text-muted-foreground">{cs.client}</p>
          </div>
          <span
            className="ml-auto tag-label"
            style={{
              background: `${industry.glowColor}`,
              borderColor: "transparent",
              color: "white",
            }}
          >
            Featured
          </span>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed mb-5">
          {industry.description}
        </p>
        <div
          className="rounded-xl p-4 mb-5 bg-card/80 dark:bg-black/30 border"
          style={{ borderColor: industry.glowColor }}
        >
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
            Case Study
          </p>
          <p className="font-display font-bold text-base text-foreground mb-1">
            {cs.result}
          </p>
          <p className="text-sm text-muted-foreground">{cs.detail}</p>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[cs.metric1, cs.metric2, cs.metric3].map((m) => (
            <div key={m.label} className="text-center">
              <div className="font-display font-bold text-xl gradient-text-purple">
                {m.value}
              </div>
              <div className="text-xs text-muted-foreground">{m.label}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {industry.tags.map((tag) => (
            <span key={tag} className="tag-label text-[10px]">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export function Industries() {
  const { ref: titleRef, style: titleStyle } = useRevealOnScroll(0);
  const controls = useAnimation();
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  useEffect(() => {
    if (heroInView) controls.start("visible");
  }, [heroInView, controls]);

  const featuredIndustries = industries.filter((i) => i.isFeatured);
  const standardIndustries = industries.filter((i) => !i.isFeatured);

  return (
    <div className="relative pt-20 sm:pt-24 pb-20">
      <div className="absolute inset-0 grid-glow-bg opacity-40" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/6 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-secondary/6 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-40 left-10 w-64 h-64 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* HERO */}
        <div
          ref={heroRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center mb-16 sm:mb-24"
        >
          <motion.div
            ref={titleRef as React.RefObject<HTMLDivElement>}
            style={titleStyle}
            variants={{
              hidden: { opacity: 0, x: -40 },
              visible: { opacity: 1, x: 0 },
            }}
            initial="hidden"
            animate={controls}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="tag-label mb-4 inline-flex">
              Industries We Serve
            </span>
            <h1 className="font-display font-bold text-5xl md:text-6xl text-foreground leading-[1.1] mb-6 mt-3">
              Built for Every{" "}
              <span className="gradient-text-cyan">Vertical</span>
              {", "}
              <span className="gradient-text-purple">Mastered</span> for Yours
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-lg">
              We don't believe in copy-paste playbooks. Each industry has its
              own dynamics, audience psychology, and growth levers — and we've
              mapped all of them.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="btn-primary border-0"
                  data-ocid="hero-cta-contact"
                >
                  Start with Your Industry
                </Button>
              </Link>
              <Link to="/case-studies">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border/60 bg-card text-foreground hover:bg-muted hover:border-primary/30 transition-smooth px-8"
                  data-ocid="hero-cta-cases"
                >
                  View Case Studies
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="relative h-[280px] sm:h-[420px] flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 0.9,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.2,
            }}
          >
            <HeroOrbitVisual />
          </motion.div>
        </div>

        {/* STATS */}
        <div className="mb-16 sm:mb-24">
          <StatsBar />
        </div>

        {/* FEATURED */}
        <div className="mb-20">
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="tag-label mb-4 inline-flex"
              style={{
                background: "oklch(var(--secondary)/0.1)",
                color: "oklch(var(--secondary))",
                borderColor: "oklch(var(--secondary)/0.25)",
              }}
            >
              Proven Results
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mt-3 mb-2">
              Deep-Dive Industries
            </h2>
            <p className="text-muted-foreground mt-2 max-w-xl">
              Three verticals where we've driven extraordinary outcomes — with
              real numbers.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {featuredIndustries.map((industry, i) => (
              <FeaturedCard
                key={industry.title}
                industry={industry}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* SECTION DIVIDER */}
        <div className="divider-premium mb-16" />

        {/* ALL INDUSTRIES */}
        <div className="mb-24">
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="tag-label mb-4 inline-flex">All Verticals</span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mt-3">
              Every Industry, One Agency
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {standardIndustries.map((industry, i) => (
              <IndustryCard
                key={industry.title}
                industry={industry}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="relative glass-card rounded-3xl overflow-hidden p-6 sm:p-12 text-center"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          data-ocid="industries-cta"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-40 bg-primary/15 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 left-1/3 w-60 h-32 bg-secondary/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <span className="tag-label mb-4 inline-flex">Your Industry</span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4 mt-3">
              Is your industry here?{" "}
              <span className="gradient-text-purple">Let's talk.</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Even if your vertical isn't listed, we're fast learners with a
              process built for any market. Tell us about your growth challenge.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="btn-primary border-0 px-10"
                  data-ocid="cta-contact-button"
                >
                  Book a Strategy Call
                </Button>
              </Link>
              <Link to="/case-studies">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary/30 bg-primary/5 text-foreground hover:bg-primary/10 transition-smooth px-10"
                  data-ocid="cta-cases-button"
                >
                  See All Case Studies
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
