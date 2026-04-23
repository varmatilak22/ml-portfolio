import { Button } from "@/components/ui/button";
import type { Project } from "@/types";
import { Github } from "lucide-react";
import SkillBadge from "./SkillBadge";

// Inline Kaggle "K" SVG icon
function KaggleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.358 0C7.324 0 0 7.163 0 16s7.324 16 16.358 16C25.39 32 32 25.163 32 16S25.39 0 16.358 0zm3.498 22.44l-4.47-5.002-1.29 1.274V22.4H10.5V9.6h3.596v5.49l5.43-5.49h4.387l-5.82 5.78 6.103 7.06h-4.34z" />
    </svg>
  );
}
import VideoEmbed from "./VideoEmbed";

interface ProjectCardProps {
  project: Project;
  index: number;
  onExpand?: (project: Project) => void;
  /** Show full description + embedded video (for modal/detail view) */
  expanded?: boolean;
}

export default function ProjectCard({
  project,
  index,
  onExpand,
  expanded = false,
}: ProjectCardProps) {
  return (
    <div
      className="card-elevated group overflow-hidden flex flex-col"
      data-ocid={`projects.project_card.${index}`}
    >
      {/* Media area */}
      {project.videoUrl ? (
        <div
          className={expanded ? "w-full" : ""}
          onClick={!expanded && onExpand ? () => onExpand(project) : undefined}
          onKeyDown={
            !expanded && onExpand
              ? (e) => e.key === "Enter" && onExpand(project)
              : undefined
          }
          role={!expanded && onExpand ? "button" : undefined}
          tabIndex={!expanded && onExpand ? 0 : undefined}
          style={!expanded && onExpand ? { cursor: "pointer" } : undefined}
        >
          {expanded ? (
            <VideoEmbed
              videoUrl={project.videoUrl}
              thumbnailUrl={project.thumbnailUrl ?? undefined}
              title={project.title}
              autoPlay={false}
            />
          ) : (
            <div className="relative aspect-video bg-muted overflow-hidden">
              {project.thumbnailUrl ? (
                <img
                  src={project.thumbnailUrl}
                  alt={`${project.title} thumbnail`}
                  className="w-full h-full object-cover transition-smooth group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                  <span className="text-muted-foreground text-xs">
                    Video available
                  </span>
                </div>
              )}
              {/* Play overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-foreground/10 opacity-0 group-hover:opacity-100 transition-smooth">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center shadow-lg transition-smooth group-hover:scale-110">
                  <svg
                    className="w-5 h-5 text-accent-foreground ml-0.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : project.thumbnailUrl ? (
        <div
          className="relative aspect-video bg-muted overflow-hidden"
          onClick={!expanded && onExpand ? () => onExpand(project) : undefined}
          onKeyDown={
            !expanded && onExpand
              ? (e) => e.key === "Enter" && onExpand(project)
              : undefined
          }
          role={!expanded && onExpand ? "button" : undefined}
          tabIndex={!expanded && onExpand ? 0 : undefined}
          style={!expanded && onExpand ? { cursor: "pointer" } : undefined}
        >
          <img
            src={project.thumbnailUrl}
            alt={`${project.title} thumbnail`}
            className="w-full h-full object-cover transition-smooth group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="aspect-video bg-muted/50 flex items-center justify-center">
          <span className="text-muted-foreground text-xs font-mono">
            [ no preview ]
          </span>
        </div>
      )}

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <button
          type="button"
          className="text-left"
          onClick={onExpand ? () => onExpand(project) : undefined}
        >
          <h3 className="font-display font-semibold text-lg text-foreground mb-1.5 truncate group-hover:text-accent transition-smooth">
            {project.title}
          </h3>
        </button>
        <p
          className={`text-muted-foreground text-sm mb-4 ${expanded ? "" : "line-clamp-2"}`}
        >
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag, ti) => (
            <SkillBadge key={tag} skill={tag} index={ti + 1} />
          ))}
        </div>
        <div className="flex items-center gap-2 mt-auto">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid={`projects.github_link.${index}`}
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-muted-foreground hover:text-foreground"
              >
                <Github className="w-4 h-4 mr-1" /> GitHub
              </Button>
            </a>
          )}
          {project.kaggleLink && (
            <a
              href={project.kaggleLink}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid={`projects.kaggle_link.${index}`}
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-muted-foreground hover:text-foreground"
              >
                <KaggleIcon className="w-4 h-4 mr-1" /> Kaggle
              </Button>
            </a>
          )}
          {onExpand && !expanded && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-accent hover:text-accent ml-auto"
              onClick={() => onExpand(project)}
              data-ocid={`projects.expand_button.${index}`}
            >
              Details →
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
