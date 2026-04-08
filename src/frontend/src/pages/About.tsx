import { Button } from "@/components/ui/button";
import { useRevealOnScroll } from "@/hooks/useIntersectionObserver";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Instagram,
  Linkedin,
  Sparkles,
  Star,
  TrendingUp,
  Twitter,
} from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

// --- Data ---
const skills = [
  { label: "Brand Strategy", level: 95, icon: Sparkles, color: "primary" },
  {
    label: "Growth Marketing",
    level: 92,
    icon: TrendingUp,
    color: "secondary",
  },
  { label: "Storytelling", level: 98, icon: BookOpen, color: "accent" },
  { label: "Personal Branding", level: 90, icon: Star, color: "primary" },
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

const socials = [
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
];

// --- Orbit Skill Component ---
const ORBIT_RADIUS_OUTER = 130;
const ORBIT_RADIUS_INNER = 72;

function OrbitRing({
  radius,
  duration,
  children,
  reverse = false,
}: {
  radius: number;
  duration: number;
  children: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{ margin: "auto", top: 0, left: 0, right: 0, bottom: 0 }}
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{
        repeat: Number.POSITIVE_INFINITY,
        duration,
        ease: "linear",
      }}
    >
      <div
        className="absolute rounded-full border border-primary/10"
        style={{
          width: radius * 2,
          height: radius * 2,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
      {children}
    </motion.div>
  );
}

function OrbitPill({
  skill,
  angle,
  radius,
  reverse = false,
}: {
  skill: (typeof skills)[0];
  angle: number;
  radius: number;
  reverse?: boolean;
}) {
  const Icon = skill.icon;
  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * radius;
  const y = Math.sin(rad) * radius;

  return (
    <motion.div
      className="absolute pointer-events-auto"
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: "translate(-50%, -50%)",
      }}
      animate={{ rotate: reverse ? 360 : -360 }}
      transition={{
        repeat: Number.POSITIVE_INFINITY,
        duration: 18,
        ease: "linear",
      }}
      whileHover={{ scale: 1.15 }}
    >
      <div className="glassmorphic border-primary/30 px-3 py-1.5 flex items-center gap-1.5 shadow-lg hover:border-primary/60 transition-smooth cursor-default whitespace-nowrap">
        <Icon size={12} className="text-primary" />
        <span className="text-xs font-semibold text-foreground">
          {skill.label}
        </span>
        <span className="text-xs font-bold text-primary ml-1">
          {skill.level}%
        </span>
      </div>
    </motion.div>
  );
}

function OrbitShowcase() {
  return (
    <div className="relative w-[340px] h-[340px] flex items-center justify-center mx-auto">
      {/* Center card */}
      <div className="relative z-10 w-36 h-36 glassmorphic border-primary/40 flex flex-col items-center justify-center glow-neon rounded-2xl">
        <div className="gradient-neon-purple w-12 h-12 rounded-xl flex items-center justify-center mb-2 shadow-lg">
          <span className="text-background font-display font-bold text-lg">
            MR
          </span>
        </div>
        <span className="text-foreground font-display font-semibold text-sm">
          Muskan
        </span>
        <span className="text-primary text-xs font-medium">Founder</span>
      </div>

      {/* Outer orbit ring with 4 skills */}
      <OrbitRing radius={ORBIT_RADIUS_OUTER} duration={20}>
        {skills.map((skill, i) => (
          <OrbitPill
            key={skill.label}
            skill={skill}
            angle={i * 90}
            radius={ORBIT_RADIUS_OUTER}
          />
        ))}
      </OrbitRing>

      {/* Inner decorative orbit ring */}
      <motion.div
        className="absolute rounded-full border border-accent/8 pointer-events-none"
        style={{
          width: ORBIT_RADIUS_INNER * 2,
          height: ORBIT_RADIUS_INNER * 2,
        }}
        animate={{ rotate: -360 }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 14,
          ease: "linear",
        }}
      >
        {[0, 120, 240].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const x = Math.cos(rad) * ORBIT_RADIUS_INNER;
          const y = Math.sin(rad) * ORBIT_RADIUS_INNER;
          return (
            <motion.div
              key={angle}
              className="absolute w-2 h-2 rounded-full bg-accent/60 shadow-[0_0_6px_2px_oklch(var(--accent)/0.5)]"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: "translate(-50%, -50%)",
              }}
              animate={{ rotate: 360 }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 14,
                ease: "linear",
              }}
            />
          );
        })}
      </motion.div>

      {/* Ambient glow */}
      <div className="absolute w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute w-24 h-24 bg-accent/10 rounded-full blur-2xl pointer-events-none" />
    </div>
  );
}

