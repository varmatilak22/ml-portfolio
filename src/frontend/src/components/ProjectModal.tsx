import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Project } from "@/types";
import { Github } from "lucide-react";
import SkillBadge from "./SkillBadge";
import VideoEmbed from "./VideoEmbed";

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

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <Dialog open={!!project} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-2xl w-full p-0 overflow-hidden"
        data-ocid="projects.modal"
      >
        {/* Video embed */}
        {project.videoUrl && (
          <div className="w-full">
            <VideoEmbed
              videoUrl={project.videoUrl}
              thumbnailUrl={project.thumbnailUrl ?? undefined}
              title={project.title}
              autoPlay={false}
            />
          </div>
        )}
        {!project.videoUrl && project.thumbnailUrl && (
          <div className="aspect-video bg-muted overflow-hidden">
            <img
              src={project.thumbnailUrl}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          <DialogHeader className="mb-4">
            <DialogTitle className="font-display text-2xl font-bold text-foreground leading-tight">
              {project.title}
            </DialogTitle>
          </DialogHeader>

          <p className="text-muted-foreground leading-relaxed mb-5">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag, i) => (
              <SkillBadge
                key={tag}
                skill={tag}
                index={i + 1}
                variant="default"
                size="sm"
              />
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="projects.modal.github_link"
              >
                <Button variant="outline" size="sm" className="gap-2">
                  <Github className="w-4 h-4" /> View on GitHub
                </Button>
              </a>
            )}
            {project.kaggleLink && (
              <a
                href={project.kaggleLink}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="projects.modal.kaggle_link"
              >
                <Button variant="outline" size="sm" className="gap-2">
                  <KaggleIcon className="w-4 h-4" /> View on Kaggle
                </Button>
              </a>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
