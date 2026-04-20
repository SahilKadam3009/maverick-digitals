import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRevealOnScroll } from "@/hooks/useIntersectionObserver";
import { useSubmitContact } from "@/hooks/useQueries";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ── Constants ────────────────────────────────────────────────────────────────
const SERVICE_TYPES = [
  "SEO & Search Marketing",
  "Performance / Paid Ads",
  "Social Media Management",
  "Brand Strategy",
  "Website & App Development",
  "Full-Service Growth Partner",
];

const BUDGET_RANGES = [
  "Under ₹30,000/month",
  "₹30,000 – ₹75,000/month",
  "₹75,000 – ₹1,50,000/month",
  "₹1,50,000+/month",
  "One-time project",
  "Let's discuss",
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: "#", color: "hover:text-pink-500" },
  { label: "LinkedIn", href: "#", color: "hover:text-blue-500" },
  { label: "Twitter / X", href: "#", color: "hover:text-sky-500" },
];

const CONTACT_DETAILS = [
  {
    label: "Email",
    value: "maverickdigitals18@gmail.com",
    href: "mailto:maverickdigitals18@gmail.com",
  },
  {
    label: "Phone",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
  },
  {
    label: "Location",
    value: "Mumbai, Maharashtra, India",
    href: null,
  },
  {
    label: "Response Time",
    value: "Within 24 hours",
    href: null,
  },
];

const TRUST_POINTS = [
  "No long-term lock-ins",
  "Results-based reporting",
  "Dedicated strategy team",
  "Transparent pricing",
  "Data-led creative direction",
];

const PROOF_STATS = [
  { value: "40+", label: "Brands Scaled" },
  { value: "5", label: "Countries Served" },
  { value: "200%+", label: "Average ROI" },
  { value: "24hr", label: "Response Time" },
];

