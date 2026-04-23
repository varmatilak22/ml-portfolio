import { c as createLucideIcon, u as useProfile, r as reactExports, j as jsxRuntimeExports, L as Layout, S as Skeleton, B as Button, a as Link, G as Github, b as Linkedin } from "./index-CtTdumja.js";
import { P as ProjectCard, S as SkillBadge, a as ProjectModal } from "./ProjectModal-CE-TyZQS.js";
import { u as useProjects } from "./useProjects-DJJ1qgjf.js";
import { u as useSkills } from "./useSkills-BSs8-D8u.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode);
const FALLBACK_SKILLS = [
  "Python",
  "PyTorch",
  "TensorFlow",
  "Scikit-learn",
  "Neural Networks",
  "CNNs",
  "Transformers",
  "Fine-tuning",
  "NLP",
  "Computer Vision",
  "Generative AI",
  "Time Series",
  "Kaggle",
  "Jupyter",
  "Git",
  "Docker"
];
function Home() {
  var _a, _b;
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: skills, isLoading: skillsLoading } = useSkills();
  const [selectedProject, setSelectedProject] = reactExports.useState(null);
  const featuredProjects = (projects ?? []).slice(0, 3);
  const displaySkills = (skills ?? []).length > 0 ? skills ?? [] : FALLBACK_SKILLS;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-background border-b border-border overflow-hidden",
        "data-ocid": "home.hero_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.05]",
              style: { background: "oklch(var(--accent))" },
              "aria-hidden": "true"
            }
          ),
          profileLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 max-w-2xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-32 rounded-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-96" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-40 rounded-md" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-32 rounded-md" })
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fade-up max-w-2xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "badge-accent mb-5 inline-block",
                "data-ocid": "home.hero_badge",
                children: (profile == null ? void 0 : profile.title) ?? "Applied ML Engineer"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-display-xl text-foreground mb-5 leading-[1.05]", children: (profile == null ? void 0 : profile.name) ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              "Hi, I'm ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: profile.name })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              "ML ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "Engineer" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              "Portfolio"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-lg text-muted-foreground max-w-lg mb-8", children: (profile == null ? void 0 : profile.bio) || "Building production-ready ML systems — from research prototypes to deployed models. Passionate about NLP, Computer Vision, and measurable impact." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  asChild: true,
                  className: "bg-accent text-accent-foreground hover:bg-accent/90 px-6",
                  "data-ocid": "home.cta_projects_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/projects", children: [
                    "View Projects ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-2" })
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  asChild: true,
                  variant: "outline",
                  "data-ocid": "home.cta_github_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "a",
                    {
                      href: ((_a = profile == null ? void 0 : profile.socialLinks) == null ? void 0 : _a.github) || "https://github.com",
                      target: "_blank",
                      rel: "noopener noreferrer",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Github, { className: "w-4 h-4 mr-2" }),
                        " GitHub"
                      ]
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  asChild: true,
                  variant: "outline",
                  "data-ocid": "home.cta_linkedin_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "a",
                    {
                      href: ((_b = profile == null ? void 0 : profile.socialLinks) == null ? void 0 : _b.linkedin) || "https://linkedin.com",
                      target: "_blank",
                      rel: "noopener noreferrer",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Linkedin, { className: "w-4 h-4 mr-2" }),
                        " LinkedIn"
                      ]
                    }
                  )
                }
              )
            ] })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-muted/30 border-b border-border",
        "data-ocid": "home.projects_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-accent uppercase tracking-widest mb-1", children: "Selected work" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-display-md text-foreground", children: "Featured Projects" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                variant: "ghost",
                size: "sm",
                className: "text-accent hover:text-accent",
                "data-ocid": "home.view_all_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/projects", children: [
                  "View all ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-1" })
                ] })
              }
            )
          ] }),
          projectsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: ["fp1", "fp2", "fp3"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-72 rounded-lg" }, k)) }) : featuredProjects.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-center py-16 border border-dashed border-border rounded-xl text-muted-foreground",
              "data-ocid": "home.projects_empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg mb-2", children: "No projects yet" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Add your ML projects from the admin panel." })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-1 md:grid-cols-3 gap-6",
              "data-ocid": "home.projects_list",
              children: featuredProjects.map((project, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                ProjectCard,
                {
                  project,
                  index: i + 1,
                  onExpand: setSelectedProject
                },
                project.id.toString()
              ))
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background", "data-ocid": "home.skills_section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-accent uppercase tracking-widest mb-1", children: "Expertise" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-display-md text-foreground mb-2", children: "Skills & Technologies" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-8", children: "Tools and frameworks I use to build ML systems" }),
      skillsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: [
        "sk1",
        "sk2",
        "sk3",
        "sk4",
        "sk5",
        "sk6",
        "sk7",
        "sk8",
        "sk9",
        "sk10",
        "sk11",
        "sk12"
      ].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-24 rounded-full" }, k)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", "data-ocid": "home.skills_list", children: displaySkills.map((skill, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        SkillBadge,
        {
          skill,
          index: i + 1,
          size: "md",
          variant: i % 7 === 0 ? "accent" : "default"
        },
        skill
      )) })
    ] }) }),
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
  Home as default
};
