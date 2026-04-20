import { useRevealOnScroll } from "@/hooks/useIntersectionObserver";

const steps = [
  {
    step: 1,
    stepLabel: "01",
    title: "Discovery",
    description:
      "We start by understanding your market properly — who you're actually competing against, who your customers are, and what's already working in your space.",
    color: "primary",
    gradStart: "#a855f7",
    gradEnd: "#06b6d4",
  },
  {
    step: 2,
    stepLabel: "02",
    title: "Strategy",
    description:
      "Before anything goes live, we agree on the plan — which channels make sense for you, what success looks like, and how we're measuring it.",
    color: "secondary",
    gradStart: "#3b82f6",
    gradEnd: "#06b6d4",
  },
  {
    step: 3,
    stepLabel: "03",
    title: "Creative",
    description:
      "Our creative team builds the content, ads, and brand assets. Everything gets pressure-tested before it ever reaches your audience.",
    color: "accent",
    gradStart: "#06b6d4",
    gradEnd: "#a855f7",
  },
  {
    step: 4,
    stepLabel: "04",
    title: "Launch",
    description:
      "We launch carefully, not quickly. Tracking is set up properly, everything goes through QA, and we're watching performance from the first hour.",
    color: "primary",
    gradStart: "#a855f7",
    gradEnd: "#3b82f6",
  },
  {
    step: 5,
    stepLabel: "05",
    title: "Optimize",
    description:
      "After launch, the real work starts. We test, cut what's underperforming, and put more behind what's working. Consistently.",
    color: "secondary",
    gradStart: "#3b82f6",
    gradEnd: "#a855f7",
  },
];

function StepCard({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const { ref, style } = useRevealOnScroll(index * 110);
  const numId = `step-num-grad-${index}`;

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={style}
      className="relative flex flex-col"
      data-ocid={`process-step-${index + 1}`}
    >
      <div className="glass-card p-7 h-full hover:scale-[1.02] transition-all duration-300 group relative overflow-hidden cursor-default">
        {/* Mega editorial step number — dominant background watermark */}
        <span
          className="absolute select-none pointer-events-none font-display font-black leading-none"
          aria-hidden="true"
          style={{
            bottom: "-0.1em",
            right: "0.3rem",
            fontSize: "clamp(5rem, 9vw, 8rem)",
            lineHeight: "0.85",
            background: `linear-gradient(135deg, ${step.gradStart}20, ${step.gradEnd}10)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {step.stepLabel}
        </span>

        {/* Numbered badge */}
        <div className="relative z-10">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center font-display font-black text-white text-sm mb-5 flex-shrink-0"
            style={{
              background: `linear-gradient(135deg, ${step.gradStart}, ${step.gradEnd})`,
              boxShadow: `0 0 16px ${step.gradStart}40`,
            }}
          >
            {step.step}
          </div>

          <h3
            className="font-display font-bold text-foreground mb-3"
            style={{
              fontSize: "var(--font-size-h4)",
              lineHeight: "var(--line-height-heading)",
              letterSpacing: "var(--tracking-tight)",
            }}
          >
            {step.title}
          </h3>
          <p
            className="text-muted-foreground"
            style={{
              fontSize: "var(--font-size-sm)",
              lineHeight: "var(--line-height-body)",
            }}
          >
            {step.description}
          </p>
        </div>

        {/* Hover corner glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[inherit] pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 10% 10%, ${step.gradStart}14 0%, transparent 60%)`,
          }}
          aria-hidden="true"
        />

        {/* SVG gradient def (hidden, per card) */}
        <svg
          width="0"
          height="0"
          aria-hidden="true"
          focusable="false"
          style={{ position: "absolute", pointerEvents: "none" }}
        >
          <defs>
            <linearGradient id={numId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={step.gradStart} stopOpacity="0.15" />
              <stop offset="100%" stopColor={step.gradEnd} stopOpacity="0.08" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

export function ProcessSection() {
  const { ref: titleRef, style: titleStyle } = useRevealOnScroll(0);

  return (
    <section
      className="relative overflow-hidden bg-muted/15 section-gradient-border"
      style={{
        paddingTop: "var(--section-padding-y)",
        paddingBottom: "var(--section-padding-y)",
        paddingLeft: "var(--section-padding-x)",
        paddingRight: "var(--section-padding-x)",
      }}
    >
      <div
        className="absolute inset-0 grid-glow-bg opacity-20"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[320px] rounded-full blur-[120px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(168,85,247,0.06) 0%, rgba(6,182,212,0.04) 60%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Section header */}
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          style={titleStyle}
          className="text-center mb-20"
        >
          <span className="tag-label mb-4 inline-flex">How We Work</span>
          <h2
            className="font-display font-bold text-foreground mt-4 mb-5"
            style={{
              fontSize: "var(--font-size-h2)",
              lineHeight: "var(--line-height-heading)",
              letterSpacing: "var(--tracking-tight)",
            }}
          >
            Our <span className="gradient-text-purple">Process</span>
          </h2>
          <p
            className="text-muted-foreground max-w-lg mx-auto"
            style={{
              fontSize: "var(--font-size-body)",
              lineHeight: "var(--line-height-body)",
            }}
          >
            Here's how we typically work with a new client.
          </p>
        </div>

        {/* Animated gradient connector line */}
        <div className="relative">
          <div
            className="absolute top-[3.25rem] left-[3%] right-[3%] h-px hidden lg:block pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(168,85,247,0.35) 20%, rgba(59,130,246,0.45) 40%, rgba(6,182,212,0.45) 60%, rgba(168,85,247,0.35) 80%, transparent 100%)",
              animation: "connectorPulse 4s ease-in-out infinite",
            }}
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {steps.map((step, i) => (
              <StepCard key={step.step} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes connectorPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </section>
  );
}
