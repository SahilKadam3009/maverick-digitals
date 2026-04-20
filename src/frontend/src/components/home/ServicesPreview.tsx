import { Button } from "@/components/ui/button";
import { useRevealOnScroll } from "@/hooks/useIntersectionObserver";
import { Link } from "@tanstack/react-router";

const services = [
  {
    title: "Strategic Branding",
    description: "Identities that command attention across every touchpoint.",
    gradient: "from-primary/20 to-primary/5",
    border: "border-primary/20",
  },
  {
    title: "Performance Marketing",
    description: "Data-obsessed campaigns that drive measurable, scalable ROI.",
    gradient: "from-secondary/20 to-secondary/5",
    border: "border-secondary/20",
  },
  {
    title: "UI/UX & Web Design",
    description: "Conversion-first design built on user psychology.",
    gradient: "from-accent/20 to-accent/5",
    border: "border-accent/20",
  },
  {
    title: "Content Creation",
    description: "Stories that captivate audiences and drive action.",
    gradient: "from-primary/15 to-secondary/5",
    border: "border-primary/15",
  },
];

function ServiceTile({
  service,
  index,
}: { service: (typeof services)[0]; index: number }) {
  const { ref, style } = useRevealOnScroll(index * 80);
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={style}
      className={`group glassmorphic ${service.border} hover:scale-[1.02] hover:shadow-elevated p-6 transition-all duration-300`}
    >
      <h3 className="font-display font-bold text-lg text-foreground mb-2">
        {service.title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {service.description}
      </p>
    </div>
  );
}

export function ServicesPreview() {
  const { ref: titleRef, style: titleStyle } = useRevealOnScroll(0);

  return (
    <section className="relative py-24 px-6 bg-muted/20">
      <div className="absolute inset-0 grid-glow-bg opacity-30" />
      <div className="relative max-w-7xl mx-auto">
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          style={titleStyle}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6"
        >
          <div>
            <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-3">
              What We Do
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground">
              Services Built for <br />
              <span className="gradient-text-purple">Market Dominance</span>
            </h2>
          </div>
          <Link to="/services">
            <Button
              variant="outline"
              className="border-white/20 text-foreground hover:bg-white/5 hover:border-primary/40 transition-smooth shrink-0"
            >
              View All Services
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => (
            <ServiceTile key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
