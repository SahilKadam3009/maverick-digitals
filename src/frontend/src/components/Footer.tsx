import { Link } from "@tanstack/react-router";
import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Zap,
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

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-card border-t border-white/10 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-5 group w-fit">
              <div className="w-8 h-8 rounded-lg gradient-neon-purple flex items-center justify-center glow-neon group-hover:scale-110 transition-smooth">
                <Zap
                  size={16}
                  className="text-background"
                  fill="currentColor"
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
            <p className="text-muted-foreground/70 text-xs leading-relaxed mb-6">
              Serving clients across India, UAE, USA, UK, and Australia.
            </p>
            <div className="flex items-center gap-3">
              {[
                {
                  icon: Twitter,
                  href: "https://twitter.com",
                  label: "Twitter",
                },
                {
                  icon: Linkedin,
                  href: "https://linkedin.com",
                  label: "LinkedIn",
                },
                {
                  icon: Instagram,
                  href: "https://instagram.com",
                  label: "Instagram",
                },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-lg glassmorphic flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:glow-neon transition-smooth"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
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
                    <span className="w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary group-hover:scale-125 transition-smooth" />
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
                    <span className="w-1 h-1 rounded-full bg-secondary/40 group-hover:bg-secondary group-hover:scale-125 transition-smooth" />
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
              {[
                { icon: Mail, text: "maverickdigitals18@gmail.com" },
                { icon: Phone, text: "+91 98765 43210" },
                { icon: MapPin, text: "Mumbai, Maharashtra, India" },
              ].map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="flex items-start gap-3 text-sm text-muted-foreground"
                >
                  <Icon size={15} className="mt-0.5 text-primary shrink-0" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {year} Maverick Digitals. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
