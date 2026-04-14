import { Button } from "@/components/ui/button";
import { useRevealOnScroll } from "@/hooks/useIntersectionObserver";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  Code2,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

// --- Galaxy Canvas Background ---
function GalaxyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = canvas.parentElement?.offsetWidth ?? window.innerWidth;
    canvas.height = canvas.parentElement?.offsetHeight ?? 900;

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) return;

    let animId: number;
    let width = canvas.width;
    let height = canvas.height;

    interface Star {
      x: number;
      y: number;
      r: number;
      baseOpacity: number;
      opacity: number;
      phase: number;
      twinkleSpeed: number;
    }
    const stars: Star[] = Array.from({ length: 320 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2.2 + 0.4,
      baseOpacity: Math.random() * 0.9 + 0.3,
      opacity: 0,
      phase: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.04 + 0.01,
    }));

    interface Nebula {
      x: number;
      y: number;
      r: number;
      color: string;
      opacity: number;
      dx: number;
      dy: number;
      phase: number;
    }
    const nebulaColors = [
      "168,85,247",
      "6,182,212",
      "99,102,241",
      "192,132,252",
      "34,211,238",
      "139,92,246",
      "56,189,248",
      "167,139,250",
    ];
    const nebulas: Nebula[] = Array.from({ length: 12 }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 130 + Math.random() * 220,
      color: nebulaColors[i % nebulaColors.length],
      opacity: 0.3 + Math.random() * 0.2,
      dx: (Math.random() - 0.5) * 0.18,
      dy: (Math.random() - 0.5) * 0.14,
      phase: Math.random() * Math.PI * 2,
    }));

    interface Meteor {
      x: number;
      y: number;
      len: number;
      speed: number;
      angle: number;
      opacity: number;
      active: boolean;
      life: number;
      maxLife: number;
    }
    const meteors: Meteor[] = Array.from({ length: 6 }, () => ({
      x: 0,
      y: 0,
      len: 0,
      speed: 0,
      angle: 0,
      opacity: 0,
      active: false,
      life: 0,
      maxLife: 1,
    }));
    let lastMeteorTime = 0;

    function spawnMeteor(m: Meteor) {
      m.x = Math.random() * width * 1.2 - width * 0.1;
      m.y = Math.random() * height * 0.5;
      m.len = 100 + Math.random() * 160;
      m.speed = 8 + Math.random() * 10;
      m.angle = Math.PI / 5 + Math.random() * (Math.PI / 8);
      m.opacity = 0.9 + Math.random() * 0.1;
      m.maxLife = m.len / m.speed;
      m.life = 0;
      m.active = true;
    }

    let t = 0;

    function draw() {
      t += 0.016;
      ctx.clearRect(0, 0, width, height);

      const bgGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.4,
        0,
        width * 0.5,
        height * 0.4,
        Math.max(width, height) * 0.95,
      );
      bgGrad.addColorStop(0, "rgba(22,10,50,1)");
      bgGrad.addColorStop(0.35, "rgba(14,7,34,1)");
      bgGrad.addColorStop(0.7, "rgba(8,4,20,1)");
      bgGrad.addColorStop(1, "rgba(4,2,12,1)");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      const blob1 = ctx.createRadialGradient(
        width * 0.2,
        height * 0.25,
        0,
        width * 0.2,
        height * 0.25,
        width * 0.55,
      );
      blob1.addColorStop(0, "rgba(168,85,247,0.32)");
      blob1.addColorStop(0.5, "rgba(168,85,247,0.12)");
      blob1.addColorStop(1, "rgba(168,85,247,0)");
      ctx.fillStyle = blob1;
      ctx.fillRect(0, 0, width, height);

      const blob2 = ctx.createRadialGradient(
        width * 0.8,
        height * 0.75,
        0,
        width * 0.8,
        height * 0.75,
        width * 0.45,
      );
      blob2.addColorStop(0, "rgba(6,182,212,0.28)");
      blob2.addColorStop(0.5, "rgba(6,182,212,0.10)");
      blob2.addColorStop(1, "rgba(6,182,212,0)");
      ctx.fillStyle = blob2;
      ctx.fillRect(0, 0, width, height);

      const blob3 = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        0,
        width * 0.5,
        height * 0.5,
        width * 0.38,
      );
      blob3.addColorStop(0, "rgba(99,102,241,0.22)");
      blob3.addColorStop(1, "rgba(99,102,241,0)");
      ctx.fillStyle = blob3;
      ctx.fillRect(0, 0, width, height);

      for (const n of nebulas) {
        n.x += n.dx;
        n.y += n.dy;
        n.phase += 0.004;
        if (n.x < -n.r) n.x = width + n.r;
        if (n.x > width + n.r) n.x = -n.r;
        if (n.y < -n.r) n.y = height + n.r;
        if (n.y > height + n.r) n.y = -n.r;
        const pulsedR = n.r * (1 + 0.12 * Math.sin(n.phase));
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, pulsedR);
        const pulse = n.opacity * (0.82 + 0.18 * Math.sin(n.phase * 2));
        grad.addColorStop(0, `rgba(${n.color},${pulse})`);
        grad.addColorStop(0.38, `rgba(${n.color},${pulse * 0.38})`);
        grad.addColorStop(1, `rgba(${n.color},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(n.x, n.y, pulsedR, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const s of stars) {
        s.phase += s.twinkleSpeed;
        s.opacity = s.baseOpacity * (0.3 + 0.7 * Math.sin(s.phase));
        if (s.opacity < 0.05) continue;
        const pulse = s.r * (1 + 0.35 * Math.sin(s.phase * 1.5));
        const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, pulse * 5);
        glow.addColorStop(0, `rgba(220,200,255,${s.opacity * 0.45})`);
        glow.addColorStop(1, "rgba(220,200,255,0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(s.x, s.y, pulse * 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(s.x, s.y, pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245,235,255,${s.opacity})`;
        ctx.fill();
      }

      const now = t;
      if (now - lastMeteorTime > 1.5 + Math.random() * 2.5) {
        const idle = meteors.find((m) => !m.active);
        if (idle) {
          spawnMeteor(idle);
          lastMeteorTime = now;
        }
      }
      for (const m of meteors) {
        if (!m.active) continue;
        m.life += 1;
        const progress = m.life / m.maxLife;
        const tailX = m.x + Math.cos(m.angle) * m.len;
        const tailY = m.y + Math.sin(m.angle) * m.len;
        const fade =
          progress < 0.2 ? progress / 0.2 : 1 - (progress - 0.2) / 0.8;
        const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255,255,255,${m.opacity * fade})`);
        grad.addColorStop(0.3, `rgba(200,180,255,${m.opacity * fade * 0.65})`);
        grad.addColorStop(1, "rgba(168,85,247,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        if (m.life >= m.maxLife || m.x > width + 50 || m.y > height + 50)
          m.active = false;
      }

      animId = requestAnimationFrame(draw);
    }

    draw();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.parentElement?.offsetWidth ?? window.innerWidth;
      height = canvas.parentElement?.offsetHeight ?? 900;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        display: "block",
      }}
    />
  );
}

// --- Data ---
interface TeamMember {
  name: string;
  initials: string;
  title: string;
  bio: string;
  skills: string[];
  photo: string;
  badgeIcon: React.ElementType;
  badgeColor: string;
  accentColor: string;
  socials: {
    icon: React.ElementType;
    href: string;
    label: string;
    color: string;
  }[];
}

const teamMembers: TeamMember[] = [
  {
    name: "Muskan Rathod",
    initials: "MR",
    title: "Founder",
    bio: "Brand strategist & growth marketer, expert in storytelling, personal branding, and scaling businesses with digital-first positioning.",
    skills: [
      "Brand Strategy",
      "Growth Marketing",
      "Storytelling",
      "Personal Branding",
    ],
    photo: "/assets/muskan-rathod.png",
    badgeIcon: Award,
    badgeColor: "from-primary to-accent",
    accentColor: "border-primary/30",
    socials: [
      {
        icon: Linkedin,
        href: "https://linkedin.com",
        label: "LinkedIn",
        color: "hover:text-blue-400",
      },
      {
        icon: Twitter,
        href: "https://twitter.com",
        label: "Twitter",
        color: "hover:text-sky-400",
      },
      {
        icon: Instagram,
        href: "https://instagram.com",
        label: "Instagram",
        color: "hover:text-pink-400",
      },
    ],
  },
  {
    name: "Dhaval Shah",
    initials: "DS",
    title: "Co-Founder",
    bio: "Tech innovator with 5+ years in scalable web and app development, specializing in building conversion-optimized digital platforms.",
    skills: [
      "Web Development",
      "App Development",
      "MERN Stack",
      "Platform Optimization",
    ],
    photo: "/assets/dhaval-shah.png",
    badgeIcon: Code2,
    badgeColor: "from-accent to-secondary",
    accentColor: "border-accent/30",
    socials: [
      {
        icon: Linkedin,
        href: "https://linkedin.com",
        label: "LinkedIn",
        color: "hover:text-blue-400",
      },
      {
        icon: Twitter,
        href: "https://twitter.com",
        label: "Twitter",
        color: "hover:text-sky-400",
      },
      {
        icon: Instagram,
        href: "https://instagram.com",
        label: "Instagram",
        color: "hover:text-pink-400",
      },
    ],
  },
];

const timeline = [
  {
    year: "2021",
    event: "Founded Maverick Digitals",
    desc: "Born from a vision to help brands break through the noise.",
  },
  {
    year: "2022",
    event: "First 10 Clients",
    desc: "Early believers who became our loudest advocates.",
  },
  {
    year: "2023",
    event: "$1M Revenue Milestone",
    desc: "Crossed the first million with pure strategy and zero fluff.",
  },
  {
    year: "2024",
    event: "50+ Brands Scaled",
    desc: "From startups to industry leaders — every brand transformed.",
  },
  {
    year: "2025",
    event: "Global Expansion",
    desc: "Expanding reach across markets to shape digital culture worldwide.",
  },
];

const storyParagraphs = [
  "It started with a frustration. Muskan had spent years watching brilliant businesses pour money into marketing that felt hollow — campaigns without soul, content without conviction, strategies copy-pasted from a competitor's playbook.",
  "She knew there was a better way. One that started with the story first, then amplified it with data. One that treated every brand as a living entity with its own voice, values, and velocity.",
  "In 2021, she founded Maverick Digitals with a single promise: to build brands that don't just compete — they define the category. No templates. No shortcuts. Just obsessive, handcrafted marketing strategy built for the long game.",
  "Three years in, the results speak for themselves. 50+ brands scaled, millions in revenue generated, and a growing community of founders who believe that bold storytelling is the highest-leverage marketing tool in existence.",
];

const stats = [
  { value: "50+", label: "Brands Scaled" },
  { value: "3M+", label: "Reach Generated" },
  { value: "$10M+", label: "Revenue Driven" },
];

// --- Chroma Grid Overlay ---
function ChromaGrid({ isMuskan }: { isMuskan: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const setSize = () => {
      canvas.width = parent.offsetWidth || 400;
      canvas.height = parent.offsetHeight || 600;
    };
    setSize();

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let phase = 0;

    const stops = isMuskan
      ? [
          { h: 271, s: 0.77, l: 0.57 },
          { h: 292, s: 0.91, l: 0.63 },
          { h: 322, s: 0.93, l: 0.73 },
        ]
      : [
          { h: 192, s: 0.91, l: 0.44 },
          { h: 217, s: 0.91, l: 0.6 },
          { h: 172, s: 0.82, l: 0.4 },
        ];

    function lerpColor(
      a: { h: number; s: number; l: number },
      b: { h: number; s: number; l: number },
      t: number,
    ) {
      return {
        h: a.h + (b.h - a.h) * t,
        s: a.s + (b.s - a.s) * t,
        l: a.l + (b.l - a.l) * t,
      };
    }

    function getColor(t: number): string {
      const seg = t * (stops.length - 1);
      const i = Math.floor(seg);
      const f = seg - i;
      const from = stops[Math.min(i, stops.length - 1)];
      const to = stops[Math.min(i + 1, stops.length - 1)];
      const c = lerpColor(from, to, f);
      return `hsla(${c.h.toFixed(0)},${(c.s * 100).toFixed(0)}%,${(c.l * 100).toFixed(0)}%,`;
    }

    const CELL = 26;
    const LINE_WIDTH = 0.7;
    const BASE_OPACITY = 0.13;

    function draw() {
      if (!ctx || !canvas) return;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const pulseAmp = 0.035;
      const pulsedOpacity = BASE_OPACITY + pulseAmp * Math.sin(phase * 0.7);
      const hueShift = (phase * 0.12) % 1;

      ctx.lineWidth = LINE_WIDTH;
      ctx.globalCompositeOperation = "screen";

      const cols = Math.ceil(w / CELL) + 1;
      for (let xi = 0; xi < cols; xi++) {
        const x = xi * CELL;
        const t = (xi / cols + hueShift) % 1;
        const colorBase = getColor(t);
        const grad = ctx.createLinearGradient(x, 0, x, h);
        grad.addColorStop(0, `${colorBase}0)`);
        grad.addColorStop(0.15, `${colorBase}${pulsedOpacity.toFixed(3)})`);
        grad.addColorStop(0.85, `${colorBase}${pulsedOpacity.toFixed(3)})`);
        grad.addColorStop(1, `${colorBase}0)`);
        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      const rows = Math.ceil(h / CELL) + 1;
      for (let yi = 0; yi < rows; yi++) {
        const y = yi * CELL;
        const t = (yi / rows + hueShift * 0.6) % 1;
        const colorBase = getColor(t);
        const grad = ctx.createLinearGradient(0, y, w, y);
        grad.addColorStop(0, `${colorBase}0)`);
        grad.addColorStop(
          0.15,
          `${colorBase}${(pulsedOpacity * 0.8).toFixed(3)})`,
        );
        grad.addColorStop(
          0.85,
          `${colorBase}${(pulsedOpacity * 0.8).toFixed(3)})`,
        );
        grad.addColorStop(1, `${colorBase}0)`);
        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      ctx.globalCompositeOperation = "source-over";

      const DOT_STEP = 3;
      for (let xi = 0; xi < cols; xi += DOT_STEP) {
        for (let yi = 0; yi < rows; yi += DOT_STEP) {
          const x = xi * CELL;
          const y = yi * CELL;
          const t = ((xi + yi) / (cols + rows) + hueShift) % 1;
          const colorBase = getColor(t);
          const dotOpacity =
            pulsedOpacity *
            1.8 *
            (0.7 + 0.3 * Math.sin(phase + xi * 0.3 + yi * 0.4));
          const r = ctx.createRadialGradient(x, y, 0, x, y, 4);
          r.addColorStop(0, `${colorBase}${dotOpacity.toFixed(3)})`);
          r.addColorStop(1, `${colorBase}0)`);
          ctx.fillStyle = r;
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      phase += 0.018;
      animId = requestAnimationFrame(draw);
    }

    draw();

    const ro = new ResizeObserver(() => {
      setSize();
    });
    ro.observe(parent);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, [isMuskan]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 3,
        borderRadius: "1.5rem",
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
}

// --- Glassmorphic Founder Card (circular photo + ChromaGrid) ---
function FounderCard({ member, index }: { member: TeamMember; index: number }) {
  const BadgeIcon = member.badgeIcon;
  const isMuskan = index === 0;
  const [imgError, setImgError] = useState(false);

  const accentRGB = isMuskan ? "168,85,247" : "34,211,238";
  const ringColor = isMuskan ? "#a855f7" : "#06b6d4";
  const ringColorDark = isMuskan ? "#7c3aed" : "#0891b2";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.18,
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative"
      data-ocid={`founder-card-${member.initials.toLowerCase()}`}
    >
      <div
        style={{
          borderRadius: "1.5rem",
          border: `1px solid rgba(${accentRGB},0.28)`,
          boxShadow: `0 0 40px rgba(${accentRGB},0.18), 0 25px 60px rgba(0,0,0,0.6)`,
          background: "rgba(10,5,25,0.80)",
          backdropFilter: "blur(24px)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2.5rem 2rem 2rem",
        }}
      >
        {/* ChromaGrid holographic overlay */}
        <ChromaGrid isMuskan={isMuskan} />

        {/* Shimmer sweep on mount */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.07) 50%, transparent 80%)",
            zIndex: 5,
            borderRadius: "1.5rem",
          }}
          initial={{ x: "-120%" }}
          animate={{ x: "220%" }}
          transition={{
            delay: index * 0.2 + 0.5,
            duration: 1.4,
            ease: "easeInOut",
          }}
        />

        {/* Inner glass border */}
        <div
          style={{
            position: "absolute",
            inset: 1,
            borderRadius: "calc(1.5rem - 1px)",
            border: "1px solid rgba(255,255,255,0.05)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />

        {/* ── Circular Photo with double aura rings ── */}
        <div
          className="relative flex items-center justify-center mb-6"
          style={{ zIndex: 6 }}
        >
          {/* Outer pulsing aura ring 2 */}
          <motion.div
            className="absolute rounded-full"
            animate={{ scale: [1, 1.12, 1], opacity: [0.18, 0.08, 0.18] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 3.2,
              ease: "easeInOut",
            }}
            style={{
              width: 268,
              height: 268,
              border: `1.5px solid ${ringColor}`,
              boxShadow: `0 0 24px rgba(${accentRGB},0.25)`,
            }}
          />
          {/* Inner pulsing aura ring 1 */}
          <motion.div
            className="absolute rounded-full"
            animate={{ scale: [1, 1.07, 1], opacity: [0.3, 0.12, 0.3] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 2.4,
              ease: "easeInOut",
              delay: 0.4,
            }}
            style={{
              width: 244,
              height: 244,
              border: `2px solid ${ringColor}`,
              boxShadow: `0 0 18px rgba(${accentRGB},0.35), 0 0 40px rgba(${accentRGB},0.15)`,
            }}
          />

          {/* Photo circle */}
          <div
            style={{
              width: 220,
              height: 220,
              borderRadius: "50%",
              overflow: "hidden",
              border: `3px solid ${ringColor}`,
              boxShadow: `0 0 28px rgba(${accentRGB},0.55), 0 0 60px rgba(${accentRGB},0.2), inset 0 0 20px rgba(${accentRGB},0.08)`,
              background: isMuskan
                ? "linear-gradient(135deg, #7c3aed, #a855f7)"
                : "linear-gradient(135deg, #0891b2, #06b6d4)",
              flexShrink: 0,
              position: "relative",
            }}
          >
            {!imgError ? (
              <img
                src={member.photo}
                alt={`${member.name} — ${member.title}, Maverick Digitals`}
                onError={() => setImgError(true)}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  display: "block",
                  filter: "saturate(1.05) contrast(1.03)",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "3.5rem",
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.9)",
                }}
              >
                {member.initials}
              </div>
            )}
          </div>

          {/* Badge icon */}
          <div
            className={`absolute bottom-1 right-1 w-10 h-10 rounded-full bg-gradient-to-br ${member.badgeColor} flex items-center justify-center`}
            style={{
              border: "2.5px solid rgba(8,4,20,0.9)",
              boxShadow: `0 0 14px rgba(${accentRGB},0.7), 0 0 30px rgba(${accentRGB},0.3)`,
              zIndex: 8,
            }}
          >
            <BadgeIcon size={16} className="text-background" />
          </div>
        </div>

        {/* ── Name & Title ── */}
        <div className="text-center mb-4 relative z-10">
          <h2
            className="font-display font-bold text-2xl mb-2 tracking-tight"
            style={{
              background: isMuskan
                ? "linear-gradient(135deg, #c084fc, #ffffff)"
                : "linear-gradient(135deg, #22d3ee, #ffffff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: `drop-shadow(0 2px 10px rgba(${accentRGB},0.4))`,
            }}
          >
            {member.name}
          </h2>
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{
              background: isMuskan
                ? "rgba(168,85,247,0.18)"
                : "rgba(34,211,238,0.15)",
              border: `1px solid ${isMuskan ? "rgba(168,85,247,0.55)" : "rgba(34,211,238,0.5)"}`,
              color: isMuskan ? "rgba(216,180,254,1)" : "rgba(103,232,249,1)",
            }}
          >
            {member.title}
          </span>
        </div>

        {/* ── Bio ── */}
        <p
          className="text-muted-foreground text-center text-sm leading-relaxed mb-5 relative z-10 max-w-xs"
          style={{ opacity: 0.82 }}
        >
          {member.bio}
        </p>

        {/* ── Skill tags ── */}
        <div className="flex flex-wrap gap-1.5 mb-5 justify-center relative z-10">
          {member.skills.map((skill) => (
            <motion.span
              key={skill}
              whileHover={{ scale: 1.06 }}
              className="text-xs font-medium px-3 py-1 rounded-full cursor-default transition-all duration-200"
              style={{
                background: `rgba(${accentRGB},0.07)`,
                border: `1px solid rgba(${accentRGB},0.22)`,
                color: isMuskan
                  ? "rgba(216,180,254,0.9)"
                  : "rgba(103,232,249,0.9)",
              }}
            >
              {skill}
            </motion.span>
          ))}
        </div>

        {/* ── Divider ── */}
        <div
          className="w-full h-px mb-5 relative z-10"
          style={{
            background: `linear-gradient(to right, transparent, rgba(${accentRGB},0.3) 30%, rgba(${accentRGB},0.3) 70%, transparent)`,
          }}
        />

        {/* ── Social links ── */}
        <div className="flex items-center justify-center gap-3 relative z-10">
          {member.socials.map(({ icon: Icon, href, label, color }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={`w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground ${color} hover:scale-110 transition-all duration-200`}
              style={{
                background: `rgba(${accentRGB},0.06)`,
                border: `1px solid rgba(${accentRGB},0.18)`,
              }}
              data-ocid={`${member.initials.toLowerCase()}-social-${label.toLowerCase()}`}
            >
              <Icon size={14} />
            </a>
          ))}
          <span
            className="text-xs ml-1 opacity-50"
            style={{ color: ringColorDark }}
          >
            Follow the journey
          </span>
        </div>

        {/* Radial top glow */}
        <div
          className="absolute top-0 left-0 right-0 pointer-events-none"
          style={{
            height: "45%",
            background: isMuskan
              ? "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(168,85,247,0.10) 0%, transparent 70%)"
              : "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(34,211,238,0.08) 0%, transparent 70%)",
            zIndex: 1,
          }}
        />

        {/* Edge light — left */}
        <div
          className="absolute top-0 left-0 bottom-0 pointer-events-none"
          style={{
            width: "2px",
            background: `linear-gradient(to bottom, transparent 5%, ${ringColor}70 35%, ${ringColorDark}45 70%, transparent 95%)`,
            opacity: 0.45,
            zIndex: 11,
          }}
        />
        {/* Edge light — right */}
        <div
          className="absolute top-0 right-0 bottom-0 pointer-events-none"
          style={{
            width: "2px",
            background: `linear-gradient(to bottom, transparent 5%, ${ringColor}70 35%, ${ringColorDark}45 70%, transparent 95%)`,
            opacity: 0.45,
            zIndex: 11,
          }}
        />
      </div>
    </motion.div>
  );
}

// --- Timeline Component ---
function TimelineItem({
  item,
  index,
  isLast,
}: { item: (typeof timeline)[0]; index: number; isLast: boolean }) {
  const { ref, style } = useRevealOnScroll(index * 100);
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={style}
      className="relative flex gap-6"
    >
      {!isLast && (
        <div className="absolute left-[19px] top-10 bottom-0 w-px bg-gradient-to-b from-primary/40 to-transparent" />
      )}
      <div className="relative flex-shrink-0 mt-1">
        <div className="w-10 h-10 rounded-full glassmorphic border-primary/40 flex items-center justify-center glow-neon">
          <div className="w-2 h-2 rounded-full gradient-neon-purple" />
        </div>
      </div>
      <div className="pb-10 flex-1">
        <div className="flex items-center gap-3 mb-1">
          <span className="font-display font-bold text-primary text-sm">
            {item.year}
          </span>
          <span className="w-8 h-px bg-primary/30" />
          <h4 className="font-display font-semibold text-foreground">
            {item.event}
          </h4>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {item.desc}
        </p>
      </div>
    </div>
  );
}

// --- Stats Bar ---
function StatBadge({
  stat,
  index,
}: { stat: (typeof stats)[0]; index: number }) {
  const { ref, style } = useRevealOnScroll(index * 80);
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={style}
      className="flex flex-col items-center glassmorphic border-primary/20 px-8 py-6 hover:border-primary/40 transition-smooth"
    >
      <span className="font-display font-bold text-4xl gradient-text-purple mb-1">
        {stat.value}
      </span>
      <span className="text-muted-foreground text-sm text-center">
        {stat.label}
      </span>
    </div>
  );
}

// --- Main Component ---
export function About() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const { ref: missionRef, style: missionStyle } = useRevealOnScroll(0);
  const { ref: ctaRef, style: ctaStyle } = useRevealOnScroll(0);

  return (
    <div className="relative bg-background overflow-hidden">
      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        data-ocid="about-hero"
      >
        <div className="absolute inset-0 grid-glow-bg opacity-30 pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/6 rounded-full blur-[180px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/3 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-primary text-xs font-semibold uppercase tracking-[0.3em] mb-6"
          >
            The Maverick Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold text-5xl md:text-7xl lg:text-8xl text-foreground leading-[0.95] tracking-tight mb-8"
          >
            The Mind
            <br />
            <span className="gradient-text-purple">Behind</span> The
            <br />
            Brand
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
          >
            One woman. One vision. Fifty brands transformed. Discover the story
            behind Maverick Digitals and the strategist who dares to think
            differently.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-12 w-16 h-px gradient-neon-purple mx-auto"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-muted-foreground text-xs uppercase tracking-widest">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.5,
              ease: "easeInOut",
            }}
            className="w-px h-8 bg-gradient-to-b from-primary/60 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── FOUNDERS / TEAM ── */}
      <section
        className="relative py-28 overflow-hidden"
        style={{ minHeight: "800px", background: "#060210" }}
        data-ocid="about-founder"
      >
        {/* Galaxy canvas — fills 100% of section */}
        <div
          className="absolute inset-0"
          style={{ zIndex: 0 }}
          aria-hidden="true"
        >
          <GalaxyCanvas />
        </div>

        {/* Vignette overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 50%, rgba(6,2,16,0.25) 100%)",
            zIndex: 1,
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 50% 55%, rgba(168,85,247,0.06) 0%, transparent 70%)",
            zIndex: 1,
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6" style={{ zIndex: 10 }}>
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-primary text-xs font-semibold uppercase tracking-[0.3em] mb-4">
              The Visionaries
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground leading-tight mb-4">
              Meet the{" "}
              <span className="gradient-text-purple">Minds Behind</span>
              <br />
              the Maverick
            </h2>
            <p className="text-muted-foreground text-base max-w-xl mx-auto">
              Two visionaries. One mission — to build brands that don't just
              compete, they define the category.
            </p>
          </motion.div>

          {/* 2-column founder grid */}
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto items-stretch">
            {teamMembers.map((member, i) => (
              <FounderCard key={member.name} member={member} index={i} />
            ))}

            {/* Thin glowing separator — desktop only */}
            <div
              className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px"
              style={{
                height: "70%",
                background:
                  "linear-gradient(to bottom, transparent, rgba(168,85,247,0.35) 30%, rgba(34,211,238,0.35) 70%, transparent)",
                zIndex: 20,
              }}
            />
          </div>
        </div>
      </section>

      {/* ── STORY ── */}
      <section
        className="relative py-24 bg-card/40 overflow-hidden"
        data-ocid="about-story"
      >
        <div className="absolute inset-0 grid-glow-bg opacity-20 pointer-events-none" />
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em] mb-4 text-center">
              The Journey
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground text-center mb-10 leading-tight">
              How a rebel marketer
              <br />
              <span className="gradient-text-cyan">changed the game</span>
            </h2>
          </motion.div>
          <div className="space-y-6 text-[16px] text-muted-foreground leading-[1.85]">
            {storyParagraphs.map((para, i) => (
              <motion.p
                key={para.slice(0, 20)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
              >
                {para}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION STATEMENT ── */}
      <section
        className="relative py-28 overflow-hidden"
        data-ocid="about-mission"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/4 to-transparent pointer-events-none" />
        <div
          ref={missionRef as React.RefObject<HTMLDivElement>}
          style={missionStyle}
          className="max-w-5xl mx-auto px-6 text-center"
        >
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.3em] mb-6">
            Our Mission
          </p>
          <blockquote className="font-display font-bold text-3xl md:text-5xl lg:text-6xl leading-tight">
            <span className="text-foreground">
              We don't just market brands.
            </span>
            <br />
            <span className="gradient-text-purple">We build icons.</span>
          </blockquote>
          <p className="text-muted-foreground text-lg mt-8 max-w-2xl mx-auto leading-relaxed">
            Every strategy, every campaign, every word is engineered to position
            your brand at the forefront of culture — not just the front page of
            search results.
          </p>
        </div>
      </section>

      {/* ── STATS ── */}
      <section
        className="py-16 border-y border-border/40"
        data-ocid="about-stats"
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat, i) => (
              <StatBadge key={stat.label} stat={stat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section
        className="relative py-28 overflow-hidden"
        data-ocid="about-timeline"
      >
        <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em] mb-4">
                  Our History
                </p>
                <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground leading-tight mb-6">
                  Five years of
                  <br />
                  <span className="gradient-text-cyan">bold moves</span>
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed max-w-sm">
                  Every milestone earned through relentless execution, authentic
                  storytelling, and an unwavering belief in brands worth
                  building.
                </p>
              </motion.div>
            </div>
            <div className="relative">
              {timeline.map((item, i) => (
                <TimelineItem
                  key={item.year}
                  item={item}
                  index={i}
                  isLast={i === timeline.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-28 overflow-hidden" data-ocid="about-cta">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />
        <div
          ref={ctaRef as React.RefObject<HTMLDivElement>}
          style={ctaStyle}
          className="relative z-10 max-w-3xl mx-auto px-6 text-center"
        >
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.3em] mb-4">
            Ready to Start?
          </p>
          <h2 className="font-display font-bold text-4xl md:text-6xl text-foreground leading-tight mb-6">
            Let's Build Something
            <br />
            <span className="gradient-text-purple">Together</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Your brand has a story that deserves to be told at scale. Let's make
            it impossible to ignore.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/contact">
              <Button
                size="lg"
                className="gradient-neon-purple text-background font-semibold glow-neon hover:scale-105 transition-smooth border-0 px-10 h-12"
                data-ocid="about-cta-primary"
              >
                Start the Conversation
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
            <Link to="/case-studies">
              <Button
                size="lg"
                variant="outline"
                className="border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary/60 h-12 px-8 transition-smooth"
                data-ocid="about-cta-secondary"
              >
                View Our Work
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
