import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useProfile, useUpdateProfile } from "@/hooks/useProfile";
import type { Profile, SocialLinks } from "@/types";
import { useState } from "react";
import { toast } from "sonner";

const defaultSocialLinks: SocialLinks = {
  linkedin: "",
  github: "",
  kaggle: "",
  email: "",
};

const defaultProfile: Profile = {
  name: "",
  title: "",
  bio: "",
  socialLinks: defaultSocialLinks,
};

const socialLabels: Record<keyof SocialLinks, string> = {
  linkedin: "LinkedIn URL",
  github: "GitHub URL",
  kaggle: "Kaggle URL",
  email: "Email Address",
};

const socialPlaceholders: Record<keyof SocialLinks, string> = {
  linkedin: "https://linkedin.com/in/yourprofile",
  github: "https://github.com/yourusername",
  kaggle: "https://kaggle.com/yourusername",
  email: "you@email.com",
};

export function ProfileTab() {
  const { data: profile, isLoading } = useProfile();
  const updateProfile = useUpdateProfile();
  const [form, setForm] = useState<Profile | null>(null);

  if (isLoading) {
    return (
      <div className="space-y-4" data-ocid="admin.profile.loading_state">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-64 rounded-lg" />
      </div>
    );
  }

  const current = form ?? profile ?? defaultProfile;

  const updateField = (
    field: keyof Omit<Profile, "socialLinks">,
    value: string,
  ) => {
    setForm({ ...current, [field]: value });
  };

  const updateSocial = (key: keyof SocialLinks, value: string) => {
    setForm({
      ...current,
      socialLinks: { ...current.socialLinks, [key]: value },
    });
  };

  const handleSave = async () => {
    try {
      await updateProfile.mutateAsync(current);
      toast.success("Profile updated");
    } catch {
      toast.error("Failed to update profile");
    }
  };

  return (
    <div data-ocid="admin.profile_tab">
      <div className="mb-6">
        <h2 className="text-display-md text-foreground">Profile</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Your public-facing identity shown to recruiters
        </p>
      </div>

      <div className="max-w-xl space-y-5">
        {/* Identity */}
        <div className="space-y-4 p-5 bg-card border border-border rounded-lg">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Identity
          </p>

          <div>
            <Label htmlFor="profile-name">Full Name</Label>
            <Input
              id="profile-name"
              value={current.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Your full name"
              className="mt-1"
              data-ocid="admin.profile_name_input"
            />
          </div>

          <div>
            <Label htmlFor="profile-title">Professional Title</Label>
            <Input
              id="profile-title"
              value={current.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="ML Engineer · AI Researcher"
              className="mt-1"
              data-ocid="admin.profile_title_input"
            />
          </div>

          <div>
            <Label htmlFor="profile-bio">Bio</Label>
            <Textarea
              id="profile-bio"
              value={current.bio}
              onChange={(e) => updateField("bio", e.target.value)}
              placeholder="Short bio — what you do, your focus areas, and what makes you unique..."
              rows={4}
              className="mt-1"
              data-ocid="admin.profile_bio_textarea"
            />
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-4 p-5 bg-card border border-border rounded-lg">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Social Links
          </p>

          {(Object.keys(socialLabels) as Array<keyof SocialLinks>).map(
            (key) => (
              <div key={key}>
                <Label htmlFor={`social-${key}`}>{socialLabels[key]}</Label>
                <Input
                  id={`social-${key}`}
                  type={key === "email" ? "email" : "url"}
                  value={current.socialLinks[key]}
                  onChange={(e) => updateSocial(key, e.target.value)}
                  placeholder={socialPlaceholders[key]}
                  className="mt-1"
                  data-ocid={`admin.social_${key}_input`}
                />
              </div>
            ),
          )}
        </div>

        <Button
          onClick={handleSave}
          disabled={updateProfile.isPending}
          className="bg-accent text-accent-foreground hover:bg-accent/90"
          data-ocid="admin.profile_save_button"
        >
          {updateProfile.isPending ? "Saving..." : "Save Profile"}
        </Button>
      </div>
    </div>
  );
}
