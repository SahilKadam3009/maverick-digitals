import { Link } from "@tanstack/react-router";
import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";

const quickLinks = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const services = [
  "Personal Branding",
  "Social Media Management",
  "Website & App Development",
  "SEO & SEM",
  "Performance Marketing",
  "Branding & Strategy",
];

const socials = [
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
];

const contactInfo = [
  { icon: Mail, text: "maverickdigitals18@gmail.com" },
  { icon: Phone, text: "+91 98765 43210" },
  { icon: MapPin, text: "Mumbai, Maharashtra, India" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-card border-t border-border overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-5 group w-fit">
              <div className="w-8 h-8 group-hover:scale-110 transition-smooth flex items-center justify-center">
                <img
                  src="/assets/logo.png"
                  alt="Maverick Digitals logo"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <span className="font-display font-bold text-lg">
                <span className="text-foreground">Maverick</span>
                <span className="text-primary"> Digitals</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-3">
              Maverick Digitals is a Mumbai-based full-stack digital marketing
              agency helping ambitious brands scale through high-conversion
              strategy, storytelling, and execution. Co-founded by Muskan Rathod
              and Dhaval Shah.
            </p>
            <p className="text-muted-foreground/60 text-xs leading-relaxed mb-6">
              Serving clients across India, UAE, USA, UK, and Australia.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-lg border border-border bg-muted/40 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 hover:shadow-[0_0_12px_oklch(var(--primary)/0.2)] transition-smooth"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-5 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-smooth flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/35 group-hover:bg-primary group-hover:scale-125 transition-smooth shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-5 text-sm uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-sm text-muted-foreground hover:text-secondary transition-smooth flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-secondary/35 group-hover:bg-secondary group-hover:scale-125 transition-smooth shrink-0" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-5 text-sm uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-4">
              {contactInfo.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="flex items-start gap-3 text-sm text-muted-foreground"
                >
                  <Icon size={15} className="mt-0.5 text-primary shrink-0" />
                  <span className="break-all">{text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-5 border-t border-border">
              <p className="text-xs text-muted-foreground/70 leading-relaxed">
                Ready to scale your brand? Let's talk about what's possible.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 text-xs text-primary font-semibold mt-2 hover:gap-2.5 transition-all duration-200"
              >
                Get in touch
                <span className="text-primary">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {year} Maverick Digitals. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-muted-foreground/60">
            <span>Mumbai, India</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
            <span>Global Reach</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
            <span>40+ Brands Scaled</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
