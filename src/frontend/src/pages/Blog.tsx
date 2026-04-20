import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useRevealOnScroll } from "@/hooks/useIntersectionObserver";
import { useGetBlogArticles, useSearchBlogArticles } from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const CATEGORIES = [
  "All",
  "Strategy",
  "Performance",
  "Design",
  "Content",
  "SEO",
];

const fallbackArticles = [
  {
    id: BigInt(1),
    title: "The Framework That 10x'd Our Client's Ad Performance",
    excerpt:
      "A deep dive into the creative + data methodology we use to consistently outperform industry benchmarks in paid media.",
    body: "",
    category: "Performance",
    author: "Muskan Rathod",
    tags: ["Paid Ads", "Creative Strategy", "ROAS"],
    publishedAt: BigInt(Date.now() - 7 * 24 * 3600 * 1000),
    featuredImageUrl: "",
  },
  {
    id: BigInt(2),
    title: "Why Most Brand Strategies Fail (And How to Fix Yours)",
    excerpt:
      "Brand strategy isn't about logos and colors — it's about positioning. Here's the framework we use with every client.",
    body: "",
    category: "Strategy",
    author: "Muskan Rathod",
    tags: ["Branding", "Strategy", "Positioning"],
    publishedAt: BigInt(Date.now() - 14 * 24 * 3600 * 1000),
    featuredImageUrl: "",
  },
  {
    id: BigInt(3),
    title: "Content That Converts: The Psychology Behind High-Performing Copy",
    excerpt:
      "We analyzed 500+ pieces of content and found the psychological triggers that consistently drive action. Here's what we found.",
    body: "",
    category: "Content",
    author: "Muskan Rathod",
    tags: ["Copywriting", "Content", "Psychology"],
    publishedAt: BigInt(Date.now() - 21 * 24 * 3600 * 1000),
    featuredImageUrl: "",
  },
  {
    id: BigInt(4),
    title: "SEO in 2026: What's Working and What Isn't",
    excerpt:
      "The SEO landscape has shifted dramatically. Here are the strategies that are driving real organic growth right now.",
    body: "",
    category: "SEO",
    author: "Muskan Rathod",
    tags: ["SEO", "Organic Growth", "Content"],
    publishedAt: BigInt(Date.now() - 30 * 24 * 3600 * 1000),
    featuredImageUrl: "",
  },
  {
    id: BigInt(5),
    title: "The UI Mistakes That Are Killing Your Conversion Rate",
    excerpt:
      "Small UX details have enormous impact on conversions. We break down the most common mistakes and how to fix them fast.",
    body: "",
    category: "Design",
    author: "Muskan Rathod",
    tags: ["UX", "Conversion", "Design"],
    publishedAt: BigInt(Date.now() - 45 * 24 * 3600 * 1000),
    featuredImageUrl: "",
  },
  {
    id: BigInt(6),
    title: "How We Built a 50K-Member Brand Community from Zero",
    excerpt:
      "Community is the most defensible moat in marketing. Here's our step-by-step playbook for building one that actually drives growth.",
    body: "",
    category: "Strategy",
    author: "Muskan Rathod",
    tags: ["Community", "Branding", "Growth"],
    publishedAt: BigInt(Date.now() - 60 * 24 * 3600 * 1000),
    featuredImageUrl: "",
  },
];

const CATEGORY_GRADIENTS: Record<string, string> = {
  Performance: "from-primary/25 via-accent/15 to-secondary/15",
  Strategy: "from-secondary/25 via-primary/15 to-accent/15",
  Content: "from-accent/25 via-secondary/15 to-primary/15",
  SEO: "from-primary/20 via-secondary/20 to-accent/10",
  Design: "from-accent/20 via-primary/15 to-secondary/15",
  default: "from-primary/15 via-accent/10 to-secondary/10",
};