// ── Particle background ───────────────────────────────────────────────────
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      alpha: number;
      hue: number;
    }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const count = window.innerWidth < 768 ? 18 : 40;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.4 + 0.3,
        alpha: Math.random() * 0.35 + 0.08,
        hue: Math.random() > 0.5 ? 308 : 200,
      });
    }

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = document.documentElement.classList.contains("dark");
      const alphaMultiplier = isDark ? 1 : 0.45;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `oklch(0.68 0.24 ${p.hue} / ${p.alpha * alphaMultiplier})`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `oklch(0.65 0.18 260 / ${0.04 * alphaMultiplier * (1 - dist / 90)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

// ── Types ────────────────────────────────────────────────────────────────────
interface FormData {
  name: string;
  email: string;
  company: string;
  serviceType: string;
  budget: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
  serviceType?: string;
  budget?: string;
  message?: string;
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ── Main Component ───────────────────────────────────────────────────────────
export function Contact() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    serviceType: "",
    budget: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<keyof FormData, boolean>>({
    name: false,
    email: false,
    company: false,
    serviceType: false,
    budget: false,
    message: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const { mutateAsync: submitContact, isPending } = useSubmitContact();

  const { ref: titleRef, style: titleStyle } = useRevealOnScroll(0);
  const { ref: leftRef, style: leftStyle } = useRevealOnScroll(100);
  const { ref: rightRef, style: rightStyle } = useRevealOnScroll(180);

  const validate = (data: FormData): FormErrors => {
    const e: FormErrors = {};
    if (!data.name.trim()) e.name = "Your full name is required";
    if (!data.email.trim()) e.email = "Email address is required";
    else if (!validateEmail(data.email))
      e.email = "Enter a valid email address";
    if (!data.serviceType) e.serviceType = "Please select a service";
    if (!data.message.trim()) e.message = "Tell us about your project";
    else if (data.message.trim().length < 20)
      e.message = "Please give us a bit more detail (min 20 chars)";
    return e;
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched((t) => ({ ...t, [field]: true }));
    const e = validate({ ...form });
    setErrors((prev) => ({ ...prev, [field]: e[field] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = {
      name: true,
      email: true,
      company: true,
      serviceType: true,
      budget: true,
      message: true,
    };
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    try {
      await submitContact(form);
      setSubmitted(true);
      toast.success("Message sent! We'll be in touch within 24 hours.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const fieldClass = (field: keyof FormData) =>
    `premium-input ${
      touched[field] && errors[field]
        ? "border-destructive/70 focus:border-destructive dark:border-destructive/60"
        : ""
    }`;

  const resetForm = () => {
    setSubmitted(false);
    setForm({
      name: "",
      email: "",
      company: "",
      serviceType: "",
      budget: "",
      message: "",
    });
    setTouched({
      name: false,
      email: false,
      company: false,
      serviceType: false,
      budget: false,
      message: false,
    });
    setErrors({});
  };

  return (
    <div className="relative pt-20 sm:pt-28 pb-24 min-h-screen overflow-hidden bg-background">
      <ParticleField />

      {/* Ambient glows */}
      <div className="absolute inset-0 grid-glow-bg opacity-15 pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* ── PAGE HEADER ── */}
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          style={titleStyle}
          className="mb-16 text-center max-w-3xl mx-auto"
        >
          <div className="flex justify-center mb-5">
            <span className="tag-label">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Get In Touch
            </span>
          </div>
          <h1
            className="font-display font-extrabold text-foreground mb-5"
            style={{
              fontSize: "var(--font-size-h1)",
              lineHeight: "var(--line-height-heading)",
              letterSpacing: "var(--tracking-tight)",
            }}
          >
            Let's build something{" "}
            <span className="gradient-text-purple">great together</span>
          </h1>
          <p
            className="text-muted-foreground max-w-xl mx-auto"
            style={{
              fontSize: "var(--font-size-body-lg)",
              lineHeight: "var(--line-height-body)",
            }}
          >
            Whether you're starting fresh or scaling an existing brand — we map
            out a custom path to measurable growth. Real strategy, real results.
          </p>
        </div>

        {/* ── TRUST STATS STRIP ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 mb-14"
          data-ocid="contact.trust_strip"
        >
          {PROOF_STATS.map(({ value, label }) => (
            <div
              key={label}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-border bg-card/80 dark:bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-smooth"
            >
              <span className="font-display font-black text-sm gradient-text-purple">
                {value}
              </span>
              <span className="text-muted-foreground text-xs">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* ── SPLIT LAYOUT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12">
          {/* ── LEFT PANEL ── */}
          <div
            ref={leftRef as React.RefObject<HTMLDivElement>}
            style={leftStyle}
            className="lg:col-span-5 flex flex-col gap-4"
            data-ocid="contact.left_panel"
          >
            {/* Brand headline card */}
            <div className="glass-card p-7 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/6 via-transparent to-accent/4 pointer-events-none rounded-2xl" />
              <div className="relative">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-3 block">
                  Maverick Digitals — Mumbai
                </span>
                <h2
                  className="font-display font-bold text-foreground mb-3"
                  style={{
                    fontSize: "var(--font-size-h3)",
                    lineHeight: "var(--line-height-heading)",
                    letterSpacing: "var(--tracking-tight)",
                  }}
                >
                  Your growth partner,
                  <br />
                  <span className="gradient-text-cyan">
                    not just an agency.
                  </span>
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We don't just run campaigns — we build growth systems tailored
                  to your brand. From brief to delivery, you work directly with
                  the founders.
                </p>
              </div>
            </div>

            {/* Contact details */}
            <div className="glass-card p-5 space-y-1">
              {CONTACT_DETAILS.map(({ label, value, href }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 py-3 border-b border-border/50 last:border-0 group"
                >
                  <div className="min-w-0">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest leading-none mb-1 font-semibold">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm text-foreground font-medium hover:text-primary transition-smooth flex items-center gap-1"
                      >
                        <span className="truncate">{value}</span>
                      </a>
                    ) : (
                      <p className="text-sm text-foreground font-medium">
                        {value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Why Maverick */}
            <div className="glass-card p-5">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-4 font-bold">
                Why Maverick?
              </p>
              <ul className="space-y-2.5">
                {TRUST_POINTS.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-foreground"
                  >
                    <span className="w-5 h-5 rounded-full gradient-neon-purple flex items-center justify-center shrink-0">
                      <svg
                        width="9"
                        height="9"
                        viewBox="0 0 9 9"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M2 4.5L3.5 6L7 2.5"
                          stroke="white"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Social links — text labels */}
            <div className="glass-card p-5">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-4 font-bold">
                Follow Us
              </p>
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map(({ label, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-3 py-2 rounded-xl border border-border bg-muted/30 text-sm font-semibold text-muted-foreground ${color} transition-smooth hover:scale-105 hover:border-primary/30`}
                    data-ocid={`social-${label.toLowerCase().replace(/\s+.*/, "")}`}
                  >
                    {label.split(" ")[0]}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT PANEL: FORM ── */}
          <div
            ref={rightRef as React.RefObject<HTMLDivElement>}
            style={rightStyle}
            className="lg:col-span-7"
          >
            {submitted ? (
              /* ── SUCCESS STATE ── */
              <div
                className="glass-card p-10 md:p-14 flex flex-col items-center justify-center text-center min-h-[620px] relative overflow-hidden"
                data-ocid="contact-success"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/4 pointer-events-none rounded-2xl" />
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex flex-col items-center"
                >
                  <div className="relative mb-8">
                    <div className="w-24 h-24 rounded-full gradient-neon-purple glow-neon flex items-center justify-center">
                      <span className="text-white text-4xl font-bold">✓</span>
                    </div>
                    <div className="absolute -inset-3 rounded-full border border-primary/20 animate-ping" />
                    <div
                      className="absolute -inset-6 rounded-full border border-primary/10 animate-ping"
                      style={{ animationDelay: "0.3s" }}
                    />
                  </div>
                  <h3
                    className="font-display font-bold text-foreground mb-3"
                    style={{ fontSize: "var(--font-size-h3)" }}
                  >
                    Message Received!
                  </h3>
                  <p
                    className="text-muted-foreground leading-relaxed max-w-sm mb-2"
                    style={{ lineHeight: "var(--line-height-body)" }}
                  >
                    Thank you for reaching out. We'll review your project
                    details and respond within{" "}
                    <span className="text-primary font-semibold">24 hours</span>
                    .
                  </p>
                  <p className="text-muted-foreground/60 text-sm mb-10">
                    Check your inbox at{" "}
                    <span className="text-foreground/80">{form.email}</span>
                  </p>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="btn-secondary text-sm"
                    data-ocid="contact.send_again_button"
                  >
                    Send another message
                  </button>
                </motion.div>
              </div>
            ) : (
              /* ── FORM ── */
              <form
                onSubmit={handleSubmit}
                noValidate
                className="glass-card p-7 md:p-10 space-y-6 relative overflow-hidden"
                data-ocid="contact-form"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/4 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/4 rounded-full blur-[80px] pointer-events-none" />

                {/* Form heading */}
                <div className="relative">
                  <span className="tag-label mb-3 inline-flex">
                    Start a Conversation
                  </span>
                  <h3
                    className="font-display font-bold text-foreground mt-3 mb-1"
                    style={{
                      fontSize: "var(--font-size-h3)",
                      lineHeight: "var(--line-height-heading)",
                    }}
                  >
                    Tell us about your goals
                  </h3>
                  <p
                    className="text-muted-foreground text-sm"
                    style={{ lineHeight: "var(--line-height-relaxed)" }}
                  >
                    The more you share, the better we can tailor our approach.
                  </p>
                </div>

                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="contact-name"
                      className="text-sm font-semibold text-foreground"
                    >
                      Full Name <span className="text-primary">*</span>
                    </Label>
                    <input
                      id="contact-name"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      onBlur={() => handleBlur("name")}
                      className={fieldClass("name")}
                      data-ocid="contact-input-name"
                      autoComplete="name"
                    />
                    {touched.name && errors.name && (
                      <p
                        className="text-destructive text-xs mt-1"
                        data-ocid="contact.name.field_error"
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="contact-email"
                      className="text-sm font-semibold text-foreground"
                    >
                      Email Address <span className="text-primary">*</span>
                    </Label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      onBlur={() => handleBlur("email")}
                      className={fieldClass("email")}
                      data-ocid="contact-input-email"
                      autoComplete="email"
                    />
                    {touched.email && errors.email && (
                      <p
                        className="text-destructive text-xs mt-1"
                        data-ocid="contact.email.field_error"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Company */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="contact-company"
                    className="text-sm font-semibold text-foreground"
                  >
                    Company / Brand Name
                  </Label>
                  <input
                    id="contact-company"
                    placeholder="Your company or personal brand"
                    value={form.company}
                    onChange={(e) =>
                      setForm({ ...form, company: e.target.value })
                    }
                    onBlur={() => handleBlur("company")}
                    className={fieldClass("company")}
                    data-ocid="contact.company.input"
                    autoComplete="organization"
                  />
                </div>

                {/* Service + Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="contact-service"
                      className="text-sm font-semibold text-foreground"
                    >
                      Service Interested In{" "}
                      <span className="text-primary">*</span>
                    </Label>
                    <Select
                      value={form.serviceType}
                      onValueChange={(v) => {
                        setForm({ ...form, serviceType: v });
                        setTouched((t) => ({ ...t, serviceType: true }));
                        setErrors((er) => ({ ...er, serviceType: undefined }));
                      }}
                    >
                      <SelectTrigger
                        className={`premium-input h-auto py-3.5 ${touched.serviceType && errors.serviceType ? "border-destructive/70" : ""}`}
                        data-ocid="contact-select-service"
                      >
                        <SelectValue placeholder="Choose a service..." />
                      </SelectTrigger>
                      <SelectContent className="glassmorphic z-50">
                        {SERVICE_TYPES.map((s) => (
                          <SelectItem
                            key={s}
                            value={s}
                            className="cursor-pointer"
                          >
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {touched.serviceType && errors.serviceType && (
                      <p
                        className="text-destructive text-xs mt-1"
                        data-ocid="contact.service.field_error"
                      >
                        {errors.serviceType}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="contact-budget"
                      className="text-sm font-semibold text-foreground"
                    >
                      Project Budget
                    </Label>
                    <Select
                      value={form.budget}
                      onValueChange={(v) => setForm({ ...form, budget: v })}
                    >
                      <SelectTrigger
                        className="premium-input h-auto py-3.5"
                        data-ocid="contact.budget.select"
                      >
                        <SelectValue placeholder="Select a range..." />
                      </SelectTrigger>
                      <SelectContent className="glassmorphic z-50">
                        {BUDGET_RANGES.map((b) => (
                          <SelectItem
                            key={b}
                            value={b}
                            className="cursor-pointer"
                          >
                            {b}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="contact-message"
                    className="text-sm font-semibold text-foreground"
                  >
                    Tell Us About Your Project{" "}
                    <span className="text-primary">*</span>
                  </Label>
                  <textarea
                    id="contact-message"
                    placeholder="Describe your goals, current challenges, and what success looks like for you..."
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    onBlur={() => handleBlur("message")}
                    className={`${fieldClass("message")} min-h-[140px] resize-none`}
                    data-ocid="contact-input-message"
                  />
                  <div className="flex items-center justify-between">
                    {touched.message && errors.message ? (
                      <p
                        className="text-destructive text-xs"
                        data-ocid="contact.message.field_error"
                      >
                        {errors.message}
                      </p>
                    ) : (
                      <span />
                    )}
                    <span
                      className={`text-xs ml-auto ${form.message.length > 500 ? "text-destructive" : "text-muted-foreground/50"}`}
                    >
                      {form.message.length}/500
                    </span>
                  </div>
                </div>

                {/* Submit */}
                <div className="space-y-3 pt-1">
                  <button
                    type="submit"
                    disabled={isPending}
                    className="btn-primary w-full justify-center py-4 text-[15px] rounded-xl disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                    data-ocid="contact-submit"
                  >
                    {isPending ? (
                      <span className="flex items-center gap-2.5 justify-center">
                        <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        Sending your message...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2.5 justify-center">
                        Send Message
                      </span>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-primary/5 border border-primary/12">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/70 shrink-0" />
                    <p className="text-xs text-muted-foreground">
                      Response within{" "}
                      <span className="text-foreground font-semibold">
                        24 hours
                      </span>{" "}
                      — No spam, no lock-ins, just honest conversations.
                    </p>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
