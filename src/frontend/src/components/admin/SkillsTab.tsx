import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useSkills, useUpdateSkills } from "@/hooks/useSkills";
import { useState } from "react";
import { toast } from "sonner";

export function SkillsTab() {
  const { data: skills, isLoading } = useSkills();
  const updateSkills = useUpdateSkills();
  const [skillsText, setSkillsText] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="space-y-4" data-ocid="admin.skills.loading_state">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-32 rounded-lg" />
      </div>
    );
  }

  const current = skillsText ?? (skills ?? []).join(", ");
  const parsedSkills = current
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const handleSave = async () => {
    try {
      await updateSkills.mutateAsync(parsedSkills);
      toast.success("Skills updated");
    } catch {
      toast.error("Failed to update skills");
    }
  };

  return (
    <div data-ocid="admin.skills_tab">
      <div className="mb-6">
        <h2 className="text-display-md text-foreground">Skills</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Enter your technical skills as a comma-separated list
        </p>
      </div>

      <div className="max-w-xl space-y-5">
        <Textarea
          value={current}
          onChange={(e) => setSkillsText(e.target.value)}
          placeholder="Python, PyTorch, TensorFlow, NLP, Computer Vision, Scikit-learn, Pandas, NumPy, Keras, Hugging Face..."
          rows={6}
          className="font-mono text-sm"
          data-ocid="admin.skills_textarea"
        />

        {parsedSkills.length > 0 && (
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
              Preview — {parsedSkills.length} skill
              {parsedSkills.length !== 1 ? "s" : ""}
            </p>
            <div className="flex flex-wrap gap-2">
              {parsedSkills.map((s) => (
                <span key={s} className="badge-skill">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        <Button
          onClick={handleSave}
          disabled={updateSkills.isPending || parsedSkills.length === 0}
          className="bg-accent text-accent-foreground hover:bg-accent/90"
          data-ocid="admin.skills_save_button"
        >
          {updateSkills.isPending ? "Saving..." : "Save Skills"}
        </Button>
      </div>
    </div>
  );
}
