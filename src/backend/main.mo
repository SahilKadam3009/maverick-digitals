import List "mo:core/List";
import Time "mo:core/Time";
import ContactTypes "types/contact";
import BlogTypes "types/blog";
import BlogLib "lib/blog";
import ContactApi "mixins/contact-api";
import BlogApi "mixins/blog-api";

actor {
  let submissions = List.empty<ContactTypes.ContactSubmission>();
  let nextContactId : [var Nat] = [var 0];

  let articles = List.empty<BlogTypes.BlogArticle>();
  let nextArticleId : [var Nat] = [var 0];

  // Seed sample blog articles on first deploy
  do {
    ignore BlogLib.add(
      articles,
      nextArticleId[0],
      "10 Digital Marketing Trends Dominating 2025",
      "From AI-powered personalization to short-form video dominance, discover the strategies reshaping the digital landscape this year.",
      "The digital marketing landscape is evolving faster than ever. In 2025, brands that thrive will be those that embrace AI-driven personalization, leverage short-form video storytelling, and build authentic community-led growth. Here's a deep dive into the top 10 trends you need to know...\n\n1. **AI-Powered Personalization**: Machine learning now enables hyper-relevant content delivery at scale.\n2. **Short-Form Video Supremacy**: Reels, TikToks, and YouTube Shorts continue to dominate engagement metrics.\n3. **Community-Led Growth**: Brands building micro-communities see 3x higher retention rates.\n4. **Voice Search Optimization**: With smart speakers in 40% of homes, voice SEO is no longer optional.\n5. **Zero-Party Data Strategies**: Privacy-first brands are winning consumer trust by asking for data transparently.\n6. **Interactive Content**: Quizzes, polls, and AR experiences drive 2x more engagement than static posts.\n7. **Influencer Micro-Communities**: Nano-influencers (1k-10k followers) deliver higher ROI than mega-celebrities.\n8. **Sustainable Brand Storytelling**: Gen Z rewards brands with authentic sustainability narratives.\n9. **Conversational Marketing**: Chatbots and live chat convert 30% better than static landing pages.\n10. **Omnichannel Consistency**: Seamless brand experience across all touchpoints is the new baseline expectation.",
      "Digital Marketing",
      ["SEO", "Social Media", "AI", "Content Marketing"],
      1735689600000000000,
      "Muskan Rathod",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    );
    nextArticleId[0] += 1;

    ignore BlogLib.add(
      articles,
      nextArticleId[0],
      "Building a Brand Identity That Actually Converts",
      "Your logo is not your brand. Learn how Maverick Digitals crafts cohesive brand identities that resonate deeply and drive measurable business growth.",
      "Most businesses confuse visual identity with brand identity. Your logo, colors, and typography are just the surface layer. True brand identity is the emotional resonance you create in your audience's mind every time they encounter your business.\n\nAt Maverick Digitals, we follow a proven 5-pillar brand framework:\n\n**Pillar 1 — Brand Purpose**: Why does your business exist beyond profit? Brands with a clear 'why' command 30% price premiums.\n\n**Pillar 2 — Target Audience Archetypes**: We build detailed psychographic profiles, not just demographics. Understanding your audience's fears, desires, and aspirations transforms your messaging.\n\n**Pillar 3 — Brand Voice & Tone**: Consistent voice builds trust. We document 12 voice attributes and create messaging guides your entire team can follow.\n\n**Pillar 4 — Visual Identity System**: Colors, typography, imagery style, and iconography work together as a cohesive system — not random choices.\n\n**Pillar 5 — Brand Story Architecture**: Your origin story, client transformation stories, and vision narrative form a compelling brand mythology.\n\nThe result? Brands that don't just look good — they convert.",
      "Brand Strategy",
      ["Branding", "Identity", "Strategy", "Design"],
      1736294400000000000,
      "Muskan Rathod",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800",
    );
    nextArticleId[0] += 1;

    ignore BlogLib.add(
      articles,
      nextArticleId[0],
      "The Growth Marketing Playbook for D2C Brands",
      "Direct-to-consumer brands face unique challenges in 2025. Here's the exact framework we use to scale our D2C clients from 6 to 7 figures.",
      "Direct-to-consumer brands have never had more opportunity — or more competition. With ad costs rising and consumer attention fragmenting, the old playbook of 'run Facebook ads and scale' no longer works.\n\nHere's the modern D2C growth framework we've refined across 30+ client campaigns:\n\n**Phase 1 — Foundation (Month 1-2)**\nBefore spending on acquisition, we audit your retention metrics. A brand with 20% repeat purchase rate needs fundamentally different strategies than one at 50%.\n\n**Phase 2 — Channel Mix Optimization**\nWe test across paid social, search, influencer, and email simultaneously with micro-budgets. Data tells us where your specific audience actually converts.\n\n**Phase 3 — Creative Testing Machine**\nWe produce 20-40 ad creatives per month, testing hooks, formats, and offers systematically. The winning variables get scaled aggressively.\n\n**Phase 4 — Retention Architecture**\nEmail flows, SMS sequences, loyalty programs, and community building. LTV optimization is where D2C brands make their real margins.\n\n**Phase 5 — Scale with Confidence**\nWith proven unit economics, we scale paid channels knowing the math works. We've helped clients achieve 4.2x ROAS at significant spend.",
      "Growth Marketing",
      ["D2C", "Growth", "Performance Marketing", "Email Marketing"],
      1736899200000000000,
      "Muskan Rathod",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    );
    nextArticleId[0] += 1;

    ignore BlogLib.add(
      articles,
      nextArticleId[0],
      "Social Media in 2025: What's Working and What's Dead",
      "Posting consistently isn't enough anymore. Discover the platform-specific strategies that are driving real engagement and leads for service businesses.",
      "The social media landscape shifted dramatically in 2025. Organic reach on most platforms continues to decline, but the brands that understand platform-native content are seeing outsized results.\n\n**Instagram in 2025**\nReels remain king for discovery. The sweet spot is 7-15 second hooks with value-dense content. Carousels have seen a 40% engagement revival as 'save-worthy' educational content. Stories are now a retention tool, not a discovery tool.\n\n**LinkedIn for B2B**\nText-only posts with strong hooks are outperforming polished design. Personal founder stories drive 5-10x more reach than company page posts. Video comments are now a growth hack — short video responses to trending posts.\n\n**TikTok**\nLong-form content (3-7 minutes) is now being rewarded by the algorithm. Brands that entertain first and pitch second are building massive organic audiences.\n\n**What's Actually Dead**\n- Motivational quote graphics\n- Static product photography without context\n- Hashtag-stuffing (algorithm updates penalized this)\n- Cross-posting identical content across platforms\n- Engagement pods (platform detection has improved dramatically)\n\n**The Winning Formula**: Platform-native content + consistent value + strategic paid amplification = compound growth.",
      "Social Media",
      ["Instagram", "LinkedIn", "TikTok", "Content Strategy"],
      1737504000000000000,
      "Muskan Rathod",
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800",
    );
    nextArticleId[0] += 1;

    ignore BlogLib.add(
      articles,
      nextArticleId[0],
      "Personal Branding for Founders: Turn Your Story into Sales",
      "The most underutilized asset in your business is you. Learn how to build a personal brand that attracts premium clients on autopilot.",
      "In a world of faceless companies, the founder who shows up authentically wins. Personal branding isn't about becoming an influencer — it's about becoming the obvious choice for your ideal client.\n\nMuskan Rathod, founder of Maverick Digitals, built her agency entirely through personal brand. Here's the exact framework she used:\n\n**Step 1 — Define Your Positioning Statement**\nNot just what you do, but who you do it for and why you're uniquely qualified. Example: 'I help bootstrapped D2C founders build brand narratives that justify premium pricing.'\n\n**Step 2 — Content Pillars**\nChoose 3-4 topics you can speak about with genuine authority. Rotate through them consistently. Avoid the trap of chasing trending topics outside your expertise.\n\n**Step 3 — The Proof Stack**\nCase studies, client transformations, behind-the-scenes process content, and data-driven insights. Your credibility is built through specificity, not claims.\n\n**Step 4 — Distribution Strategy**\nChoose 1-2 platforms and dominate them before expanding. Muskan focused exclusively on LinkedIn and Instagram for 18 months before adding YouTube.\n\n**Step 5 — Monetization Architecture**\nYour personal brand should funnel into clear offers — whether a discovery call, lead magnet, or digital product. Every piece of content should have a logical next step.\n\nThe result: a personal brand that generates inbound leads 24/7.",
      "Personal Branding",
      ["Personal Brand", "Founder", "LinkedIn", "Storytelling"],
      1738108800000000000,
      "Muskan Rathod",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
    );
    nextArticleId[0] += 1;
  };

  include ContactApi(submissions, nextContactId);
  include BlogApi(articles, nextArticleId);
};
