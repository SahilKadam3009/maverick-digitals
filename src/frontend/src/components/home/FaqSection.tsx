import { useRevealOnScroll } from "@/hooks/useIntersectionObserver";
import { Minus, Plus } from "lucide-react";
import { useRef, useState } from "react";

const faqs = [
  {
    id: "faq1",
    question: "What does Maverick Digitals do?",
    answer:
      "Maverick Digitals is a Mumbai-based full-stack digital marketing agency helping ambitious brands scale through SEO, AEO, GEO, performance marketing, social media management, brand strategy, and website development. We've scaled 40+ brands with 15M+ organic views and 200%+ ROI.",
  },
  {
    id: "faq2",
    question: "Is Maverick Digitals a Mumbai-based digital marketing agency?",
    answer:
      "Yes. Maverick Digitals is headquartered in Mumbai, Maharashtra, India. We serve clients across India, UAE, USA, UK, and Australia — making us a globally capable Mumbai-based digital marketing company with proven results in diverse markets.",
  },
  {
    id: "faq3",
    question:
      "What is AEO and does Maverick Digitals offer Answer Engine Optimization?",
    answer:
      "AEO (Answer Engine Optimization) is the practice of optimizing content to appear in featured snippets, voice search results, and AI answer boxes. Yes, Maverick Digitals offers AEO as part of our search visibility services to help your brand appear when people ask questions online.",
  },
  {
    id: "faq4",
    question: "What is GEO and how does Generative Engine Optimization work?",
    answer:
      "GEO (Generative Engine Optimization) ensures your brand is cited by AI tools like ChatGPT, Gemini, and Perplexity. Maverick Digitals implements GEO strategies using structured content, entity markup, and authority building so AI platforms recommend your business when users ask about relevant topics.",
  },
  {
    id: "faq5",
    question: "How much does digital marketing cost with Maverick Digitals?",
    answer:
      "Pricing varies based on your business goals, services required, and campaign scale. We offer flexible packages for D2C brands, startups, coaches, and enterprises. Contact us at maverickdigitals18@gmail.com or fill out our contact form for a custom growth proposal.",
  },
  {
    id: "faq6",
    question: "Which industries does Maverick Digitals serve?",
    answer:
      "We serve D2C Brands, Healthcare & Clinics, Travel & Hospitality, Coaches & Consultants, B2B Startups, and Wedding Planners. Our team has delivered results across India, UAE, USA, UK, and Australia with proven success across diverse markets and industries.",
  },
  {
    id: "faq7",
    question: "Who founded Maverick Digitals?",
    answer:
      "Maverick Digitals was co-founded by Muskan Rathod (Founder & Brand Strategist) and Dhaval Shah (Co-Founder & Tech Innovator) in Mumbai, India. Together they bring expertise in brand strategy, performance marketing, and technical innovation to help brands achieve measurable growth.",
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
          className="w-full flex items-center justify-between px-4 sm:px-7 py-5 text-left gap-4 min-h-[56px]"
          aria-expanded={isOpen}
          data-ocid={`faq-toggle-${faq.id}`}
        >
          <span
            className={`font-display font-semibold text-sm sm:text-base transition-colors duration-200 leading-snug ${
              isOpen
                ? "text-foreground"
                : "text-foreground/80 hover:text-foreground"
            }`}
          >
            {faq.question}
          </span>
          <div
            className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
              isOpen
                ? "gradient-neon-purple text-background glow-neon scale-110"
                : "bg-muted/50 text-muted-foreground"
            }`}
          >
            {isOpen ? <Minus size={16} /> : <Plus size={16} />}
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
    <section className="relative py-16 sm:py-28 px-4 sm:px-6 overflow-hidden bg-background">
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
            Everything you need to know about working with Mumbai's leading
            digital marketing agency.
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
