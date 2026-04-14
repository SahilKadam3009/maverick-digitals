import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRevealOnScroll } from "@/hooks/useIntersectionObserver";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ExternalLink,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type FilterCategory =
  | "All"
  | "SEO"
  | "Paid Media"
  | "Brand Strategy"
  | "Social Media"
  | "Growth";

interface CaseStudyData {
  id: string;
  client: string;
  industry: string;
  headline: string;
  challenge: string;
  solution: string;
  result: string;
  kpi: string;
  categories: FilterCategory[];
  color: "purple" | "cyan" | "blue";
  imageGradient: string;
  metrics: { label: string; value: string }[];
  featured?: boolean;
}

const caseStudies: CaseStudyData[] = [
  {
    id: "techflow-saas",
    client: "TechFlow SaaS",
    industry: "Technology",
    headline: "+340% Organic Traffic in 8 Months",
    challenge: "Invisible in search despite superior product",
    solution: "Full-funnel SEO architecture & topical authority build",
    result: "Dominating 1,200+ keywords; organic now #1 acquisition channel",
    kpi: "+340%",
    categories: ["SEO", "Growth"],
    color: "purple",
    imageGradient: "from-primary/30 via-accent/20 to-secondary/20",
    metrics: [
      { label: "Organic Traffic", value: "+340%" },
      { label: "Keywords Ranked", value: "1,200+" },
      { label: "Revenue via SEO", value: "$2.1M" },
    ],
    featured: true,
  },
  {
    id: "stylehouse-fashion",
    client: "StyleHouse Fashion",
    industry: "E-Commerce",
    headline: "+5x ROAS on Paid Media Channels",
    challenge: "Burning budget with below-average return on ad spend",
    solution:
      "Creative-led campaign overhaul with precision audience targeting",
    result: "5x ROAS across Meta, Google & TikTok within 60 days",
    kpi: "5x ROAS",
    categories: ["Paid Media", "Growth"],
    color: "cyan",
    imageGradient: "from-secondary/30 via-primary/15 to-accent/20",
    metrics: [
      { label: "ROAS", value: "5x" },
      { label: "Revenue Uplift", value: "+190%" },
      { label: "New Customers", value: "+18K" },
    ],
  },
  {
    id: "medicare-app",
    client: "MediCare App",
    industry: "Health & Wellness",
    headline: "2x Conversion Rate — From Visitor to Patient",
    challenge: "High traffic but razor-thin conversion to booked appointments",
    solution:
      "Landing page redesign, trust-building content & retargeting flows",
    result: "Doubled CVR; 4,000+ monthly appointments booked through digital",
    kpi: "2x CVR",
    categories: ["Growth", "Paid Media"],
    color: "blue",
    imageGradient: "from-accent/30 via-secondary/20 to-primary/15",
    metrics: [
      { label: "Conversion Rate", value: "2x" },
      { label: "Monthly Bookings", value: "+4,000" },
      { label: "CAC Drop", value: "-52%" },
    ],
  },
  {
    id: "growthos",
    client: "GrowthOS",
    industry: "B2B SaaS",
    headline: "3M Impressions & 40K Followers in 90 Days",
    challenge: "Zero brand presence in a crowded B2B software space",
    solution:
      "Thought leadership strategy, LinkedIn content engine & personal branding",
    result: "3M organic impressions; inbound pipeline grew 220%",
    kpi: "3M Impressions",
    categories: ["Brand Strategy", "Social Media"],
    color: "purple",
    imageGradient: "from-primary/20 via-accent/25 to-secondary/20",
    metrics: [
      { label: "Organic Impressions", value: "3M" },
      { label: "Followers Gained", value: "+40K" },
      { label: "Pipeline Growth", value: "+220%" },
    ],
  },
  {
    id: "edupro",
    client: "EduPro Learning",
    industry: "EdTech",
    headline: "60% Increase in Course Enrollment Leads",
    challenge: "Expensive paid acquisition with high drop-off at sign-up",
    solution:
      "SEO content funnels + email nurture sequences rebuilt from scratch",
    result: "60% more leads at 35% lower cost; 4.2x email open rate",
    kpi: "+60% Leads",
    categories: ["SEO", "Growth", "Brand Strategy"],
    color: "cyan",
    imageGradient: "from-secondary/25 via-accent/15 to-primary/20",
    metrics: [
      { label: "Lead Volume", value: "+60%" },
      { label: "Cost Per Lead", value: "-35%" },
      { label: "Email Open Rate", value: "4.2x" },
    ],
  },
  {
    id: "retailx",
    client: "RetailX",
    industry: "Retail",
    headline: "280% Revenue Growth Through Social Commerce",
    challenge: "Brick-and-mortar brand struggling to convert online audiences",
    solution: "Social commerce strategy across Instagram, TikTok & YouTube",
    result: "280% revenue uplift from social within 6 months",
    kpi: "+280% Revenue",
    categories: ["Social Media", "Paid Media"],
    color: "blue",
    imageGradient: "from-accent/25 via-primary/20 to-secondary/25",
    metrics: [
      { label: "Revenue Growth", value: "+280%" },
      { label: "Social Sales", value: "$900K+" },
      { label: "Video Views", value: "12M" },
    ],
  },
];

