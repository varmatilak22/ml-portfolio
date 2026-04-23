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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  useAddKaggleNotebook,
  useDeleteKaggleNotebook,
  useKaggleNotebooks,
  useKaggleStats,
  useSetKaggleStats,
  useUpdateKaggleNotebook,
} from "@/hooks/useKaggle";
import type {
  KaggleMedals,
  KaggleNotebook,
  KaggleNotebookInput,
  KaggleStats,
} from "@/types";
import { BookOpen, Pencil, Plus, Settings, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const defaultNotebookInput: KaggleNotebookInput = {
  title: "",
  description: "",
  notebookUrl: "",
  tags: [],
  views: undefined,
  votes: undefined,
};

const defaultMedals: KaggleMedals = {
  gold: BigInt(0),
  silver: BigInt(0),
  bronze: BigInt(0),
};

const defaultStats: KaggleStats = {
  username: "",
  profileUrl: "",
  totalNotebooks: BigInt(0),
  totalCompetitions: BigInt(0),
  totalDatasets: BigInt(0),
  medals: defaultMedals,
  rank: undefined,
  bio: undefined,
};

interface NotebookFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editing: KaggleNotebook | null;
  form: KaggleNotebookInput;
  tagsInput: string;
  onFormChange: (updates: Partial<KaggleNotebookInput>) => void;
  onTagsChange: (v: string) => void;
  onSubmit: () => void;
  isPending: boolean;
}

