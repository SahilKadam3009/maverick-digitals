import { useRevealOnScroll } from "@/hooks/useIntersectionObserver";
import { Quote, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    id: "t1",
    name: "Arjun Mehta",
    role: "CEO",
    company: "TechWave SaaS",
    content:
      "Maverick Digitals didn't just run our campaigns — they rebuilt our entire growth engine. The results speak for themselves: 10x MRR in 14 months.",
    rating: 5,
    initials: "AM",
    color: "primary" as const,
    baseAngle: 0,
  },
  {
    id: "t2",
    name: "Priya Sharma",
    role: "Marketing Director",
    company: "Bloom Fashion",
    content:
      "The creative strategy they developed was unlike anything we'd seen. Our ROAS tripled and we reached audiences we never thought were attainable.",
    rating: 5,
    initials: "PS",
    color: "secondary" as const,
    baseAngle: 72,
  },
  {
    id: "t3",
    name: "Rahul Gupta",
    role: "Founder",
    company: "Urban Realty Group",
    content:
      "We went from struggling to generate leads to having a 3-month waitlist. Muskan's team completely transformed our digital presence.",
    rating: 5,
    initials: "RG",
    color: "accent" as const,
    baseAngle: 144,
  },
  {
    id: "t4",
    name: "Neha Verma",
    role: "CMO",
    company: "VitaHealth",
    content:
      "The content strategy they built for us established genuine authority in the health space. Our organic traffic went up 190% in under 9 months.",
    rating: 5,
    initials: "NV",
    color: "primary" as const,
    baseAngle: 216,
  },
  {
    id: "t5",
    name: "Karan Patel",
    role: "Co-Founder",
    company: "EduFuture",
    content:
      "We cut our cost per lead by 65% while tripling enrollment. The team's depth of understanding across paid and organic channels is exceptional.",
    rating: 5,
    initials: "KP",
    color: "secondary" as const,
    baseAngle: 288,
  },
];

// Satellite debris particles on each ring
const RING_PARTICLES = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];

const COLOR_STYLES = {
  primary: {
    active:
      "border-primary/80 shadow-[0_0_20px_oklch(var(--primary)/0.6),0_0_40px_oklch(var(--primary)/0.2)]",
    inactive: "border-primary/25 hover:border-primary/50",
    bg: "bg-[oklch(var(--primary)/0.15)]",
    activeBg: "gradient-neon-purple",
    text: "text-primary",
    glow: "shadow-[0_0_12px_oklch(var(--primary)/0.5)]",
  },
  secondary: {
    active:
      "border-secondary/80 shadow-[0_0_20px_oklch(var(--secondary)/0.6),0_0_40px_oklch(var(--secondary)/0.2)]",
    inactive: "border-secondary/25 hover:border-secondary/50",
    bg: "bg-[oklch(var(--secondary)/0.15)]",
    activeBg: "gradient-neon-cyan",
    text: "text-secondary",
    glow: "shadow-[0_0_12px_oklch(var(--secondary)/0.5)]",
  },
  accent: {
    active:
      "border-accent/80 shadow-[0_0_20px_oklch(var(--accent)/0.6),0_0_40px_oklch(var(--accent)/0.2)]",
    inactive: "border-accent/25 hover:border-accent/50",
    bg: "bg-[oklch(var(--accent)/0.15)]",
    activeBg: "bg-accent",
    text: "text-accent",
    glow: "shadow-[0_0_12px_oklch(var(--accent)/0.5)]",
  },
};

