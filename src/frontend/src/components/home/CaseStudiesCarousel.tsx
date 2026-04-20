import { useRevealOnScroll } from "@/hooks/useIntersectionObserver";
import { Link } from "@tanstack/react-router";
import { useRef, useState } from "react";

const caseStudies = [
  {
    id: "techwave",
    client: "TechWave SaaS",
    industry: "B2B SaaS",
    headline: "10x MRR in 14 months",
    description:
      "Rebuilt their go-to-market from scratch — new ICP positioning, LinkedIn ABM, and a content engine that drove a 340% increase in qualified demo requests.",
    metrics: [
      { label: "MRR Growth", value: "10x" },
      { label: "Demo Requests", value: "+340%" },
      { label: "CAC Reduction", value: "−52%" },
    ],
    gradient: "from-primary/20 via-accent/10 to-transparent",
    accentColor: "primary",
    tag: "Growth Marketing · B2B",
  },
  {
    id: "bloom",
    client: "Bloom Fashion",
    industry: "D2C E-commerce",
    headline: "ROAS 3x in 60 days",
    description:
      "Overhauled their Meta and Google ad structure with a proper creative testing process and sharper audience segmentation. ROAS tripled while they scaled spend by 200%.",
    metrics: [
      { label: "ROAS", value: "3x" },
      { label: "Revenue", value: "+$2.1M" },
      { label: "Spend Scale", value: "+200%" },
    ],
    gradient: "from-secondary/20 via-accent/10 to-transparent",
    accentColor: "secondary",
    tag: "Paid Media · E-commerce",
  },
  {
    id: "urban",
    client: "Urban Realty Group",
    industry: "Real Estate",
    headline: "3-month waitlist built",
    description:
      "Took a real estate developer from struggling to get inquiries to building a recognized premium brand — with editorial content, strong local SEO, and a lead gen funnel that actually converted.",
    metrics: [
      { label: "Lead Gen", value: "+410%" },
      { label: "Organic Traffic", value: "+190%" },
      { label: "Cost per Lead", value: "−65%" },
    ],
    gradient: "from-accent/20 via-primary/10 to-transparent",
    accentColor: "accent",
    tag: "SEO · Brand Strategy",
  },
];

const accentMap = {
  primary: {
    text: "text-primary",
    border: "border-primary/30",
    glow: "shadow-[0_0_60px_oklch(0.68_0.24_308_/_0.15)]",
    badge: "bg-primary/15 text-primary border-primary/20",
    metric: "text-primary",
  },
  secondary: {
    text: "text-secondary",
    border: "border-secondary/30",
    glow: "shadow-[0_0_60px_oklch(0.72_0.19_200_/_0.15)]",
    badge: "bg-secondary/15 text-secondary border-secondary/20",
    metric: "text-secondary",
  },
  accent: {
    text: "text-accent",
    border: "border-accent/30",
    glow: "shadow-[0_0_60px_oklch(0.65_0.22_260_/_0.15)]",
    badge: "bg-accent/15 text-accent border-accent/20",
    metric: "text-accent",
  },
};

