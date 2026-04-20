import { j as jsxRuntimeExports, c as cn, r as reactExports, L as Link } from "./index-BoXTUytn.js";
import { I as Input } from "./input-lZ47zcsO.js";
import { u as useRevealOnScroll } from "./useIntersectionObserver-ecw6SCeH.js";
import { u as useGetBlogArticles, a as useSearchBlogArticles } from "./useQueries-CHiyt00x.js";
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
const CATEGORY_GRADIENTS = {
  Performance: "from-primary/25 via-accent/15 to-secondary/15",
  Strategy: "from-secondary/25 via-primary/15 to-accent/15",
  Content: "from-accent/25 via-secondary/15 to-primary/15",
  SEO: "from-primary/20 via-secondary/20 to-accent/10",
  Design: "from-accent/20 via-primary/15 to-secondary/15",
  default: "from-primary/15 via-accent/10 to-secondary/10"
};
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
  const grad = CATEGORY_GRADIENTS[article.category] ?? CATEGORY_GRADIENTS.default;
  const readMins = Math.max(3, Math.floor(article.title.length / 8));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref,
      style,
      className: "group glass-card border-border/60 hover:border-primary/25 overflow-hidden transition-smooth card-hover flex flex-col",
      "data-ocid": `blog.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `h-44 bg-gradient-to-br ${grad} relative flex flex-col justify-between p-5 overflow-hidden`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid-glow-bg opacity-25" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative tag-label self-start", children: article.category }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-4 right-5 opacity-15", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "svg",
                {
                  width: "48",
                  height: "36",
                  viewBox: "0 0 48 36",
                  fill: "none",
                  "aria-hidden": "true",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "line",
                      {
                        x1: "2",
                        y1: "8",
                        x2: "46",
                        y2: "8",
                        stroke: "currentColor",
                        strokeWidth: "1.5",
                        strokeLinecap: "round"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "line",
                      {
                        x1: "2",
                        y1: "18",
                        x2: "32",
                        y2: "18",
                        stroke: "currentColor",
                        strokeWidth: "1.5",
                        strokeLinecap: "round"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "line",
                      {
                        x1: "2",
                        y1: "28",
                        x2: "20",
                        y2: "28",
                        stroke: "currentColor",
                        strokeWidth: "1.5",
                        strokeLinecap: "round"
                      }
                    )
                  ]
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 flex flex-col flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg text-foreground leading-tight mb-3 group-hover:text-primary transition-smooth line-clamp-2", children: article.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2 flex-1", children: article.excerpt }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mb-5", children: article.tags.slice(0, 2).map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-xs px-2 py-0.5 rounded-full bg-primary/8 border border-primary/15 text-primary",
              children: tag
            },
            tag
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divider-premium mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: article.author }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDate(article.publishedAt) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              readMins,
              "m read"
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-1/3 w-[500px] h-[300px] bg-primary/6 rounded-full blur-[100px] pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          ref: titleRef,
          style: titleStyle,
          className: "mb-14 max-w-3xl",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag-label inline-flex mb-5", children: "Insights" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-3xl sm:text-5xl md:text-6xl text-foreground leading-tight mb-6 mt-3", children: [
              "Marketing Intelligence",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-purple", children: "Hub" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg leading-relaxed", children: "Actionable insights, proven frameworks, and insider strategies from the team that delivers results." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none text-sm", children: "⌕" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Search articles...",
              value: searchQuery,
              onChange: (e) => setSearchQuery(e.target.value),
              className: "premium-input pl-10",
              "data-ocid": "blog.search_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setActiveCategory(cat),
            "data-ocid": `blog.filter.${cat.toLowerCase()}`,
            className: `px-4 py-2 rounded-lg text-sm font-semibold transition-smooth ${activeCategory === cat ? "btn-primary" : "glass-card border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/30"}`,
            children: cat
          },
          cat
        )) })
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: ["s1", "s2", "s3", "s4", "s5", "s6"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Skeleton,
        {
          className: "h-80 rounded-xl bg-card/50",
          "data-ocid": "blog.loading_state"
        },
        id
      )) }) : articles.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: articles.map((article, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        ArticleCard,
        {
          article,
          index: i
        },
        String(article.id)
      )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-20", "data-ocid": "blog.empty_state", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl glass-card flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl text-muted-foreground", children: "⌕" }) }),
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
            className: "text-primary hover:underline text-sm font-medium",
            children: "Clear filters"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mt-16 pt-10 border-t border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "flex items-center gap-2 text-primary hover:text-primary/80 transition-smooth mx-auto text-sm font-medium group",
          children: "Want us to write about a specific topic? →"
        }
      ) }) })
    ] })
  ] });
}
export {
  Blog
};
