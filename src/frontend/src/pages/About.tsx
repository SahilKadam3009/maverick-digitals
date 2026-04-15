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
import { useEffect, useRef } from "react";
import ProfileCard from "../components/ProfileCard";

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
    title: "Founder & Brand Strategist",
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
    title: "Co-Founder & Tech Innovator",
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
    desc: "Started with a simple question: why does marketing that looks good so rarely actually work? We set out to fix that.",
  },
  {
    year: "2022",
    event: "First 10 Clients",
    desc: "Our first 10 clients believed in what we were building before the results were obvious. Most of them are still with us.",
  },
  {
    year: "2023",
    event: "15M+ Organic Views",
    desc: "Hit 15 million organic views across client content through SEO, answer engine optimization, and content-led growth.",
  },
  {
    year: "2024",
    event: "40+ Brands Scaled",
    desc: "From Mumbai startups to international brands — 40+ engagements with a 200%+ average ROI across the board.",
  },
  {
    year: "2025",
    event: "5-Country Presence",
    desc: "Now running campaigns for clients in India, UAE, USA, UK, and Australia. The markets are different; the approach is the same.",
  },
];

const storyParagraphs = [
  "Maverick Digitals was started by Muskan Rathod and Dhaval Shah in Mumbai — one with a background in brand strategy, the other in tech. The idea was simple: bring the two sides of modern marketing under one roof so brands don't have to choose between creative work and technical execution.",
  "We work with D2C brands, healthcare businesses, travel companies, coaches, B2B startups, and wedding planners. If you're a business that wants to actually build authority and grow — not just tick marketing boxes — we're probably a good fit.",
  "We started in 2021 with one commitment: no templates, no shortcuts. Just real strategy built around your business, your audience, and your goals. Five years in, that's still how we work.",
  "The numbers tell part of the story. 40+ brands scaled, 15M+ organic views, 200%+ average ROI, clients across India, UAE, USA, UK, and Australia. But what we're actually proud of is the brands that went from unknown to recognized — that's the work we show up for.",
];

