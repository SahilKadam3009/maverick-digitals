import { Link } from "@tanstack/react-router";

// ─── Data ──────────────────────────────────────────────────────────────────
const serviceLinks = [
  { label: "Personal Branding", href: "/services" },
  { label: "Social Media Management", href: "/services" },
  { label: "Website & App Development", href: "/services" },
  { label: "SEO & SEM", href: "/services" },
  { label: "Performance Marketing", href: "/services" },
  { label: "Branding & Strategy", href: "/services" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Industries", href: "/industries" },
  { label: "Contact", href: "/contact" },
];

const socials = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    hoverClass:
      "hover:text-pink-500 hover:border-pink-400/40 hover:bg-pink-500/8 hover:shadow-[0_0_14px_rgba(236,72,153,0.25)]",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    hoverClass:
      "hover:text-blue-500 hover:border-blue-400/40 hover:bg-blue-500/8 hover:shadow-[0_0_14px_rgba(59,130,246,0.25)]",
  },
  {
    label: "Twitter / X",
    href: "https://twitter.com",
    hoverClass:
      "hover:text-sky-400 hover:border-sky-400/40 hover:bg-sky-400/8 hover:shadow-[0_0_14px_rgba(14,165,233,0.25)]",
  },
];

const contactInfo = [
  {
    label: "Email",
    text: "maverickdigitals18@gmail.com",
    href: "mailto:maverickdigitals18@gmail.com",
  },
  { label: "Phone", text: "+91 98765 43210", href: "tel:+919876543210" },
  { label: "Location", text: "Mumbai, Maharashtra, India", href: null },
];

// ─── Component ─────────────────────────────────────────────────────────────
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden footer-bg">
      {/* ── Gradient top border ─────────────────────────────────────────── */}
      <div className="footer-top-border" aria-hidden="true" />

      {/* ── Ambient glows ───────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 left-[15%] w-72 h-72 rounded-full blur-3xl footer-glow-left" />
        <div className="absolute bottom-0 right-[15%] w-56 h-56 rounded-full blur-3xl footer-glow-right" />
      </div>

      {/* ── Main grid ───────────────────────────────────────────────────── */}
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Col 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 mb-4 group"
            >
              <div className="w-8 h-8 group-hover:scale-110 transition-all duration-300 flex items-center justify-center shrink-0">
                <img
                  src="/assets/logo.png"
                  alt="Maverick Digitals logo"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <span className="font-display font-bold text-[1.1rem]">
                <span className="text-foreground">Maverick</span>
                <span className="text-primary"> Digitals</span>
              </span>
            </Link>

            {/* SEO tagline */}
            <p className="text-[0.8rem] font-semibold uppercase tracking-widest text-primary/70 mb-3">
              Mumbai-based digital marketing agency
            </p>

            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              We help ambitious brands scale through high-conversion strategy,
              storytelling, and execution — blending creativity, psychology, and
              data for measurable outcomes.
            </p>
            <p className="text-xs text-muted-foreground/55 leading-relaxed mb-6">
              Serving clients across India, UAE, USA, UK &amp; Australia.
            </p>

            {/* Social links — text labels only */}
            <div className="flex items-center gap-2.5 flex-wrap">
              {socials.map(({ label, href, hoverClass }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`px-3 py-1.5 rounded-lg border border-border bg-muted/30 text-xs font-semibold text-muted-foreground transition-all duration-300 ${hoverClass}`}
                >
                  {label.split(" ")[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Services */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-5 text-xs uppercase tracking-[0.12em]">
              Services
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-secondary transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-secondary/40 group-hover:bg-secondary group-hover:scale-125 transition-all duration-200 shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Company */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-5 text-xs uppercase tracking-[0.12em]">
              Company
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary group-hover:scale-125 transition-all duration-200 shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-5 text-xs uppercase tracking-[0.12em]">
              Get in Touch
            </h4>
            <ul className="space-y-3.5 mb-6">
              {contactInfo.map(({ label, text, href }) => (
                <li key={text} className="text-sm text-muted-foreground">
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground/60 block mb-0.5">
                    {label}
                  </span>
                  {href ? (
                    <a
                      href={href}
                      className="hover:text-primary transition-colors duration-200 break-all"
                    >
                      {text}
                    </a>
                  ) : (
                    <span>{text}</span>
                  )}
                </li>
              ))}
            </ul>

            <div className="p-4 rounded-xl footer-cta-card">
              <p className="text-xs text-muted-foreground/80 leading-relaxed mb-2.5">
                Ready to scale your brand? Let's talk about what's possible.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:gap-2.5 transition-all duration-200 group"
                data-ocid="footer-cta-link"
              >
                Start a conversation
                <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ──────────────────────────────────────────────────── */}
        <div className="mt-12 pt-6 footer-bottom-bar flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground/70 order-2 sm:order-1">
            © {year} Maverick Digitals. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground/50 order-1 sm:order-2">
            <span className="footer-stat-pill">40+ Brands Scaled</span>
            <span aria-hidden="true" className="w-px h-3 footer-divider-line" />
            <span className="footer-stat-pill">15M+ Organic Views</span>
            <span
              aria-hidden="true"
              className="hidden sm:block w-px h-3 footer-divider-line"
            />
            <span className="hidden sm:block footer-stat-pill">
              Built in Mumbai
            </span>
          </div>
        </div>
      </div>

      {/* Hidden SEO structured text */}
      <span className="sr-only">
        Maverick Digitals — Mumbai-based digital marketing agency specialising
        in personal branding, social media management, SEO, performance
        marketing, and web development. Serving brands across India, UAE, USA,
        UK and Australia.
      </span>
    </footer>
  );
}
