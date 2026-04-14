import { useRevealOnScroll } from "@/hooks/useIntersectionObserver";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  FileText,
  Globe,
  Palette,
  Rocket,
  TrendingUp,
} from "lucide-react";
import { useRef, useState } from "react";

const services = [
  {
    id: "personal-branding",
    icon: Globe,
    title: "Personal Branding",
    description:
      "Strategy, ghostwriting, content systems for founders & creators",
    subItems: [
      "Personal Brand Strategy",
      "Ghostwriting & Content",
      "Founder Positioning",
      "Content Systems",
    ],
    accent: "primary",
    size: "large",
  },
  {
    id: "social-media",
    icon: TrendingUp,
    title: "Social Media Management",
    description: "Done-for-you content, growth, and analytics across platforms",
    subItems: [
      "Analytics & Reporting",
      "Growth Strategy",
      "Community Management",
      "Content Planning & Creation",
    ],
    accent: "secondary",
    size: "small",
  },
  {
    id: "web-dev",
    icon: Rocket,
    title: "Website & App Development",
    description: "High-performance sites, e-commerce, and custom web apps",
    subItems: [
      "Performance Optimization",
      "Mobile App Development",
      "E-commerce Solutions",
      "Custom Web Development",
    ],
    accent: "accent",
    size: "small",
  },
  {
    id: "seo-sem",
    icon: BarChart3,
    title: "SEO & SEM",
    description:
      "Keyword strategy, optimization, Google Ads, and inbound lead engines",
    subItems: [
      "Local SEO Optimization",
      "Google Ads Management",
      "Keyword Research & Strategy",
      "Technical SEO Audit",
    ],
    accent: "primary",
    size: "small",
  },
  {
    id: "performance",
    icon: FileText,
    title: "Performance Marketing",
    description:
      "ROI-first Meta & Google campaigns with funnel-driven execution",
    subItems: [
      "ROI Tracking & Analysis",
      "Conversion Optimization",
      "Google Ads Campaigns",
      "Meta Ads Management",
    ],
    accent: "secondary",
    size: "small",
  },
  {
    id: "branding",
    icon: Palette,
    title: "Branding & Strategy",
    description:
      "Identity, messaging, GTM launches, and positioning frameworks",
    subItems: [
      "Brand Guidelines",
      "Go-to-Market Strategy",
      "Messaging Framework",
      "Brand Identity Design",
    ],
    accent: "accent",
    size: "large",
  },
];

const accentMap = {
  primary: {
    border: "border-primary/20 hover:border-primary/50",
    icon: "from-primary/25 to-primary/5",
    glow: "hover:shadow-[0_0_40px_oklch(0.68_0.24_308_/_0.15)]",
    text: "text-primary",
    badge: "bg-primary/10 text-primary",
  },
  secondary: {
    border: "border-secondary/20 hover:border-secondary/50",
    icon: "from-secondary/25 to-secondary/5",
    glow: "hover:shadow-[0_0_40px_oklch(0.72_0.19_200_/_0.15)]",
    text: "text-secondary",
    badge: "bg-secondary/10 text-secondary",
  },
  accent: {
    border: "border-accent/20 hover:border-accent/50",
    icon: "from-accent/25 to-accent/5",
    glow: "hover:shadow-[0_0_40px_oklch(0.65_0.22_260_/_0.15)]",
    text: "text-accent",
    badge: "bg-accent/10 text-accent",
  },
};

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const { ref, style } = useRevealOnScroll(index * 80);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const Icon = service.icon;
  const accent = accentMap[service.accent as keyof typeof accentMap];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: -dy * 8, y: dx * 8 });
  };

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={style}
      className={service.size === "large" ? "md:col-span-2" : ""}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setTilt({ x: 0, y: 0 });
        }}
        data-ocid={`service-card-${service.id}`}
        className={`group glassmorphic ${accent.border} ${accent.glow} p-7 h-full transition-all duration-300 cursor-pointer relative overflow-hidden`}
        style={{
          transform: isHovered
            ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)`
            : "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)",
          transition:
            "transform 0.15s ease, box-shadow 0.3s ease, border-color 0.3s ease",
        }}
      >
        {/* Background gradient sweep on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${accent.icon} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg`}
        />

        <div className="relative">
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${accent.icon} border ${accent.border} flex items-center justify-center mb-5`}
          >
            <Icon size={22} className={accent.text} />
          </div>

          <h3 className="font-display font-bold text-xl text-foreground mb-3">
            {service.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {service.description}
          </p>

          {service.subItems && service.subItems.length > 0 && (
            <ul className="mt-4 space-y-1.5">
              {service.subItems.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-xs text-muted-foreground"
                >
                  <span
                    className={`w-1 h-1 rounded-full flex-shrink-0 bg-current ${accent.text}`}
                  />
                  {item}
                </li>
              ))}
            </ul>
          )}

          <div
            className={`mt-5 inline-flex items-center gap-2 text-xs font-semibold ${accent.text} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
          >
            Learn More <ArrowRight size={12} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ServicesSection() {
  const { ref: titleRef, style: titleStyle } = useRevealOnScroll(0);

  return (
    <section
      className="relative py-28 px-6 overflow-hidden bg-muted/10"
      id="services-preview"
    >
      <div className="absolute inset-0 grid-glow-bg opacity-25" />
      <div className="absolute top-0 right-1/3 w-80 h-80 bg-primary/6 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-secondary/6 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto">
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          style={titleStyle}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6"
        >
          <div>
            <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-3">
              What We Do
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground">
              Our Core Services
              <br />
              <span className="gradient-text-purple">
                That Deliver Real Results
              </span>
            </h2>
            <p className="text-muted-foreground text-sm mt-3 max-w-xl">
              End-to-end digital marketing solutions designed to scale your
              business profitably and sustainably
            </p>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-smooth font-medium shrink-0"
            data-ocid="services-view-all"
          >
            View All Services
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {/* Row 1: large + 2 small */}
          <div className="lg:col-span-2">
            <ServiceCard service={services[0]} index={0} />
          </div>
          <ServiceCard service={services[1]} index={1} />
          <ServiceCard service={services[2]} index={2} />

          {/* Row 2: 2 small + large */}
          <ServiceCard service={services[3]} index={3} />
          <ServiceCard service={services[4]} index={4} />
          <div className="sm:col-span-2 lg:col-span-2">
            <ServiceCard service={services[5]} index={5} />
          </div>
        </div>
      </div>
    </section>
  );
}
