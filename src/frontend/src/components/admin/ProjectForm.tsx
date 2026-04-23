import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Project, ProjectInput } from "@/types";

interface ProjectFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingProject: Project | null;
  form: ProjectInput;
  tagsInput: string;
  onFormChange: (updates: Partial<ProjectInput>) => void;
  onTagsChange: (value: string) => void;
  onSubmit: () => void;
  isPending: boolean;
}

export function ProjectForm({
  open,
  onOpenChange,
  editingProject,
  form,
  tagsInput,
  onFormChange,
  onTagsChange,
  onSubmit,
  isPending,
}: ProjectFormProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-lg max-h-[90vh] overflow-y-auto"
        data-ocid="admin.project_dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display">
            {editingProject ? "Edit Project" : "Add Project"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <Label htmlFor="proj-title">Title *</Label>
            <Input
              id="proj-title"
              value={form.title}
              onChange={(e) => onFormChange({ title: e.target.value })}
              placeholder="e.g. NLP Sentiment Analysis"
              data-ocid="admin.project_title_input"
            />
          </div>

          <div>
            <Label htmlFor="proj-desc">Description</Label>
            <Textarea
              id="proj-desc"
              value={form.description}
              onChange={(e) => onFormChange({ description: e.target.value })}
              placeholder="Brief project description..."
              rows={3}
              data-ocid="admin.project_description_textarea"
            />
          </div>

          <div>
            <Label htmlFor="proj-tags">Tags (comma separated)</Label>
            <Input
              id="proj-tags"
              value={tagsInput}
              onChange={(e) => onTagsChange(e.target.value)}
              placeholder="Python, PyTorch, NLP"
              data-ocid="admin.project_tags_input"
            />
          </div>

          <div>
            <Label htmlFor="proj-video">Video URL</Label>
            <Input
              id="proj-video"
              value={form.videoUrl}
              onChange={(e) => onFormChange({ videoUrl: e.target.value })}
              placeholder="YouTube or direct video URL"
              data-ocid="admin.project_video_input"
            />
          </div>

          <div>
            <Label htmlFor="proj-thumb">Thumbnail URL</Label>
            <Input
              id="proj-thumb"
              value={form.thumbnailUrl}
              onChange={(e) => onFormChange({ thumbnailUrl: e.target.value })}
              placeholder="https://..."
              data-ocid="admin.project_thumbnail_input"
            />
          </div>

          <div>
            <Label htmlFor="proj-github">GitHub URL</Label>
            <Input
              id="proj-github"
              value={form.githubLink}
              onChange={(e) => onFormChange({ githubLink: e.target.value })}
              placeholder="https://github.com/..."
              data-ocid="admin.project_github_input"
            />
          </div>

          <div>
            <Label htmlFor="proj-kaggle">Kaggle URL</Label>
            <Input
              id="proj-kaggle"
              value={form.kaggleLink}
              onChange={(e) => onFormChange({ kaggleLink: e.target.value })}
              placeholder="https://kaggle.com/..."
              data-ocid="admin.project_kaggle_input"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            data-ocid="admin.project_cancel_button"
          >
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            disabled={isPending || !form.title.trim()}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
            data-ocid="admin.project_submit_button"
          >
            {editingProject ? "Save Changes" : "Add Project"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
