import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  useAddBlogPost,
  useBlogPosts,
  useDeleteBlogPost,
  useUpdateBlogPost,
} from "@/hooks/useBlog";
import { BlogPostSource } from "@/types";
import type { BlogPost, BlogPostInput } from "@/types";
import { ExternalLink, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const defaultInput: BlogPostInput = {
  title: "",
  summary: "",
  mediumUrl: "",
  tags: [],
  publishedAt: BigInt(Date.now()),
  source: BlogPostSource.manual,
  thumbnailUrl: undefined,
};

function formatDate(ts: bigint): string {
  const ms = Number(ts);
  const date = ms > 1e12 ? new Date(ms) : new Date(ms * 1000);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

interface BlogFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editing: BlogPost | null;
  form: BlogPostInput;
  tagsInput: string;
  onFormChange: (updates: Partial<BlogPostInput>) => void;
  onTagsChange: (v: string) => void;
  onSubmit: () => void;
  isPending: boolean;
}

function BlogForm({
  open,
  onOpenChange,
  editing,
  form,
  tagsInput,
  onFormChange,
  onTagsChange,
  onSubmit,
  isPending,
}: BlogFormProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        className="w-full sm:max-w-lg overflow-y-auto"
        data-ocid="admin.blog_form_sheet"
      >
        <SheetHeader className="mb-6">
          <SheetTitle className="font-display text-xl">
            {editing ? "Edit Blog Post" : "Add Blog Post"}
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="blog-title">Title *</Label>
            <Input
              id="blog-title"
              value={form.title}
              onChange={(e) => onFormChange({ title: e.target.value })}
              placeholder="Post title"
              className="mt-1"
              data-ocid="admin.blog_title_input"
            />
          </div>

          <div>
            <Label htmlFor="blog-url">Medium URL *</Label>
            <Input
              id="blog-url"
              type="url"
              value={form.mediumUrl}
              onChange={(e) => onFormChange({ mediumUrl: e.target.value })}
              placeholder="https://medium.com/@username/post-slug"
              className="mt-1"
              data-ocid="admin.blog_url_input"
            />
          </div>

          <div>
            <Label htmlFor="blog-summary">Summary</Label>
            <Textarea
              id="blog-summary"
              value={form.summary}
              onChange={(e) => onFormChange({ summary: e.target.value })}
              placeholder="Short excerpt or description..."
              rows={3}
              className="mt-1"
              data-ocid="admin.blog_summary_textarea"
            />
          </div>

          <div>
            <Label htmlFor="blog-thumbnail">Thumbnail URL</Label>
            <Input
              id="blog-thumbnail"
              type="url"
              value={form.thumbnailUrl ?? ""}
              onChange={(e) =>
                onFormChange({
                  thumbnailUrl: e.target.value || undefined,
                })
              }
              placeholder="https://..."
              className="mt-1"
              data-ocid="admin.blog_thumbnail_input"
            />
          </div>

          <div>
            <Label htmlFor="blog-tags">Tags (comma-separated)</Label>
            <Input
              id="blog-tags"
              value={tagsInput}
              onChange={(e) => onTagsChange(e.target.value)}
              placeholder="Machine Learning, Python, NLP"
              className="mt-1"
              data-ocid="admin.blog_tags_input"
            />
          </div>

          <div>
            <Label htmlFor="blog-date">Published Date</Label>
            <Input
              id="blog-date"
              type="date"
              value={new Date(
                Number(form.publishedAt) > 1e12
                  ? Number(form.publishedAt)
                  : Number(form.publishedAt) * 1000,
              )
                .toISOString()
                .slice(0, 10)}
              onChange={(e) =>
                onFormChange({
                  publishedAt: BigInt(new Date(e.target.value).getTime()),
                })
              }
              className="mt-1"
              data-ocid="admin.blog_date_input"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={onSubmit}
              disabled={isPending || !form.title || !form.mediumUrl}
              className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
              data-ocid="admin.blog_submit_button"
            >
              {isPending ? "Saving..." : editing ? "Save Changes" : "Add Post"}
            </Button>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              data-ocid="admin.blog_cancel_button"
            >
              Cancel
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function BlogTab() {
  const { data: posts, isLoading } = useBlogPosts();
  const addPost = useAddBlogPost();
  const updatePost = useUpdateBlogPost();
  const deletePost = useDeleteBlogPost();

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<bigint | null>(null);
  const [form, setForm] = useState<BlogPostInput>(defaultInput);
  const [tagsInput, setTagsInput] = useState("");

  const openAdd = () => {
    setEditing(null);
    setForm({ ...defaultInput, publishedAt: BigInt(Date.now()) });
    setTagsInput("");
    setFormOpen(true);
  };

  const openEdit = (p: BlogPost) => {
    setEditing(p);
    setForm({
      title: p.title,
      summary: p.summary,
      mediumUrl: p.mediumUrl,
      tags: p.tags,
      publishedAt: p.publishedAt,
      source: p.source,
      thumbnailUrl: p.thumbnailUrl,
    });
    setTagsInput(p.tags.join(", "));
    setFormOpen(true);
  };

  const handleSubmit = async () => {
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const payload = { ...form, tags };
    try {
      if (editing) {
        await updatePost.mutateAsync({ id: editing.id, input: payload });
        toast.success("Blog post updated");
      } else {
        await addPost.mutateAsync(payload);
        toast.success("Blog post added");
      }
      setFormOpen(false);
    } catch {
      toast.error("Failed to save blog post");
    }
  };

  const handleDelete = async () => {
    if (deleteTarget === null) return;
    try {
      await deletePost.mutateAsync(deleteTarget);
      toast.success("Blog post deleted");
    } catch {
      toast.error("Failed to delete blog post");
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div data-ocid="admin.blog_tab">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-display-md text-foreground">Blog Posts</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage manually added posts (RSS posts auto-sync on the blog page)
          </p>
        </div>
        <Button
          onClick={openAdd}
          className="bg-accent text-accent-foreground hover:bg-accent/90"
          data-ocid="admin.add_blog_button"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Post
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3" data-ocid="admin.blog.loading_state">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16 rounded-lg" />
          ))}
        </div>
      ) : (posts ?? []).length === 0 ? (
        <div
          className="text-center py-16 text-muted-foreground border border-dashed border-border rounded-lg"
          data-ocid="admin.blog.empty_state"
        >
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
            <Plus className="w-5 h-5 text-accent" />
          </div>
          <p className="font-display text-foreground mb-1">
            No posts saved yet
          </p>
          <p className="text-sm mb-4">
            Add posts manually, or they will auto-appear from your Medium RSS
            feed.
          </p>
          <Button
            onClick={openAdd}
            variant="outline"
            size="sm"
            data-ocid="admin.empty_add_blog_button"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Post
          </Button>
        </div>
      ) : (
        <div className="space-y-2" data-ocid="admin.blog_list">
          {(posts ?? []).map((p, i) => (
            <div
              key={p.id.toString()}
              className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg transition-smooth hover:border-accent/30 hover:shadow-subtle"
              data-ocid={`admin.blog_row.${i + 1}`}
            >
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate text-sm">
                  {p.title}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-2">
                  <span>{formatDate(p.publishedAt)}</span>
                  {p.tags.length > 0 && (
                    <span className="truncate">
                      {p.tags.slice(0, 3).join(" · ")}
                    </span>
                  )}
                </p>
              </div>

              <a
                href={p.mediumUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-smooth shrink-0"
                aria-label="Open on Medium"
                data-ocid={`admin.blog_medium_link.${i + 1}`}
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="flex gap-1 shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => openEdit(p)}
                  data-ocid={`admin.blog_edit_button.${i + 1}`}
                  aria-label="Edit post"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDeleteTarget(p.id)}
                  data-ocid={`admin.blog_delete_button.${i + 1}`}
                  aria-label="Delete post"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <BlogForm
        open={formOpen}
        onOpenChange={setFormOpen}
        editing={editing}
        form={form}
        tagsInput={tagsInput}
        onFormChange={(updates) => setForm((f) => ({ ...f, ...updates }))}
        onTagsChange={setTagsInput}
        onSubmit={handleSubmit}
        isPending={addPost.isPending || updatePost.isPending}
      />

      <AlertDialog
        open={deleteTarget !== null}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
      >
        <AlertDialogContent data-ocid="admin.delete_blog_dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this blog post?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes the post from your portfolio. Your Medium post is
              unaffected.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="admin.blog_delete_cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-ocid="admin.blog_delete_confirm_button"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
