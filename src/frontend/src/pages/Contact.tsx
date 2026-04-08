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
  Twitter,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const SERVICE_TYPES = [
  "Strategic Branding",
  "Performance Marketing",
  "UI/UX & Web Design",
  "Content Creation",
  "Social Media Management",
  "SEO & Analytics",
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

const STATS = [
  { value: "50+", label: "Brands Scaled", icon: Users },
  { value: "100%", label: "Client Satisfaction", icon: Shield },
  { value: "48hr", label: "Response Time", icon: Clock },
];

interface FormData {
  name: string;
  email: string;
  serviceType: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  serviceType?: string;
  message?: string;
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Animated particle background
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

    const count = 55;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.8 + 0.4,
        alpha: Math.random() * 0.5 + 0.1,
        hue: Math.random() > 0.5 ? 308 : 200,
      });
    }

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `oklch(0.68 0.24 ${p.hue} / ${p.alpha})`;
        ctx.fill();
      }

      // Draw faint connecting lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `oklch(0.68 0.18 260 / ${0.07 * (1 - dist / 90)})`;
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
      className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
    />
  );
}

export function Contact() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    serviceType: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<keyof FormData, boolean>>({
    name: false,
    email: false,
    serviceType: false,
    message: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const { mutateAsync: submitContact, isPending } = useSubmitContact();

  const { ref: titleRef, style: titleStyle } = useRevealOnScroll(0);
  const { ref: statsRef, style: statsStyle } = useRevealOnScroll(80);
  const { ref: leftRef, style: leftStyle } = useRevealOnScroll(100);
  const { ref: rightRef, style: rightStyle } = useRevealOnScroll(200);

  const validate = (data: FormData): FormErrors => {
    const e: FormErrors = {};
    if (!data.name.trim()) e.name = "Full name is required";
    if (!data.email.trim()) e.email = "Email address is required";
    else if (!validateEmail(data.email))
      e.email = "Enter a valid email address";
    if (!data.serviceType) e.serviceType = "Please select a service";
    if (!data.message.trim()) e.message = "Tell us about your project";
    else if (data.message.trim().length < 20)
      e.message = "Please be a bit more descriptive (min 20 chars)";
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
      serviceType: true,
      message: true,
    };
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    try {
      await submitContact(form);
      setSubmitted(true);
      toast.success("Message sent! We'll be in touch within 48 hours.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const fieldClass = (field: keyof FormData) =>
    `bg-muted/30 border transition-all duration-300 focus:ring-0 h-11 ${
      touched[field] && errors[field]
        ? "border-destructive/70 focus:border-destructive"
        : "border-border focus:border-primary/60 focus:shadow-[0_0_0_3px_oklch(var(--primary)/0.12)]"
    }`;

  return (
    <div className="relative pt-24 pb-24 min-h-screen overflow-hidden">
      {/* Animated particle field */}
      <ParticleField />

      {/* Ambient glows */}
      <div className="absolute inset-0 grid-glow-bg opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 left-1/5 w-96 h-96 bg-primary/8 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/5 w-72 h-72 bg-secondary/8 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute top-2/3 left-1/2 w-48 h-48 bg-accent/6 rounded-full blur-[90px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          style={titleStyle}
          className="mb-12 text-center max-w-3xl mx-auto"
        >
          <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-4 inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Get In Touch
          </p>
          <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-foreground leading-tight mb-5">
            Let's Build Something{" "}
            <span className="gradient-text-purple">Remarkable</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Whether you're starting fresh or scaling an existing brand — we map
            out a custom path to measurable growth.
          </p>
        </div>

        {/* ── Stats Row ──────────────────────────────────────────────────── */}
        <div
          ref={statsRef as React.RefObject<HTMLDivElement>}
          style={statsStyle}
          className="grid grid-cols-3 gap-4 mb-14 max-w-2xl mx-auto"
          data-ocid="contact-stats"
        >
          {STATS.map(({ value, label, icon: Icon }) => (
            <div
              key={label}
              className="glassmorphic text-center py-5 px-4 hover:border-primary/20 transition-smooth"
            >
              <Icon
                size={18}
                className="text-primary mx-auto mb-2 opacity-80"
              />
              <p className="font-display font-bold text-2xl gradient-text-purple leading-none mb-1">
                {value}
              </p>
              <p className="text-muted-foreground text-xs leading-tight">
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* ── Split Layout ───────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 xl:gap-12">
          {/* Left info panel */}
          <div
            ref={leftRef as React.RefObject<HTMLDivElement>}
            style={leftStyle}
            className="lg:col-span-2 space-y-4"
          >
            {/* Brand tagline card */}
            <div className="glassmorphic border-primary/20 p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/5 rounded-lg pointer-events-none" />
              <div className="relative">
                <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">
                  Maverick Digitals
                </p>
                <h2 className="font-display font-bold text-xl text-foreground mb-2 leading-tight">
                  Your Growth Partner,
                  <br />
                  Not Just an Agency.
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We don't just run campaigns — we architect entire growth
                  systems built around your unique brand DNA.
                </p>
              </div>
            </div>

            {/* Contact details */}
            <div className="glassmorphic border-white/8 p-5 space-y-3">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: "hello@maverickdigitals.com",
                  href: "mailto:hello@maverickdigitals.com",
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
                  value: "Mumbai, India",
                  href: null,
                },
                {
                  icon: Clock,
                  label: "Response Time",
                  value: "Within 48 hours",
                  href: null,
                },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4 group">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-smooth">
                    <Icon size={15} className="text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider leading-none mb-0.5">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm text-foreground font-medium hover:text-primary transition-smooth flex items-center gap-1 group/link"
                      >
                        <span className="truncate">{value}</span>
                        <ExternalLink
                          size={11}
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
            <div className="glassmorphic border-white/8 p-5">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">
                Why Maverick?
              </p>
              <ul className="space-y-2.5">
                {[
                  "No long-term lock-ins",
                  "Results-based reporting",
                  "Dedicated strategy team",
                  "Transparent pricing",
                  "Data-led creative direction",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-sm text-foreground"
                  >
                    <span className="w-1.5 h-1.5 rounded-full gradient-neon-purple shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Social links */}
            <div className="glassmorphic border-white/8 p-5">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">
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
                    className={`w-10 h-10 rounded-xl glassmorphic-dark border-white/10 flex items-center justify-center text-muted-foreground ${color} transition-smooth hover:scale-110 hover:border-white/20 hover:shadow-[0_0_16px_oklch(var(--primary)/0.25)]`}
                    data-ocid={`social-${label.toLowerCase().replace(/\s+.*/, "")}`}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right form panel */}
          <div
            ref={rightRef as React.RefObject<HTMLDivElement>}
            style={rightStyle}
            className="lg:col-span-3"
          >
            {submitted ? (
              <div
                className="glassmorphic border-primary/30 p-10 md:p-14 flex flex-col items-center justify-center text-center min-h-[600px] relative overflow-hidden"
                data-ocid="contact-success"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/5 pointer-events-none rounded-lg" />
                <div className="relative flex flex-col items-center">
                  {/* Animated success checkmark */}
                  <div className="relative mb-8">
                    <div className="w-24 h-24 rounded-full gradient-neon-purple glow-neon flex items-center justify-center">
                      <CheckCircle size={44} className="text-background" />
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
                    Thank you for reaching out. Our team will review your
                    project details and get back to you with a tailored strategy
                    within
                    <span className="text-primary font-semibold">
                      {" "}
                      48 hours
                    </span>
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
                        serviceType: "",
                        message: "",
                      });
                      setTouched({
                        name: false,
                        email: false,
                        serviceType: false,
                        message: false,
                      });
                      setErrors({});
                    }}
                    className="text-primary hover:text-primary/80 transition-smooth text-sm font-medium border border-primary/30 rounded-lg px-5 py-2.5 hover:border-primary/60 hover:bg-primary/5"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="glassmorphic border-white/10 p-7 md:p-10 space-y-6 relative overflow-hidden"
                data-ocid="contact-form"
              >
                {/* Card ambient glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full blur-[60px] pointer-events-none" />

                <div className="relative">
                  <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">
                    Start a Conversation
                  </p>
                  <h3 className="font-display font-bold text-2xl text-foreground">
                    Tell Us About Your Goals
                  </h3>
                </div>

                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 relative">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="name"
                      className="text-sm font-medium text-foreground/90"
                    >
                      Full Name <span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="name"
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
                      <p className="text-destructive text-xs mt-1">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-foreground/90"
                    >
                      Email Address <span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="email"
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
                      <p className="text-destructive text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Service select */}
                <div className="space-y-1.5 relative">
                  <Label
                    htmlFor="service"
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
                      className={`h-11 bg-muted/30 border transition-all duration-300 ${
                        touched.serviceType && errors.serviceType
                          ? "border-destructive/70"
                          : "border-border focus:border-primary/60"
                      }`}
                      data-ocid="contact-select-service"
                    >
                      <SelectValue placeholder="Choose a service..." />
                    </SelectTrigger>
                    <SelectContent className="glassmorphic-dark border-white/12 z-50">
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
                    <p className="text-destructive text-xs mt-1">
                      {errors.serviceType}
                    </p>
                  )}
                </div>

                {/* Message textarea */}
                <div className="space-y-1.5 relative">
                  <Label
                    htmlFor="message"
                    className="text-sm font-medium text-foreground/90"
                  >
                    Tell Us About Your Project{" "}
                    <span className="text-primary">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Describe your goals, current challenges, and what success looks like for you..."
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    onBlur={() => handleBlur("message")}
                    className={`${fieldClass("message")} h-auto min-h-[160px] resize-none`}
                    data-ocid="contact-input-message"
                  />
                  <div className="flex items-center justify-between">
                    {touched.message && errors.message ? (
                      <p className="text-destructive text-xs">
                        {errors.message}
                      </p>
                    ) : (
                      <span />
                    )}
                    <span
                      className={`text-xs ml-auto ${form.message.length > 500 ? "text-destructive" : "text-muted-foreground/60"}`}
                    >
                      {form.message.length}/500
                    </span>
                  </div>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={isPending}
                  className="w-full gradient-neon-purple text-background font-semibold glow-neon hover:scale-[1.02] transition-smooth border-0 h-13 text-base"
                  data-ocid="contact-submit"
                >
                  {isPending ? (
                    <span className="flex items-center gap-2.5">
                      <div className="w-4 h-4 rounded-full border-2 border-background/30 border-t-background animate-spin" />
                      Sending your message...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2.5">
                      <Send size={16} />
                      Send Message
                    </span>
                  )}
                </Button>

                <p className="text-center text-muted-foreground/50 text-xs">
                  No spam, ever. We respect your privacy and respond within 48
                  hours.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
