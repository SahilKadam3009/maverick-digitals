import { useRevealOnScroll } from "@/hooks/useIntersectionObserver";
import { BarChart2, Eye, Lightbulb, ShieldCheck } from "lucide-react";

const points = [
  {
    id: "data",
    icon: BarChart2,
    title: "Data-First Strategy",
    description:
      "Every campaign is built on real data and audience insights. No guesswork — only intelligent strategies that improve over time.",
    accent: "primary",
    stat: "3.2x",
    statLabel: "Avg. ROI improvement",
  },
  {
    id: "creative",
    icon: Lightbulb,
    title: "Creative Precision",
    description:
      "We blend bold creativity with strategic thinking to craft content, ads, and branding that cut through the noise and drive action.",
    accent: "secondary",
    stat: "190%",
    statLabel: "Avg. organic traffic lift",
  },
  {
    id: "transparent",
    icon: Eye,
    title: "Radical Transparency",
    description:
      "You always know what's happening with your campaigns. Real-time reporting, honest communication, and zero hidden fees.",
    accent: "accent",
    stat: "97%",
    statLabel: "Client retention rate",
  },
  {
    id: "proven",
    icon: ShieldCheck,
    title: "Proven Results",
    description:
      "50+ brands scaled. $12M+ revenue generated. 97% client retention. Our track record speaks louder than any pitch deck.",
    accent: "primary",
    stat: "50+",
    statLabel: "Brands transformed",
  },
];

const accentColor = {
  primary: {
    bg: "from-primary/15 to-primary/3",
    border: "border-primary/20",
    icon: "text-primary",
    iconBg: "bg-primary/10",
    stat: "text-primary",
    connector: "bg-primary/30",
    hoverBorder: "hover:border-primary/45",
  },
  secondary: {
    bg: "from-secondary/15 to-secondary/3",
    border: "border-secondary/20",
    icon: "text-secondary",
    iconBg: "bg-secondary/10",
    stat: "text-secondary",
    connector: "bg-secondary/30",
    hoverBorder: "hover:border-secondary/45",
  },
  accent: {
    bg: "from-accent/15 to-accent/3",
    border: "border-accent/20",
    icon: "text-accent",
    iconBg: "bg-accent/10",
    stat: "text-accent",
    connector: "bg-accent/30",
    hoverBorder: "hover:border-accent/45",
  },
};

function PointCard({
  point,
  index,
}: {
  point: (typeof points)[0];
  index: number;
}) {
  const { ref, style } = useRevealOnScroll(index * 120);
  const a = accentColor[point.accent as keyof typeof accentColor];
  const Icon = point.icon;

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={style}
      className={`group relative glassmorphic bg-gradient-to-br ${a.bg} ${a.border} ${a.hoverBorder} p-7 transition-all duration-300 hover:scale-[1.02] hover:shadow-elevated`}
      data-ocid={`why-us-${point.id}`}
    >
      {/* Index number watermark */}
      <div className="absolute top-4 right-5 font-display font-black text-6xl text-white/3 select-none pointer-events-none">
        {String(index + 1).padStart(2, "0")}
      </div>

      <div
        className={`w-12 h-12 rounded-xl ${a.iconBg} border ${a.border} flex items-center justify-center mb-5`}
      >
        <Icon size={22} className={a.icon} />
      </div>

      <h3 className="font-display font-bold text-xl text-foreground mb-3">
        {point.title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-5">
        {point.description}
      </p>

      {/* Stat pill */}
      <div className="flex items-baseline gap-2">
        <span className={`font-display font-black text-3xl ${a.stat}`}>
          {point.stat}
        </span>
        <span className="text-xs text-muted-foreground">{point.statLabel}</span>
      </div>
    </div>
  );
}

export function WhyChooseUs() {
  const { ref: titleRef, style: titleStyle } = useRevealOnScroll(0);

  return (
    <section className="relative py-28 px-6 overflow-hidden bg-background">
      <div className="absolute inset-0 grid-glow-bg opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/4 rounded-full blur-[160px]" />

      <div className="relative max-w-7xl mx-auto">
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          style={titleStyle}
          className="text-center mb-20"
        >
          <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-3">
            Why Maverick
          </p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-5">
            Why Mumbai Businesses Choose{" "}
            <span className="gradient-text-cyan">Maverick Digitals</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-base leading-relaxed">
            We're not your average digital marketing agency in Mumbai. We
            combine data intelligence, creative excellence, and radical
            transparency to deliver results that matter.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Animated connector line (desktop) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-3/4 bg-gradient-to-b from-transparent via-primary/20 to-transparent hidden md:block" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-secondary/20 to-transparent hidden md:block" />

          {points.map((point, i) => (
            <PointCard key={point.id} point={point} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
