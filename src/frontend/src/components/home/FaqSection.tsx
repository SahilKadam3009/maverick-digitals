import { useRevealOnScroll } from "@/hooks/useIntersectionObserver";
import { Minus, Plus } from "lucide-react";
import { useRef, useState } from "react";

const faqs = [
  {
    id: "faq1",
    question: "What services does Maverick Digitals offer?",
    answer:
      "Maverick Digitals offers Social Media Marketing, Performance Marketing (Google & Meta Ads), Brand Strategy & Identity, Content Creation, and SEO. As a full-service digital marketing agency in Mumbai, we provide end-to-end digital solutions for businesses of all sizes.",
  },
  {
    id: "faq2",
    question: "Why should I choose a Mumbai-based digital marketing agency?",
    answer:
      "A Mumbai-based digital marketing agency like Maverick Digitals understands the local market dynamics, consumer behavior, and competitive landscape unique to Mumbai and Maharashtra. We combine local expertise with global best practices to deliver campaigns that truly resonate with your target audience.",
  },
  {
    id: "faq3",
    question: "How much does digital marketing cost in Mumbai?",
    answer:
      "Digital marketing costs in Mumbai vary based on scope and services. At Maverick Digitals, our packages start from ₹25,000/month for focused campaigns and scale based on your goals. We offer transparent pricing with no hidden fees and a results-first approach.",
  },
  {
    id: "faq4",
    question: "How long does it take to see results from digital marketing?",
    answer:
      "Results timelines vary by channel. Paid ads (Google, Meta) can show results within 2–4 weeks. SEO typically takes 3–6 months to gain traction. Social media engagement grows within 1–2 months with consistent content. Maverick Digitals sets clear milestones so you always know what to expect.",
  },
  {
    id: "faq5",
    question: "Is Maverick Digitals a good digital marketing agency in Mumbai?",
    answer:
      "Yes. Maverick Digitals is one of Mumbai's top-rated digital marketing companies with a proven track record of scaling 50+ brands, generating $12M+ in revenue, and maintaining a 97% client retention rate. Our data-driven strategies, creative campaigns, and radical transparency make us the preferred choice for Mumbai businesses.",
  },
];

function FaqItem({
  faq,
  isOpen,
  onToggle,
  index,
}: {
  faq: (typeof faqs)[0];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const { ref, style } = useRevealOnScroll(index * 80);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} style={style}>
      <div
        className={`glassmorphic transition-all duration-300 overflow-hidden ${
          isOpen
            ? "border-primary/30 shadow-[0_0_30px_oklch(0.68_0.24_308_/_0.08)]"
            : "border-white/8 hover:border-white/15"
        }`}
      >
        <button
          type="button"
          onClick={onToggle}
          className="w-full flex items-center justify-between px-7 py-5 text-left gap-4"
          aria-expanded={isOpen}
          data-ocid={`faq-toggle-${faq.id}`}
        >
          <span
            className={`font-display font-semibold text-base transition-colors duration-200 ${
              isOpen
                ? "text-foreground"
                : "text-foreground/80 hover:text-foreground"
            }`}
          >
            {faq.question}
          </span>
          <div
            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
              isOpen
                ? "gradient-neon-purple text-background glow-neon scale-110"
                : "bg-muted/50 text-muted-foreground"
            }`}
          >
            {isOpen ? <Minus size={14} /> : <Plus size={14} />}
          </div>
        </button>

        {/* Animated height */}
        <div
          ref={contentRef}
          style={{
            maxHeight: isOpen
              ? `${contentRef.current?.scrollHeight ?? 400}px`
              : "0px",
            transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            overflow: "hidden",
          }}
        >
          <p className="px-7 pb-6 text-sm text-muted-foreground leading-relaxed">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>("faq1");
  const { ref: titleRef, style: titleStyle } = useRevealOnScroll(0);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="relative py-28 px-6 overflow-hidden bg-background">
      <div className="absolute inset-0 grid-glow-bg opacity-20" />
      <div className="absolute top-0 right-1/4 w-64 h-64 bg-accent/6 rounded-full blur-[100px]" />

      <div className="relative max-w-3xl mx-auto">
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          style={titleStyle}
          className="text-center mb-16"
        >
          <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-3">
            Common Questions
          </p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-5">
            Frequently Asked{" "}
            <span className="gradient-text-cyan">Questions</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm leading-relaxed">
            Still have questions? Reach out and we'll respond within one
            business day.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FaqItem
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              onToggle={() => toggle(faq.id)}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
