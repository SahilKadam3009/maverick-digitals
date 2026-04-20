import { r as reactExports, j as jsxRuntimeExports, L as Link, B as Button } from "./index-BoXTUytn.js";
import { u as useRevealOnScroll } from "./useIntersectionObserver-ecw6SCeH.js";
import { a as animateVisualElement, s as setTarget, u as useConstant, b as useIsomorphicLayoutEffect, r as resolveElements, m as motion } from "./proxy-wOAPFgvI.js";
function stopAnimation(visualElement) {
  visualElement.values.forEach((value) => value.stop());
}
function setVariants(visualElement, variantLabels) {
  const reversedLabels = [...variantLabels].reverse();
  reversedLabels.forEach((key) => {
    const variant = visualElement.getVariant(key);
    variant && setTarget(visualElement, variant);
    if (visualElement.variantChildren) {
      visualElement.variantChildren.forEach((child) => {
        setVariants(child, variantLabels);
      });
    }
  });
}
function setValues(visualElement, definition) {
  if (Array.isArray(definition)) {
    return setVariants(visualElement, definition);
  } else if (typeof definition === "string") {
    return setVariants(visualElement, [definition]);
  } else {
    setTarget(visualElement, definition);
  }
}
function animationControls() {
  const subscribers = /* @__PURE__ */ new Set();
  const controls = {
    subscribe(visualElement) {
      subscribers.add(visualElement);
      return () => void subscribers.delete(visualElement);
    },
    start(definition, transitionOverride) {
      const animations = [];
      subscribers.forEach((visualElement) => {
        animations.push(animateVisualElement(visualElement, definition, {
          transitionOverride
        }));
      });
      return Promise.all(animations);
    },
    set(definition) {
      return subscribers.forEach((visualElement) => {
        setValues(visualElement, definition);
      });
    },
    stop() {
      subscribers.forEach((visualElement) => {
        stopAnimation(visualElement);
      });
    },
    mount() {
      return () => {
        controls.stop();
      };
    }
  };
  return controls;
}
function useAnimationControls() {
  const controls = useConstant(animationControls);
  useIsomorphicLayoutEffect(controls.mount, []);
  return controls;
}
const useAnimation = useAnimationControls;
const thresholds = {
  some: 0,
  all: 1
};
function inView(elementOrSelector, onStart, { root, margin: rootMargin, amount = "some" } = {}) {
  const elements = resolveElements(elementOrSelector);
  const activeIntersections = /* @__PURE__ */ new WeakMap();
  const onIntersectionChange = (entries) => {
    entries.forEach((entry) => {
      const onEnd = activeIntersections.get(entry.target);
      if (entry.isIntersecting === Boolean(onEnd))
        return;
      if (entry.isIntersecting) {
        const newOnEnd = onStart(entry.target, entry);
        if (typeof newOnEnd === "function") {
          activeIntersections.set(entry.target, newOnEnd);
        } else {
          observer.unobserve(entry.target);
        }
      } else if (typeof onEnd === "function") {
        onEnd(entry);
        activeIntersections.delete(entry.target);
      }
    });
  };
  const observer = new IntersectionObserver(onIntersectionChange, {
    root,
    rootMargin,
    threshold: typeof amount === "number" ? amount : thresholds[amount]
  });
  elements.forEach((element) => observer.observe(element));
  return () => observer.disconnect();
}
function useInView(ref, { root, margin, amount, once = false, initial = false } = {}) {
  const [isInView, setInView] = reactExports.useState(initial);
  reactExports.useEffect(() => {
    if (!ref.current || once && isInView)
      return;
    const onEnter = () => {
      setInView(true);
      return once ? void 0 : () => setInView(false);
    };
    const options = {
      root: root && root.current || void 0,
      margin,
      amount
    };
    return inView(ref.current, onEnter, options);
  }, [root, ref, margin, once, amount]);
  return isInView;
}
const ORBIT_SATELLITES = [
  { label: "E-Com", angle: 30, orbitR: 110, color: "oklch(0.68 0.24 308)" },
  { label: "SaaS", angle: 150, orbitR: 155, color: "oklch(0.72 0.19 200)" },
  { label: "Health", angle: 270, orbitR: 110, color: "oklch(0.65 0.22 260)" },
  { label: "RE", angle: 60, orbitR: 200, color: "oklch(0.68 0.24 308)" },
  { label: "Fashion", angle: 200, orbitR: 200, color: "oklch(0.72 0.19 200)" }
];
const industries = [
  {
    title: "E-Commerce",
    description: "We engineer conversion machines for online brands — ROAS-optimised ad funnels, abandoned cart automation, and loyalty loops that turn buyers into brand advocates.",
    tags: ["Performance Ads", "Email Flows", "CRO", "Loyalty"],
    gradient: "from-primary/25 via-primary/10 to-transparent",
    glowColor: "oklch(0.68 0.24 308 / 0.35)",
    borderGlow: "hover:border-primary/40",
    isFeatured: true,
    caseStudy: {
      client: "LuxeBag Co.",
      result: "+340% organic traffic",
      detail: "6-month SEO + content blitz — from 8K to 35K monthly sessions.",
      metric1: { value: "340%", label: "Traffic lift" },
      metric2: { value: "4.8×", label: "ROAS" },
      metric3: { value: "62%", label: "Lower CAC" }
    }
  },
  {
    title: "SaaS & Tech",
    description: "Product-led growth, PLG motion, developer community building and conversion-optimised onboarding funnels that reduce time-to-value and slash churn.",
    tags: ["PLG Strategy", "Dev Marketing", "Onboarding", "Churn Ops"],
    gradient: "from-secondary/25 via-secondary/10 to-transparent",
    glowColor: "oklch(0.72 0.19 200 / 0.35)",
    borderGlow: "hover:border-secondary/40",
    isFeatured: true,
    caseStudy: {
      client: "Stackify SaaS",
      result: "+215% trial-to-paid",
      detail: "Rebuilt onboarding UX + email nurture — MRR doubled in 90 days.",
      metric1: { value: "215%", label: "Trial→Paid" },
      metric2: { value: "3×", label: "MRR growth" },
      metric3: { value: "41%", label: "Churn drop" }
    }
  },
  {
    title: "Healthcare",
    description: "HIPAA-aware content strategies, doctor-reputation marketing, and trust-first campaigns that grow patient volumes without compromising compliance.",
    tags: ["Content Authority", "Local SEO", "Patient Growth", "Compliance"],
    gradient: "from-accent/25 via-accent/10 to-transparent",
    glowColor: "oklch(0.65 0.22 260 / 0.35)",
    borderGlow: "hover:border-accent/40",
    isFeatured: true,
    caseStudy: {
      client: "WellnessFirst Clinics",
      result: "+190% patient enquiries",
      detail: "Google My Business + SEO overhaul led to 1,200 new bookings in Q1.",
      metric1: { value: "190%", label: "Enquiries" },
      metric2: { value: "5×", label: "GMB views" },
      metric3: { value: "38%", label: "Lower CPL" }
    }
  },
  {
    title: "Real Estate",
    description: "Hyper-targeted lead gen for developers and agencies — virtual tour campaigns, retargeting ladders, and visual storytelling that converts browsers to buyers.",
    tags: ["Lead Gen", "Virtual Tours", "Social Ads", "Content"],
    gradient: "from-primary/20 via-accent/10 to-transparent",
    glowColor: "oklch(0.68 0.24 308 / 0.25)",
    borderGlow: "hover:border-primary/30",
    isFeatured: false,
    caseStudy: null
  },
  {
    title: "Education",
    description: "Enrollment funnels, student-retention playbooks, and video marketing that help institutions fill seats and EdTech platforms grow active learners.",
    tags: ["Enrollment", "Retention", "Video", "Landing Pages"],
    gradient: "from-secondary/20 via-primary/10 to-transparent",
    glowColor: "oklch(0.72 0.19 200 / 0.25)",
    borderGlow: "hover:border-secondary/30",
    isFeatured: false,
    caseStudy: null
  },
  {
    title: "Travel & Hospitality",
    description: "Craveable content, reputation management, and local-discovery campaigns that fill tables, hotel rooms, and booking calendars all year round.",
    tags: ["Local SEO", "Reputation", "Influencer", "Seasonal Campaigns"],
    gradient: "from-accent/20 via-secondary/10 to-transparent",
    glowColor: "oklch(0.65 0.22 260 / 0.25)",
    borderGlow: "hover:border-accent/30",
    isFeatured: false,
    caseStudy: null
  },
  {
    title: "Fashion & Lifestyle",
    description: "Culturally sharp brand storytelling, influencer programmes, and editorial content strategies that make lifestyle brands impossible to scroll past.",
    tags: ["Brand Story", "Influencers", "Editorial", "Social Commerce"],
    gradient: "from-primary/20 via-secondary/10 to-transparent",
    glowColor: "oklch(0.68 0.24 308 / 0.25)",
    borderGlow: "hover:border-primary/30",
    isFeatured: false,
    caseStudy: null
  },
  {
    title: "Coaching & Consulting",
    description: "Personal brand elevation, thought leadership campaigns, and client acquisition funnels for experts who are ready to scale their influence and income.",
    tags: ["Personal Brand", "Lead Gen", "Content", "Funnels"],
    gradient: "from-secondary/20 via-accent/10 to-transparent",
    glowColor: "oklch(0.72 0.19 200 / 0.25)",
    borderGlow: "hover:border-secondary/30",
    isFeatured: false,
    caseStudy: null
  }
];
const statsData = [
  { value: 50, suffix: "+", label: "Brands Served" },
  { value: 12, suffix: "", label: "Industries" },
  { value: 10, suffix: "M+", label: "Revenue Driven", prefix: "$" },
  { value: 340, suffix: "%", label: "Avg Traffic Lift" }
];
function OrbitRing({
  radius,
  duration,
  delay,
  dotSize,
  dotColor,
  opacity,
  clockwise = true
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "absolute top-1/2 left-1/2 rounded-full border border-white/5",
      style: {
        width: radius * 2,
        height: radius * 2,
        marginLeft: -radius,
        marginTop: -radius,
        opacity
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 rounded-full",
            style: {
              background: `radial-gradient(ellipse at center, transparent 60%, ${dotColor} 100%)`,
              opacity: 0.08
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "absolute rounded-full",
            style: {
              width: dotSize,
              height: dotSize,
              background: dotColor,
              boxShadow: `0 0 ${dotSize * 3}px ${dotColor}, 0 0 ${dotSize * 6}px ${dotColor}`,
              top: -dotSize / 2,
              left: "50%",
              marginLeft: -dotSize / 2,
              transformOrigin: `0 calc(${radius}px + ${dotSize / 2}px)`
            },
            animate: { rotate: clockwise ? 360 : -360 },
            transition: {
              duration,
              delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear"
            }
          }
        )
      ]
    }
  );
}
function HeroOrbitVisual() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full h-full flex items-center justify-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute w-20 h-20 rounded-full bg-primary/30 blur-xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute w-12 h-12 rounded-full bg-secondary/40 blur-lg" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute w-6 h-6 rounded-full bg-accent/60 blur-md" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 w-16 h-16 rounded-2xl glassmorphic flex items-center justify-center border-primary/30 glow-neon", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-black text-2xl gradient-text-purple", children: "M" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      OrbitRing,
      {
        radius: 70,
        duration: 6,
        delay: 0,
        dotSize: 8,
        dotColor: "oklch(0.68 0.24 308)",
        opacity: 0.8,
        clockwise: true
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      OrbitRing,
      {
        radius: 110,
        duration: 10,
        delay: -2,
        dotSize: 6,
        dotColor: "oklch(0.72 0.19 200)",
        opacity: 0.65,
        clockwise: false
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      OrbitRing,
      {
        radius: 155,
        duration: 15,
        delay: -5,
        dotSize: 10,
        dotColor: "oklch(0.65 0.22 260)",
        opacity: 0.5,
        clockwise: true
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      OrbitRing,
      {
        radius: 200,
        duration: 22,
        delay: -8,
        dotSize: 5,
        dotColor: "oklch(0.68 0.24 308)",
        opacity: 0.35,
        clockwise: false
      }
    ),
    ORBIT_SATELLITES.map(({ label, angle, orbitR, color }, i) => {
      const rad = angle * Math.PI / 180;
      const x = Math.cos(rad) * orbitR;
      const y = Math.sin(rad) * orbitR;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "absolute",
          style: {
            left: "50%",
            top: "50%",
            marginLeft: x - 14,
            marginTop: y - 14
          },
          animate: { scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] },
          transition: {
            duration: 3 + i * 0.7,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.5,
            ease: "easeInOut"
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-8 h-7 rounded-lg flex items-center justify-center glassmorphic-dark",
              style: {
                borderColor: color,
                boxShadow: `0 0 10px ${color}`,
                border: `1px solid ${color}`
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "font-mono font-bold text-[9px] uppercase tracking-wider leading-none",
                  style: { color },
                  children: label
                }
              )
            }
          )
        },
        label
      );
    })
  ] });
}
function AnimatedCounter({
  value,
  suffix = "",
  prefix = ""
}) {
  const [count, setCount] = reactExports.useState(0);
  const ref = reactExports.useRef(null);
  const inView2 = useInView(ref, { once: true, margin: "-80px" });
  reactExports.useEffect(() => {
    if (!inView2) return;
    let start = 0;
    const duration = 1800;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView2, value]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { ref, children: [
    prefix,
    count,
    suffix
  ] });
}
function StatsBar() {
  const { ref, style } = useRevealOnScroll(0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref,
      style,
      className: "relative glass-card rounded-2xl p-8 overflow-hidden",
      "data-ocid": "stats-bar",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -left-12 top-0 w-48 h-full bg-primary/10 blur-3xl pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-12 top-0 w-48 h-full bg-secondary/10 blur-3xl pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8", children: statsData.map(({ value, suffix, label, prefix }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "text-center",
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: i * 0.12, duration: 0.5 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-3xl md:text-4xl gradient-text-purple mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                AnimatedCounter,
                {
                  value,
                  suffix,
                  prefix: prefix ?? ""
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: label })
            ]
          },
          label
        )) })
      ]
    }
  );
}
function IndustryCard({
  industry,
  index
}) {
  const { ref, style } = useRevealOnScroll(index * 70);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref,
      style,
      "data-ocid": `industry.item.${index + 1}`,
      className: `group relative glass-card ${industry.borderGlow} p-6 transition-smooth card-hover overflow-hidden`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `absolute inset-0 bg-gradient-to-br ${industry.gradient} opacity-0 group-hover:opacity-100 transition-smooth rounded-lg`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none",
            style: { boxShadow: `inset 0 0 40px ${industry.glowColor}` }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg text-foreground mb-2", children: industry.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-4", children: industry.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: industry.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag-label text-[10px]", children: tag }, tag)) })
        ] })
      ]
    }
  );
}
function FeaturedCard({
  industry,
  index
}) {
  const { ref, style } = useRevealOnScroll(index * 90);
  const cs = industry.caseStudy;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref,
      style,
      "data-ocid": `featured-industry.item.${index + 1}`,
      className: `group relative glass-card ${industry.borderGlow} overflow-hidden transition-smooth card-hover`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `absolute inset-0 bg-gradient-to-br ${industry.gradient} opacity-60`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-smooth",
            style: { background: industry.glowColor }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 p-7", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-xl text-foreground", children: industry.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: cs.client })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "ml-auto tag-label",
                style: {
                  background: `${industry.glowColor}`,
                  borderColor: "transparent",
                  color: "white"
                },
                children: "Featured"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-5", children: industry.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-xl p-4 mb-5 bg-card/80 dark:bg-black/30 border",
              style: { borderColor: industry.glowColor },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-widest mb-1", children: "Case Study" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-base text-foreground mb-1", children: cs.result }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: cs.detail })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 mb-5", children: [cs.metric1, cs.metric2, cs.metric3].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-xl gradient-text-purple", children: m.value }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: m.label })
          ] }, m.label)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: industry.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag-label text-[10px]", children: tag }, tag)) })
        ] })
      ]
    }
  );
}
function Industries() {
  const { ref: titleRef, style: titleStyle } = useRevealOnScroll(0);
  const controls = useAnimation();
  const heroRef = reactExports.useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  reactExports.useEffect(() => {
    if (heroInView) controls.start("visible");
  }, [heroInView, controls]);
  const featuredIndustries = industries.filter((i) => i.isFeatured);
  const standardIndustries = industries.filter((i) => !i.isFeatured);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative pt-20 sm:pt-24 pb-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid-glow-bg opacity-40" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-1/4 w-96 h-96 bg-primary/6 rounded-full blur-[120px] pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-1/4 w-80 h-80 bg-secondary/6 rounded-full blur-[100px] pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-40 left-10 w-64 h-64 bg-accent/5 rounded-full blur-[80px] pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          ref: heroRef,
          className: "grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center mb-16 sm:mb-24",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                ref: titleRef,
                style: titleStyle,
                variants: {
                  hidden: { opacity: 0, x: -40 },
                  visible: { opacity: 1, x: 0 }
                },
                initial: "hidden",
                animate: controls,
                transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag-label mb-4 inline-flex", children: "Industries We Serve" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-5xl md:text-6xl text-foreground leading-[1.1] mb-6 mt-3", children: [
                    "Built for Every",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-cyan", children: "Vertical" }),
                    ", ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-purple", children: "Mastered" }),
                    " for Yours"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg leading-relaxed mb-8 max-w-lg", children: "We don't believe in copy-paste playbooks. Each industry has its own dynamics, audience psychology, and growth levers — and we've mapped all of them." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "lg",
                        className: "btn-primary border-0",
                        "data-ocid": "hero-cta-contact",
                        children: "Start with Your Industry"
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/case-studies", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "lg",
                        variant: "outline",
                        className: "border-border/60 bg-card text-foreground hover:bg-muted hover:border-primary/30 transition-smooth px-8",
                        "data-ocid": "hero-cta-cases",
                        children: "View Case Studies"
                      }
                    ) })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                className: "relative h-[280px] sm:h-[420px] flex items-center justify-center",
                initial: { opacity: 0, scale: 0.85 },
                animate: heroInView ? { opacity: 1, scale: 1 } : {},
                transition: {
                  duration: 0.9,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: 0.2
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeroOrbitVisual, {})
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-16 sm:mb-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatsBar, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "mb-10",
            initial: { opacity: 0, y: 24 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.6 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "tag-label mb-4 inline-flex",
                  style: {
                    background: "oklch(var(--secondary)/0.1)",
                    color: "oklch(var(--secondary))",
                    borderColor: "oklch(var(--secondary)/0.25)"
                  },
                  children: "Proven Results"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl md:text-4xl text-foreground mt-3 mb-2", children: "Deep-Dive Industries" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2 max-w-xl", children: "Three verticals where we've driven extraordinary outcomes — with real numbers." })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6", children: featuredIndustries.map((industry, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          FeaturedCard,
          {
            industry,
            index: i
          },
          industry.title
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divider-premium mb-16" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-24", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "mb-10",
            initial: { opacity: 0, y: 24 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.6 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag-label mb-4 inline-flex", children: "All Verticals" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl md:text-4xl text-foreground mt-3", children: "Every Industry, One Agency" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5", children: standardIndustries.map((industry, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          IndustryCard,
          {
            industry,
            index: i
          },
          industry.title
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "relative glass-card rounded-3xl overflow-hidden p-6 sm:p-12 text-center",
          initial: { opacity: 0, y: 32 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.7 },
          "data-ocid": "industries-cta",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-40 bg-primary/15 rounded-full blur-3xl" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-10 left-1/3 w-60 h-32 bg-secondary/10 rounded-full blur-3xl" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag-label mb-4 inline-flex", children: "Your Industry" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-4xl md:text-5xl text-foreground mb-4 mt-3", children: [
                "Is your industry here?",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-purple", children: "Let's talk." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg mb-8 max-w-xl mx-auto", children: "Even if your vertical isn't listed, we're fast learners with a process built for any market. Tell us about your growth challenge." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4 justify-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "lg",
                    className: "btn-primary border-0 px-10",
                    "data-ocid": "cta-contact-button",
                    children: "Book a Strategy Call"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/case-studies", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "lg",
                    variant: "outline",
                    className: "border-primary/30 bg-primary/5 text-foreground hover:bg-primary/10 transition-smooth px-10",
                    "data-ocid": "cta-cases-button",
                    children: "See All Case Studies"
                  }
                ) })
              ] })
            ] })
          ]
        }
      )
    ] })
  ] });
}
export {
  Industries
};
