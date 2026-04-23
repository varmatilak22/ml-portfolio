import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useProjects } from "@/hooks/useProjects";
import type { Project } from "@/types";
import { Search } from "lucide-react";
import { useState } from "react";

export default function Projects() {
  const { data: projects, isLoading } = useProjects();
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const allTags = Array.from(new Set((projects ?? []).flatMap((p) => p.tags)));

  const filtered = (projects ?? []).filter((p) => {
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchTag = !activeTag || p.tags.includes(activeTag);
    return matchSearch && matchTag;
  });

  return (
    <Layout>
      <div className="bg-background" data-ocid="projects.page">
        {/* Page header */}
        <div className="border-b border-border bg-card">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <p className="text-xs font-mono text-accent uppercase tracking-widest mb-1">
              Portfolio
            </p>
            <h1 className="text-display-lg text-foreground mb-2">
              All Projects
            </h1>
            <p className="text-muted-foreground">
              ML & AI engineering work — research to production
            </p>
          </div>
        </div>

        {/* Filters bar */}
        <div className="border-b border-border bg-muted/20 sticky top-[57px] z-10 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-40 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-8 text-sm"
                data-ocid="projects.search_input"
              />
            </div>

            <div
              className="flex flex-wrap gap-1.5"
              data-ocid="projects.tag_filters"
            >
              <button
                type="button"
                onClick={() => setActiveTag(null)}
                data-ocid="projects.tag_all"
                className={`badge-skill cursor-pointer transition-smooth ${
                  !activeTag
                    ? "bg-accent/10 text-accent border-accent/30"
                    : "hover:text-foreground"
                }`}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  data-ocid={`projects.tag_filter.${tag.toLowerCase().replace(/\s+/g, "_")}`}
                  className={`badge-skill cursor-pointer transition-smooth ${
                    activeTag === tag
                      ? "bg-accent/10 text-accent border-accent/30"
                      : "hover:text-foreground"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {(search || activeTag) && (
              <span className="text-xs text-muted-foreground ml-auto">
                {filtered.length} result{filtered.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>

        {/* Grid */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {["p1", "p2", "p3", "p4", "p5", "p6"].map((k) => (
                <Skeleton key={k} className="h-72 rounded-lg" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div
              className="text-center py-24 text-muted-foreground border border-dashed border-border rounded-xl"
              data-ocid="projects.empty_state"
            >
              <div className="text-4xl mb-4">🔬</div>
              <p className="font-display text-xl font-semibold text-foreground mb-2">
                {search || activeTag
                  ? "No matching projects"
                  : "No projects yet"}
              </p>
              <p className="text-sm max-w-xs mx-auto">
                {search || activeTag
                  ? "Try adjusting your search or filters."
                  : "Projects will appear here once added from the admin panel."}
              </p>
            </div>
          ) : (
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              data-ocid="projects.list"
            >
              {filtered.map((project, i) => (
                <ProjectCard
                  key={project.id.toString()}
                  project={project}
                  index={i + 1}
                  onExpand={setSelectedProject}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </Layout>
  );
}
