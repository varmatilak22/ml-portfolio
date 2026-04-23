// Re-export from useBlog.ts for backwards compatibility
export {
  useBlogPosts,
  useAddBlogPost,
  useUpdateBlogPost,
  useDeleteBlogPost,
} from "./useBlog";
export type { BlogPost, BlogPostInput } from "@/types";
