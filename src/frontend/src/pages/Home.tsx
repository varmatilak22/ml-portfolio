import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";
import SkillBadge from "@/components/SkillBadge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useProfile } from "@/hooks/useProfile";
import { useProjects } from "@/hooks/useProjects";
import { useSkills } from "@/hooks/useSkills";
import type { Project } from "@/types";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Github, Linkedin } from "lucide-react";
import { useState } from "react";

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
  "Docker",
];

export default function Home() {
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: skills, isLoading: skillsLoading } = useSkills();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const featuredProjects = (projects ?? []).slice(0, 3);
  const displaySkills =
    (skills ?? []).length > 0 ? (skills ?? []) : FALLBACK_SKILLS;

  return (
    <Layout>
      {/* ───── Hero ───── */}
      <section
        className="bg-background border-b border-border overflow-hidden"
        data-ocid="home.hero_section"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 relative">
          {/* Decorative accent blob */}
          <div
            className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.05]"
            style={{ background: "oklch(var(--accent))" }}
            aria-hidden="true"
          />
          {profileLoading ? (
            <div className="space-y-4 max-w-2xl">
              <Skeleton className="h-5 w-32 rounded-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-6 w-96" />
              <div className="flex gap-3 pt-2">
                <Skeleton className="h-10 w-40 rounded-md" />
                <Skeleton className="h-10 w-32 rounded-md" />
              </div>
            </div>
          ) : (
            <div className="animate-fade-up max-w-2xl">
              <span
                className="badge-accent mb-5 inline-block"
                data-ocid="home.hero_badge"
              >
                {profile?.title ?? "Applied ML Engineer"}
              </span>
              <h1 className="text-display-xl text-foreground mb-5 leading-[1.05]">
                {profile?.name ? (
                  <>
                    Hi, I'm <span className="text-accent">{profile.name}</span>
                  </>
                ) : (
                  <>
                    ML <span className="text-accent">Engineer</span>
                    <br />
                    Portfolio
                  </>
                )}
              </h1>
              <p className="text-body-lg text-muted-foreground max-w-lg mb-8">
                {profile?.bio ||
                  "Building production-ready ML systems — from research prototypes to deployed models. Passionate about NLP, Computer Vision, and measurable impact."}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  className="bg-accent text-accent-foreground hover:bg-accent/90 px-6"
                  data-ocid="home.cta_projects_button"
                >
                  <Link to="/projects">
                    View Projects <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  data-ocid="home.cta_github_button"
                >
                  <a
                    href={profile?.socialLinks?.github || "https://github.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4 mr-2" /> GitHub
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  data-ocid="home.cta_linkedin_button"
                >
                  <a
                    href={
                      profile?.socialLinks?.linkedin || "https://linkedin.com"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="w-4 h-4 mr-2" /> LinkedIn
                  </a>
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ───── Featured Projects ───── */}
      <section
        className="bg-muted/30 border-b border-border"
        data-ocid="home.projects_section"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-mono text-accent uppercase tracking-widest mb-1">
                Selected work
              </p>
              <h2 className="text-display-md text-foreground">
                Featured Projects
              </h2>
            </div>
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-accent hover:text-accent"
              data-ocid="home.view_all_button"
            >
              <Link to="/projects">
                View all <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>

          {projectsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {["fp1", "fp2", "fp3"].map((k) => (
                <Skeleton key={k} className="h-72 rounded-lg" />
              ))}
            </div>
          ) : featuredProjects.length === 0 ? (
            <div
              className="text-center py-16 border border-dashed border-border rounded-xl text-muted-foreground"
              data-ocid="home.projects_empty_state"
            >
              <p className="font-display text-lg mb-2">No projects yet</p>
              <p className="text-sm">
                Add your ML projects from the admin panel.
              </p>
            </div>
          ) : (
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              data-ocid="home.projects_list"
            >
              {featuredProjects.map((project, i) => (
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
      </section>

      {/* ───── Skills ───── */}
      <section className="bg-background" data-ocid="home.skills_section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-xs font-mono text-accent uppercase tracking-widest mb-1">
            Expertise
          </p>
          <h2 className="text-display-md text-foreground mb-2">
            Skills & Technologies
          </h2>
          <p className="text-muted-foreground text-sm mb-8">
            Tools and frameworks I use to build ML systems
          </p>

          {skillsLoading ? (
            <div className="flex flex-wrap gap-2">
              {[
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
                "sk12",
              ].map((k) => (
                <Skeleton key={k} className="h-8 w-24 rounded-full" />
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2" data-ocid="home.skills_list">
              {displaySkills.map((skill, i) => (
                <SkillBadge
                  key={skill}
                  skill={skill}
                  index={i + 1}
                  size="md"
                  variant={i % 7 === 0 ? "accent" : "default"}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Project detail modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </Layout>
  );
}
