import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, L as Layout, E as ExternalLink, S as Skeleton } from "./index-CtTdumja.js";
import { u as useBlogPosts } from "./useBlog-Cnpa_yQk.js";
import { B as BookOpen } from "./book-open-DaM90IuW.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
const Tag = createLucideIcon("tag", __iconNode);
const MEDIUM_USERNAME = "varmatilak22";
const MEDIUM_RSS_URL = `https://medium.com/feed/@${MEDIUM_USERNAME}`;
const MEDIUM_PROFILE_URL = `https://medium.com/@${MEDIUM_USERNAME}`;
function formatDate(ts) {
  const ms = Number(ts);
  const date = ms > 1e12 ? new Date(ms) : new Date(ms * 1e3);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function extractImgFromHtml(html) {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : void 0;
}
function stripHtml(html) {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}
async function fetchMediumRss() {
  const res = await fetch(
    `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(MEDIUM_RSS_URL)}`
  );
  if (!res.ok) throw new Error("RSS fetch failed");
  const json = await res.json();
  if (json.status !== "ok") throw new Error("RSS parse error");
  return (json.items ?? []).map(
    (item) => ({
      title: item.title ?? "",
      mediumUrl: item.link ?? "",
      publishedAt: BigInt(new Date(item.pubDate).getTime()),
      summary: stripHtml(item.description ?? "").slice(0, 300),
      tags: item.categories ?? [],
      thumbnailUrl: item.thumbnail || extractImgFromHtml(item.description ?? ""),
      source: "rss"
    })
  );
}
function BlogPostCard({ post, index }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "article",
    {
      className: "card-elevated flex flex-col group animate-fade-up",
      style: { animationDelay: `${index * 0.07}s`, animationFillMode: "both" },
      "data-ocid": `blog.item.${index}`,
      children: [
        post.thumbnailUrl ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-44 overflow-hidden rounded-t-lg bg-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: post.thumbnailUrl,
              alt: post.title,
              className: "w-full h-full object-cover transition-smooth group-hover:scale-105",
              loading: "lazy"
            }
          ),
          post.isRss && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-2 right-2 bg-accent text-accent-foreground text-xs font-semibold px-2 py-0.5 rounded-full", children: "Medium" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-44 rounded-t-lg bg-gradient-to-br from-accent/20 via-muted to-muted/60 flex items-center justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-10 h-10 text-accent/50" }),
          post.isRss && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-2 right-2 bg-accent text-accent-foreground text-xs font-semibold px-2 py-0.5 rounded-full", children: "Medium" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 p-5 gap-3", children: [
          post.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex flex-wrap gap-1.5",
              "data-ocid": `blog.tags.${index}`,
              children: post.tags.slice(0, 3).map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "badge-accent flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-2.5 h-2.5" }),
                tag
              ] }, tag))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-lg leading-snug line-clamp-2 group-hover:text-accent transition-smooth", children: post.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed line-clamp-2 flex-1", children: post.summary }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-2 border-t border-border/60 mt-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5" }),
              formatDate(post.publishedAt)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: post.mediumUrl,
                target: "_blank",
                rel: "noopener noreferrer",
                onClick: (e) => e.stopPropagation(),
                "data-ocid": `blog.read_button.${index}`,
                className: "btn-accent text-xs px-3 py-1.5 flex items-center gap-1.5",
                children: [
                  "Read on Medium",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3" })
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function BlogCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-44 rounded-t-lg rounded-b-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16 rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-20 rounded-full" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-5/6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-4/6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-32 rounded-md" })
      ] })
    ] })
  ] });
}
function Blog() {
  const { data: backendPosts, isLoading: isLoadingBackend } = useBlogPosts();
  const [rssPosts, setRssPosts] = reactExports.useState([]);
  const [isLoadingRss, setIsLoadingRss] = reactExports.useState(true);
  const [rssError, setRssError] = reactExports.useState(false);
  reactExports.useEffect(() => {
    let cancelled = false;
    setIsLoadingRss(true);
    setRssError(false);
    fetchMediumRss().then((posts) => {
      if (!cancelled) setRssPosts(posts);
    }).catch(() => {
      if (!cancelled) setRssError(true);
    }).finally(() => {
      if (!cancelled) setIsLoadingRss(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);
  const isLoading = isLoadingBackend || isLoadingRss;
  const merged = (() => {
    const backendItems = (backendPosts ?? []).map(
      (p) => ({
        id: `backend-${p.id.toString()}`,
        title: p.title,
        mediumUrl: p.mediumUrl,
        publishedAt: p.publishedAt,
        summary: p.summary,
        tags: p.tags,
        thumbnailUrl: p.thumbnailUrl,
        isRss: false
      })
    );
    const backendUrls = new Set(backendItems.map((p) => p.mediumUrl));
    const rssItems = rssPosts.filter((p) => !backendUrls.has(p.mediumUrl)).map((p, i) => ({
      id: `rss-${i}`,
      title: p.title,
      mediumUrl: p.mediumUrl,
      publishedAt: p.publishedAt,
      summary: p.summary,
      tags: p.tags,
      thumbnailUrl: p.thumbnailUrl,
      isRss: true
    }));
    return [...backendItems, ...rssItems].sort(
      (a, b) => a.publishedAt > b.publishedAt ? -1 : 1
    );
  })();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background", "data-ocid": "blog.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-accent uppercase tracking-widest mb-1", children: "Writing" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-display-lg text-foreground mb-2", children: "Blog" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Thoughts on ML engineering, AI research, and building real systems" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: MEDIUM_PROFILE_URL,
          target: "_blank",
          rel: "noopener noreferrer",
          "data-ocid": "blog.medium_profile_button",
          className: "btn-accent inline-flex items-center gap-2 shrink-0",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "svg",
              {
                viewBox: "0 0 24 24",
                className: "w-4 h-4 fill-current",
                "aria-hidden": "true",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" })
              }
            ),
            "View Medium Profile"
          ]
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12", children: [
      rssError && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "mb-6 flex items-center gap-3 px-4 py-3 rounded-lg bg-muted border border-border text-sm text-muted-foreground",
          "data-ocid": "blog.rss_error_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "⚠" }),
            "Could not load live posts from Medium. Showing saved posts only."
          ]
        }
      ),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: ["b1", "b2", "b3", "b4", "b5", "b6"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(BlogCardSkeleton, {}, k)) }) : merged.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-24 text-muted-foreground border border-dashed border-border rounded-xl",
          "data-ocid": "blog.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-4", children: "✍️" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl font-semibold text-foreground mb-2", children: "No posts yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm max-w-xs mx-auto mb-6", children: "Blog posts will appear here once published on Medium or added from the admin panel." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: MEDIUM_PROFILE_URL,
                target: "_blank",
                rel: "noopener noreferrer",
                "data-ocid": "blog.empty_medium_link",
                className: "btn-accent inline-flex items-center gap-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3.5 h-3.5" }),
                  "Visit Medium Profile"
                ]
              }
            )
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-6", children: [
          merged.length,
          " post",
          merged.length !== 1 ? "s" : "",
          rssPosts.length > 0 && !rssError && " · synced from Medium"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
            "data-ocid": "blog.list",
            children: merged.map((post, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(BlogPostCard, { post, index: i + 1 }, post.id))
          }
        )
      ] })
    ] })
  ] }) });
}
export {
  Blog as default
};
