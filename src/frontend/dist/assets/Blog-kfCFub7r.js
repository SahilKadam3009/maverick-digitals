import { c as createLucideIcon, j as jsxRuntimeExports, b as cn, r as reactExports, L as Link } from "./index-CoLZQLh7.js";
import { B as Badge } from "./badge-BWW2puAo.js";
import { I as Input } from "./input-BuClWU59.js";
import { u as useRevealOnScroll } from "./useIntersectionObserver-BEjl6EHn.js";
import { u as useGetBlogArticles, a as useSearchBlogArticles } from "./useQueries-D7oTHt-1.js";
import { S as Search } from "./search-o-ss95iO.js";
import { A as ArrowRight } from "./arrow-right-YecCFk2L.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
const Tag = createLucideIcon("tag", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode);
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "skeleton",
      className: cn("bg-accent animate-pulse rounded-md", className),
      ...props
    }
  );
}
const CATEGORIES = [
  "All",
  "Strategy",
  "Performance",
  "Design",
  "Content",
  "SEO"
];
const fallbackArticles = [
  {
    id: BigInt(1),
    title: "The Framework That 10x'd Our Client's Ad Performance",
    excerpt: "A deep dive into the creative + data methodology we use to consistently outperform industry benchmarks in paid media.",
    body: "",
    category: "Performance",
    author: "Muskan Rathod",
    tags: ["Paid Ads", "Creative Strategy", "ROAS"],
    publishedAt: BigInt(Date.now() - 7 * 24 * 3600 * 1e3),
    featuredImageUrl: ""
  },
  {
    id: BigInt(2),
    title: "Why Most Brand Strategies Fail (And How to Fix Yours)",
    excerpt: "Brand strategy isn't about logos and colors — it's about positioning. Here's the framework we use with every client.",
    body: "",
    category: "Strategy",
    author: "Muskan Rathod",
    tags: ["Branding", "Strategy", "Positioning"],
    publishedAt: BigInt(Date.now() - 14 * 24 * 3600 * 1e3),
    featuredImageUrl: ""
  },
  {
    id: BigInt(3),
    title: "Content That Converts: The Psychology Behind High-Performing Copy",
    excerpt: "We analyzed 500+ pieces of content and found the psychological triggers that consistently drive action. Here's what we found.",
    body: "",
    category: "Content",
    author: "Muskan Rathod",
    tags: ["Copywriting", "Content", "Psychology"],
    publishedAt: BigInt(Date.now() - 21 * 24 * 3600 * 1e3),
    featuredImageUrl: ""
  },
  {
    id: BigInt(4),
    title: "SEO in 2026: What's Working and What Isn't",
    excerpt: "The SEO landscape has shifted dramatically. Here are the strategies that are driving real organic growth right now.",
    body: "",
    category: "SEO",
    author: "Muskan Rathod",
    tags: ["SEO", "Organic Growth", "Content"],
    publishedAt: BigInt(Date.now() - 30 * 24 * 3600 * 1e3),
    featuredImageUrl: ""
  },
  {
    id: BigInt(5),
    title: "The UI Mistakes That Are Killing Your Conversion Rate",
    excerpt: "Small UX details have enormous impact on conversions. We break down the most common mistakes and how to fix them fast.",
    body: "",
    category: "Design",
    author: "Muskan Rathod",
    tags: ["UX", "Conversion", "Design"],
    publishedAt: BigInt(Date.now() - 45 * 24 * 3600 * 1e3),
    featuredImageUrl: ""
  },
  {
    id: BigInt(6),
    title: "How We Built a 50K-Member Brand Community from Zero",
    excerpt: "Community is the most defensible moat in marketing. Here's our step-by-step playbook for building one that actually drives growth.",
    body: "",
    category: "Strategy",
    author: "Muskan Rathod",
    tags: ["Community", "Branding", "Growth"],
    publishedAt: BigInt(Date.now() - 60 * 24 * 3600 * 1e3),
    featuredImageUrl: ""
  }
];
function formatDate(ts) {
  return new Date(Number(ts)).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function ArticleCard({
  article,
  index
}) {
  const { ref, style } = useRevealOnScroll(index * 70);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref,
      style,
      className: "group glassmorphic border-white/10 hover:border-primary/25 overflow-hidden transition-smooth card-hover",
      "data-ocid": `blog-card-${article.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-40 bg-gradient-to-br from-primary/20 via-accent/15 to-secondary/20 relative flex items-end p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid-glow-bg opacity-30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "relative bg-black/50 text-foreground border-white/20 text-xs", children: article.category })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg text-foreground leading-tight mb-3 group-hover:text-primary transition-smooth", children: article.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2", children: article.excerpt }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mb-4", children: article.tags.slice(0, 2).map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-muted-foreground flex items-center gap-1",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { size: 9 }),
                tag
              ]
            },
            tag
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 11 }),
              article.author
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 11 }),
              formatDate(article.publishedAt)
            ] })
          ] })
        ] })
      ]
    }
  );
}
function Blog() {
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [activeCategory, setActiveCategory] = reactExports.useState("All");
  const [debouncedSearch, setDebouncedSearch] = reactExports.useState("");
  reactExports.useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);
  const { data: liveArticles, isLoading } = useGetBlogArticles();
  const { data: searchResults } = useSearchBlogArticles(
    debouncedSearch,
    activeCategory === "All" ? null : activeCategory,
    null
  );
  const articles = debouncedSearch || activeCategory !== "All" ? searchResults ?? [] : (liveArticles == null ? void 0 : liveArticles.length) ? liveArticles : fallbackArticles;
  const { ref: titleRef, style: titleStyle } = useRevealOnScroll(0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative pt-20 sm:pt-24 pb-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid-glow-bg opacity-40" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          ref: titleRef,
          style: titleStyle,
          className: "mb-12 max-w-3xl",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary text-sm font-semibold uppercase tracking-widest mb-4", children: "Insights" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-3xl sm:text-5xl md:text-6xl text-foreground leading-tight mb-6", children: [
              "Marketing Intelligence",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-purple", children: "Hub" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg leading-relaxed", children: "Actionable insights, proven frameworks, and insider strategies from the team that delivers results." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 sm:gap-4 mb-8 sm:mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Search,
            {
              size: 15,
              className: "absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Search articles...",
              value: searchQuery,
              onChange: (e) => setSearchQuery(e.target.value),
              className: "pl-10 w-full bg-card/50 border-white/15 focus:border-primary/40",
              "data-ocid": "blog-search"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap", children: [
          " ",
          CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setActiveCategory(cat),
              "data-ocid": `blog-filter-${cat.toLowerCase()}`,
              className: `px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${activeCategory === cat ? "gradient-neon-purple text-background glow-neon" : "glassmorphic text-muted-foreground hover:text-foreground hover:border-primary/30"}`,
              children: cat
            },
            cat
          ))
        ] })
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: ["s1", "s2", "s3", "s4", "s5", "s6"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-72 rounded-lg bg-card/50" }, id)) }) : articles.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: articles.map((article, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        ArticleCard,
        {
          article,
          index: i
        },
        String(article.id)
      )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-20", "data-ocid": "blog-empty", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl glassmorphic flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 24, className: "text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-xl text-foreground mb-2", children: "No articles found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "Try a different search or category" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => {
              setSearchQuery("");
              setActiveCategory("All");
            },
            className: "text-primary hover:underline text-sm",
            children: "Clear filters"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mt-14", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: "flex items-center gap-2 text-primary hover:text-primary/80 transition-smooth mx-auto text-sm font-medium group",
          children: [
            "Want us to write about a specific topic?",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ArrowRight,
              {
                size: 14,
                className: "group-hover:translate-x-1 transition-smooth"
              }
            )
          ]
        }
      ) }) })
    ] })
  ] });
}
export {
  Blog
};
