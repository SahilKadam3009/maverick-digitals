import List "mo:core/List";
import Types "../types/blog";
import Common "../types/common";

module {
  public func add(
    articles : List.List<Types.BlogArticle>,
    nextId : Nat,
    title : Text,
    excerpt : Text,
    body : Text,
    category : Text,
    tags : [Text],
    publishedAt : Common.Timestamp,
    author : Text,
    featuredImageUrl : Text,
  ) : Common.ArticleId {
    let article : Types.BlogArticle = {
      id = nextId;
      title;
      excerpt;
      body;
      category;
      tags;
      publishedAt;
      author;
      featuredImageUrl;
    };
    articles.add(article);
    nextId;
  };

  public func getAll(
    articles : List.List<Types.BlogArticle>,
  ) : [Types.BlogArticle] {
    articles.toArray();
  };

  public func getById(
    articles : List.List<Types.BlogArticle>,
    id : Common.ArticleId,
  ) : ?Types.BlogArticle {
    articles.find(func(a) { a.id == id });
  };

  public func filterByCategory(
    articles : List.List<Types.BlogArticle>,
    category : Text,
  ) : [Types.BlogArticle] {
    let lower = category.toLower();
    articles.filter(func(a) { a.category.toLower() == lower }).toArray();
  };

  public func filterByTag(
    articles : List.List<Types.BlogArticle>,
    tag : Text,
  ) : [Types.BlogArticle] {
    let lower = tag.toLower();
    articles.filter(func(a) {
      a.tags.find(func(t) { t.toLower() == lower }) != null
    }).toArray();
  };

  public func search(
    articles : List.List<Types.BlogArticle>,
    searchTerm : Text,
  ) : [Types.BlogArticle] {
    let lower = searchTerm.toLower();
    articles.filter(func(a) {
      a.title.toLower().contains(#text lower) or
      a.excerpt.toLower().contains(#text lower) or
      a.body.toLower().contains(#text lower) or
      a.category.toLower().contains(#text lower)
    }).toArray();
  };
};
