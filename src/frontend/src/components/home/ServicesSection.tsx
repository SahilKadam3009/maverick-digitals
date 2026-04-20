import { useRevealOnScroll } from "@/hooks/useIntersectionObserver";
import { Link } from "@tanstack/react-router";
import { useRef, useState } from "react";

type AccentKey = "primary" | "secondary" | "accent";

const services = [
  {
    id: "personal-branding",
    title: "Personal Branding",
    description:
      "We build your personal brand so opportunities come to you, not the other way around.",
    subItems: [
      "Personal Brand Strategy",
      "Ghostwriting & Content",
      "Founder Positioning",
      "Content Systems",
    ],
    accent: "primary" as AccentKey,
  },
  {
    id: "social-media",
    title: "Social Media Management",
    description:
      "We run your social presence — content, scheduling, comments, and growth — while you focus on the business.",
    subItems: [
      "Analytics & Reporting",
      "Growth Strategy",
      "Community Management",
      "Content Planning & Creation",
    ],
    accent: "secondary" as AccentKey,
  },
  {
    id: "web-dev",
    title: "Website & App Development",
    description:
      "Websites that load fast, look sharp, and convert visitors into paying customers.",
    subItems: [
      "Performance Optimization",
      "Mobile App Development",
      "E-commerce Solutions",
      "Custom Web Development",
    ],
    accent: "accent" as AccentKey,
  },
  {
    id: "seo-sem",
    title: "SEO & SEM",
    description:
      "We get you found on Google — and turn that traffic into leads, not just clicks.",
    subItems: [
      "Local SEO Optimization",
      "Google Ads Management",
      "Keyword Research & Strategy",
      "Technical SEO Audit",
    ],
    accent: "primary" as AccentKey,
  },
  {
    id: "performance",
    title: "Performance Marketing",
    description:
      "Paid ads that earn more than they spend — tracked by revenue, not impressions.",
    subItems: [
      "ROI Tracking & Analysis",
      "Conversion Optimization",
      "Google Ads Campaigns",
      "Meta Ads Management",
    ],
    accent: "secondary" as AccentKey,
  },
  {
    id: "branding",
    title: "Branding & Strategy",
    description:
      "Your story, your positioning, your market — made clear so the right customers choose you first.",
    subItems: [
      "Brand Guidelines",
      "Go-to-Market Strategy",
      "Messaging Framework",
      "Brand Identity Design",
    ],
    accent: "accent" as AccentKey,
  },
];

const GRADIENT_MAP: Record<string, [string, string]> = {
  primary: ["#a855f7", "#06b6d4"],
  secondary: ["#3b82f6", "#06b6d4"],
  accent: ["#06b6d4", "#a855f7"],
};

const accentStyles: Record<
  AccentKey,
  {
    border: string;
    glowHover: string;
    text: string;
    dot: string;
  }
> = {
  primary: {
    border: "border-primary/12 hover:border-primary/45",
    glowHover:
      "hover:shadow-[0_8px_48px_rgba(168,85,247,0.2),0_2px_12px_rgba(0,0,0,0.1)]",
    text: "text-primary",
    dot: "bg-primary/35 group-hover:bg-primary transition-smooth",
  },
  secondary: {
    border: "border-secondary/12 hover:border-secondary/45",
    glowHover:
      "hover:shadow-[0_8px_48px_rgba(59,130,246,0.2),0_2px_12px_rgba(0,0,0,0.1)]",
    text: "text-secondary",
    dot: "bg-secondary/35 group-hover:bg-secondary transition-smooth",
  },
  accent: {
    border: "border-accent/12 hover:border-accent/45",
    glowHover:
      "hover:shadow-[0_8px_48px_rgba(6,182,212,0.2),0_2px_12px_rgba(0,0,0,0.1)]",
    text: "text-accent",
    dot: "bg-accent/35 group-hover:bg-accent transition-smooth",
  },
};

