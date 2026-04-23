interface SkillBadgeProps {
  skill: string;
  variant?: "default" | "accent";
  size?: "sm" | "md";
  index?: number;
}

export default function SkillBadge({
  skill,
  variant = "default",
  size = "sm",
  index,
}: SkillBadgeProps) {
  const base =
    "inline-block rounded-full font-medium border transition-smooth cursor-default select-none";
  const sizeClass = size === "sm" ? "px-3 py-1 text-xs" : "px-4 py-1.5 text-sm";
  const variantClass =
    variant === "accent"
      ? "bg-accent/10 text-accent border-accent/25 hover:bg-accent/20"
      : "bg-muted text-muted-foreground border-border hover:bg-muted/80 hover:text-foreground";

  return (
    <span
      className={`${base} ${sizeClass} ${variantClass}`}
      data-ocid={index !== undefined ? `skills.badge.${index}` : undefined}
    >
      {skill}
    </span>
  );
}