const stats = [
  { value: "40+", label: "Brands Scaled" },
  { value: "15M+", label: "Organic Views" },
  { value: "200%+", label: "Average ROI" },
  { value: "2X+", label: "Average Revenue Growth" },
  { value: "5", label: "Countries" },
];

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
      className="flex flex-col items-center glassmorphic border-primary/20 px-4 sm:px-8 py-5 sm:py-6 hover:border-primary/40 transition-smooth"
    >
      <span className="font-display font-bold text-2xl sm:text-4xl gradient-text-purple mb-1">
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
          className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto"
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
            className="font-display font-bold text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-foreground leading-[0.95] tracking-tight mb-8"
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
            A Mumbai-based digital marketing agency helping ambitious brands
            grow through strategy that connects, content that converts, and
            execution that actually delivers.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-12 w-16 h-px gradient-neon-purple mx-auto"
          />
          {/* LLM / AEO brand definition — machine-readable, visually subtle */}
          <p className="sr-only">
            Maverick Digitals is a Mumbai-based digital marketing company
            founded in Mumbai, India. It is a full-stack agency specializing in
            SEO, AEO, GEO, performance marketing, personal branding, social
            media management, and website development. The agency has scaled 40+
            brands across India, UAE, USA, UK, and Australia with 15M+ organic
            views and 200%+ ROI delivered.
          </p>
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

        <div
          className="relative max-w-7xl mx-auto px-4 sm:px-6"
          style={{ zIndex: 10 }}
        >
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
              Two people building one focused team — with a single goal of
              helping good brands grow in ways that last.
            </p>
          </motion.div>

          {/* ProfileCard grid */}
          <div className="flex flex-col md:flex-row gap-8 sm:gap-12 justify-center items-center md:items-start w-full">
            {/* Muskan Rathod - Founder */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-6"
              data-ocid="founder-card-mr"
            >
              <ProfileCard
                name="Muskan Rathod"
                title="Founder"
                handle="muskanrathod"
                status="Brand Strategist"
                contactText="Connect"
                avatarUrl="/assets/muskan-rathod.png"
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                behindGlowColor="rgba(139, 92, 246, 0.67)"
                behindGlowEnabled={true}
                innerGradient="linear-gradient(145deg,#60496e8c 0%,#7c3aed44 100%)"
              />
              <div className="text-center max-w-xs">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Founder &amp; Brand Strategist — she's obsessed with
                  storytelling that moves people and positioning that sticks.
                  Muskan has built personal brands and growth strategies for
                  founders and businesses across India and global markets.
                </p>
                <div className="flex flex-wrap gap-2 justify-center mt-3">
                  {[
                    "Brand Strategy",
                    "Growth Marketing",
                    "Storytelling",
                    "Personal Branding",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-3 mt-4">
                  {teamMembers[0].socials.map(
                    ({ icon: Icon, href, label, color }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground ${color} hover:scale-110 transition-all duration-200 bg-purple-500/6 border border-purple-500/18`}
                        data-ocid={`mr-social-${label.toLowerCase()}`}
                      >
                        <Icon size={14} />
                      </a>
                    ),
                  )}
                </div>
              </div>
            </motion.div>

            {/* Dhaval Shah - Co-Founder */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.18,
                duration: 0.75,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col items-center gap-6"
              data-ocid="founder-card-ds"
            >
              <ProfileCard
                name="Dhaval Shah"
                title="Co-Founder"
                handle="dhavalshah"
                status="Tech Innovator"
                contactText="Connect"
                avatarUrl="/assets/dhaval-shah.png"
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                behindGlowColor="rgba(34, 211, 238, 0.67)"
                behindGlowEnabled={true}
                innerGradient="linear-gradient(145deg,#0e7490aa 0%,#22d3ee44 100%)"
              />
              <div className="text-center max-w-xs">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Co-Founder &amp; Tech Lead — Dhaval builds the platforms that
                  make everything else possible. 5+ years in the MERN stack,
                  focused on sites and apps that are fast, clean, and built to
                  convert.
                </p>
                <div className="flex flex-wrap gap-2 justify-center mt-3">
                  {[
                    "Web Development",
                    "App Development",
                    "MERN Stack",
                    "Platform Optimization",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-3 mt-4">
                  {teamMembers[1].socials.map(
                    ({ icon: Icon, href, label, color }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground ${color} hover:scale-110 transition-all duration-200 bg-cyan-500/6 border border-cyan-500/18`}
                        data-ocid={`ds-social-${label.toLowerCase()}`}
                      >
                        <Icon size={14} />
                      </a>
                    ),
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STORY ── */}
      <section
        className="relative py-24 bg-card/40 overflow-hidden"
        data-ocid="about-story"
      >
        <div className="absolute inset-0 grid-glow-bg opacity-20 pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em] mb-4 text-center">
              The Journey
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-foreground text-center mb-10 leading-tight">
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
          className="max-w-5xl mx-auto px-4 sm:px-6 text-center"
        >
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.3em] mb-6">
            Our Mission
          </p>
          <blockquote className="font-display font-bold text-2xl sm:text-3xl md:text-5xl lg:text-6xl leading-tight">
            <span className="text-foreground">
              We don't just run campaigns.
            </span>
            <br />
            <span className="gradient-text-purple">We build real brands.</span>
          </blockquote>
          <p className="text-muted-foreground text-lg mt-8 max-w-2xl mx-auto leading-relaxed">
            Creativity, strategy, and technical execution — brought together for
            brands that want to grow properly. We're active across India, UAE,
            USA, UK, and Australia.
          </p>
        </div>
      </section>

      {/* ── STATS ── */}
      <section
        className="py-16 border-y border-border/40"
        data-ocid="about-stats"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
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
                  Every milestone happened because the team kept showing up and
                  doing the work — no shortcuts, no overpromising, just
                  consistent effort and honest results.
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
          className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center"
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
            Your brand has a story worth telling. Let's make sure the right
            people actually hear it.
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