const filters: FilterCategory[] = [
  "All",
  "SEO",
  "Paid Media",
  "Brand Strategy",
  "Social Media",
  "Growth",
];

const colorMap = {
  purple: {
    glow: "glow-neon",
    badge: "bg-primary/15 border-primary/30 text-primary",
    metric: "gradient-text-purple",
    tag: "bg-primary/10 border-primary/20 text-primary",
    dot: "bg-primary",
  },
  cyan: {
    glow: "glow-cyan",
    badge: "bg-secondary/15 border-secondary/30 text-secondary",
    metric: "gradient-text-cyan",
    tag: "bg-secondary/10 border-secondary/20 text-secondary",
    dot: "bg-secondary",
  },
  blue: {
    glow: "",
    badge: "bg-accent/15 border-accent/30 text-accent-foreground",
    metric: "gradient-text-purple",
    tag: "bg-accent/10 border-accent/20 text-accent-foreground",
    dot: "bg-accent",
  },
};

// Animated particle background for hero
const purpleParticles = [
  { id: "pp1", left: "5%", top: "10%", dur: 3, delay: 0 },
  { id: "pp2", left: "42%", top: "63%", dur: 4, delay: 0.3 },
  { id: "pp3", left: "79%", top: "16%", dur: 5, delay: 0.6 },
  { id: "pp4", left: "16%", top: "82%", dur: 3, delay: 0.9 },
  { id: "pp5", left: "53%", top: "36%", dur: 6, delay: 1.2 },
  { id: "pp6", left: "88%", top: "54%", dur: 4, delay: 0.15 },
  { id: "pp7", left: "31%", top: "27%", dur: 5, delay: 0.45 },
  { id: "pp8", left: "67%", top: "71%", dur: 3, delay: 0.75 },
];

const cyanParticles = [
  { id: "cp1", left: "20%", top: "30%", dur: 4, delay: 0 },
  { id: "cp2", left: "87%", top: "73%", dur: 5, delay: 0.5 },
  { id: "cp3", left: "54%", top: "15%", dur: 6, delay: 1.0 },
  { id: "cp4", left: "9%", top: "60%", dur: 4, delay: 1.5 },
];

function HeroParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {purpleParticles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-1 h-1 rounded-full bg-primary/40"
          style={{ left: p.left, top: p.top }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.7, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.dur,
            repeat: Number.POSITIVE_INFINITY,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
      {cyanParticles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-1.5 h-1.5 rounded-full bg-secondary/30"
          style={{ left: p.left, top: p.top }}
          animate={{ y: [0, 25, 0], opacity: [0.15, 0.5, 0.15] }}
          transition={{
            duration: p.dur,
            repeat: Number.POSITIVE_INFINITY,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Featured case study card
function FeaturedCard({ study }: { study: CaseStudyData }) {
  const { ref, style } = useRevealOnScroll(0);
  const colors = colorMap[study.color];

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={style}
      className="relative overflow-hidden rounded-2xl border border-white/10 mb-10 sm:mb-14"
    >
      {/* Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${study.imageGradient}`}
      />
      <div className="absolute inset-0 grid-glow-bg opacity-20" />
      <div className="absolute inset-0 bg-card/60 backdrop-blur-sm" />

      <div className="relative p-6 md:p-12 flex flex-col md:flex-row gap-6 sm:gap-8 items-start">
        <div className="flex-1 min-w-0">
          {/* Label */}
          <div className="flex items-center gap-3 mb-5">
            <span
              className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${colors.badge}`}
            >
              Featured Case Study
            </span>
            <Badge
              variant="secondary"
              className="bg-white/8 border-white/15 text-muted-foreground text-xs"
            >
              {study.industry}
            </Badge>
          </div>

          <p className="text-muted-foreground text-sm font-medium mb-2">
            {study.client}
          </p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground leading-tight mb-4">
            {study.headline}
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6 max-w-xl">
            {study.result}
          </p>

          <div className="flex flex-wrap gap-3 mb-6">
            {study.categories.map((cat) => (
              <span
                key={cat}
                className={`text-xs px-2.5 py-1 rounded-full border ${colors.tag}`}
              >
                {cat}
              </span>
            ))}
          </div>

          <button
            type="button"
            className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-smooth group/link"
            data-ocid="featured-case-cta"
          >
            Read Full Case Study
            <ArrowRight
              size={14}
              className="group-hover/link:translate-x-1 transition-smooth"
            />
          </button>
        </div>

        {/* KPI pills */}
        <div className="grid grid-cols-3 sm:grid-cols-1 gap-3 w-full sm:w-auto sm:min-w-[220px]">
          {study.metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.12, duration: 0.5 }}
              className="glassmorphic-dark px-5 py-4 flex flex-col items-center text-center rounded-xl border border-white/10"
            >
              <span
                className={`font-display font-bold text-2xl ${colors.metric}`}
              >
                {m.value}
              </span>
              <span className="text-xs text-muted-foreground mt-1">
                {m.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Regular case study card
function CaseStudyCard({
  study,
  index,
}: { study: CaseStudyData; index: number }) {
  const { ref, style } = useRevealOnScroll(index * 100);
  const colors = colorMap[study.color];

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={style}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="group glassmorphic border-white/10 hover:border-primary/25 overflow-hidden transition-colors duration-300 flex flex-col"
      data-ocid={`case-card-${study.id}`}
    >
      {/* Visual header */}
      <div
        className={`relative h-44 bg-gradient-to-br ${study.imageGradient} p-6 flex flex-col justify-end overflow-hidden`}
      >
        <div className="absolute inset-0 grid-glow-bg opacity-25" />

        {/* Floating accent orb */}
        <motion.div
          className="absolute top-4 right-6 w-16 h-16 rounded-full blur-2xl"
          style={{ background: "oklch(var(--primary) / 0.25)" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* KPI badge */}
        <div className="relative flex items-center gap-3">
          <span className={`font-display font-black text-3xl ${colors.metric}`}>
            {study.kpi}
          </span>
        </div>
        <div className="relative flex items-center gap-2 mt-2">
          <Badge
            variant="secondary"
            className="bg-black/40 text-foreground border-white/15 text-xs"
          >
            {study.industry}
          </Badge>
          <span className="text-xs text-muted-foreground">{study.client}</span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display font-bold text-lg text-foreground mb-3 leading-tight">
          {study.headline}
        </h3>

        {/* Challenge / Solution / Result teaser */}
        <div className="space-y-2.5 mb-5 flex-1">
          {[
            { icon: Target, label: "Challenge", text: study.challenge },
            { icon: Zap, label: "Solution", text: study.solution },
            { icon: TrendingUp, label: "Result", text: study.result },
          ].map(({ icon: Icon, label, text }) => (
            <div key={label} className="flex gap-2.5 items-start">
              <div
                className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 ${colors.tag}`}
              >
                <Icon size={11} />
              </div>
              <div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {label}:{" "}
                </span>
                <span className="text-xs text-foreground/80">{text}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Metrics row */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {study.metrics.map((m) => (
            <div
              key={m.label}
              className="text-center p-2.5 rounded-lg bg-white/5 border border-white/8"
            >
              <div
                className={`font-display font-bold text-base ${colors.metric}`}
              >
                {m.value}
              </div>
              <div className="text-[10px] text-muted-foreground mt-0.5 leading-tight">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {study.categories.map((cat) => (
            <span
              key={cat}
              className={`text-[10px] px-2 py-0.5 rounded-full border ${colors.tag}`}
            >
              {cat}
            </span>
          ))}
        </div>

        <button
          type="button"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-smooth group/link mt-auto"
          data-ocid={`case-cta-${study.id}`}
        >
          View Full Case
          <ExternalLink
            size={12}
            className="group-hover/link:translate-x-0.5 transition-smooth"
          />
        </button>
      </div>
    </motion.div>
  );
}

// Filter pill button
function FilterPill({
  label,
  active,
  onClick,
}: {
  label: FilterCategory;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      data-ocid={`filter-${label.toLowerCase().replace(/\s/g, "-")}`}
      className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
        active
          ? "border-primary/50 text-foreground"
          : "border-white/10 text-muted-foreground hover:border-white/25 hover:text-foreground"
      }`}
    >
      {active && (
        <motion.span
          layoutId="filter-pill-bg"
          className="absolute inset-0 rounded-full gradient-neon-purple opacity-20"
          transition={{ type: "spring", stiffness: 400, damping: 35 }}
        />
      )}
      {label}
    </motion.button>
  );
}

// Hero section with animated background
function HeroSection() {
  const { ref, style } = useRevealOnScroll(0);

  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-24 sm:pt-28 pb-12 sm:pb-16">
      {/* Background layers */}
      <div className="absolute inset-0 grid-glow-bg opacity-40" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[350px] bg-secondary/6 rounded-full blur-[100px] pointer-events-none" />
      <HeroParticles />

      {/* Scan line effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 40%, oklch(var(--primary) / 0.03) 50%, transparent 60%)",
        }}
        animate={{ y: [-100, 100] }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        style={style}
        className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-semibold text-primary uppercase tracking-widest">
            Case Studies
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-foreground leading-[0.9] tracking-tight mb-6"
        >
          Our Work{" "}
          <span className="block gradient-text-purple mt-1">Speaks.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Real clients, real results, real growth. Every number below is a
          strategy executed, a market won, and a brand transformed.
        </motion.p>

        {/* Stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="inline-flex flex-wrap gap-6 justify-center"
        >
          {[
            { val: "120+", label: "Projects Delivered" },
            { val: "6 Industries", label: "Across Verticals" },
            { val: "3.2x Avg ROI", label: "Client Average" },
          ].map((s) => (
            <div key={s.val} className="text-center">
              <div className="font-display font-bold text-2xl gradient-text-purple">
                {s.val}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function CaseStudies() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("All");
  const { ref: gridRef, style: gridStyle } = useRevealOnScroll(0);

  const featured = caseStudies.find((c) => c.featured)!;
  const filteredStudies = caseStudies.filter((c) => {
    if (activeFilter === "All") return true;
    return c.categories.includes(activeFilter);
  });
  const showFeatured = activeFilter === "All";

  return (
    <div className="relative bg-background min-h-screen">
      <HeroSection />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pb-24">
        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-2 justify-center mb-10 sm:mb-14"
          data-ocid="filter-bar"
        >
          {filters.map((f) => (
            <FilterPill
              key={f}
              label={f}
              active={activeFilter === f}
              onClick={() => setActiveFilter(f)}
            />
          ))}
        </motion.div>

        {/* Featured card */}
        <AnimatePresence mode="wait">
          {showFeatured && (
            <motion.div
              key="featured"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <FeaturedCard study={featured} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filter label */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display font-bold text-2xl text-foreground">
            {activeFilter === "All"
              ? "All Case Studies"
              : `${activeFilter} Results`}
          </h2>
          <span className="text-sm text-muted-foreground">
            {filteredStudies.length}{" "}
            {filteredStudies.length === 1 ? "project" : "projects"}
          </span>
        </div>

        {/* Case studies grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            ref={gridRef as React.RefObject<HTMLDivElement>}
            style={gridStyle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
            data-ocid="case-studies-grid"
          >
            {(showFeatured
              ? caseStudies.filter((c) => !c.featured)
              : filteredStudies
            ).map((study, i) => (
              <CaseStudyCard key={study.id} study={study} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-accent/10 to-secondary/10" />
          <div className="absolute inset-0 grid-glow-bg opacity-20" />
          <div className="relative px-6 sm:px-8 md:px-16 py-10 sm:py-12 md:py-16 text-center">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-4">
              Ready to be next?
            </p>
            <h2 className="font-display font-black text-4xl md:text-5xl text-foreground mb-4 leading-tight">
              Let's Build Your{" "}
              <span className="gradient-text-purple">Success Story</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Join 120+ brands that trusted Maverick Digitals to transform their
              digital presence into real, measurable growth.
            </p>
            <Link to="/contact">
              <Button
                size="lg"
                className="gradient-neon-purple text-background font-bold glow-neon hover:scale-105 transition-smooth border-0 px-10 h-13 text-base"
                data-ocid="cta-start-project"
              >
                Start Your Project
                <ArrowRight size={17} className="ml-2" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
