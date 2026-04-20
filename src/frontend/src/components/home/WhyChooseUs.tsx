import { useRevealOnScroll } from "@/hooks/useIntersectionObserver";
import { useEffect, useRef, useState } from "react";

const points = [
  {
    id: "data",
    title: "We care about numbers that matter",
    description:
      "Not monthly report theatre. We track what's actually moving the needle — leads, sales, and revenue growth — and cut what doesn't work.",
    accent: "primary",
    stat: "200%+",
    statLabel: "Average ROI",
  },
  {
    id: "creative",
    title: "Creative that converts",
    description:
      "Good-looking content that nobody acts on is useless. We build campaigns that are both worth watching and worth clicking.",
    accent: "secondary",
    stat: "15M+",
    statLabel: "Organic Views",
  },
  {
    id: "transparent",
    title: "One team, full ownership",
    description:
      "You don't get passed around. Our co-founders are involved from brief to delivery, and the team that pitches is the team that executes.",
    accent: "accent",
    stat: "40+",
    statLabel: "Brands Scaled",
  },
  {
    id: "proven",
    title: "Direct access, always",
    description:
      "Muskan and Dhaval stay involved in every account. No account managers playing phone tag — you get real decisions made fast.",
    accent: "primary",
    stat: "2X+",
    statLabel: "Minimum Revenue Growth",
  },
];

const accentColor = {
  primary: {
    bg: "from-primary/12 to-primary/2",
    border: "border-primary/20",
    stat: "gradient-text-purple",
    hoverBorder: "hover:border-primary/50",
    hoverShadow: "hover:shadow-[0_0_28px_oklch(var(--primary)/0.12)]",
  },
  secondary: {
    bg: "from-secondary/12 to-secondary/2",
    border: "border-secondary/20",
    stat: "gradient-text-cyan",
    hoverBorder: "hover:border-secondary/50",
    hoverShadow: "hover:shadow-[0_0_28px_oklch(var(--secondary)/0.12)]",
  },
  accent: {
    bg: "from-accent/12 to-accent/2",
    border: "border-accent/20",
    stat: "text-accent",
    hoverBorder: "hover:border-accent/50",
    hoverShadow: "hover:shadow-[0_0_28px_oklch(var(--accent)/0.12)]",
  },
};

// Orbit items — text-label based, no icons
const ORBIT_ITEMS = [
  {
    id: "o1",
    label: "SEO & SEM",
    description: "Search visibility that drives real traffic",
    gradientFrom: "oklch(0.45 0.28 308)",
    gradientTo: "oklch(0.32 0.22 280)",
    glow: "oklch(0.68 0.24 308)",
    angle: 0,
    icon: "SEO",
  },
  {
    id: "o2",
    label: "Performance",
    description: "Paid ads that earn more than they spend",
    gradientFrom: "oklch(0.40 0.25 200)",
    gradientTo: "oklch(0.30 0.2 220)",
    glow: "oklch(0.72 0.19 200)",
    angle: 60,
    icon: "PPC",
  },
  {
    id: "o3",
    label: "Brand Strategy",
    description: "Position your brand to win the right customers",
    gradientFrom: "oklch(0.38 0.26 260)",
    gradientTo: "oklch(0.28 0.22 240)",
    glow: "oklch(0.65 0.22 260)",
    angle: 120,
    icon: "BRD",
  },
  {
    id: "o4",
    label: "Social Media",
    description: "Consistent presence that builds community",
    gradientFrom: "oklch(0.44 0.27 308)",
    gradientTo: "oklch(0.34 0.24 290)",
    glow: "oklch(0.68 0.24 308)",
    angle: 180,
    icon: "SMM",
  },
  {
    id: "o5",
    label: "Web Dev",
    description: "Sites that load fast and convert visitors",
    gradientFrom: "oklch(0.38 0.24 195)",
    gradientTo: "oklch(0.28 0.2 210)",
    glow: "oklch(0.72 0.19 200)",
    angle: 240,
    icon: "DEV",
  },
  {
    id: "o6",
    label: "Personal Brand",
    description: "Build a founder presence that opens doors",
    gradientFrom: "oklch(0.42 0.26 265)",
    gradientTo: "oklch(0.32 0.22 250)",
    glow: "oklch(0.65 0.22 260)",
    angle: 300,
    icon: "PB",
  },
];

const OX = 260;
const OY = 210;
const RX = 220;
const RY = 70;

function getEllipsePos(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: OX + Math.cos(rad) * RX,
    y: OY + Math.sin(rad) * RY,
  };
}

function getDepthScale(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return 0.6 + 0.5 * ((Math.sin(rad) + 1) / 2);
}

