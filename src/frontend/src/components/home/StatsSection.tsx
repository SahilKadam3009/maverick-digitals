import { useRevealOnScroll } from "@/hooks/useIntersectionObserver";

const stats = [
  { value: "40+", label: "Brands Scaled", color: "text-primary" },
  { value: "15M+", label: "Organic Views", color: "text-secondary" },
  { value: "200%+", label: "Average ROI", color: "text-accent" },
  { value: "2X+", label: "Average Revenue Growth", color: "text-primary" },
];

export function StatsSection() {
  const { ref, style } = useRevealOnScroll(0);

  return (
    <section className="relative py-12 sm:py-16 px-4 sm:px-6 bg-card/50 border-y border-white/8">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        style={style}
        className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8"
      >
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="text-center"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <div
              className={`font-display font-bold text-4xl md:text-5xl ${stat.color} mb-2`}
            >
              {stat.value}
            </div>
            <div className="text-muted-foreground text-sm font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