export function CaseStudiesCarousel() {
  const [activeIdx, setActiveIdx] = useState(1);
  const { ref: titleRef, style: titleStyle } = useRevealOnScroll(0);
  const { ref: carouselRef, style: carouselStyle } = useRevealOnScroll(200);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);

  const prev = () =>
    setActiveIdx((i) => (i - 1 + caseStudies.length) % caseStudies.length);
  const next = () => setActiveIdx((i) => (i + 1) % caseStudies.length);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    dragStartX.current = "touches" in e ? e.touches[0].clientX : e.clientX;
  };
  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const endX =
      "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX;
    const dx = endX - dragStartX.current;
    if (Math.abs(dx) > 40) dx > 0 ? prev() : next();
  };

  return (
    <section className="relative py-16 sm:py-28 px-4 sm:px-6 overflow-hidden bg-muted/15">
      <div className="absolute inset-0 grid-glow-bg opacity-20" />
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/8 rounded-full blur-[100px]" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-secondary/8 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto">
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          style={titleStyle}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6"
        >
          <div>
            <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-3">
              Our Work
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground">
              Results That{" "}
              <span className="gradient-text-purple">Speak Volumes</span>
            </h2>
          </div>
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-smooth font-medium shrink-0"
            data-ocid="case-studies-view-all"
          >
            All Case Studies
          </Link>
        </div>

        {/* Coverflow carousel */}
        <div
          ref={carouselRef as React.RefObject<HTMLDivElement>}
          style={carouselStyle}
          className="relative"
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
        >
          <div className="flex items-center justify-center gap-2 sm:gap-4 min-h-[420px] sm:min-h-[440px]">
            {caseStudies.map((cs, i) => {
              const isActive = i === activeIdx;
              const isPrev =
                i === (activeIdx - 1 + caseStudies.length) % caseStudies.length;
              const isNext = i === (activeIdx + 1) % caseStudies.length;
              const a = accentMap[cs.accentColor as keyof typeof accentMap];

              let cardStyle: React.CSSProperties = {};
              if (isActive) {
                cardStyle = {
                  transform: "scale(1) translateZ(0)",
                  zIndex: 10,
                  opacity: 1,
                  filter: "blur(0px)",
                };
              } else if (isPrev) {
                cardStyle = {
                  transform:
                    "scale(0.88) translateX(-30px) perspective(1000px) rotateY(15deg)",
                  zIndex: 5,
                  opacity: 0.55,
                  filter: "blur(1px)",
                };
              } else if (isNext) {
                cardStyle = {
                  transform:
                    "scale(0.88) translateX(30px) perspective(1000px) rotateY(-15deg)",
                  zIndex: 5,
                  opacity: 0.55,
                  filter: "blur(1px)",
                };
              } else {
                cardStyle = {
                  opacity: 0,
                  pointerEvents: "none",
                  position: "absolute",
                };
              }

              return (
                <button
                  key={cs.id}
                  type="button"
                  onClick={() => !isActive && setActiveIdx(i)}
                  disabled={isActive}
                  data-ocid={`case-study-card-${cs.id}`}
                  className={`relative glassmorphic ${a.border} ${isActive ? a.glow : ""} p-6 md:p-10 transition-all duration-500 cursor-pointer select-none flex-shrink-0 w-full max-w-[calc(100vw-2rem)] sm:max-w-md md:max-w-lg text-left`}
                  style={cardStyle}
                >
                  {/* Background gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${cs.gradient} rounded-lg pointer-events-none`}
                  />

                  <div className="relative">
                    {/* Tag */}
                    <span
                      className={`inline-block text-xs font-semibold px-3 py-1 rounded-full border ${a.badge} mb-5`}
                    >
                      {cs.tag}
                    </span>

                    {/* Client */}
                    <p className="text-muted-foreground text-sm mb-2 font-medium">
                      {cs.client} · {cs.industry}
                    </p>

                    {/* Headline */}
                    <h3
                      className={`font-display font-black text-3xl md:text-4xl ${a.text} mb-4 leading-tight`}
                    >
                      {cs.headline}
                    </h3>

                    <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                      {cs.description}
                    </p>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/8">
                      {cs.metrics.map((m) => (
                        <div key={m.label}>
                          <div
                            className={`font-display font-black text-2xl ${a.metric} mb-1`}
                          >
                            {m.value}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {isActive && (
                      <div
                        className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold ${a.text}`}
                      >
                        Read Full Case Study
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Nav controls */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              type="button"
              onClick={prev}
              className="w-11 h-11 rounded-full glassmorphic border-white/15 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-smooth text-lg font-medium"
              aria-label="Previous case study"
              data-ocid="case-carousel-prev"
            >
              ←
            </button>

            <div className="flex items-center gap-2">
              {caseStudies.map((cs, i) => (
                <button
                  key={cs.id}
                  type="button"
                  onClick={() => setActiveIdx(i)}
                  data-ocid={`case-dot-${i}`}
                  aria-label={`Case study ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    i === activeIdx
                      ? "w-6 h-2 bg-primary glow-neon"
                      : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              className="w-11 h-11 rounded-full glassmorphic border-white/15 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-smooth text-lg font-medium"
              aria-label="Next case study"
              data-ocid="case-carousel-next"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
