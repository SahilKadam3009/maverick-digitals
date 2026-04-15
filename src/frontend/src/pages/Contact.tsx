import { Button } from "@/components/ui/button";
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
import {
  CheckCircle,
  Clock,
  ExternalLink,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Shield,
  Star,
  Twitter,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

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
  {
    icon: Instagram,
    label: "Instagram",
    href: "#",
    color: "hover:text-pink-400",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "#",
    color: "hover:text-blue-400",
  },
  {
    icon: Twitter,
    label: "Twitter / X",
    href: "#",
    color: "hover:text-sky-400",
  },
];

const CONTACT_DETAILS = [
  {
    icon: Mail,
    label: "Email",
    value: "maverickdigitals18@gmail.com",
    href: "mailto:maverickdigitals18@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Mumbai, Maharashtra, India",
    href: null,
  },
  {
    icon: Clock,
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
  { value: "40+", label: "Brands Scaled", icon: Users },
  { value: "5", label: "Countries Served", icon: Star },
  { value: "200%+", label: "Average ROI", icon: Zap },
  { value: "24hr", label: "Response Time", icon: Shield },
];

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

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isDark = document.documentElement.classList.contains("dark");

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

    const count = window.innerWidth < 768 ? 20 : 45;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.5 + 0.4,
        alpha: isDark ? Math.random() * 0.4 + 0.1 : Math.random() * 0.25 + 0.05,
        hue: Math.random() > 0.5 ? 308 : 200,
      });
    }

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const currentIsDark = document.documentElement.classList.contains("dark");
      const alphaMultiplier = currentIsDark ? 1 : 0.5;

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
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `oklch(0.68 0.18 260 / ${0.05 * alphaMultiplier * (1 - dist / 100)})`;
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

  const inputBase =
    "bg-background/80 dark:bg-muted/20 border transition-all duration-300 focus:ring-0 h-11 text-foreground placeholder:text-muted-foreground/50 rounded-lg";

  const fieldClass = (field: keyof FormData) =>
    `${inputBase} ${
      touched[field] && errors[field]
        ? "border-destructive/70 focus:border-destructive"
        : "border-border hover:border-primary/30 focus:border-primary/60 focus:shadow-[0_0_0_3px_oklch(var(--primary)/0.10)]"
    }`;

  return (
    <div className="relative pt-20 sm:pt-24 pb-24 min-h-screen overflow-hidden bg-background">
      <ParticleField />

      {/* Ambient glows */}
      <div className="absolute inset-0 grid-glow-bg opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-secondary/6 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* ── Page Header ───────────────────────────────────────────────────── */}
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          style={titleStyle}
          className="mb-14 text-center max-w-3xl mx-auto"
        >
          <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-4 inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Get In Touch
          </p>
          <h1 className="font-display font-bold text-5xl md:text-6xl text-foreground leading-tight mb-5">
            Let's build something{" "}
            <span className="gradient-text-purple">great together</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Whether you're starting fresh or scaling an existing brand — we map
            out a custom path to measurable growth. Real strategy, real results.
          </p>
        </div>

        {/* ── Split Layout ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-14">
          {/* ──── LEFT: Brand info panel ──────────────────────────────────── */}
          <div
            ref={leftRef as React.RefObject<HTMLDivElement>}
            style={leftStyle}
            className="lg:col-span-5 flex flex-col gap-5"
            data-ocid="contact.left_panel"
          >
            {/* Headline card */}
            <div className="relative rounded-2xl overflow-hidden border border-primary/15 bg-card/80 dark:bg-card/60 backdrop-blur-xl p-7">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/5 pointer-events-none" />
              <div className="relative">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-3 block">
                  Maverick Digitals — Mumbai
                </span>
                <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground leading-tight mb-3">
                  Your growth partner,
                  <br />
                  <span className="gradient-text-cyan">
                    not just an agency.
                  </span>
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We don't just run campaigns — we build growth systems tailored
                  to your brand. From brief to delivery, you work directly with
                  the founders.
                </p>
              </div>
            </div>

            {/* Proof stats grid */}
            <div className="grid grid-cols-2 gap-3" data-ocid="contact.stats">
              {PROOF_STATS.map(({ value, label, icon: Icon }) => (
                <div
                  key={label}
                  className="rounded-xl border border-border bg-card/70 dark:bg-card/50 backdrop-blur-sm p-4 flex items-center gap-3 hover:border-primary/25 transition-smooth"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <Icon size={14} className="text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-display font-black text-xl gradient-text-purple leading-none">
                      {value}
                    </p>
                    <p className="text-[10px] text-muted-foreground leading-tight mt-0.5 truncate">
                      {label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact details */}
            <div className="rounded-2xl border border-border bg-card/70 dark:bg-card/50 backdrop-blur-xl p-5 space-y-4">
              {CONTACT_DETAILS.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4 group">
                  <div className="w-9 h-9 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-smooth">
                    <Icon size={15} className="text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider leading-none mb-0.5">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm text-foreground font-medium hover:text-primary transition-smooth flex items-center gap-1 group/link"
                      >
                        <span className="truncate">{value}</span>
                        <ExternalLink
                          size={10}
                          className="opacity-0 group-hover/link:opacity-50 transition-smooth shrink-0"
                        />
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
            <div className="rounded-2xl border border-border bg-card/70 dark:bg-card/50 backdrop-blur-xl p-5">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-4 font-semibold">
                Why Maverick?
              </p>
              <ul className="space-y-2.5">
                {TRUST_POINTS.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-foreground"
                  >
                    <span className="w-1.5 h-1.5 rounded-full gradient-neon-purple shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Social links */}
            <div className="rounded-2xl border border-border bg-card/70 dark:bg-card/50 backdrop-blur-xl p-5">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-4 font-semibold">
                Follow Us
              </p>
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map(({ icon: Icon, label, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-xl border border-border bg-muted/40 flex items-center justify-center text-muted-foreground ${color} transition-smooth hover:scale-110 hover:border-primary/30 hover:shadow-[0_0_16px_oklch(var(--primary)/0.2)]`}
                    data-ocid={`social-${label.toLowerCase().replace(/\s+.*/, "")}`}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ──── RIGHT: Form panel ───────────────────────────────────────── */}
          <div
            ref={rightRef as React.RefObject<HTMLDivElement>}
            style={rightStyle}
            className="lg:col-span-7"
          >
            {submitted ? (
              <div
                className="rounded-2xl border border-primary/25 bg-card/80 dark:bg-card/60 backdrop-blur-xl p-10 md:p-14 flex flex-col items-center justify-center text-center min-h-[600px] relative overflow-hidden"
                data-ocid="contact-success"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/6 via-transparent to-accent/4 pointer-events-none rounded-2xl" />
                <div className="relative flex flex-col items-center">
                  <div className="relative mb-8">
                    <div className="w-24 h-24 rounded-full gradient-neon-purple glow-neon flex items-center justify-center">
                      <CheckCircle size={44} className="text-white" />
                    </div>
                    <div className="absolute -inset-3 rounded-full border border-primary/20 animate-ping" />
                    <div
                      className="absolute -inset-6 rounded-full border border-primary/10 animate-ping"
                      style={{ animationDelay: "0.3s" }}
                    />
                  </div>
                  <h3 className="font-display font-bold text-3xl text-foreground mb-3">
                    Message Received!
                  </h3>
                  <p className="text-muted-foreground leading-relaxed max-w-sm mb-2">
                    Thank you for reaching out. We'll review your project
                    details and respond within{" "}
                    <span className="text-primary font-semibold">24 hours</span>
                    .
                  </p>
                  <p className="text-muted-foreground/60 text-sm mb-8">
                    Check your inbox at{" "}
                    <span className="text-foreground/80">{form.email}</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => {
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
                    }}
                    className="text-primary hover:text-primary/80 transition-smooth text-sm font-medium border border-primary/30 rounded-lg px-5 py-2.5 hover:border-primary/60 hover:bg-primary/5"
                    data-ocid="contact.send_again_button"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-2xl border border-border bg-card/80 dark:bg-card/60 backdrop-blur-xl p-7 md:p-10 space-y-6 relative overflow-hidden"
                data-ocid="contact-form"
              >
                {/* Form ambient glows */}
                <div className="absolute top-0 right-0 w-56 h-56 bg-primary/4 rounded-full blur-[80px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent/4 rounded-full blur-[60px] pointer-events-none" />

                <div className="relative">
                  <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">
                    Start a Conversation
                  </p>
                  <h3 className="font-display font-bold text-2xl md:text-3xl text-foreground">
                    Tell us about your goals
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    The more you share, the better we can tailor our approach.
                  </p>
                </div>

                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="contact-name"
                      className="text-sm font-medium text-foreground/90"
                    >
                      Full Name <span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="contact-name"
                      placeholder="Muskan Rathod"
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
                      className="text-sm font-medium text-foreground/90"
                    >
                      Email Address <span className="text-primary">*</span>
                    </Label>
                    <Input
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
                    className="text-sm font-medium text-foreground/90"
                  >
                    Company / Brand Name
                  </Label>
                  <Input
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
                      className="text-sm font-medium text-foreground/90"
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
                        className={`h-11 bg-background/80 dark:bg-muted/20 border text-foreground transition-all duration-300 rounded-lg ${
                          touched.serviceType && errors.serviceType
                            ? "border-destructive/70"
                            : "border-border hover:border-primary/30 focus:border-primary/60"
                        }`}
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
                      className="text-sm font-medium text-foreground/90"
                    >
                      Project Budget
                    </Label>
                    <Select
                      value={form.budget}
                      onValueChange={(v) => setForm({ ...form, budget: v })}
                    >
                      <SelectTrigger
                        className="h-11 bg-background/80 dark:bg-muted/20 border border-border hover:border-primary/30 focus:border-primary/60 text-foreground transition-all duration-300 rounded-lg"
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
                    className="text-sm font-medium text-foreground/90"
                  >
                    Tell Us About Your Project{" "}
                    <span className="text-primary">*</span>
                  </Label>
                  <Textarea
                    id="contact-message"
                    placeholder="Describe your goals, current challenges, and what success looks like for you..."
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    onBlur={() => handleBlur("message")}
                    className={`${fieldClass("message")} h-auto min-h-[140px] resize-none`}
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

                {/* Submit + trust badge */}
                <div className="space-y-3">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isPending}
                    className="w-full gradient-neon-purple text-white font-semibold glow-neon hover:scale-[1.02] transition-smooth border-0 h-13 text-base rounded-xl"
                    data-ocid="contact-submit"
                  >
                    {isPending ? (
                      <span className="flex items-center gap-2.5">
                        <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        Sending your message...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2.5">
                        <Send size={16} />
                        Start Your Growth Journey
                      </span>
                    )}
                  </Button>

                  {/* Trust badge */}
                  <div className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-primary/5 border border-primary/10">
                    <CheckCircle size={13} className="text-primary shrink-0" />
                    <p className="text-xs text-muted-foreground">
                      Response within{" "}
                      <span className="text-foreground font-medium">
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
