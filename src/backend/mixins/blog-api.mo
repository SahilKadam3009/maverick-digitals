import List "mo:core/List";
import Array "mo:core/Array";
import BlogLib "../lib/blog";
import BlogTypes "../types/blog";
import Common "../types/common";

mixin (
  articles : List.List<BlogTypes.BlogArticle>,
  nextArticleId : [var Nat],
) {
  public shared func addBlogArticle(
    title : Text,
    excerpt : Text,
    body : Text,
    category : Text,
    tags : [Text],
    publishedAt : Common.Timestamp,
    author : Text,
    featuredImageUrl : Text,
  ) : async Common.ArticleId {
    let id = BlogLib.add(articles, nextArticleId[0], title, excerpt, body, category, tags, publishedAt, author, featuredImageUrl);
    nextArticleId[0] += 1;
    id;
  };

  public shared query func getBlogArticles() : async [BlogTypes.BlogArticle] {
    BlogLib.getAll(articles);
  };

  public shared query func getBlogArticleById(id : Common.ArticleId) : async ?BlogTypes.BlogArticle {
    BlogLib.getById(articles, id);
  };

  public shared query func searchBlogArticles(
    searchQuery : Text,
    category : ?Text,
    tag : ?Text,
  ) : async [BlogTypes.BlogArticle] {
    // Start with search or full list
    var results : [BlogTypes.BlogArticle] = if (searchQuery == "") {
      BlogLib.getAll(articles);
    } else {
      BlogLib.search(articles, searchQuery);
    };

    // Apply category filter
    switch (category) {
      case (?cat) {
        let lower = cat.toLower();
        results := results.filter(func(a : BlogTypes.BlogArticle) : Bool {
          a.category.toLower() == lower
        });
      };
      case null {};
    };

    // Apply tag filter
    switch (tag) {
      case (?t) {
        let lower = t.toLower();
        results := results.filter(func(a : BlogTypes.BlogArticle) : Bool {
          a.tags.find(func(tg : Text) : Bool { tg.toLower() == lower }) != null
        });
      };
      case null {};
    };

    results;
  };
};