function NotebookForm({
  open,
  onOpenChange,
  editing,
  form,
  tagsInput,
  onFormChange,
  onTagsChange,
  onSubmit,
  isPending,
}: NotebookFormProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        className="w-full sm:max-w-lg overflow-y-auto"
        data-ocid="admin.notebook_form_sheet"
      >
        <SheetHeader className="mb-6">
          <SheetTitle className="font-display text-xl">
            {editing ? "Edit Notebook" : "Add Notebook"}
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="nb-title">Title *</Label>
            <Input
              id="nb-title"
              value={form.title}
              onChange={(e) => onFormChange({ title: e.target.value })}
              placeholder="Notebook title"
              className="mt-1"
              data-ocid="admin.notebook_title_input"
            />
          </div>

          <div>
            <Label htmlFor="nb-url">Notebook URL *</Label>
            <Input
              id="nb-url"
              type="url"
              value={form.notebookUrl}
              onChange={(e) => onFormChange({ notebookUrl: e.target.value })}
              placeholder="https://kaggle.com/code/username/notebook"
              className="mt-1"
              data-ocid="admin.notebook_url_input"
            />
          </div>

          <div>
            <Label htmlFor="nb-description">Description</Label>
            <Textarea
              id="nb-description"
              value={form.description}
              onChange={(e) => onFormChange({ description: e.target.value })}
              placeholder="What this notebook covers..."
              rows={3}
              className="mt-1"
              data-ocid="admin.notebook_description_textarea"
            />
          </div>

          <div>
            <Label htmlFor="nb-tags">Tags (comma-separated)</Label>
            <Input
              id="nb-tags"
              value={tagsInput}
              onChange={(e) => onTagsChange(e.target.value)}
              placeholder="EDA, PyTorch, NLP"
              className="mt-1"
              data-ocid="admin.notebook_tags_input"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="nb-votes">Votes</Label>
              <Input
                id="nb-votes"
                type="number"
                min={0}
                value={form.votes !== undefined ? form.votes.toString() : ""}
                onChange={(e) =>
                  onFormChange({
                    votes: e.target.value ? BigInt(e.target.value) : undefined,
                  })
                }
                placeholder="0"
                className="mt-1"
                data-ocid="admin.notebook_votes_input"
              />
            </div>
            <div>
              <Label htmlFor="nb-views">Views</Label>
              <Input
                id="nb-views"
                type="number"
                min={0}
                value={form.views !== undefined ? form.views.toString() : ""}
                onChange={(e) =>
                  onFormChange({
                    views: e.target.value ? BigInt(e.target.value) : undefined,
                  })
                }
                placeholder="0"
                className="mt-1"
                data-ocid="admin.notebook_views_input"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={onSubmit}
              disabled={isPending || !form.title || !form.notebookUrl}
              className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
              data-ocid="admin.notebook_submit_button"
            >
              {isPending
                ? "Saving..."
                : editing
                  ? "Save Changes"
                  : "Add Notebook"}
            </Button>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              data-ocid="admin.notebook_cancel_button"
            >
              Cancel
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function StatsPanel() {
  const { data: stats, isLoading } = useKaggleStats();
  const setStats = useSetKaggleStats();
  const [statsOpen, setStatsOpen] = useState(false);
  const [form, setForm] = useState<KaggleStats | null>(null);

  if (isLoading) return <Skeleton className="h-24 rounded-lg" />;

  const current = form ?? stats ?? defaultStats;

  const updateField = (
    field: keyof Omit<KaggleStats, "medals">,
    value: string | bigint | undefined,
  ) => {
    setForm({ ...current, [field]: value });
  };

  const updateMedal = (key: keyof KaggleMedals, value: string) => {
    setForm({
      ...current,
      medals: { ...current.medals, [key]: BigInt(value || "0") },
    });
  };

  const handleSave = async () => {
    try {
      await setStats.mutateAsync(current);
      toast.success("Kaggle stats updated");
      setStatsOpen(false);
    } catch {
      toast.error("Failed to update Kaggle stats");
    }
  };

  return (
    <>
      <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg mb-6">
        <div>
          <p className="text-sm font-semibold text-foreground">
            {stats ? `@${stats.username}` : "Kaggle profile not set"}
          </p>
          {stats && (
            <p className="text-xs text-muted-foreground mt-0.5">
              {stats.totalNotebooks.toString()} notebooks ·{" "}
              {stats.totalCompetitions.toString()} competitions
              {stats.rank && ` · Rank: ${stats.rank}`}
            </p>
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setForm(stats ?? defaultStats);
            setStatsOpen(true);
          }}
          data-ocid="admin.edit_kaggle_stats_button"
          className="gap-1.5 text-xs"
        >
          <Settings className="w-3.5 h-3.5" />
          {stats ? "Edit Stats" : "Set Up Profile"}
        </Button>
      </div>

      <Sheet open={statsOpen} onOpenChange={setStatsOpen}>
        <SheetContent
          className="w-full sm:max-w-lg overflow-y-auto"
          data-ocid="admin.kaggle_stats_sheet"
        >
          <SheetHeader className="mb-6">
            <SheetTitle className="font-display text-xl">
              Kaggle Profile Stats
            </SheetTitle>
          </SheetHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="kg-username">Kaggle Username *</Label>
              <Input
                id="kg-username"
                value={current.username}
                onChange={(e) => updateField("username", e.target.value)}
                placeholder="yourusername"
                className="mt-1"
                data-ocid="admin.kaggle_username_input"
              />
            </div>

            <div>
              <Label htmlFor="kg-profile-url">Profile URL *</Label>
              <Input
                id="kg-profile-url"
                type="url"
                value={current.profileUrl}
                onChange={(e) => updateField("profileUrl", e.target.value)}
                placeholder="https://kaggle.com/yourusername"
                className="mt-1"
                data-ocid="admin.kaggle_profile_url_input"
              />
            </div>

            <div>
              <Label htmlFor="kg-bio">Bio</Label>
              <Textarea
                id="kg-bio"
                value={current.bio ?? ""}
                onChange={(e) =>
                  updateField("bio", e.target.value || undefined)
                }
                placeholder="Short bio..."
                rows={2}
                className="mt-1"
                data-ocid="admin.kaggle_bio_textarea"
              />
            </div>

            <div>
              <Label htmlFor="kg-rank">Rank / Tier</Label>
              <Input
                id="kg-rank"
                value={current.rank ?? ""}
                onChange={(e) =>
                  updateField("rank", e.target.value || undefined)
                }
                placeholder="Expert, Master, etc."
                className="mt-1"
                data-ocid="admin.kaggle_rank_input"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              {(
                [
                  ["totalNotebooks", "Notebooks"],
                  ["totalCompetitions", "Competitions"],
                  ["totalDatasets", "Datasets"],
                ] as [keyof Omit<KaggleStats, "medals">, string][]
              ).map(([field, label]) => (
                <div key={field}>
                  <Label htmlFor={`kg-${field}`}>{label}</Label>
                  <Input
                    id={`kg-${field}`}
                    type="number"
                    min={0}
                    value={(current[field] as bigint).toString()}
                    onChange={(e) =>
                      updateField(field, BigInt(e.target.value || "0"))
                    }
                    className="mt-1"
                    data-ocid={`admin.kaggle_${field}_input`}
                  />
                </div>
              ))}
            </div>

            <div>
              <Label className="mb-2 block">Medals</Label>
              <div className="grid grid-cols-3 gap-3">
                {(
                  [
                    ["gold", "🥇 Gold"],
                    ["silver", "🥈 Silver"],
                    ["bronze", "🥉 Bronze"],
                  ] as [keyof KaggleMedals, string][]
                ).map(([key, label]) => (
                  <div key={key}>
                    <Label htmlFor={`kg-medal-${key}`} className="text-xs">
                      {label}
                    </Label>
                    <Input
                      id={`kg-medal-${key}`}
                      type="number"
                      min={0}
                      value={current.medals[key].toString()}
                      onChange={(e) => updateMedal(key, e.target.value)}
                      className="mt-1"
                      data-ocid={`admin.kaggle_medal_${key}_input`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleSave}
                disabled={setStats.isPending || !current.username}
                className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                data-ocid="admin.kaggle_stats_save_button"
              >
                {setStats.isPending ? "Saving..." : "Save Stats"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setStatsOpen(false)}
                data-ocid="admin.kaggle_stats_cancel_button"
              >
                Cancel
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export function KaggleTab() {
  const { data: notebooks, isLoading } = useKaggleNotebooks();
  const addNotebook = useAddKaggleNotebook();
  const updateNotebook = useUpdateKaggleNotebook();
  const deleteNotebook = useDeleteKaggleNotebook();

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<KaggleNotebook | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<bigint | null>(null);
  const [form, setForm] = useState<KaggleNotebookInput>(defaultNotebookInput);
  const [tagsInput, setTagsInput] = useState("");

  const openAdd = () => {
    setEditing(null);
    setForm(defaultNotebookInput);
    setTagsInput("");
    setFormOpen(true);
  };

  const openEdit = (nb: KaggleNotebook) => {
    setEditing(nb);
    setForm({
      title: nb.title,
      description: nb.description,
      notebookUrl: nb.notebookUrl,
      tags: nb.tags,
      views: nb.views,
      votes: nb.votes,
    });
    setTagsInput(nb.tags.join(", "));
    setFormOpen(true);
  };

  const handleSubmit = async () => {
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const payload = { ...form, tags };
    try {
      if (editing) {
        await updateNotebook.mutateAsync({ id: editing.id, input: payload });
        toast.success("Notebook updated");
      } else {
        await addNotebook.mutateAsync(payload);
        toast.success("Notebook added");
      }
      setFormOpen(false);
    } catch {
      toast.error("Failed to save notebook");
    }
  };

  const handleDelete = async () => {
    if (deleteTarget === null) return;
    try {
      await deleteNotebook.mutateAsync(deleteTarget);
      toast.success("Notebook deleted");
    } catch {
      toast.error("Failed to delete notebook");
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div data-ocid="admin.kaggle_tab">
      <div className="mb-6">
        <h2 className="text-display-md text-foreground">Kaggle</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Manage your Kaggle profile stats and notebooks
        </p>
      </div>

      <StatsPanel />

      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5" />
          Notebooks
        </p>
        <Button
          onClick={openAdd}
          size="sm"
          className="bg-accent text-accent-foreground hover:bg-accent/90"
          data-ocid="admin.add_notebook_button"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Add Notebook
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3" data-ocid="admin.kaggle.loading_state">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16 rounded-lg" />
          ))}
        </div>
      ) : (notebooks ?? []).length === 0 ? (
        <div
          className="text-center py-16 text-muted-foreground border border-dashed border-border rounded-lg"
          data-ocid="admin.kaggle.empty_state"
        >
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
            <BookOpen className="w-5 h-5 text-accent" />
          </div>
          <p className="font-display text-foreground mb-1">No notebooks yet</p>
          <p className="text-sm mb-4">
            Add your Kaggle notebooks to showcase on your portfolio.
          </p>
          <Button
            onClick={openAdd}
            variant="outline"
            size="sm"
            data-ocid="admin.empty_add_notebook_button"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Notebook
          </Button>
        </div>
      ) : (
        <div className="space-y-2" data-ocid="admin.kaggle_notebooks_list">
          {(notebooks ?? []).map((nb, i) => (
            <div
              key={nb.id.toString()}
              className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg transition-smooth hover:border-accent/30 hover:shadow-subtle"
              data-ocid={`admin.notebook_row.${i + 1}`}
            >
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate text-sm">
                  {nb.title}
                </p>
                {nb.tags.length > 0 && (
                  <p className="text-xs text-muted-foreground truncate mt-0.5">
                    {nb.tags.slice(0, 4).join(" · ")}
                    {nb.tags.length > 4 && ` +${nb.tags.length - 4}`}
                  </p>
                )}
              </div>

              <div className="flex gap-1 shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => openEdit(nb)}
                  data-ocid={`admin.notebook_edit_button.${i + 1}`}
                  aria-label="Edit notebook"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDeleteTarget(nb.id)}
                  data-ocid={`admin.notebook_delete_button.${i + 1}`}
                  aria-label="Delete notebook"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <NotebookForm
        open={formOpen}
        onOpenChange={setFormOpen}
        editing={editing}
        form={form}
        tagsInput={tagsInput}
        onFormChange={(updates) => setForm((f) => ({ ...f, ...updates }))}
        onTagsChange={setTagsInput}
        onSubmit={handleSubmit}
        isPending={addNotebook.isPending || updateNotebook.isPending}
      />

      <AlertDialog
        open={deleteTarget !== null}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
      >
        <AlertDialogContent data-ocid="admin.delete_notebook_dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this notebook?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The notebook will be removed from
              your portfolio.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="admin.notebook_delete_cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-ocid="admin.notebook_delete_confirm_button"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
