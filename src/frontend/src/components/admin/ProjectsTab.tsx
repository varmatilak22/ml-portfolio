import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useAddProject,
  useDeleteProject,
  useProjects,
  useUpdateProject,
} from "@/hooks/useProjects";
import type { Project, ProjectInput } from "@/types";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ProjectForm } from "./ProjectForm";

const defaultProjectInput: ProjectInput = {
  title: "",
  description: "",
  githubLink: "",
  kaggleLink: "",
  videoUrl: "",
  thumbnailUrl: "",
  tags: [],
};

export function ProjectsTab() {
  const { data: projects, isLoading } = useProjects();
  const addProject = useAddProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();

  const [formOpen, setFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<bigint | null>(null);
  const [form, setForm] = useState<ProjectInput>(defaultProjectInput);
  const [tagsInput, setTagsInput] = useState("");

  const openAdd = () => {
    setEditingProject(null);
    setForm(defaultProjectInput);
    setTagsInput("");
    setFormOpen(true);
  };

  const openEdit = (p: Project) => {
    setEditingProject(p);
    setForm({
      title: p.title,
      description: p.description,
      githubLink: p.githubLink,
      kaggleLink: p.kaggleLink,
      videoUrl: p.videoUrl,
      thumbnailUrl: p.thumbnailUrl,
      tags: p.tags,
    });
    setTagsInput(p.tags.join(", "));
    setFormOpen(true);
  };

  const handleSubmit = async () => {
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const payload = { ...form, tags };
    try {
      if (editingProject) {
        await updateProject.mutateAsync({
          id: editingProject.id,
          input: payload,
        });
        toast.success("Project updated");
      } else {
        await addProject.mutateAsync(payload);
        toast.success("Project added");
      }
      setFormOpen(false);
    } catch {
      toast.error("Failed to save project");
    }
  };

  const handleDelete = async () => {
    if (deleteTarget === null) return;
    try {
      await deleteProject.mutateAsync(deleteTarget);
      toast.success("Project deleted");
    } catch {
      toast.error("Failed to delete project");
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div data-ocid="admin.projects_tab">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-display-md text-foreground">Projects</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage your ML/AI portfolio projects
          </p>
        </div>
        <Button
          onClick={openAdd}
          className="bg-accent text-accent-foreground hover:bg-accent/90"
          data-ocid="admin.add_project_button"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3" data-ocid="admin.projects.loading_state">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16 rounded-lg" />
          ))}
        </div>
      ) : (projects ?? []).length === 0 ? (
        <div
          className="text-center py-16 text-muted-foreground border border-dashed border-border rounded-lg"
          data-ocid="admin.projects.empty_state"
        >
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
            <Plus className="w-5 h-5 text-accent" />
          </div>
          <p className="font-display text-foreground mb-1">No projects yet</p>
          <p className="text-sm mb-4">
            Add your first ML/AI project to showcase.
          </p>
          <Button
            onClick={openAdd}
            variant="outline"
            size="sm"
            data-ocid="admin.empty_add_project_button"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
        </div>
      ) : (
        <div className="space-y-2" data-ocid="admin.projects_list">
          {(projects ?? []).map((p, i) => (
            <div
              key={p.id.toString()}
              className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg transition-smooth hover:border-accent/30 hover:shadow-subtle"
              data-ocid={`admin.project_row.${i + 1}`}
            >
              {p.thumbnailUrl ? (
                <img
                  src={p.thumbnailUrl}
                  alt={p.title}
                  className="w-14 h-10 object-cover rounded shrink-0"
                />
              ) : (
                <div className="w-14 h-10 bg-muted rounded shrink-0 flex items-center justify-center">
                  <span className="text-xs text-muted-foreground font-mono">
                    ML
                  </span>
                </div>
              )}

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate text-sm">
                  {p.title}
                </p>
                {p.tags.length > 0 && (
                  <p className="text-xs text-muted-foreground truncate mt-0.5">
                    {p.tags.slice(0, 4).join(" · ")}
                    {p.tags.length > 4 && ` +${p.tags.length - 4}`}
                  </p>
                )}
              </div>

              <div className="flex gap-1 shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => openEdit(p)}
                  data-ocid={`admin.edit_button.${i + 1}`}
                  aria-label="Edit project"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDeleteTarget(p.id)}
                  data-ocid={`admin.delete_button.${i + 1}`}
                  aria-label="Delete project"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ProjectForm
        open={formOpen}
        onOpenChange={setFormOpen}
        editingProject={editingProject}
        form={form}
        tagsInput={tagsInput}
        onFormChange={(updates) => setForm((f) => ({ ...f, ...updates }))}
        onTagsChange={setTagsInput}
        onSubmit={handleSubmit}
        isPending={addProject.isPending || updateProject.isPending}
      />

      <AlertDialog
        open={deleteTarget !== null}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
      >
        <AlertDialogContent data-ocid="admin.delete_project_dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this project?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The project will be permanently
              removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="admin.delete_cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-ocid="admin.delete_confirm_button"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
