import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, L as Layout, S as Skeleton } from "./index-CtTdumja.js";
import { P as ProjectCard, a as ProjectModal } from "./ProjectModal-CE-TyZQS.js";
import { I as Input } from "./input-Dy2LJX1J.js";
import { u as useProjects } from "./useProjects-DJJ1qgjf.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
function Projects() {
  const { data: projects, isLoading } = useProjects();
  const [search, setSearch] = reactExports.useState("");
  const [activeTag, setActiveTag] = reactExports.useState(null);
  const [selectedProject, setSelectedProject] = reactExports.useState(null);
  const allTags = Array.from(new Set((projects ?? []).flatMap((p) => p.tags)));
  const filtered = (projects ?? []).filter((p) => {
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()) || p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchTag = !activeTag || p.tags.includes(activeTag);
    return matchSearch && matchTag;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background", "data-ocid": "projects.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-accent uppercase tracking-widest mb-1", children: "Portfolio" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-display-lg text-foreground mb-2", children: "All Projects" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "ML & AI engineering work — research to production" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border bg-muted/20 sticky top-[57px] z-10 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-40 max-w-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Search projects...",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              className: "pl-9 h-8 text-sm",
              "data-ocid": "projects.search_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-wrap gap-1.5",
            "data-ocid": "projects.tag_filters",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setActiveTag(null),
                  "data-ocid": "projects.tag_all",
                  className: `badge-skill cursor-pointer transition-smooth ${!activeTag ? "bg-accent/10 text-accent border-accent/30" : "hover:text-foreground"}`,
                  children: "All"
                }
              ),
              allTags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setActiveTag(activeTag === tag ? null : tag),
                  "data-ocid": `projects.tag_filter.${tag.toLowerCase().replace(/\s+/g, "_")}`,
                  className: `badge-skill cursor-pointer transition-smooth ${activeTag === tag ? "bg-accent/10 text-accent border-accent/30" : "hover:text-foreground"}`,
                  children: tag
                },
                tag
              ))
            ]
          }
        ),
        (search || activeTag) && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground ml-auto", children: [
          filtered.length,
          " result",
          filtered.length !== 1 ? "s" : ""
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: ["p1", "p2", "p3", "p4", "p5", "p6"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-72 rounded-lg" }, k)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-24 text-muted-foreground border border-dashed border-border rounded-xl",
          "data-ocid": "projects.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-4", children: "🔬" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl font-semibold text-foreground mb-2", children: search || activeTag ? "No matching projects" : "No projects yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm max-w-xs mx-auto", children: search || activeTag ? "Try adjusting your search or filters." : "Projects will appear here once added from the admin panel." })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
          "data-ocid": "projects.list",
          children: filtered.map((project, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            ProjectCard,
            {
              project,
              index: i + 1,
              onExpand: setSelectedProject
            },
            project.id.toString()
          ))
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ProjectModal,
      {
        project: selectedProject,
        onClose: () => setSelectedProject(null)
      }
    )
  ] });
}
export {
  Projects as default
};