function ServiceCard({
  service,
  index,
}: { service: (typeof services)[0]; index: number }) {
  const { ref, style } = useRevealOnScroll(index * 70);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const a = accentStyles[service.accent];
  const [gradStart] = GRADIENT_MAP[service.accent];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setTilt({ x: -dy * 5, y: dx * 5 });
  };

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} style={style}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setTilt({ x: 0, y: 0 });
        }}
        data-ocid={`service-card-${service.id}`}
        className={`group glass-card border ${a.border} ${a.glowHover} p-7 h-full cursor-pointer overflow-hidden relative`}
        style={{
          transform: isHovered
            ? `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02) translateY(-3px)`
            : "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1) translateY(0px)",
          transition:
            "transform 0.18s ease, box-shadow 0.3s ease, border-color 0.3s ease",
        }}
      >
        {/* Hover gradient wash */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[inherit]"
          style={{
            background: `radial-gradient(ellipse at 30% 20%, ${gradStart}18 0%, transparent 65%)`,
          }}
          aria-hidden="true"
        />

        <div className="relative">
          <h3
            className="font-display font-bold text-foreground mb-3"
            style={{
              fontSize: "var(--font-size-h4)",
              lineHeight: "var(--line-height-heading)",
            }}
          >
            {service.title}
          </h3>
          <p
            className="text-muted-foreground leading-relaxed"
            style={{
              fontSize: "var(--font-size-sm)",
              lineHeight: "var(--line-height-body)",
            }}
          >
            {service.description}
          </p>

          {service.subItems.length > 0 && (
            <ul className="mt-5 space-y-2">
              {service.subItems.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5"
                  style={{ fontSize: "var(--font-size-xs)" }}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${a.dot}`}
                  />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          )}

          <div
            className={`mt-6 inline-flex items-center gap-2 font-semibold ${a.text} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            style={{
              fontSize: "var(--font-size-xs)",
              letterSpacing: "var(--tracking-wide)",
              textTransform: "uppercase",
            }}
          >
            Learn More
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
      className="relative overflow-hidden bg-muted/10 section-gradient-border"
      id="services-preview"
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
        className="absolute top-0 right-1/3 w-96 h-96 bg-primary/5 rounded-full blur-[130px]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/3 w-72 h-72 bg-secondary/5 rounded-full blur-[110px]"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Section header */}
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          style={titleStyle}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6"
        >
          <div>
            <span className="tag-label mb-4 inline-flex">Our Services</span>
            <h2
              className="font-display font-bold text-foreground mt-3"
              style={{
                fontSize: "var(--font-size-h2)",
                lineHeight: "var(--line-height-heading)",
                letterSpacing: "var(--tracking-tight)",
              }}
            >
              What We Do
              <br />
              <span className="gradient-text-purple">
                And Why It Actually Works
              </span>
            </h2>
            <p
              className="text-muted-foreground mt-3 max-w-xl"
              style={{
                fontSize: "var(--font-size-sm)",
                lineHeight: "var(--line-height-body)",
              }}
            >
              Six things we do — all connected, all measured, all aimed at
              growing your revenue.
            </p>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-smooth font-medium shrink-0"
            style={{ fontSize: "var(--font-size-sm)" }}
            data-ocid="services-view-all"
          >
            View All Services
          </Link>
        </div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Row 1: Featured large + 2 small */}
          <div className="lg:col-span-2">
            <ServiceCard service={services[0]} index={0} />
          </div>
          <ServiceCard service={services[1]} index={1} />
          <ServiceCard service={services[2]} index={2} />

          {/* Row 2: 2 small + featured large */}
          <ServiceCard service={services[3]} index={3} />
          <ServiceCard service={services[4]} index={4} />
          <div className="sm:col-span-2">
            <ServiceCard service={services[5]} index={5} />
          </div>
        </div>
      </div>
    </section>
  );
}