// ── ORBIT VISUALIZATION — DO NOT MODIFY ANY ANIMATION CODE ────────────────
function OrbitVisualization() {
  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const animRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const animate = (now: number) => {
      if (lastTimeRef.current === 0) lastTimeRef.current = now;
      const dt = now - lastTimeRef.current;
      lastTimeRef.current = now;
      const speed = isHovered ? 0.18 : 0.35;
      setRotation((prev) => (prev + dt * speed * 0.01) % 360);
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isHovered]);

  const SVG_W = 520;
  const SVG_H = 420;

  const sortedItems = [...ORBIT_ITEMS].sort((a, b) => {
    const depA = getDepthScale((a.angle + rotation) % 360);
    const depB = getDepthScale((b.angle + rotation) % 360);
    return depA - depB;
  });

  return (
    <div
      className="relative flex-shrink-0 select-none"
      style={{
        width: SVG_W,
        height: SVG_H,
        perspective: "800px",
        perspectiveOrigin: "50% 40%",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-hidden="true"
    >
      {/* Background radial glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 440,
          height: 320,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(ellipse, oklch(var(--primary)/0.10) 0%, oklch(var(--accent)/0.06) 40%, transparent 68%)",
          filter: "blur(38px)",
        }}
      />

      {/* SVG: ellipse ring */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="orbitEllipseGrad"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop
              offset="0%"
              stopColor="oklch(var(--primary))"
              stopOpacity="0.0"
            />
            <stop
              offset="20%"
              stopColor="oklch(var(--primary))"
              stopOpacity="0.5"
            />
            <stop
              offset="50%"
              stopColor="oklch(var(--secondary))"
              stopOpacity="0.4"
            />
            <stop
              offset="80%"
              stopColor="oklch(var(--accent))"
              stopOpacity="0.35"
            />
            <stop
              offset="100%"
              stopColor="oklch(var(--primary))"
              stopOpacity="0.0"
            />
          </linearGradient>
          <linearGradient
            id="orbitShadowGrad"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop
              offset="0%"
              stopColor="oklch(var(--primary))"
              stopOpacity="0.0"
            />
            <stop
              offset="45%"
              stopColor="oklch(var(--primary))"
              stopOpacity="0.14"
            />
            <stop
              offset="55%"
              stopColor="oklch(var(--secondary))"
              stopOpacity="0.1"
            />
            <stop
              offset="100%"
              stopColor="oklch(var(--primary))"
              stopOpacity="0.0"
            />
          </linearGradient>
          <filter id="ellipseGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <title>3D orbit ring animation</title>
        </defs>

        <ellipse
          cx={OX}
          cy={OY + 10}
          rx={RX + 5}
          ry={RY + 3}
          stroke="url(#orbitShadowGrad)"
          strokeWidth="7"
          fill="none"
          opacity="0.5"
        />
        <ellipse
          cx={OX}
          cy={OY}
          rx={RX}
          ry={RY}
          stroke="url(#orbitEllipseGrad)"
          strokeWidth="1.5"
          fill="none"
          filter="url(#ellipseGlow)"
          strokeDasharray="4 8"
        />
        <ellipse
          cx={OX}
          cy={OY}
          rx={RX - 30}
          ry={RY - 10}
          stroke="oklch(var(--foreground)/0.04)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="2 12"
        />

        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
          const pos = getEllipsePos((deg + rotation * 0.35) % 360);
          const depth = getDepthScale((deg + rotation * 0.35) % 360);
          const isBright = deg % 60 === 0;
          return (
            <circle
              key={`particle-${deg}`}
              cx={pos.x}
              cy={pos.y}
              r={isBright ? 2.2 : 1.3}
              fill={
                isBright
                  ? "oklch(var(--secondary)/0.75)"
                  : "oklch(var(--primary)/0.45)"
              }
              opacity={0.3 + depth * 0.55}
            />
          );
        })}
      </svg>

      {/* Center focal point — M symbol — DO NOT MODIFY */}
      <div
        className="absolute z-30 pointer-events-none flex flex-col items-center justify-center"
        style={{ left: OX, top: OY, transform: "translate(-50%, -50%)" }}
      >
        <div
          className="absolute rounded-full animate-ping"
          style={{
            width: 96,
            height: 96,
            border: "1px solid oklch(var(--primary)/0.18)",
            animationDuration: "3s",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 110,
            height: 110,
            background:
              "radial-gradient(circle, oklch(var(--primary)/0.25) 0%, transparent 68%)",
            filter: "blur(14px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 72,
            height: 72,
            border: "1px solid oklch(var(--primary)/0.35)",
            boxShadow: "0 0 20px oklch(var(--primary)/0.2)",
          }}
        />
        <div
          className="relative flex items-center justify-center rounded-full"
          style={{
            width: 58,
            height: 58,
            background:
              "linear-gradient(135deg, oklch(var(--primary)/0.30), oklch(var(--accent)/0.18))",
            border: "1.5px solid oklch(var(--primary)/0.55)",
            boxShadow:
              "0 0 24px oklch(var(--primary)/0.45), inset 0 0 14px oklch(var(--primary)/0.12)",
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 32 32"
            fill="none"
            aria-label="Maverick Digitals M logo"
          >
            <title>Maverick Digitals M logo</title>
            <polygon
              points="16,2 28,8 28,24 16,30 4,24 4,8"
              fill="none"
              stroke="oklch(var(--primary))"
              strokeWidth="1.5"
              strokeOpacity="0.9"
            />
            <text
              x="16"
              y="21"
              textAnchor="middle"
              fontFamily="Space Grotesk, sans-serif"
              fontWeight="800"
              fontSize="14"
              fill="oklch(var(--primary))"
            >
              M
            </text>
          </svg>
        </div>
        <span
          className="mt-2 font-display font-semibold text-[10px] tracking-widest uppercase"
          style={{ color: "oklch(var(--primary)/0.85)" }}
        >
          Our Work
        </span>
      </div>

      {/* Orbiting tiles — DO NOT MODIFY */}
      {sortedItems.map((item) => {
        const currentAngle = (item.angle + rotation) % 360;
        const pos = getEllipsePos(currentAngle);
        const depth = getDepthScale(currentAngle);
        const size = Math.round(66 * depth);
        const minSize = Math.max(40, size);
        const opacity = 0.55 + 0.45 * ((depth - 0.6) / 0.5);
        const zIndex = Math.round(depth * 20);

        return (
          <div
            key={item.id}
            className="absolute pointer-events-none"
            style={{
              left: pos.x,
              top: pos.y,
              width: minSize,
              height: minSize,
              transform: "translate(-50%, -50%)",
              zIndex,
              opacity,
              transition: "opacity 0.1s",
            }}
          >
            <div
              className="absolute inset-0 rounded-xl"
              style={{
                boxShadow: `0 0 ${Math.round(14 * depth)}px ${item.glow}55, 0 0 ${Math.round(28 * depth)}px ${item.glow}20`,
              }}
            />
            <div
              className="relative w-full h-full rounded-xl overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${item.gradientFrom}, ${item.gradientTo})`,
                border: `1px solid ${item.glow}60`,
                boxShadow: `inset 0 1px 0 ${item.glow}35`,
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${item.glow}28 0%, transparent 50%, ${item.glow}14 100%)`,
                }}
              />
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
                  backgroundSize: "64px 64px",
                }}
              />
              <div className="relative flex flex-col items-center justify-center h-full gap-0.5 px-1">
                <span
                  className="font-mono font-bold text-white/85 uppercase tracking-wider"
                  style={{
                    fontSize: Math.max(8, Math.round(minSize * 0.21)),
                    lineHeight: 1,
                  }}
                >
                  {item.icon}
                </span>
                <span
                  className="font-display font-bold uppercase tracking-wider text-white/90 text-center leading-tight"
                  style={{ fontSize: Math.max(6, Math.round(minSize * 0.15)) }}
                >
                  {item.label}
                </span>
              </div>
            </div>
          </div>
        );
      })}

      {/* Ambient particles */}
      {[
        { id: "a1", x: 55, y: 65, size: 3, color: "primary", delay: "0s" },
        { id: "a2", x: 440, y: 80, size: 2, color: "secondary", delay: "0.8s" },
        { id: "a3", x: 455, y: 340, size: 2.5, color: "accent", delay: "1.4s" },
        { id: "a4", x: 45, y: 350, size: 2, color: "primary", delay: "0.5s" },
        {
          id: "a5",
          x: 260,
          y: 28,
          size: 1.5,
          color: "secondary",
          delay: "1.1s",
        },
        { id: "a6", x: 260, y: 392, size: 1.5, color: "accent", delay: "0.3s" },
      ].map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none animate-pulse"
          style={{
            width: p.size,
            height: p.size,
            left: p.x,
            top: p.y,
            background: `oklch(var(--${p.color})/0.75)`,
            boxShadow: `0 0 ${p.size * 4}px oklch(var(--${p.color})/0.55)`,
            animationDelay: p.delay,
            animationDuration: "2.8s",
          }}
        />
      ))}
    </div>
  );
}

function PointCard({
  point,
  index,
}: { point: (typeof points)[0]; index: number }) {
  const { ref, style } = useRevealOnScroll(index * 120);
  const a = accentColor[point.accent as keyof typeof accentColor];

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={style}
      className={`group relative glass-card bg-gradient-to-br ${a.bg} ${a.border} ${a.hoverBorder} ${a.hoverShadow} p-7 transition-all duration-300 hover:-translate-y-1`}
      data-ocid={`why-us-${point.id}`}
    >
      <div className="relative">
        <h3 className="text-h4 text-foreground mb-3 pt-2">{point.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
          {point.description}
        </p>

        <div className="flex items-baseline gap-2 pt-4 border-t border-foreground/6">
          <span className={`font-display font-black text-3xl ${a.stat}`}>
            {point.stat}
          </span>
          <span className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
            {point.statLabel}
          </span>
        </div>
      </div>
    </div>
  );
}

function ServiceLegend() {
  const { ref, style } = useRevealOnScroll(300);
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={style}
      className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-8 w-full max-w-[520px]"
      data-ocid="our-work.services_legend"
    >
      {ORBIT_ITEMS.map((item) => (
        <div
          key={item.id}
          className="flex items-start gap-2.5 p-3 rounded-xl border border-border bg-card/60 dark:bg-card/40 backdrop-blur-sm hover:border-primary/25 transition-smooth"
          data-ocid={`our-work.service.${item.id}`}
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
            style={{
              background: `linear-gradient(135deg, ${item.gradientFrom}55, ${item.gradientTo}33)`,
              border: `1px solid ${item.glow}44`,
            }}
          >
            <span
              className="font-mono font-black text-[9px] uppercase tracking-wider leading-none"
              style={{ color: item.glow }}
            >
              {item.icon}
            </span>
          </div>
          <div className="min-w-0">
            <p
              className="font-display font-bold text-xs leading-none mb-0.5"
              style={{ color: item.glow }}
            >
              {item.icon}
            </p>
            <p className="text-[11px] text-foreground font-medium leading-tight truncate">
              {item.label}
            </p>
            <p className="text-[10px] text-muted-foreground leading-tight mt-0.5 line-clamp-2">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function WhyChooseUs() {
  const { ref: titleRef, style: titleStyle } = useRevealOnScroll(0);
  const { ref: orbitRef, style: orbitStyle } = useRevealOnScroll(200);

  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden bg-background">
      <div className="absolute inset-0 grid-glow-bg opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-primary/4 rounded-full blur-[180px]" />

      <div className="relative max-w-7xl mx-auto">
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          style={titleStyle}
          className="text-center mb-20"
        >
          <span className="tag-label mb-4 inline-flex">Our Work</span>
          <h2 className="text-h2 text-foreground mt-4 mb-5">
            We don't just execute campaigns.{" "}
            <span className="gradient-text-purple">We engineer growth.</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-body-lg leading-relaxed">
            A Mumbai-based digital marketing agency that's helped 40+ brands go
            from overlooked to unforgettable — across six disciplines, all
            measured.
          </p>
        </div>

        <div className="flex flex-col xl:flex-row items-center gap-12 xl:gap-16">
          {/* Left: orbit — DO NOT MODIFY */}
          <div
            ref={orbitRef as React.RefObject<HTMLDivElement>}
            style={orbitStyle}
            className="flex flex-col items-center flex-shrink-0"
            data-ocid="why-us-orbit.section"
          >
            <div className="mb-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                Where We Focus
              </p>
              <div
                className="h-px w-24 mx-auto"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, oklch(var(--primary)/0.6), transparent)",
                }}
              />
            </div>

            <div className="hidden sm:block">
              <OrbitVisualization />
            </div>

            {/* Mobile: pill badges */}
            <div className="flex flex-wrap gap-2 justify-center sm:hidden px-4">
              {ORBIT_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold font-display"
                  style={{
                    background: `linear-gradient(135deg, ${item.gradientFrom}33, ${item.gradientTo}22)`,
                    border: `1px solid ${item.glow}44`,
                    color: item.glow,
                  }}
                >
                  <span className="font-mono text-[10px] font-bold opacity-70">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            {/* Stats strip */}
            <div className="hidden sm:flex items-center gap-8 mt-4">
              {[
                { value: "15M+", label: "Organic Views" },
                { value: "40+", label: "Brands Scaled" },
                { value: "200%+", label: "Avg. ROI" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-display font-black text-lg gradient-text-purple leading-none">
                    {s.value}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5 uppercase tracking-wide">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="hidden sm:block">
              <ServiceLegend />
            </div>
          </div>

          {/* Right: Feature Cards */}
          <div className="flex-1 w-full">
            <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-3/4 bg-gradient-to-b from-transparent via-primary/12 to-transparent hidden md:block" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-secondary/12 to-transparent hidden md:block" />
              {points.map((point, i) => (
                <PointCard key={point.id} point={point} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
