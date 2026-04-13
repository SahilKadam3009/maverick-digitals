import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, L as Link, B as Button, Z as Zap } from "./index-CkDoOixv.js";
import { B as Badge } from "./badge-BWY9aCll.js";
import { u as useRevealOnScroll } from "./useIntersectionObserver-0NrDPXfO.js";
import { M as MotionConfigContext, i as isHTMLElement, u as useConstant, P as PresenceContext, c as usePresence, b as useIsomorphicLayoutEffect, L as LayoutGroupContext, m as motion } from "./proxy-D-kw7GND.js";
import { A as ArrowRight } from "./arrow-right-DoFOMOxd.js";
import { T as TrendingUp } from "./trending-up-BiPoeDkC.js";
import { E as ExternalLink } from "./external-link-BzhqfznA.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "6", key: "1vlfrh" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
];
const Target = createLucideIcon("target", __iconNode);
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup === "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup === "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
function useComposedRefs(...refs) {
  return reactExports.useCallback(composeRefs(...refs), refs);
}
class PopChildMeasure extends reactExports.Component {
  getSnapshotBeforeUpdate(prevProps) {
    const element = this.props.childRef.current;
    if (isHTMLElement(element) && prevProps.isPresent && !this.props.isPresent && this.props.pop !== false) {
      const parent = element.offsetParent;
      const parentWidth = isHTMLElement(parent) ? parent.offsetWidth || 0 : 0;
      const parentHeight = isHTMLElement(parent) ? parent.offsetHeight || 0 : 0;
      const computedStyle = getComputedStyle(element);
      const size = this.props.sizeRef.current;
      size.height = parseFloat(computedStyle.height);
      size.width = parseFloat(computedStyle.width);
      size.top = element.offsetTop;
      size.left = element.offsetLeft;
      size.right = parentWidth - size.width - size.left;
      size.bottom = parentHeight - size.height - size.top;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function PopChild({ children, isPresent, anchorX, anchorY, root, pop }) {
  var _a;
  const id = reactExports.useId();
  const ref = reactExports.useRef(null);
  const size = reactExports.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  });
  const { nonce } = reactExports.useContext(MotionConfigContext);
  const childRef = ((_a = children.props) == null ? void 0 : _a.ref) ?? (children == null ? void 0 : children.ref);
  const composedRef = useComposedRefs(ref, childRef);
  reactExports.useInsertionEffect(() => {
    const { width, height, top, left, right, bottom } = size.current;
    if (isPresent || pop === false || !ref.current || !width || !height)
      return;
    const x = anchorX === "left" ? `left: ${left}` : `right: ${right}`;
    const y = anchorY === "bottom" ? `bottom: ${bottom}` : `top: ${top}`;
    ref.current.dataset.motionPopId = id;
    const style = document.createElement("style");
    if (nonce)
      style.nonce = nonce;
    const parent = root ?? document.head;
    parent.appendChild(style);
    if (style.sheet) {
      style.sheet.insertRule(`
          [data-motion-pop-id="${id}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            ${x}px !important;
            ${y}px !important;
          }
        `);
    }
    return () => {
      var _a2;
      (_a2 = ref.current) == null ? void 0 : _a2.removeAttribute("data-motion-pop-id");
      if (parent.contains(style)) {
        parent.removeChild(style);
      }
    };
  }, [isPresent]);
  return jsxRuntimeExports.jsx(PopChildMeasure, { isPresent, childRef: ref, sizeRef: size, pop, children: pop === false ? children : reactExports.cloneElement(children, { ref: composedRef }) });
}
const PresenceChild = ({ children, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode, anchorX, anchorY, root }) => {
  const presenceChildren = useConstant(newChildrenMap);
  const id = reactExports.useId();
  let isReusedContext = true;
  let context = reactExports.useMemo(() => {
    isReusedContext = false;
    return {
      id,
      initial,
      isPresent,
      custom,
      onExitComplete: (childId) => {
        presenceChildren.set(childId, true);
        for (const isComplete of presenceChildren.values()) {
          if (!isComplete)
            return;
        }
        onExitComplete && onExitComplete();
      },
      register: (childId) => {
        presenceChildren.set(childId, false);
        return () => presenceChildren.delete(childId);
      }
    };
  }, [isPresent, presenceChildren, onExitComplete]);
  if (presenceAffectsLayout && isReusedContext) {
    context = { ...context };
  }
  reactExports.useMemo(() => {
    presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
  }, [isPresent]);
  reactExports.useEffect(() => {
    !isPresent && !presenceChildren.size && onExitComplete && onExitComplete();
  }, [isPresent]);
  children = jsxRuntimeExports.jsx(PopChild, { pop: mode === "popLayout", isPresent, anchorX, anchorY, root, children });
  return jsxRuntimeExports.jsx(PresenceContext.Provider, { value: context, children });
};
function newChildrenMap() {
  return /* @__PURE__ */ new Map();
}
const getChildKey = (child) => child.key || "";
function onlyElements(children) {
  const filtered = [];
  reactExports.Children.forEach(children, (child) => {
    if (reactExports.isValidElement(child))
      filtered.push(child);
  });
  return filtered;
}
const AnimatePresence = ({ children, custom, initial = true, onExitComplete, presenceAffectsLayout = true, mode = "sync", propagate = false, anchorX = "left", anchorY = "top", root }) => {
  const [isParentPresent, safeToRemove] = usePresence(propagate);
  const presentChildren = reactExports.useMemo(() => onlyElements(children), [children]);
  const presentKeys = propagate && !isParentPresent ? [] : presentChildren.map(getChildKey);
  const isInitialRender = reactExports.useRef(true);
  const pendingPresentChildren = reactExports.useRef(presentChildren);
  const exitComplete = useConstant(() => /* @__PURE__ */ new Map());
  const exitingComponents = reactExports.useRef(/* @__PURE__ */ new Set());
  const [diffedChildren, setDiffedChildren] = reactExports.useState(presentChildren);
  const [renderedChildren, setRenderedChildren] = reactExports.useState(presentChildren);
  useIsomorphicLayoutEffect(() => {
    isInitialRender.current = false;
    pendingPresentChildren.current = presentChildren;
    for (let i = 0; i < renderedChildren.length; i++) {
      const key = getChildKey(renderedChildren[i]);
      if (!presentKeys.includes(key)) {
        if (exitComplete.get(key) !== true) {
          exitComplete.set(key, false);
        }
      } else {
        exitComplete.delete(key);
        exitingComponents.current.delete(key);
      }
    }
  }, [renderedChildren, presentKeys.length, presentKeys.join("-")]);
  const exitingChildren = [];
  if (presentChildren !== diffedChildren) {
    let nextChildren = [...presentChildren];
    for (let i = 0; i < renderedChildren.length; i++) {
      const child = renderedChildren[i];
      const key = getChildKey(child);
      if (!presentKeys.includes(key)) {
        nextChildren.splice(i, 0, child);
        exitingChildren.push(child);
      }
    }
    if (mode === "wait" && exitingChildren.length) {
      nextChildren = exitingChildren;
    }
    setRenderedChildren(onlyElements(nextChildren));
    setDiffedChildren(presentChildren);
    return null;
  }
  const { forceRender } = reactExports.useContext(LayoutGroupContext);
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: renderedChildren.map((child) => {
    const key = getChildKey(child);
    const isPresent = propagate && !isParentPresent ? false : presentChildren === renderedChildren || presentKeys.includes(key);
    const onExit = () => {
      if (exitingComponents.current.has(key)) {
        return;
      }
      if (exitComplete.has(key)) {
        exitingComponents.current.add(key);
        exitComplete.set(key, true);
      } else {
        return;
      }
      let isEveryExitComplete = true;
      exitComplete.forEach((isExitComplete) => {
        if (!isExitComplete)
          isEveryExitComplete = false;
      });
      if (isEveryExitComplete) {
        forceRender == null ? void 0 : forceRender();
        setRenderedChildren(pendingPresentChildren.current);
        propagate && (safeToRemove == null ? void 0 : safeToRemove());
        onExitComplete && onExitComplete();
      }
    };
    return jsxRuntimeExports.jsx(PresenceChild, { isPresent, initial: !isInitialRender.current || initial ? void 0 : false, custom, presenceAffectsLayout, mode, root, onExitComplete: isPresent ? void 0 : onExit, anchorX, anchorY, children: child }, key);
  }) });
};
const caseStudies = [
  {
    id: "techflow-saas",
    client: "TechFlow SaaS",
    industry: "Technology",
    headline: "+340% Organic Traffic in 8 Months",
    challenge: "Invisible in search despite superior product",
    solution: "Full-funnel SEO architecture & topical authority build",
    result: "Dominating 1,200+ keywords; organic now #1 acquisition channel",
    kpi: "+340%",
    categories: ["SEO", "Growth"],
    color: "purple",
    imageGradient: "from-primary/30 via-accent/20 to-secondary/20",
    metrics: [
      { label: "Organic Traffic", value: "+340%" },
      { label: "Keywords Ranked", value: "1,200+" },
      { label: "Revenue via SEO", value: "$2.1M" }
    ],
    featured: true
  },
  {
    id: "stylehouse-fashion",
    client: "StyleHouse Fashion",
    industry: "E-Commerce",
    headline: "+5x ROAS on Paid Media Channels",
    challenge: "Burning budget with below-average return on ad spend",
    solution: "Creative-led campaign overhaul with precision audience targeting",
    result: "5x ROAS across Meta, Google & TikTok within 60 days",
    kpi: "5x ROAS",
    categories: ["Paid Media", "Growth"],
    color: "cyan",
    imageGradient: "from-secondary/30 via-primary/15 to-accent/20",
    metrics: [
      { label: "ROAS", value: "5x" },
      { label: "Revenue Uplift", value: "+190%" },
      { label: "New Customers", value: "+18K" }
    ]
  },
  {
    id: "medicare-app",
    client: "MediCare App",
    industry: "Health & Wellness",
    headline: "2x Conversion Rate — From Visitor to Patient",
    challenge: "High traffic but razor-thin conversion to booked appointments",
    solution: "Landing page redesign, trust-building content & retargeting flows",
    result: "Doubled CVR; 4,000+ monthly appointments booked through digital",
    kpi: "2x CVR",
    categories: ["Growth", "Paid Media"],
    color: "blue",
    imageGradient: "from-accent/30 via-secondary/20 to-primary/15",
    metrics: [
      { label: "Conversion Rate", value: "2x" },
      { label: "Monthly Bookings", value: "+4,000" },
      { label: "CAC Drop", value: "-52%" }
    ]
  },
  {
    id: "growthos",
    client: "GrowthOS",
    industry: "B2B SaaS",
    headline: "3M Impressions & 40K Followers in 90 Days",
    challenge: "Zero brand presence in a crowded B2B software space",
    solution: "Thought leadership strategy, LinkedIn content engine & personal branding",
    result: "3M organic impressions; inbound pipeline grew 220%",
    kpi: "3M Impressions",
    categories: ["Brand Strategy", "Social Media"],
    color: "purple",
    imageGradient: "from-primary/20 via-accent/25 to-secondary/20",
    metrics: [
      { label: "Organic Impressions", value: "3M" },
      { label: "Followers Gained", value: "+40K" },
      { label: "Pipeline Growth", value: "+220%" }
    ]
  },
  {
    id: "edupro",
    client: "EduPro Learning",
    industry: "EdTech",
    headline: "60% Increase in Course Enrollment Leads",
    challenge: "Expensive paid acquisition with high drop-off at sign-up",
    solution: "SEO content funnels + email nurture sequences rebuilt from scratch",
    result: "60% more leads at 35% lower cost; 4.2x email open rate",
    kpi: "+60% Leads",
    categories: ["SEO", "Growth", "Brand Strategy"],
    color: "cyan",
    imageGradient: "from-secondary/25 via-accent/15 to-primary/20",
    metrics: [
      { label: "Lead Volume", value: "+60%" },
      { label: "Cost Per Lead", value: "-35%" },
      { label: "Email Open Rate", value: "4.2x" }
    ]
  },
  {
    id: "retailx",
    client: "RetailX",
    industry: "Retail",
    headline: "280% Revenue Growth Through Social Commerce",
    challenge: "Brick-and-mortar brand struggling to convert online audiences",
    solution: "Social commerce strategy across Instagram, TikTok & YouTube",
    result: "280% revenue uplift from social within 6 months",
    kpi: "+280% Revenue",
    categories: ["Social Media", "Paid Media"],
    color: "blue",
    imageGradient: "from-accent/25 via-primary/20 to-secondary/25",
    metrics: [
      { label: "Revenue Growth", value: "+280%" },
      { label: "Social Sales", value: "$900K+" },
      { label: "Video Views", value: "12M" }
    ]
  }
];
const filters = [
  "All",
  "SEO",
  "Paid Media",
  "Brand Strategy",
  "Social Media",
  "Growth"
];
const colorMap = {
  purple: {
    glow: "glow-neon",
    badge: "bg-primary/15 border-primary/30 text-primary",
    metric: "gradient-text-purple",
    tag: "bg-primary/10 border-primary/20 text-primary",
    dot: "bg-primary"
  },
  cyan: {
    glow: "glow-cyan",
    badge: "bg-secondary/15 border-secondary/30 text-secondary",
    metric: "gradient-text-cyan",
    tag: "bg-secondary/10 border-secondary/20 text-secondary",
    dot: "bg-secondary"
  },
  blue: {
    glow: "",
    badge: "bg-accent/15 border-accent/30 text-accent-foreground",
    metric: "gradient-text-purple",
    tag: "bg-accent/10 border-accent/20 text-accent-foreground",
    dot: "bg-accent"
  }
};
const purpleParticles = [
  { id: "pp1", left: "5%", top: "10%", dur: 3, delay: 0 },
  { id: "pp2", left: "42%", top: "63%", dur: 4, delay: 0.3 },
  { id: "pp3", left: "79%", top: "16%", dur: 5, delay: 0.6 },
  { id: "pp4", left: "16%", top: "82%", dur: 3, delay: 0.9 },
  { id: "pp5", left: "53%", top: "36%", dur: 6, delay: 1.2 },
  { id: "pp6", left: "88%", top: "54%", dur: 4, delay: 0.15 },
  { id: "pp7", left: "31%", top: "27%", dur: 5, delay: 0.45 },
  { id: "pp8", left: "67%", top: "71%", dur: 3, delay: 0.75 }
];
const cyanParticles = [
  { id: "cp1", left: "20%", top: "30%", dur: 4, delay: 0 },
  { id: "cp2", left: "87%", top: "73%", dur: 5, delay: 0.5 },
  { id: "cp3", left: "54%", top: "15%", dur: 6, delay: 1 },
  { id: "cp4", left: "9%", top: "60%", dur: 4, delay: 1.5 }
];
function HeroParticles() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 overflow-hidden pointer-events-none", children: [
    purpleParticles.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "absolute w-1 h-1 rounded-full bg-primary/40",
        style: { left: p.left, top: p.top },
        animate: {
          y: [0, -30, 0],
          opacity: [0.2, 0.7, 0.2],
          scale: [1, 1.5, 1]
        },
        transition: {
          duration: p.dur,
          repeat: Number.POSITIVE_INFINITY,
          delay: p.delay,
          ease: "easeInOut"
        }
      },
      p.id
    )),
    cyanParticles.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "absolute w-1.5 h-1.5 rounded-full bg-secondary/30",
        style: { left: p.left, top: p.top },
        animate: { y: [0, 25, 0], opacity: [0.15, 0.5, 0.15] },
        transition: {
          duration: p.dur,
          repeat: Number.POSITIVE_INFINITY,
          delay: p.delay,
          ease: "easeInOut"
        }
      },
      p.id
    ))
  ] });
}
function FeaturedCard({ study }) {
  const { ref, style } = useRevealOnScroll(0);
  const colors = colorMap[study.color];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref,
      style,
      className: "relative overflow-hidden rounded-2xl border border-white/10 mb-14",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `absolute inset-0 bg-gradient-to-br ${study.imageGradient}`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid-glow-bg opacity-20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-card/60 backdrop-blur-sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative p-8 md:p-12 flex flex-col md:flex-row gap-8 items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${colors.badge}`,
                  children: "Featured Case Study"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "secondary",
                  className: "bg-white/8 border-white/15 text-muted-foreground text-xs",
                  children: study.industry
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm font-medium mb-2", children: study.client }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl md:text-4xl text-foreground leading-tight mb-4", children: study.headline }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-6 max-w-xl", children: study.result }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3 mb-6", children: study.categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-xs px-2.5 py-1 rounded-full border ${colors.tag}`,
                children: cat
              },
              cat
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-smooth group/link",
                "data-ocid": "featured-case-cta",
                children: [
                  "Read Full Case Study",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ArrowRight,
                    {
                      size: 14,
                      className: "group-hover/link:translate-x-1 transition-smooth"
                    }
                  )
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3 md:min-w-[220px]", children: study.metrics.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: 20 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true },
              transition: { delay: 0.2 + i * 0.12, duration: 0.5 },
              className: "glassmorphic-dark px-5 py-4 flex flex-col items-center text-center rounded-xl border border-white/10",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `font-display font-bold text-2xl ${colors.metric}`,
                    children: m.value
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground mt-1", children: m.label })
              ]
            },
            m.label
          )) })
        ] })
      ]
    }
  );
}
function CaseStudyCard({
  study,
  index
}) {
  const { ref, style } = useRevealOnScroll(index * 100);
  const colors = colorMap[study.color];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      ref,
      style,
      whileHover: { y: -6 },
      transition: { type: "spring", stiffness: 300, damping: 25 },
      className: "group glassmorphic border-white/10 hover:border-primary/25 overflow-hidden transition-colors duration-300 flex flex-col",
      "data-ocid": `case-card-${study.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `relative h-44 bg-gradient-to-br ${study.imageGradient} p-6 flex flex-col justify-end overflow-hidden`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid-glow-bg opacity-25" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  className: "absolute top-4 right-6 w-16 h-16 rounded-full blur-2xl",
                  style: { background: "oklch(var(--primary) / 0.25)" },
                  animate: { scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] },
                  transition: {
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-display font-black text-3xl ${colors.metric}`, children: study.kpi }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center gap-2 mt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "secondary",
                    className: "bg-black/40 text-foreground border-white/15 text-xs",
                    children: study.industry
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: study.client })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 flex flex-col flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg text-foreground mb-3 leading-tight", children: study.headline }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5 mb-5 flex-1", children: [
            { icon: Target, label: "Challenge", text: study.challenge },
            { icon: Zap, label: "Solution", text: study.solution },
            { icon: TrendingUp, label: "Result", text: study.result }
          ].map(({ icon: Icon, label, text }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2.5 items-start", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 ${colors.tag}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 11 })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: [
                label,
                ":",
                " "
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-foreground/80", children: text })
            ] })
          ] }, label)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2 mb-5", children: study.metrics.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-center p-2.5 rounded-lg bg-white/5 border border-white/8",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `font-display font-bold text-base ${colors.metric}`,
                    children: m.value
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground mt-0.5 leading-tight", children: m.label })
              ]
            },
            m.label
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mb-4", children: study.categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `text-[10px] px-2 py-0.5 rounded-full border ${colors.tag}`,
              children: cat
            },
            cat
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: "flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-smooth group/link mt-auto",
              "data-ocid": `case-cta-${study.id}`,
              children: [
                "View Full Case",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ExternalLink,
                  {
                    size: 12,
                    className: "group-hover/link:translate-x-0.5 transition-smooth"
                  }
                )
              ]
            }
          )
        ] })
      ]
    }
  );
}
function FilterPill({
  label,
  active,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.button,
    {
      type: "button",
      onClick,
      whileHover: { scale: 1.04 },
      whileTap: { scale: 0.97 },
      "data-ocid": `filter-${label.toLowerCase().replace(/\s/g, "-")}`,
      className: `relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${active ? "border-primary/50 text-foreground" : "border-white/10 text-muted-foreground hover:border-white/25 hover:text-foreground"}`,
      children: [
        active && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.span,
          {
            layoutId: "filter-pill-bg",
            className: "absolute inset-0 rounded-full gradient-neon-purple opacity-20",
            transition: { type: "spring", stiffness: 400, damping: 35 }
          }
        ),
        label
      ]
    }
  );
}
function HeroSection() {
  const { ref, style } = useRevealOnScroll(0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative min-h-[56vh] flex items-center justify-center overflow-hidden pt-28 pb-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid-glow-bg opacity-40" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-1/4 w-[500px] h-[400px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 right-1/4 w-[400px] h-[350px] bg-secondary/6 rounded-full blur-[100px] pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeroParticles, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "absolute inset-0 pointer-events-none",
        style: {
          background: "linear-gradient(to bottom, transparent 40%, oklch(var(--primary) / 0.03) 50%, transparent 60%)"
        },
        animate: { y: [-100, 100] },
        transition: {
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear"
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        ref,
        style,
        className: "relative max-w-4xl mx-auto px-6 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: -10 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6 },
              className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 mb-6",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary animate-pulse" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-primary uppercase tracking-widest", children: "Case Studies" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.h1,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.7, delay: 0.1 },
              className: "font-display font-black text-6xl md:text-7xl lg:text-8xl text-foreground leading-[0.9] tracking-tight mb-6",
              children: [
                "Our Work",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block gradient-text-purple mt-1", children: "Speaks." })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.7, delay: 0.2 },
              className: "text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10",
              children: "Real clients, real results, real growth. Every number below is a strategy executed, a market won, and a brand transformed."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.7, delay: 0.35 },
              className: "inline-flex flex-wrap gap-6 justify-center",
              children: [
                { val: "120+", label: "Projects Delivered" },
                { val: "6 Industries", label: "Across Verticals" },
                { val: "3.2x Avg ROI", label: "Client Average" }
              ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-2xl gradient-text-purple", children: s.val }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-0.5", children: s.label })
              ] }, s.val))
            }
          )
        ]
      }
    )
  ] });
}
function CaseStudies() {
  const [activeFilter, setActiveFilter] = reactExports.useState("All");
  const { ref: gridRef, style: gridStyle } = useRevealOnScroll(0);
  const featured = caseStudies.find((c) => c.featured);
  const filteredStudies = caseStudies.filter((c) => {
    if (activeFilter === "All") return true;
    return c.categories.includes(activeFilter);
  });
  const showFeatured = activeFilter === "All";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative bg-background min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeroSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-7xl mx-auto px-6 pb-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          className: "flex flex-wrap gap-2 justify-center mb-14",
          "data-ocid": "filter-bar",
          children: filters.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            FilterPill,
            {
              label: f,
              active: activeFilter === f,
              onClick: () => setActiveFilter(f)
            },
            f
          ))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: showFeatured && /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -10 },
          transition: { duration: 0.4 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(FeaturedCard, { study: featured })
        },
        "featured"
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground", children: activeFilter === "All" ? "All Case Studies" : `${activeFilter} Results` }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
          filteredStudies.length,
          " ",
          filteredStudies.length === 1 ? "project" : "projects"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          ref: gridRef,
          style: gridStyle,
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration: 0.3 },
          className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16",
          "data-ocid": "case-studies-grid",
          children: (showFeatured ? caseStudies.filter((c) => !c.featured) : filteredStudies).map((study, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(CaseStudyCard, { study, index: i }, study.id))
        },
        activeFilter
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.6 },
          className: "relative rounded-2xl overflow-hidden",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/15 via-accent/10 to-secondary/10" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid-glow-bg opacity-20" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative px-8 md:px-16 py-12 md:py-16 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary text-sm font-semibold uppercase tracking-widest mb-4", children: "Ready to be next?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-black text-4xl md:text-5xl text-foreground mb-4 leading-tight", children: [
                "Let's Build Your",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-purple", children: "Success Story" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg mb-8 max-w-xl mx-auto", children: "Join 120+ brands that trusted Maverick Digitals to transform their digital presence into real, measurable growth." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "lg",
                  className: "gradient-neon-purple text-background font-bold glow-neon hover:scale-105 transition-smooth border-0 px-10 h-13 text-base",
                  "data-ocid": "cta-start-project",
                  children: [
                    "Start Your Project",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 17, className: "ml-2" })
                  ]
                }
              ) })
            ] })
          ]
        }
      )
    ] })
  ] });
}
export {
  CaseStudies
};
