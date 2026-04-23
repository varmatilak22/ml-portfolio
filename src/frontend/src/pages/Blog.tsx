import Layout from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import { useBlogPosts } from "@/hooks/useBlog";
import type { BlogPost } from "@/types";
import { BookOpen, Calendar, ExternalLink, Tag } from "lucide-react";
import { useEffect, useState } from "react";

const MEDIUM_USERNAME = "varmatilak22";
const MEDIUM_RSS_URL = `https://medium.com/feed/@${MEDIUM_USERNAME}`;
const MEDIUM_PROFILE_URL = `https://medium.com/@${MEDIUM_USERNAME}`;

interface RssPost {
  title: string;
  mediumUrl: string;
  publishedAt: bigint;
  summary: string;
  tags: string[];
  thumbnailUrl?: string;
  source: "rss";
}

interface MergedPost {
  id: string;
  title: string;
  mediumUrl: string;
  publishedAt: bigint;
  summary: string;
  tags: string[];
  thumbnailUrl?: string;
  isRss: boolean;
}

function formatDate(ts: bigint): string {
  const ms = Number(ts);
  const date = ms > 1e12 ? new Date(ms) : new Date(ms * 1000);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function extractImgFromHtml(html: string): string | undefined {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : undefined;
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchMediumRss(): Promise<RssPost[]> {
  const res = await fetch(
    `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(MEDIUM_RSS_URL)}`,
  );
  if (!res.ok) throw new Error("RSS fetch failed");
  const json = await res.json();
  if (json.status !== "ok") throw new Error("RSS parse error");

  return (json.items ?? []).map(
    (item: {
      title: string;
      link: string;
      pubDate: string;
      description: string;
      categories: string[];
      thumbnail?: string;
    }) => ({
      title: item.title ?? "",
      mediumUrl: item.link ?? "",
      publishedAt: BigInt(new Date(item.pubDate).getTime()),
      summary: stripHtml(item.description ?? "").slice(0, 300),
      tags: item.categories ?? [],
      thumbnailUrl:
        item.thumbnail || extractImgFromHtml(item.description ?? ""),
      source: "rss" as const,
    }),
  );
}

function BlogPostCard({ post, index }: { post: MergedPost; index: number }) {
  return (
    <article
      className="card-elevated flex flex-col group animate-fade-up"
      style={{ animationDelay: `${index * 0.07}s`, animationFillMode: "both" }}
      data-ocid={`blog.item.${index}`}
    >
      {/* Thumbnail */}
      {post.thumbnailUrl ? (
        <div className="relative h-44 overflow-hidden rounded-t-lg bg-muted">
          <img
            src={post.thumbnailUrl}
            alt={post.title}
            className="w-full h-full object-cover transition-smooth group-hover:scale-105"
            loading="lazy"
          />
          {post.isRss && (
            <span className="absolute top-2 right-2 bg-accent text-accent-foreground text-xs font-semibold px-2 py-0.5 rounded-full">
              Medium
            </span>
          )}
        </div>
      ) : (
        <div className="relative h-44 rounded-t-lg bg-gradient-to-br from-accent/20 via-muted to-muted/60 flex items-center justify-center">
          <BookOpen className="w-10 h-10 text-accent/50" />
          {post.isRss && (
            <span className="absolute top-2 right-2 bg-accent text-accent-foreground text-xs font-semibold px-2 py-0.5 rounded-full">
              Medium
            </span>
          )}
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Tags */}
        {post.tags.length > 0 && (
          <div
            className="flex flex-wrap gap-1.5"
            data-ocid={`blog.tags.${index}`}
          >
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="badge-accent flex items-center gap-1">
                <Tag className="w-2.5 h-2.5" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h2 className="font-display font-semibold text-foreground text-lg leading-snug line-clamp-2 group-hover:text-accent transition-smooth">
          {post.title}
        </h2>

        {/* Summary */}
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 flex-1">
          {post.summary}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-border/60 mt-auto">
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(post.publishedAt)}
          </span>
          <a
            href={post.mediumUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            data-ocid={`blog.read_button.${index}`}
            className="btn-accent text-xs px-3 py-1.5 flex items-center gap-1.5"
          >
            Read on Medium
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </article>
  );
}

function BlogCardSkeleton() {
  return (
    <div className="card-elevated flex flex-col">
      <Skeleton className="h-44 rounded-t-lg rounded-b-none" />
      <div className="p-5 space-y-3">
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
        <div className="flex justify-between pt-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-7 w-32 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export default function Blog() {
  const { data: backendPosts, isLoading: isLoadingBackend } = useBlogPosts();
  const [rssPosts, setRssPosts] = useState<RssPost[]>([]);
  const [isLoadingRss, setIsLoadingRss] = useState(true);
  const [rssError, setRssError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setIsLoadingRss(true);
    setRssError(false);
    fetchMediumRss()
      .then((posts) => {
        if (!cancelled) setRssPosts(posts);
      })
      .catch(() => {
        if (!cancelled) setRssError(true);
      })
      .finally(() => {
        if (!cancelled) setIsLoadingRss(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const isLoading = isLoadingBackend || isLoadingRss;

  // Merge: backend posts + RSS posts, deduplicate by mediumUrl, sort desc
  const merged: MergedPost[] = (() => {
    const backendItems: MergedPost[] = (backendPosts ?? []).map(
      (p: BlogPost) => ({
        id: `backend-${p.id.toString()}`,
        title: p.title,
        mediumUrl: p.mediumUrl,
        publishedAt: p.publishedAt,
        summary: p.summary,
        tags: p.tags,
        thumbnailUrl: p.thumbnailUrl,
        isRss: false,
      }),
    );

    const backendUrls = new Set(backendItems.map((p) => p.mediumUrl));

    const rssItems: MergedPost[] = rssPosts
      .filter((p) => !backendUrls.has(p.mediumUrl))
      .map((p, i) => ({
        id: `rss-${i}`,
        title: p.title,
        mediumUrl: p.mediumUrl,
        publishedAt: p.publishedAt,
        summary: p.summary,
        tags: p.tags,
        thumbnailUrl: p.thumbnailUrl,
        isRss: true,
      }));

    return [...backendItems, ...rssItems].sort((a, b) =>
      a.publishedAt > b.publishedAt ? -1 : 1,
    );
  })();

  return (
    <Layout>
      <div className="bg-background" data-ocid="blog.page">
        {/* Page header */}
        <div className="border-b border-border bg-card">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <p className="text-xs font-mono text-accent uppercase tracking-widest mb-1">
                  Writing
                </p>
                <h1 className="text-display-lg text-foreground mb-2">Blog</h1>
                <p className="text-muted-foreground">
                  Thoughts on ML engineering, AI research, and building real
                  systems
                </p>
              </div>
              <a
                href={MEDIUM_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="blog.medium_profile_button"
                className="btn-accent inline-flex items-center gap-2 shrink-0"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-current"
                  aria-hidden="true"
                >
                  <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                </svg>
                View Medium Profile
              </a>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* RSS error notice */}
          {rssError && !isLoading && (
            <div
              className="mb-6 flex items-center gap-3 px-4 py-3 rounded-lg bg-muted border border-border text-sm text-muted-foreground"
              data-ocid="blog.rss_error_state"
            >
              <span className="text-accent">⚠</span>
              Could not load live posts from Medium. Showing saved posts only.
            </div>
          )}

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {["b1", "b2", "b3", "b4", "b5", "b6"].map((k) => (
                <BlogCardSkeleton key={k} />
              ))}
            </div>
          ) : merged.length === 0 ? (
            <div
              className="text-center py-24 text-muted-foreground border border-dashed border-border rounded-xl"
              data-ocid="blog.empty_state"
            >
              <div className="text-4xl mb-4">✍️</div>
              <p className="font-display text-xl font-semibold text-foreground mb-2">
                No posts yet
              </p>
              <p className="text-sm max-w-xs mx-auto mb-6">
                Blog posts will appear here once published on Medium or added
                from the admin panel.
              </p>
              <a
                href={MEDIUM_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="blog.empty_medium_link"
                className="btn-accent inline-flex items-center gap-2"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Visit Medium Profile
              </a>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-6">
                {merged.length} post{merged.length !== 1 ? "s" : ""}
                {rssPosts.length > 0 && !rssError && " · synced from Medium"}
              </p>
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                data-ocid="blog.list"
              >
                {merged.map((post, i) => (
                  <BlogPostCard key={post.id} post={post} index={i + 1} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