function formatDate(ts: bigint): string {
  return new Date(Number(ts)).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function ArticleCard({
  article,
  index,
}: { article: (typeof fallbackArticles)[0]; index: number }) {
  const { ref, style } = useRevealOnScroll(index * 70);
  const grad =
    CATEGORY_GRADIENTS[article.category] ?? CATEGORY_GRADIENTS.default;
  const readMins = Math.max(3, Math.floor(article.title.length / 8));

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={style}
      className="group glass-card border-border/60 hover:border-primary/25 overflow-hidden transition-smooth card-hover flex flex-col"
      data-ocid={`blog.item.${index + 1}`}
    >
      {/* Visual header */}
      <div
        className={`h-44 bg-gradient-to-br ${grad} relative flex flex-col justify-between p-5 overflow-hidden`}
      >
        <div className="absolute inset-0 grid-glow-bg opacity-25" />
        {/* Category tag */}
        <span className="relative tag-label self-start">
          {article.category}
        </span>
        {/* Abstract editorial mark — lines only, no icon component */}
        <div className="absolute bottom-4 right-5 opacity-15">
          <svg
            width="48"
            height="36"
            viewBox="0 0 48 36"
            fill="none"
            aria-hidden="true"
          >
            <line
              x1="2"
              y1="8"
              x2="46"
              y2="8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="2"
              y1="18"
              x2="32"
              y2="18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="2"
              y1="28"
              x2="20"
              y2="28"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display font-bold text-lg text-foreground leading-tight mb-3 group-hover:text-primary transition-smooth line-clamp-2">
          {article.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
          {article.excerpt}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {article.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-primary/8 border border-primary/15 text-primary"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="divider-premium mb-4" />

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{article.author}</span>
          <span>{formatDate(article.publishedAt)}</span>
          <span>{readMins}m read</span>
        </div>
      </div>
    </div>
  );
}

export function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data: liveArticles, isLoading } = useGetBlogArticles();
  const { data: searchResults } = useSearchBlogArticles(
    debouncedSearch,
    activeCategory === "All" ? null : activeCategory,
    null,
  );

  const articles =
    debouncedSearch || activeCategory !== "All"
      ? (searchResults ?? [])
      : liveArticles?.length
        ? liveArticles
        : fallbackArticles;

  const { ref: titleRef, style: titleStyle } = useRevealOnScroll(0);

  return (
    <div className="relative pt-20 sm:pt-24 pb-20">
      <div className="absolute inset-0 grid-glow-bg opacity-40" />
      <div className="absolute top-0 left-1/3 w-[500px] h-[300px] bg-primary/6 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          style={titleStyle}
          className="mb-14 max-w-3xl"
        >
          <span className="tag-label inline-flex mb-5">Insights</span>
          <h1 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-foreground leading-tight mb-6 mt-3">
            Marketing Intelligence{" "}
            <span className="gradient-text-purple">Hub</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Actionable insights, proven frameworks, and insider strategies from
            the team that delivers results.
          </p>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col gap-4 mb-10">
          <div className="relative w-full max-w-lg">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none text-sm">
              ⌕
            </span>
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="premium-input pl-10"
              data-ocid="blog.search_input"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                data-ocid={`blog.filter.${cat.toLowerCase()}`}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-smooth ${
                  activeCategory === cat
                    ? "btn-primary"
                    : "glass-card border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {["s1", "s2", "s3", "s4", "s5", "s6"].map((id) => (
              <Skeleton
                key={id}
                className="h-80 rounded-xl bg-card/50"
                data-ocid="blog.loading_state"
              />
            ))}
          </div>
        ) : articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, i) => (
              <ArticleCard
                key={String(article.id)}
                article={article}
                index={i}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20" data-ocid="blog.empty_state">
            <div className="w-16 h-16 rounded-2xl glass-card flex items-center justify-center mx-auto mb-5">
              <span className="text-2xl text-muted-foreground">⌕</span>
            </div>
            <h3 className="font-display font-semibold text-xl text-foreground mb-2">
              No articles found
            </h3>
            <p className="text-muted-foreground mb-6">
              Try a different search or category
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
              className="text-primary hover:underline text-sm font-medium"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Footer CTA */}
        <div className="text-center mt-16 pt-10 border-t border-border/50">
          <Link to="/contact">
            <button
              type="button"
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-smooth mx-auto text-sm font-medium group"
            >
              Want us to write about a specific topic? →
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
