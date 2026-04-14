import { useRevealOnScroll } from "@/hooks/useIntersectionObserver";
import { BarChart2, Eye, Lightbulb, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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

// 6 orbit items representing agency work
const ORBIT_ITEMS = [
  {
    id: "o1",
    label: "SEO",
    gradientFrom: "oklch(0.45 0.28 308)",
    gradientTo: "oklch(0.35 0.22 280)",
    glow: "oklch(0.68 0.24 308)",
    angle: 0,
    icon: "⚡",
  },
  {
    id: "o2",
    label: "Ads",
    gradientFrom: "oklch(0.42 0.25 200)",
    gradientTo: "oklch(0.32 0.2 220)",
    glow: "oklch(0.72 0.19 200)",
    angle: 60,
    icon: "🎯",
  },
  {
    id: "o3",
    label: "Brand",
    gradientFrom: "oklch(0.40 0.26 260)",
    gradientTo: "oklch(0.30 0.22 240)",
    glow: "oklch(0.65 0.22 260)",
    angle: 120,
    icon: "✦",
  },
  {
    id: "o4",
    label: "Social",
    gradientFrom: "oklch(0.44 0.27 308)",
    gradientTo: "oklch(0.34 0.24 290)",
    glow: "oklch(0.68 0.24 308)",
    angle: 180,
    icon: "◈",
  },
  {
    id: "o5",
    label: "Content",
    gradientFrom: "oklch(0.38 0.24 195)",
    gradientTo: "oklch(0.28 0.2 210)",
    glow: "oklch(0.72 0.19 200)",
    angle: 240,
    icon: "✧",
  },
  {
    id: "o6",
    label: "Growth",
    gradientFrom: "oklch(0.42 0.26 265)",
    gradientTo: "oklch(0.32 0.22 250)",
    glow: "oklch(0.65 0.22 260)",
    angle: 300,
    icon: "◆",
  },
];

// Ellipse dimensions (3D tilt feel)
const OX = 240; // center X
const OY = 200; // center Y
const RX = 160; // horizontal radius (wide)
const RY = 52; // vertical radius (compressed for tilt illusion)

function getEllipsePos(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: OX + Math.cos(rad) * RX,
    y: OY + Math.sin(rad) * RY,
  };
}