// --- Timeline Component ---
function TimelineItem({
  item,
  index,
  isLast,
}: {
  item: (typeof timeline)[0];
  index: number;
  isLast: boolean;
}) {
  const { ref, style } = useRevealOnScroll(index * 100);
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={style}
      className="relative flex gap-6"
    >
      {/* Line */}
      {!isLast && (
        <div className="absolute left-[19px] top-10 bottom-0 w-px bg-gradient-to-b from-primary/40 to-transparent" />
      )}
      {/* Dot */}
      <div className="relative flex-shrink-0 mt-1">
        <div className="w-10 h-10 rounded-full glassmorphic border-primary/40 flex items-center justify-center glow-neon">
          <div className="w-2 h-2 rounded-full gradient-neon-purple" />
        </div>
      </div>
      {/* Content */}
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

  const { ref: titleRef, style: titleStyle } = useRevealOnScroll(0);
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
        {/* Ambient layers */}
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

        {/* Scroll cue */}
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

      {/* ── FOUNDER + ORBIT SKILLS ── */}
      <section
        className="relative py-28 overflow-hidden"
        data-ocid="about-founder"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[160px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Founder profile */}
            <div
              ref={titleRef as React.RefObject<HTMLDivElement>}
              style={titleStyle}
            >
              <div className="relative glassmorphic border-primary/20 p-8 overflow-hidden hover:border-primary/40 transition-smooth group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-lg opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none" />

                {/* Neon frame edge glow */}
                <div className="absolute inset-0 rounded-lg border border-transparent group-hover:border-primary/20 transition-smooth pointer-events-none" />
                <div className="absolute top-0 left-0 w-24 h-px bg-gradient-to-r from-primary/70 to-transparent" />
                <div className="absolute top-0 left-0 w-px h-24 bg-gradient-to-b from-primary/70 to-transparent" />
                <div className="absolute bottom-0 right-0 w-24 h-px bg-gradient-to-l from-accent/70 to-transparent" />
                <div className="absolute bottom-0 right-0 w-px h-24 bg-gradient-to-t from-accent/70 to-transparent" />

                <div className="relative z-10">
                  {/* Portrait placeholder */}
                  <div className="relative w-28 h-28 mb-6">
                    <div className="w-full h-full rounded-2xl gradient-neon-purple flex items-center justify-center glow-neon text-background font-display font-bold text-3xl shadow-elevated">
                      MR
                    </div>
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30 blur-sm -z-10" />
                    {/* Animated status dot */}
                    <motion.div
                      className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-background"
                      animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                      transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 2,
                      }}
                    />
                  </div>

                  <h2 className="font-display font-bold text-3xl text-foreground mb-1">
                    Muskan Rathod
                  </h2>
                  <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-5">
                    Founder & Brand Strategist
                  </p>

                  <p className="text-muted-foreground leading-relaxed mb-4 text-[15px]">
                    A brand strategist and growth marketer with a relentless
                    drive to build brands that matter. Muskan founded Maverick
                    Digitals after witnessing too many great businesses fade
                    into obscurity — not from lack of quality, but from lack of
                    story.
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-[15px]">
                    With a background across 50+ brands and multiple industries,
                    she brings a rare fusion of creative vision and analytical
                    rigor — turning brand narratives into market-moving results.
                  </p>

                  {/* Social links */}
                  <div className="flex items-center gap-4 mt-6 pt-6 border-t border-border/50">
                    {socials.map(({ icon: Icon, href, label, color }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className={`w-9 h-9 glassmorphic border-white/10 flex items-center justify-center text-muted-foreground ${color} hover:border-primary/40 hover:scale-110 transition-smooth`}
                        data-ocid={`social-${label.toLowerCase()}`}
                      >
                        <Icon size={15} />
                      </a>
                    ))}
                    <span className="text-muted-foreground text-sm ml-2">
                      Follow the journey
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Orbit skills showcase */}
            <div className="flex flex-col items-center gap-6">
              <div className="text-center mb-4">
                <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em] mb-2">
                  Core Expertise
                </p>
                <h3 className="font-display font-bold text-2xl text-foreground">
                  Skills in Orbit
                </h3>
              </div>
              <OrbitShowcase />
              <p className="text-muted-foreground text-sm text-center max-w-xs">
                Each discipline in constant motion — always circling the core
                mission of building brands that dominate.
              </p>
            </div>
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
