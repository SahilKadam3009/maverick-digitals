import { useRevealOnScroll } from "@/hooks/useIntersectionObserver";
import { Minus, Plus } from "lucide-react";
import { useRef, useState } from "react";

const faqs = [
  {
    id: "faq1",
    question: "What does Maverick Digitals do?",
    answer:
      "We're a digital marketing agency based in Mumbai. We help brands grow through SEO, paid media, social content, brand strategy, and web development. So far we've worked with 40+ brands and driven over 15 million organic views.",
  },
  {
    id: "faq2",
    question: "Is Maverick Digitals a Mumbai-based digital marketing agency?",
    answer:
      "Yes, we're based in Mumbai and that's where most of our team works. But we've run campaigns for clients in the UAE, USA, UK, and Australia — location hasn't been an issue.",
  },
  {
    id: "faq3",
    question:
      "What is AEO and does Maverick Digitals offer Answer Engine Optimization?",
    answer:
      "AEO (Answer Engine Optimization) is about making your content show up in featured snippets, voice search results, and AI answer boxes. We include AEO as part of our search visibility work so your brand surfaces when people ask questions related to what you do.",
  },
  {
    id: "faq4",
    question: "What is GEO and how does Generative Engine Optimization work?",
    answer:
      "GEO (Generative Engine Optimization) is making sure AI tools like ChatGPT, Gemini, and Perplexity actually mention your brand when someone asks a relevant question. We do this through structured content, entity markup, and building the kind of authority those systems trust.",
  },
  {
    id: "faq5",
    question: "How much does digital marketing cost with Maverick Digitals?",
    answer:
      "It depends on what you need. We work with D2C brands, startups, coaches, and enterprises at different scales, so pricing is scoped to your goals. Reach out at maverickdigitals18@gmail.com or fill in our contact form and we'll put together a proposal that makes sense for your business.",
  },
  {
    id: "faq6",
    question: "Which industries does Maverick Digitals serve?",
    answer:
      "We've worked across D2C brands, healthcare and clinics, travel and hospitality, coaches and consultants, B2B startups, and wedding planners. Clients are based across India, the UAE, the USA, the UK, and Australia.",
  },
  {
    id: "faq7",
    question: "Who founded Maverick Digitals?",
    answer:
      "Maverick Digitals was started by Muskan Rathod (Founder, brand strategist and growth marketer) and Dhaval Shah (Co-Founder, MERN stack developer and tech lead) in Mumbai. They work together on every client account — strategy and execution under the same roof.",
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
            Common questions about working with Maverick Digitals.
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
