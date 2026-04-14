import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useRevealOnScroll } from "@/hooks/useIntersectionObserver";
import { useGetBlogArticles, useSearchBlogArticles } from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Search, Tag, User } from "lucide-react";
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
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={style}
      className="group glassmorphic border-white/10 hover:border-primary/25 overflow-hidden transition-smooth card-hover"
      data-ocid={`blog-card-${article.id}`}
    >
      {/* Visual header */}
      <div className="h-40 bg-gradient-to-br from-primary/20 via-accent/15 to-secondary/20 relative flex items-end p-4">
        <div className="absolute inset-0 grid-glow-bg opacity-30" />
        <Badge className="relative bg-black/50 text-foreground border-white/20 text-xs">
          {article.category}
        </Badge>
      </div>

      <div className="p-6">
        <h3 className="font-display font-bold text-lg text-foreground leading-tight mb-3 group-hover:text-primary transition-smooth">
          {article.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
          {article.excerpt}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {article.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-muted-foreground flex items-center gap-1"
            >
              <Tag size={9} />
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <User size={11} />
            {article.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={11} />
            {formatDate(article.publishedAt)}
          </span>
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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          style={titleStyle}
          className="mb-12 max-w-3xl"
        >
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-4">
            Insights
          </p>
          <h1 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-foreground leading-tight mb-6">
            Marketing Intelligence{" "}
            <span className="gradient-text-purple">Hub</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Actionable insights, proven frameworks, and insider strategies from
            the team that delivers results.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 sm:gap-4 mb-8 sm:mb-10">
          <div className="relative w-full">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full bg-card/50 border-white/15 focus:border-primary/40"
              data-ocid="blog-search"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {" "}
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                data-ocid={`blog-filter-${cat.toLowerCase()}`}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                  activeCategory === cat
                    ? "gradient-neon-purple text-background glow-neon"
                    : "glassmorphic text-muted-foreground hover:text-foreground hover:border-primary/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {["s1", "s2", "s3", "s4", "s5", "s6"].map((id) => (
              <Skeleton key={id} className="h-72 rounded-lg bg-card/50" />
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
          <div className="text-center py-20" data-ocid="blog-empty">
            <div className="w-16 h-16 rounded-2xl glassmorphic flex items-center justify-center mx-auto mb-5">
              <Search size={24} className="text-muted-foreground" />
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
              className="text-primary hover:underline text-sm"
            >
              Clear filters
            </button>
          </div>
        )}

        <div className="text-center mt-14">
          <Link to="/contact">
            <button
              type="button"
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-smooth mx-auto text-sm font-medium group"
            >
              Want us to write about a specific topic?
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-smooth"
              />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
