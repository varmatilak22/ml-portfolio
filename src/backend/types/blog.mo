import Common "common";

module {
  public type BlogPostId = Nat;

  public type BlogPostSource = {
    #manual;
    #rss;
  };

  public type BlogPost = {
    id : BlogPostId;
    title : Text;
    summary : Text;
    mediumUrl : Text;
    publishedAt : Common.Timestamp;
    tags : [Text];
    source : BlogPostSource;
    thumbnailUrl : ?Text;
  };

  public type BlogPostInput = {
    title : Text;
    summary : Text;
    mediumUrl : Text;
    publishedAt : Common.Timestamp;
    tags : [Text];
    source : BlogPostSource;
    thumbnailUrl : ?Text;
  };
};