// Depth scale: items at top of ellipse appear smaller (farther)
function getDepthScale(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  // sin goes from -1 (top) to 1 (bottom); map to 0.55..1.0
  return 0.75 + 0.25 * ((Math.sin(rad) + 1) / 2);
}

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
      const speed = isHovered ? 0.3 : 0.65; // deg/s factor
      setRotation((prev) => (prev + dt * speed * 0.012) % 360);
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isHovered]);

  const SVG_W = 480;
  const SVG_H = 400;

  // Sort orbit items by depth so farther ones render behind closer ones
  const sortedItems = [...ORBIT_ITEMS].sort((a, b) => {
    const depA = getDepthScale((a.angle + rotation) % 360);
    const depB = getDepthScale((b.angle + rotation) % 360);
    return depA - depB;
  });

  return (
    <div
      className="relative flex-shrink-0 select-none"
      style={{ width: SVG_W, height: SVG_H }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-hidden="true"
    >
      {/* Background glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 400,
          height: 300,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(ellipse, oklch(var(--primary)/0.08) 0%, oklch(var(--accent)/0.05) 45%, transparent 70%)",
          filter: "blur(32px)",
        }}
      />

      {/* SVG: ellipse ring + decorative elements */}
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
              offset="25%"
              stopColor="oklch(var(--primary))"
              stopOpacity="0.5"
            />
            <stop
              offset="50%"
              stopColor="oklch(var(--secondary))"
              stopOpacity="0.35"
            />
            <stop
              offset="75%"
              stopColor="oklch(var(--accent))"
              stopOpacity="0.3"
            />
            <stop
              offset="100%"
              stopColor="oklch(var(--primary))"
              stopOpacity="0.0"
            />
          </linearGradient>
          <linearGradient
            id="orbitEllipseShadow"
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
              offset="40%"
              stopColor="oklch(var(--primary))"
              stopOpacity="0.12"
            />
            <stop
              offset="60%"
              stopColor="oklch(var(--secondary))"
              stopOpacity="0.08"
            />
            <stop
              offset="100%"
              stopColor="oklch(var(--primary))"
              stopOpacity="0.0"
            />
          </linearGradient>
          <filter id="ellipseGlow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <title>3D orbit ring animation</title>
        </defs>

        {/* Shadow ellipse below (depth illusion) */}
        <ellipse
          cx={OX}
          cy={OY + 8}
          rx={RX + 4}
          ry={RY + 2}
          stroke="url(#orbitEllipseShadow)"
          strokeWidth="6"
          fill="none"
          opacity="0.5"
        />

        {/* Main orbit ellipse ring */}
        <ellipse
          cx={OX}
          cy={OY}
          rx={RX}
          ry={RY}
          stroke="url(#orbitEllipseGrad)"
          strokeWidth="1.5"
          fill="none"
          filter="url(#ellipseGlow)"
          strokeDasharray="3 7"
        />

        {/* Subtle inner ellipse ring */}
        <ellipse
          cx={OX}
          cy={OY}
          rx={RX - 22}
          ry={RY - 7}
          stroke="oklch(var(--foreground)/0.04)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="2 10"
        />

        {/* Tiny particle dots on the ellipse */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
          const pos = getEllipsePos((deg + rotation * 0.3) % 360);
          const depth = getDepthScale((deg + rotation * 0.3) % 360);
          const isBright = deg % 60 === 0;
          return (
            <circle
              key={`particle-${deg}`}
              cx={pos.x}
              cy={pos.y}
              r={isBright ? 2 : 1.2}
              fill={
                isBright
                  ? "oklch(var(--secondary)/0.7)"
                  : "oklch(var(--primary)/0.4)"
              }
              opacity={0.4 + depth * 0.4}
            />
          );
        })}
      </svg>

      {/* Center focal point — M logo / Our Work */}
      <div
        className="absolute z-30 pointer-events-none flex flex-col items-center justify-center"
        style={{
          left: OX,
          top: OY,
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Outer glow halo */}
        <div
          className="absolute rounded-full"
          style={{
            width: 100,
            height: 100,
            background:
              "radial-gradient(circle, oklch(var(--primary)/0.22) 0%, transparent 70%)",
            filter: "blur(12px)",
          }}
        />
        {/* Inner ring */}
        <div
          className="absolute rounded-full"
          style={{
            width: 64,
            height: 64,
            border: "1px solid oklch(var(--primary)/0.3)",
            boxShadow: "0 0 16px oklch(var(--primary)/0.15)",
          }}
        />
        {/* M shield */}
        <div
          className="relative flex items-center justify-center rounded-full"
          style={{
            width: 54,
            height: 54,
            background:
              "linear-gradient(135deg, oklch(var(--primary)/0.25), oklch(var(--accent)/0.15))",
            border: "1.5px solid oklch(var(--primary)/0.5)",
            boxShadow:
              "0 0 20px oklch(var(--primary)/0.4), inset 0 0 12px oklch(var(--primary)/0.1)",
          }}
        >
          <svg
            width="26"
            height="26"
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
              strokeOpacity="0.8"
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
          style={{ color: "oklch(var(--primary)/0.8)" }}
        >
          Our Work
        </span>
      </div>

      {/* Orbiting image thumbnails — sorted by depth for proper layering */}
      {sortedItems.map((item) => {
        const currentAngle = (item.angle + rotation) % 360;
        const pos = getEllipsePos(currentAngle);
        const depth = getDepthScale(currentAngle);
        const size = Math.round(62 * depth); // 47px..62px
        const opacity = 0.6 + 0.4 * ((depth - 0.75) / 0.25);
        const zIndex = Math.round(depth * 20);

        return (
          <div
            key={item.id}
            className="absolute pointer-events-none"
            style={{
              left: pos.x,
              top: pos.y,
              width: size,
              height: size,
              transform: "translate(-50%, -50%)",
              zIndex,
              opacity,
              transition: "opacity 0.1s",
            }}
          >
            {/* Glow halo */}
            <div
              className="absolute inset-0 rounded-lg"
              style={{
                boxShadow: `0 0 ${Math.round(12 * depth)}px ${item.glow}55, 0 0 ${Math.round(24 * depth)}px ${item.glow}22`,
              }}
            />
            {/* Thumbnail square */}
            <div
              className="relative w-full h-full rounded-lg overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${item.gradientFrom}, ${item.gradientTo})`,
                border: `1px solid ${item.glow}55`,
                boxShadow: `inset 0 1px 0 ${item.glow}30`,
              }}
            >
              {/* Inner shimmer */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${item.glow}22 0%, transparent 50%, ${item.glow}11 100%)`,
                }}
              />
              {/* Noise texture overlay */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
                  backgroundSize: "64px 64px",
                }}
              />
              {/* Icon + label */}
              <div className="relative flex flex-col items-center justify-center h-full gap-0.5">
                <span
                  style={{ fontSize: Math.round(size * 0.32), lineHeight: 1 }}
                >
                  {item.icon}
                </span>
                <span
                  className="font-display font-bold uppercase tracking-wider text-white/90"
                  style={{ fontSize: Math.max(7, Math.round(size * 0.16)) }}
                >
                  {item.label}
                </span>
              </div>
            </div>
          </div>
        );
      })}

      {/* Floating ambient particles around the orbit */}
      {[
        { id: "a1", x: 60, y: 60, size: 3, color: "primary", delay: "0s" },
        { id: "a2", x: 400, y: 80, size: 2, color: "secondary", delay: "0.8s" },
        { id: "a3", x: 420, y: 320, size: 2.5, color: "accent", delay: "1.4s" },
        { id: "a4", x: 50, y: 330, size: 2, color: "primary", delay: "0.5s" },
        {
          id: "a5",
          x: 240,
          y: 30,
          size: 1.5,
          color: "secondary",
          delay: "1.1s",
        },
        { id: "a6", x: 240, y: 370, size: 1.5, color: "accent", delay: "0.3s" },
      ].map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none animate-pulse"
          style={{
            width: p.size,
            height: p.size,
            left: p.x,
            top: p.y,
            background: `oklch(var(--${p.color})/0.7)`,
            boxShadow: `0 0 ${p.size * 4}px oklch(var(--${p.color})/0.5)`,
            animationDelay: p.delay,
            animationDuration: "2.5s",
          }}
        />
      ))}
    </div>
  );
}

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
  const { ref: orbitRef, style: orbitStyle } = useRevealOnScroll(200);

  return (
    <section className="relative py-28 px-6 overflow-hidden bg-background">
      <div className="absolute inset-0 grid-glow-bg opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/4 rounded-full blur-[160px]" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
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

        {/* ── Orbit + Cards layout ──────────────────────────────────────── */}
        <div className="flex flex-col xl:flex-row items-center gap-12 xl:gap-16">
          {/* Left: 3D Orbit Animation */}
          <div
            ref={orbitRef as React.RefObject<HTMLDivElement>}
            style={orbitStyle}
            className="flex flex-col items-center flex-shrink-0"
            data-ocid="why-us-orbit.section"
          >
            {/* Label above orbit */}
            <div className="mb-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                Services in Orbit
              </p>
              <div
                className="h-px w-24 mx-auto"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, oklch(var(--primary)/0.6), transparent)",
                }}
              />
            </div>

            {/* Orbit container — hidden on small mobile, scaled on md */}
            <div className="hidden sm:block">
              <OrbitVisualization />
            </div>

            {/* Mobile fallback: simple 2D pill badges */}
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
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            {/* Below orbit stats strip */}
            <div className="hidden sm:flex items-center gap-6 mt-4">
              {[
                { value: "10M+", label: "Views Generated" },
                { value: "35+", label: "Brands Scaled" },
                { value: "200%", label: "Avg. ROI" },
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
          </div>

          {/* Right: Feature Cards */}
          <div className="flex-1 w-full">
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Animated connector lines (desktop) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-3/4 bg-gradient-to-b from-transparent via-primary/20 to-transparent hidden md:block" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-secondary/20 to-transparent hidden md:block" />

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
