import { useRevealOnScroll } from "@/hooks/useIntersectionObserver";
import { Minus, Plus } from "lucide-react";
import { useRef, useState } from "react";

const faqs = [
  {
    id: "faq1",
    question: "What types of businesses do you work with?",
    answer:
      "We work with growth-stage startups, D2C brands, SaaS companies, and established enterprises across industries including tech, e-commerce, real estate, health & wellness, and education. Our frameworks adapt to your market — whether you're pre-revenue or scaling past $10M.",
  },
  {
    id: "faq2",
    question: "How long does it take to see results?",
    answer:
      "Paid media campaigns typically show meaningful performance signals within 30-60 days. SEO and content strategies compound over 3-6 months. Brand strategy impacts are felt across 6-12 months. We set clear KPIs upfront so you always know what to expect and when.",
  },
  {
    id: "faq3",
    question: "What does a typical engagement look like?",
    answer:
      "We start with a deep-dive discovery session, then build a custom strategy deck. From there, we move into execution with monthly retainers or project-based engagements. You get a dedicated team lead, weekly reports, and access to a live performance dashboard.",
  },
  {
    id: "faq4",
    question: "Do you work with minimum ad budgets?",
    answer:
      "For paid media, we recommend a minimum ad spend of ₹1.5L/month to run meaningful tests and scale effectively. Below that threshold, the data is too thin to optimize. We'll always give you an honest recommendation based on your goals and budget reality.",
  },
  {
    id: "faq5",
    question: "How is Maverick Digitals different from other agencies?",
    answer:
      "Most agencies focus on deliverables. We focus on business outcomes. Every strategy we build is tied to a revenue or growth metric. We don't outsource your work, we don't pad reports, and we give you full transparency — including when things need to change.",
  },
  {
    id: "faq6",
    question: "Can we start with a single service before committing fully?",
    answer:
      "Absolutely. Many clients begin with a single channel (SEO, paid, or content) and expand once they see the quality of our work. We offer 3-month pilot engagements specifically designed for clients who want to test before scaling.",
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
