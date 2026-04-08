import Common "common";

module {
  public type BlogArticle = {
    id : Common.ArticleId;
    title : Text;
    excerpt : Text;
    body : Text;
    category : Text;
    tags : [Text];
    publishedAt : Common.Timestamp;
    author : Text;
    featuredImageUrl : Text;
  };
};
