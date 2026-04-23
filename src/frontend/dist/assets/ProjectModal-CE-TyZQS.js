import { c as createLucideIcon, j as jsxRuntimeExports, r as reactExports, B as Button, G as Github } from "./index-CtTdumja.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./useProjects-DJJ1qgjf.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["polygon", { points: "6 3 20 12 6 21 6 3", key: "1oa8hb" }]];
const Play = createLucideIcon("play", __iconNode);
function SkillBadge({
  skill,
  variant = "default",
  size = "sm",
  index
}) {
  const base = "inline-block rounded-full font-medium border transition-smooth cursor-default select-none";
  const sizeClass = size === "sm" ? "px-3 py-1 text-xs" : "px-4 py-1.5 text-sm";
  const variantClass = variant === "accent" ? "bg-accent/10 text-accent border-accent/25 hover:bg-accent/20" : "bg-muted text-muted-foreground border-border hover:bg-muted/80 hover:text-foreground";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `${base} ${sizeClass} ${variantClass}`,
      "data-ocid": index !== void 0 ? `skills.badge.${index}` : void 0,
      children: skill
    }
  );
}
function getEmbedUrl(url) {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com") || u.hostname.includes("youtu.be")) {
      const videoId = u.searchParams.get("v") ?? (u.hostname === "youtu.be" ? u.pathname.slice(1) : null);
      if (videoId)
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    }
    if (u.hostname.includes("vimeo.com")) {
      const videoId = u.pathname.split("/").filter(Boolean).pop();
      if (videoId)
        return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
    }
    return null;
  } catch {
    return null;
  }
}
function isDirectVideo(url) {
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);
}
function VideoEmbed({
  videoUrl,
  thumbnailUrl,
  title,
  autoPlay = false
}) {
  const [playing, setPlaying] = reactExports.useState(autoPlay);
  const embedUrl = getEmbedUrl(videoUrl);
  const direct = isDirectVideo(videoUrl);
  if (playing) {
    if (embedUrl) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-video bg-foreground/10 rounded-lg overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "iframe",
        {
          src: embedUrl,
          title,
          allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
          allowFullScreen: true,
          className: "absolute inset-0 w-full h-full border-0"
        }
      ) });
    }
    if (direct) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-video bg-foreground/10 rounded-lg overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "video",
        {
          src: videoUrl,
          title,
          controls: true,
          autoPlay: true,
          className: "absolute inset-0 w-full h-full object-cover",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("track", { kind: "captions" })
        }
      ) });
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: () => setPlaying(true),
      className: "relative aspect-video w-full bg-muted rounded-lg overflow-hidden group cursor-pointer block",
      "aria-label": `Play video: ${title}`,
      "data-ocid": "video.play_button",
      children: [
        thumbnailUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: thumbnailUrl,
            alt: `${title} thumbnail`,
            className: "absolute inset-0 w-full h-full object-cover transition-smooth group-hover:scale-105"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-muted to-muted/50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-foreground/10 group-hover:bg-foreground/25 transition-smooth" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-accent shadow-lg flex items-center justify-center transition-smooth group-hover:scale-110 group-hover:bg-accent/90", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Play,
          {
            className: "w-6 h-6 text-accent-foreground ml-0.5",
            fill: "currentColor"
          }
        ) }) })
      ]
    }
  );
}
function KaggleIcon$1({ className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      className,
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M16.358 0C7.324 0 0 7.163 0 16s7.324 16 16.358 16C25.39 32 32 25.163 32 16S25.39 0 16.358 0zm3.498 22.44l-4.47-5.002-1.29 1.274V22.4H10.5V9.6h3.596v5.49l5.43-5.49h4.387l-5.82 5.78 6.103 7.06h-4.34z" })
    }
  );
}
function ProjectCard({
  project,
  index,
  onExpand,
  expanded = false
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "card-elevated group overflow-hidden flex flex-col",
      "data-ocid": `projects.project_card.${index}`,
      children: [
        project.videoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: expanded ? "w-full" : "",
            onClick: !expanded && onExpand ? () => onExpand(project) : void 0,
            onKeyDown: !expanded && onExpand ? (e) => e.key === "Enter" && onExpand(project) : void 0,
            role: !expanded && onExpand ? "button" : void 0,
            tabIndex: !expanded && onExpand ? 0 : void 0,
            style: !expanded && onExpand ? { cursor: "pointer" } : void 0,
            children: expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              VideoEmbed,
              {
                videoUrl: project.videoUrl,
                thumbnailUrl: project.thumbnailUrl ?? void 0,
                title: project.title,
                autoPlay: false
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-video bg-muted overflow-hidden", children: [
              project.thumbnailUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: project.thumbnailUrl,
                  alt: `${project.title} thumbnail`,
                  className: "w-full h-full object-cover transition-smooth group-hover:scale-105"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "Video available" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-foreground/10 opacity-0 group-hover:opacity-100 transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-accent flex items-center justify-center shadow-lg transition-smooth group-hover:scale-110", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "svg",
                {
                  className: "w-5 h-5 text-accent-foreground ml-0.5",
                  fill: "currentColor",
                  viewBox: "0 0 24 24",
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M8 5v14l11-7z" })
                }
              ) }) })
            ] })
          }
        ) : project.thumbnailUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "relative aspect-video bg-muted overflow-hidden",
            onClick: !expanded && onExpand ? () => onExpand(project) : void 0,
            onKeyDown: !expanded && onExpand ? (e) => e.key === "Enter" && onExpand(project) : void 0,
            role: !expanded && onExpand ? "button" : void 0,
            tabIndex: !expanded && onExpand ? 0 : void 0,
            style: !expanded && onExpand ? { cursor: "pointer" } : void 0,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: project.thumbnailUrl,
                alt: `${project.title} thumbnail`,
                className: "w-full h-full object-cover transition-smooth group-hover:scale-105"
              }
            )
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-video bg-muted/50 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs font-mono", children: "[ no preview ]" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 flex flex-col flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "text-left",
              onClick: onExpand ? () => onExpand(project) : void 0,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-lg text-foreground mb-1.5 truncate group-hover:text-accent transition-smooth", children: project.title })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: `text-muted-foreground text-sm mb-4 ${expanded ? "" : "line-clamp-2"}`,
              children: project.description
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mb-4", children: project.tags.map((tag, ti) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkillBadge, { skill: tag, index: ti + 1 }, tag)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-auto", children: [
            project.githubLink && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: project.githubLink,
                target: "_blank",
                rel: "noopener noreferrer",
                "data-ocid": `projects.github_link.${index}`,
                onClick: (e) => e.stopPropagation(),
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "h-8 px-2 text-muted-foreground hover:text-foreground",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Github, { className: "w-4 h-4 mr-1" }),
                      " GitHub"
                    ]
                  }
                )
              }
            ),
            project.kaggleLink && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: project.kaggleLink,
                target: "_blank",
                rel: "noopener noreferrer",
                "data-ocid": `projects.kaggle_link.${index}`,
                onClick: (e) => e.stopPropagation(),
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "h-8 px-2 text-muted-foreground hover:text-foreground",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(KaggleIcon$1, { className: "w-4 h-4 mr-1" }),
                      " Kaggle"
                    ]
                  }
                )
              }
            ),
            onExpand && !expanded && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "h-8 px-2 text-accent hover:text-accent ml-auto",
                onClick: () => onExpand(project),
                "data-ocid": `projects.expand_button.${index}`,
                children: "Details →"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function KaggleIcon({ className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      className,
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M16.358 0C7.324 0 0 7.163 0 16s7.324 16 16.358 16C25.39 32 32 25.163 32 16S25.39 0 16.358 0zm3.498 22.44l-4.47-5.002-1.29 1.274V22.4H10.5V9.6h3.596v5.49l5.43-5.49h4.387l-5.82 5.78 6.103 7.06h-4.34z" })
    }
  );
}
function ProjectModal({ project, onClose }) {
  if (!project) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!project, onOpenChange: (open) => !open && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-2xl w-full p-0 overflow-hidden",
      "data-ocid": "projects.modal",
      children: [
        project.videoUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          VideoEmbed,
          {
            videoUrl: project.videoUrl,
            thumbnailUrl: project.thumbnailUrl ?? void 0,
            title: project.title,
            autoPlay: false
          }
        ) }),
        !project.videoUrl && project.thumbnailUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-video bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: project.thumbnailUrl,
            alt: project.title,
            className: "w-full h-full object-cover"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-2xl font-bold text-foreground leading-tight", children: project.title }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-5", children: project.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-6", children: project.tags.map((tag, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            SkillBadge,
            {
              skill: tag,
              index: i + 1,
              variant: "default",
              size: "sm"
            },
            tag
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
            project.githubLink && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: project.githubLink,
                target: "_blank",
                rel: "noopener noreferrer",
                "data-ocid": "projects.modal.github_link",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", className: "gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Github, { className: "w-4 h-4" }),
                  " View on GitHub"
                ] })
              }
            ),
            project.kaggleLink && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: project.kaggleLink,
                target: "_blank",
                rel: "noopener noreferrer",
                "data-ocid": "projects.modal.kaggle_link",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", className: "gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(KaggleIcon, { className: "w-4 h-4" }),
                  " View on Kaggle"
                ] })
              }
            )
          ] })
        ] })
      ]
    }
  ) });
}
export {
  ProjectCard as P,
  SkillBadge as S,
  ProjectModal as a
};
