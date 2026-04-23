import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/blog";
import BlogLib "../lib/blog";

mixin (
  accessControlState : AccessControl.AccessControlState,
  blogStore : List.List<Types.BlogPost>,
  nextBlogPostId : { var value : Nat },
) {
  public shared ({ caller }) func addBlogPost(input : Types.BlogPostInput) : async Types.BlogPost {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can add blog posts");
    };
    let id = nextBlogPostId.value;
    nextBlogPostId.value += 1;
    BlogLib.addBlogPost(blogStore, input, id);
  };

  public shared ({ caller }) func updateBlogPost(id : Types.BlogPostId, input : Types.BlogPostInput) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update blog posts");
    };
    BlogLib.updateBlogPost(blogStore, id, input);
  };

  public shared ({ caller }) func deleteBlogPost(id : Types.BlogPostId) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can delete blog posts");
    };
    BlogLib.deleteBlogPost(blogStore, id);
  };

  public query func getBlogPosts() : async [Types.BlogPost] {
    BlogLib.getAllBlogPosts(blogStore);
  };
};
