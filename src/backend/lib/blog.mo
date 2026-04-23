import List "mo:core/List";
import Order "mo:core/Order";
import Types "../types/blog";

module {
  public type BlogStore = List.List<Types.BlogPost>;

  public func addBlogPost(store : BlogStore, input : Types.BlogPostInput, id : Types.BlogPostId) : Types.BlogPost {
    let post : Types.BlogPost = {
      id;
      title = input.title;
      summary = input.summary;
      mediumUrl = input.mediumUrl;
      publishedAt = input.publishedAt;
      tags = input.tags;
      source = input.source;
      thumbnailUrl = input.thumbnailUrl;
    };
    store.add(post);
    post;
  };

  public func updateBlogPost(store : BlogStore, id : Types.BlogPostId, input : Types.BlogPostInput) : Bool {
    var found = false;
    store.mapInPlace(func(p) {
      if (p.id == id) {
        found := true;
        { p with
          title = input.title;
          summary = input.summary;
          mediumUrl = input.mediumUrl;
          publishedAt = input.publishedAt;
          tags = input.tags;
          source = input.source;
          thumbnailUrl = input.thumbnailUrl;
        };
      } else { p };
    });
    found;
  };

  public func deleteBlogPost(store : BlogStore, id : Types.BlogPostId) : Bool {
    let sizeBefore = store.size();
    let remaining = store.filter(func(p) { p.id != id });
    store.clear();
    store.append(remaining);
    store.size() < sizeBefore;
  };

  public func getAllBlogPosts(store : BlogStore) : [Types.BlogPost] {
    let arr = store.toArray();
    arr.sort(func(a : Types.BlogPost, b : Types.BlogPost) : Order.Order {
      if (a.publishedAt > b.publishedAt) { #less }
      else if (a.publishedAt < b.publishedAt) { #greater }
      else { #equal };
    });
  };
};
