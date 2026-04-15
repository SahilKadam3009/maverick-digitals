import { useRevealOnScroll } from "@/hooks/useIntersectionObserver";
import { FlaskConical, Layers, Rocket, Search, TrendingUp } from "lucide-react";
import { useRef } from "react";

const steps = [
  {
    step: 1,
    icon: Search,
    title: "Discovery",
    description:
      "We start by understanding your market properly — who you're actually competing against, who your customers are, and what's already working in your space.",
    color: "primary",
  },
  {
    step: 2,
    icon: Layers,
    title: "Strategy",
    description:
      "Before anything goes live, we agree on the plan — which channels make sense for you, what success looks like, and how we're measuring it.",
    color: "secondary",
  },
  {
    step: 3,
    icon: FlaskConical,
    title: "Creative",
    description:
      "Our creative team builds the content, ads, and brand assets. Everything gets pressure-tested before it ever reaches your audience.",
    color: "accent",
  },
  {
    step: 4,
    icon: Rocket,
    title: "Launch",
    description:
      "We launch carefully, not quickly. Tracking is set up properly, everything goes through QA, and we're watching performance from the first hour.",
    color: "primary",
  },
  {
    step: 5,
    icon: TrendingUp,
    title: "Optimize",
    description:
      "After launch, the real work starts. We test, cut what's underperforming, and put more behind what's working. Consistently.",
    color: "secondary",
  },
];

const colorCfg = {
  primary: {
    numBg: "gradient-neon-purple",
    iconColor: "text-primary",
    iconBg: "bg-primary/10 border-primary/20",
    connector: "from-primary/40 to-secondary/20",
    border: "border-primary/20 hover:border-primary/40",
    glow: "hover:shadow-[0_0_40px_oklch(0.68_0.24_308_/_0.12)]",
  },
  secondary: {
    numBg: "gradient-neon-cyan",
    iconColor: "text-secondary",
    iconBg: "bg-secondary/10 border-secondary/20",
    connector: "from-secondary/40 to-accent/20",
    border: "border-secondary/20 hover:border-secondary/40",
    glow: "hover:shadow-[0_0_40px_oklch(0.72_0.19_200_/_0.12)]",
  },
  accent: {
    numBg: "bg-accent",
    iconColor: "text-accent",
    iconBg: "bg-accent/10 border-accent/20",
    connector: "from-accent/40 to-primary/20",
    border: "border-accent/20 hover:border-accent/40",
    glow: "hover:shadow-[0_0_40px_oklch(0.65_0.22_260_/_0.12)]",
  },
};

function StepCard({
  step,
  index,
  isLast,
}: {
  step: (typeof steps)[0];
  index: number;
  isLast: boolean;
}) {
  const { ref, style } = useRevealOnScroll(index * 120);
  const cfg = colorCfg[step.color as keyof typeof colorCfg];
  const Icon = step.icon;
  const connectorRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={style}
      className="relative flex flex-col items-center"
    >
      {/* Card */}
      <div
        className={`glassmorphic ${cfg.border} ${cfg.glow} p-7 w-full transition-all duration-300 hover:scale-[1.02] group`}
      >
        {/* Step number */}
        <div
          className={`w-10 h-10 rounded-full ${cfg.numBg} flex items-center justify-center font-display font-black text-background text-sm mb-5`}
        >
          {step.step}
        </div>

        {/* Icon */}
        <div
          className={`w-11 h-11 rounded-xl border ${cfg.iconBg} flex items-center justify-center mb-4`}
        >
          <Icon size={20} className={cfg.iconColor} />
        </div>

        <h3 className="font-display font-bold text-lg text-foreground mb-3">
          {step.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {step.description}
        </p>
      </div>

      {/* Animated connector line (between steps, horizontal on desktop) */}
      {!isLast && (
        <div
          ref={connectorRef}
          className={`hidden lg:block absolute top-12 left-full w-full h-px bg-gradient-to-r ${cfg.connector} opacity-50 z-0`}
          style={{ width: "calc(100% - 2rem)", left: "calc(100% - 0rem)" }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export function ProcessSection() {
  const { ref: titleRef, style: titleStyle } = useRevealOnScroll(0);

  return (
    <section className="relative py-16 sm:py-28 px-4 sm:px-6 overflow-hidden bg-muted/15">
      <div className="absolute inset-0 grid-glow-bg opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto">
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          style={titleStyle}
          className="text-center mb-20"
        >
          <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-3">
            How We Work
          </p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-5">
            Our <span className="gradient-text-purple">Process</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Here's how we typically work with a new client.
          </p>
        </div>

        {/* Horizontal connector on large screens */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
          <div
            className="absolute top-12 left-0 right-0 h-px hidden lg:block"
            style={{
              background:
                "linear-gradient(90deg, transparent, oklch(0.68 0.24 308 / 0.2), oklch(0.72 0.19 200 / 0.3), oklch(0.65 0.22 260 / 0.2), oklch(0.68 0.24 308 / 0.2), transparent)",
            }}
            aria-hidden="true"
          />
          {steps.map((step, i) => (
            <StepCard
              key={step.step}
              step={step}
              index={i}
              isLast={i === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