export function TestimonialsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [orbitRotation, setOrbitRotation] = useState(0);
  const [innerRotation, setInnerRotation] = useState(0);
  const [outerRotation, setOuterRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { ref: sectionRef, style: sectionStyle } = useRevealOnScroll(0);
  const orbitRef = useRef<HTMLDivElement>(null);

  // Continuous orbit animation
  useEffect(() => {
    const animate = (now: number) => {
      if (lastTimeRef.current === 0) lastTimeRef.current = now;
      const dt = now - lastTimeRef.current;
      lastTimeRef.current = now;

      const speed = isHovered ? 0.25 : 0.5; // px/ms → deg/ms
      setOrbitRotation((prev) => (prev + dt * speed * 0.012) % 360);
      setInnerRotation((prev) => (prev - dt * speed * 0.008) % 360); // counter-rotate inner
      setOuterRotation((prev) => (prev + dt * speed * 0.004) % 360); // slow outer

      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isHovered]);

  // Auto-advance testimonials
  useEffect(() => {
    if (!autoPlay) return;
    intervalRef.current = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % testimonials.length);
    }, 4500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoPlay]);

  const handleAvatarClick = (idx: number) => {
    setActiveIdx(idx);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 12000);
  };

  const active = testimonials[activeIdx];
  const MAIN_R = 175; // main orbit radius
  const OUTER_R = 215; // outer particle ring
  const INNER_R = 110; // inner particle ring

  return (
    <section
      className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden"
      style={{ background: "oklch(0.09 0 0)" }}
    >
      {/* ── Background depth layers ─────────────────────────────────────── */}
      <div className="absolute inset-0 grid-glow-bg opacity-20" />
      {/* Deep center glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 800,
          height: 800,
          top: "50%",
          left: "40%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, oklch(var(--primary)/0.07) 0%, oklch(var(--accent)/0.04) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 500,
          height: 500,
          top: "50%",
          left: "40%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, oklch(var(--secondary)/0.06) 0%, transparent 60%)",
          filter: "blur(30px)",
        }}
      />

      <div
        ref={sectionRef as React.RefObject<HTMLDivElement>}
        style={sectionStyle}
        className="relative max-w-7xl mx-auto"
      >
        {/* ── Section header ──────────────────────────────────────────────── */}
        <div className="text-center mb-16">
          <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-3">
            Client Stories
          </p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
            What Our <span className="gradient-text-purple">Clients</span> Say
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">
            Real words from real brands we've helped transform.
          </p>
        </div>

        {/* ── Orbit + Quote layout ─────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
          {/* ── Orbit visualization ─────────────────────────────────────── */}
          <div
            ref={orbitRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative flex-shrink-0 overflow-hidden w-full max-w-[480px] mx-auto"
            style={{ aspectRatio: "1 / 1" }}
          >
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 480 480"
              fill="none"
            >
              {/* Outer dashed ring */}
              <circle
                cx="240"
                cy="240"
                r={OUTER_R}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1"
                strokeDasharray="4 8"
                style={{
                  transform: `rotate(${outerRotation}deg)`,
                  transformOrigin: "240px 240px",
                }}
              />
              {/* Main orbit ring — gradient stroke */}
              <circle
                cx="240"
                cy="240"
                r={MAIN_R}
                stroke="url(#mainRingGrad)"
                strokeWidth="1.5"
                strokeDasharray="2 6"
                style={{
                  transform: `rotate(${orbitRotation}deg)`,
                  transformOrigin: "240px 240px",
                }}
              />
              {/* Inner ring */}
              <circle
                cx="240"
                cy="240"
                r={INNER_R}
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="1"
                style={{
                  transform: `rotate(${innerRotation}deg)`,
                  transformOrigin: "240px 240px",
                }}
              />
              {/* Core glow rings */}
              <circle
                cx="240"
                cy="240"
                r="48"
                stroke="oklch(var(--primary)/0.15)"
                strokeWidth="1"
              />
              <circle
                cx="240"
                cy="240"
                r="34"
                stroke="oklch(var(--primary)/0.25)"
                strokeWidth="1"
              />

              <defs>
                <radialGradient id="mainRingGrad" cx="50%" cy="50%" r="50%">
                  <stop
                    offset="0%"
                    stopColor="oklch(var(--primary))"
                    stopOpacity="0.5"
                  />
                  <stop
                    offset="60%"
                    stopColor="oklch(var(--accent))"
                    stopOpacity="0.2"
                  />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </radialGradient>
                <linearGradient
                  id="outerGrad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor="oklch(var(--primary))"
                    stopOpacity="0.3"
                  />
                  <stop
                    offset="100%"
                    stopColor="oklch(var(--secondary))"
                    stopOpacity="0.1"
                  />
                </linearGradient>
                <title>Orbit ring decorations</title>
              </defs>
            </svg>

            {/* Outer ring particles */}
            {RING_PARTICLES.filter((_, i) => i % 3 === 0).map((baseAngle) => {
              const angle = ((baseAngle + outerRotation) * Math.PI) / 180;
              const x = 240 + Math.cos(angle) * OUTER_R;
              const y = 240 + Math.sin(angle) * OUTER_R;
              const size = baseAngle % 60 === 0 ? 3 : 1.5;
              return (
                <div
                  key={`outer-${baseAngle}`}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: size,
                    height: size,
                    left: `${(x / 480) * 100}%`,
                    top: `${(y / 480) * 100}%`,
                    transform: "translate(-50%, -50%)",
                    background:
                      baseAngle % 60 === 0
                        ? "oklch(var(--secondary)/0.6)"
                        : "oklch(var(--secondary)/0.3)",
                    boxShadow:
                      baseAngle % 60 === 0
                        ? "0 0 6px oklch(var(--secondary)/0.8)"
                        : undefined,
                  }}
                />
              );
            })}

            {/* Main ring particles */}
            {RING_PARTICLES.filter((_, i) => i % 2 === 0).map((baseAngle) => {
              const angle = ((baseAngle + orbitRotation) * Math.PI) / 180;
              const x = 240 + Math.cos(angle) * MAIN_R;
              const y = 240 + Math.sin(angle) * MAIN_R;
              return (
                <div
                  key={`main-${baseAngle}`}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: 2,
                    height: 2,
                    left: `${(x / 480) * 100}%`,
                    top: `${(y / 480) * 100}%`,
                    transform: "translate(-50%, -50%)",
                    background: "oklch(var(--primary)/0.4)",
                    boxShadow: "0 0 4px oklch(var(--primary)/0.6)",
                  }}
                />
              );
            })}

            {/* Inner ring particles */}
            {RING_PARTICLES.filter((_, i) => i % 4 === 0).map((baseAngle) => {
              const angle = ((baseAngle + innerRotation) * Math.PI) / 180;
              const x = 240 + Math.cos(angle) * INNER_R;
              const y = 240 + Math.sin(angle) * INNER_R;
              return (
                <div
                  key={`inner-${baseAngle}`}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: 1.5,
                    height: 1.5,
                    left: `${(x / 480) * 100}%`,
                    top: `${(y / 480) * 100}%`,
                    transform: "translate(-50%, -50%)",
                    background: "oklch(var(--accent)/0.5)",
                  }}
                />
              );
            })}

            {/* Orbiting avatar nodes */}
            {testimonials.map((t, i) => {
              const angle = ((t.baseAngle + orbitRotation) * Math.PI) / 180;
              const x = 240 + Math.cos(angle) * MAIN_R;
              const y = 240 + Math.sin(angle) * MAIN_R;
              const isActive = i === activeIdx;
              const colors = COLOR_STYLES[t.color];

              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleAvatarClick(i)}
                  aria-label={`Testimonial from ${t.name}`}
                  data-ocid={`testimonial-avatar-${t.id}`}
                  className="absolute group"
                  style={{
                    left: `${(x / 480) * 100}%`,
                    top: `${(y / 480) * 100}%`,
                    transform: "translate(-50%, -50%)",
                    zIndex: isActive ? 20 : 10,
                    transition: "z-index 0s",
                  }}
                >
                  {/* Outer pulse ring when active */}
                  {isActive && (
                    <>
                      <div
                        className="absolute rounded-full animate-ping"
                        style={{
                          inset: -10,
                          border: "1px solid oklch(var(--primary)/0.4)",
                          animationDuration: "1.5s",
                        }}
                      />
                      <div
                        className="absolute rounded-full animate-ping"
                        style={{
                          inset: -18,
                          border: "1px solid oklch(var(--primary)/0.15)",
                          animationDuration: "2s",
                          animationDelay: "0.3s",
                        }}
                      />
                    </>
                  )}

                  {/* Avatar circle */}
                  <div
                    className={`
                      relative w-12 h-12 rounded-full border-2 flex items-center justify-center
                      font-display font-bold text-sm select-none
                      transition-all duration-500 cursor-pointer
                      ${isActive ? `${colors.activeBg} ${colors.active} scale-125` : `${colors.bg} ${colors.inactive} hover:scale-110`}
                    `}
                  >
                    <span
                      className={isActive ? "text-background" : colors.text}
                    >
                      {t.initials}
                    </span>
                  </div>

                  {/* Name tooltip */}
                  <div
                    className={`
                      absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-0.5
                      text-xs font-medium whitespace-nowrap rounded
                      transition-all duration-300 pointer-events-none
                      ${isActive ? `${colors.text} opacity-100` : "text-muted-foreground opacity-0 group-hover:opacity-100"}
                    `}
                  >
                    {t.name.split(" ")[0]}
                  </div>
                </button>
              );
            })}

            {/* Center focal point */}
            <div
              className="absolute flex flex-col items-center justify-center text-center z-30 pointer-events-none"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* Glow core */}
              <div
                className="absolute rounded-full"
                style={{
                  width: 90,
                  height: 90,
                  background:
                    "radial-gradient(circle, oklch(var(--primary)/0.25) 0%, transparent 70%)",
                  filter: "blur(8px)",
                }}
              />
              <div
                key={active.id}
                className="relative w-20 h-20 rounded-full gradient-neon-purple glow-neon flex items-center justify-center font-display font-bold text-2xl text-background mb-2 animate-float"
                style={{ animationDuration: "3s" }}
              >
                {active.initials}
              </div>
              <p className="font-display font-semibold text-xs text-foreground leading-tight">
                {active.name.split(" ")[0]}
              </p>
              <p className="text-[10px] text-primary leading-tight">
                {active.company}
              </p>
            </div>
          </div>

          {/* ── Quote panel ──────────────────────────────────────────────── */}
          <div className="flex-1 max-w-lg w-full">
            <div
              key={active.id}
              className="glassmorphic border-primary/15 p-6 sm:p-8 relative overflow-hidden"
              style={{
                animation:
                  "fadeSlideIn 0.45s cubic-bezier(0.4,0,0.2,1) forwards",
              }}
            >
              {/* Glow accent */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/6 via-transparent to-accent/4 rounded-lg pointer-events-none" />
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, oklch(var(--primary)/0.5), transparent)",
                }}
              />

              <div className="relative">
                {/* Quote icon */}
                <div className="w-10 h-10 rounded-xl gradient-neon-purple flex items-center justify-center mb-6 glow-neon">
                  <Quote size={18} className="text-background" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {["s1", "s2", "s3", "s4", "s5"]
                    .slice(0, active.rating)
                    .map((sid) => (
                      <Star
                        key={sid}
                        size={14}
                        className="text-primary fill-primary"
                      />
                    ))}
                </div>

                {/* Quote */}
                <blockquote className="font-display text-xl text-foreground leading-relaxed mb-8 text-balance">
                  "{active.content}"
                </blockquote>

                {/* Attribution */}
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full gradient-neon-purple glow-neon flex items-center justify-center font-display font-bold text-sm text-background flex-shrink-0">
                    {active.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      {active.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {active.role} · {active.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dot navigation */}
            <div
              className="flex items-center gap-2.5 mt-6 justify-center lg:justify-start"
              role="tablist"
              aria-label="Testimonials"
            >
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={i === activeIdx}
                  aria-label={`Testimonial ${i + 1}`}
                  onClick={() => handleAvatarClick(i)}
                  data-ocid={`testimonial-dot-${i}`}
                  className="rounded-full transition-all duration-400"
                  style={{
                    width: i === activeIdx ? 24 : 8,
                    height: 8,
                    background:
                      i === activeIdx
                        ? "oklch(var(--primary))"
                        : "oklch(var(--muted-foreground)/0.35)",
                    boxShadow:
                      i === activeIdx
                        ? "0 0 8px oklch(var(--primary)/0.7)"
                        : undefined,
                    transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
                  }}
                />
              ))}
            </div>

            {/* Company badges */}
            <div className="flex flex-wrap gap-2 mt-6">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleAvatarClick(i)}
                  data-ocid={`testimonial-company-${t.id}`}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-300 cursor-pointer ${
                    i === activeIdx
                      ? "border-primary/50 text-primary bg-primary/10"
                      : "border-white/10 text-muted-foreground bg-card/40 hover:border-white/20"
                  }`}
                >
                  {t.company}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
