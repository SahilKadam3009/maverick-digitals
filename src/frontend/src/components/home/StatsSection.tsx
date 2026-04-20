import { useRevealOnScroll } from "@/hooks/useIntersectionObserver";
import { useEffect, useRef, useState } from "react";

const stats = [
  {
    value: "40+",
    numericTarget: 40,
    suffix: "+",
    label: "Brands Scaled",
    sublabel: "across India & globally",
    color: "primary" as const,
  },
  {
    value: "15M+",
    numericTarget: 15,
    suffix: "M+",
    label: "Organic Views",
    sublabel: "generated for our clients",
    color: "secondary" as const,
  },
  {
    value: "200%+",
    numericTarget: 200,
    suffix: "%+",
    label: "Average ROI",
    sublabel: "across all campaigns",
    color: "accent" as const,
  },
  {
    value: "2X+",
    numericTarget: 2,
    suffix: "X+",
    label: "Revenue Growth",
    sublabel: "minimum, guaranteed",
    color: "primary" as const,
  },
];

const GRADIENT = {
  primary: "gradient-text-purple",
  secondary: "gradient-text-cyan",
  accent: "text-accent",
};

function AnimatedNumber({
  target,
  suffix,
  isVisible,
  delay,
}: {
  target: number;
  suffix: string;
  isVisible: boolean;
  delay: number;
}) {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!isVisible || startedRef.current) return;
    startedRef.current = true;

    const timer = setTimeout(() => {
      const duration = 1400;
      const start = performance.now();

      const tick = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out quart
        const eased = 1 - (1 - progress) ** 4;
        setCount(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    }, delay);

    return () => clearTimeout(timer);
  }, [isVisible, target, delay]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const { ref, style } = useRevealOnScroll(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-14 sm:py-20 px-4 sm:px-6 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-background to-secondary/5" />
      <div className="absolute inset-0 grid-glow-bg opacity-15" />

      {/* Top & bottom separator lines */}
      <div
        className="absolute top-0 left-10% right-10% h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(var(--primary)/0.3), oklch(var(--secondary)/0.3), transparent)",
        }}
      />
      <div
        className="absolute bottom-0 left-10% right-10% h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(var(--accent)/0.2), oklch(var(--primary)/0.2), transparent)",
        }}
      />

      <div
        ref={(el) => {
          (
            sectionRef as React.MutableRefObject<HTMLDivElement | null>
          ).current = el;
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
        }}
        style={style}
        className="relative max-w-6xl mx-auto"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="group relative text-center px-6 py-10"
              style={{ transitionDelay: `${i * 80}ms` }}
              data-ocid={`stat-item-${i + 1}`}
            >
              {/* Vertical divider between items */}
              {i < stats.length - 1 && (
                <div
                  className="absolute right-0 top-1/4 bottom-1/4 w-px hidden md:block"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent, oklch(var(--border)/0.8), transparent)",
                  }}
                />
              )}
              {/* Mobile: bottom divider on first row */}
              {i < 2 && (
                <div
                  className="absolute bottom-0 left-1/4 right-1/4 h-px md:hidden"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, oklch(var(--border)/0.6), transparent)",
                  }}
                />
              )}

              {/* Large stat number */}
              <div
                className={`font-display font-black leading-none mb-3 tabular-nums ${GRADIENT[stat.color]}`}
                style={{
                  fontSize: "clamp(2.8rem, 5.5vw, 4.5rem)",
                  letterSpacing: "-0.03em",
                }}
              >
                <AnimatedNumber
                  target={stat.numericTarget}
                  suffix={stat.suffix}
                  isVisible={isVisible}
                  delay={i * 120}
                />
              </div>

              {/* Label — small caps, tracked */}
              <p className="font-display font-bold text-foreground text-sm uppercase tracking-widest leading-tight mb-1">
                {stat.label}
              </p>

              {/* Sublabel */}
              <p className="text-muted-foreground text-xs leading-snug opacity-70">
                {stat.sublabel}
              </p>

              {/* Hover accent dot */}
              <div
                className={`absolute bottom-4 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-${stat.color}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
