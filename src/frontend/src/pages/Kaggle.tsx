import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useKaggleNotebooks, useKaggleStats } from "@/hooks/useKaggle";
import {
  BarChart3,
  BookOpen,
  ExternalLink,
  ThumbsUp,
  Trophy,
} from "lucide-react";

function StatCard({
  value,
  label,
  icon,
}: {
  value: string | number;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="card-elevated p-6 flex flex-col items-center text-center gap-2">
      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-1">
        {icon}
      </div>
      <span className="font-display text-3xl font-bold text-foreground">
        {value}
      </span>
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}

function MedalCard({
  emoji,
  count,
  label,
}: { emoji: string; count: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 px-6 py-4 rounded-lg bg-muted/40 border border-border">
      <span className="text-3xl leading-none">{emoji}</span>
      <span className="font-display text-2xl font-bold text-foreground">
        {count}
      </span>
      <span className="text-xs text-muted-foreground font-medium">{label}</span>
    </div>
  );
}

export default function Kaggle() {
  const { data: stats, isLoading: statsLoading } = useKaggleStats();
  const { data: notebooks, isLoading: notebooksLoading } = useKaggleNotebooks();

  const hasStats = !!stats;
  const hasNotebooks = notebooks && notebooks.length > 0;

  return (
    <Layout>
      <div className="bg-background" data-ocid="kaggle.page">
        {/* Page header */}
        <div className="border-b border-border bg-card">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <p className="text-xs font-mono text-accent uppercase tracking-widest mb-1">
              Data Science
            </p>
            <h1 className="text-display-lg text-foreground mb-2">Kaggle</h1>
            <p className="text-muted-foreground max-w-xl">
              Competitions, notebooks, and contributions to the data science
              community on Kaggle.
            </p>
          </div>
        </div>

        {/* Stats banner */}
        <div
          className="border-b border-border bg-muted/20"
          data-ocid="kaggle.stats_section"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {statsLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {[1, 2, 3, 4, 5].map((k) => (
                  <Skeleton key={k} className="h-32 rounded-lg" />
                ))}
              </div>
            ) : !hasStats ? (
              <div
                className="text-center py-16 border border-dashed border-border rounded-xl text-muted-foreground"
                data-ocid="kaggle.stats_empty_state"
              >
                <div className="text-4xl mb-4">📊</div>
                <p className="font-display text-xl font-semibold text-foreground mb-2">
                  No Kaggle stats yet
                </p>
                <p className="text-sm max-w-xs mx-auto">
                  Kaggle profile stats can be added through the admin panel.
                </p>
              </div>
            ) : (
              <div className="space-y-8 animate-fade-up">
                {/* Username + rank + profile link */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-foreground">
                      @{stats.username}
                    </h2>
                    {stats.rank && (
                      <p className="text-sm text-muted-foreground mt-0.5 flex items-center gap-1.5">
                        <Trophy className="w-3.5 h-3.5 text-accent" />
                        Rank:{" "}
                        <span className="font-semibold text-accent">
                          {stats.rank}
                        </span>
                      </p>
                    )}
                    {stats.bio && (
                      <p className="text-sm text-muted-foreground mt-1 max-w-lg">
                        {stats.bio}
                      </p>
                    )}
                  </div>
                  <a
                    href={stats.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid="kaggle.view_profile_button"
                  >
                    <Button
                      className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
                      size="sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Kaggle Profile
                    </Button>
                  </a>
                </div>

                {/* Activity stats */}
                <div
                  className="grid grid-cols-2 sm:grid-cols-3 gap-4"
                  data-ocid="kaggle.activity_stats"
                >
                  <StatCard
                    value={stats.totalNotebooks.toString()}
                    label="Notebooks"
                    icon={<BookOpen className="w-5 h-5" />}
                  />
                  <StatCard
                    value={stats.totalCompetitions.toString()}
                    label="Competitions"
                    icon={<BarChart3 className="w-5 h-5" />}
                  />
                  <StatCard
                    value={stats.totalDatasets.toString()}
                    label="Datasets"
                    icon={<Trophy className="w-5 h-5" />}
                  />
                </div>

                {/* Medals */}
                <div
                  className="flex flex-wrap items-center gap-4"
                  data-ocid="kaggle.medals_section"
                >
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest w-full mb-0">
                    Medals
                  </p>
                  <MedalCard
                    emoji="🥇"
                    count={Number(stats.medals.gold)}
                    label="Gold"
                  />
                  <MedalCard
                    emoji="🥈"
                    count={Number(stats.medals.silver)}
                    label="Silver"
                  />
                  <MedalCard
                    emoji="🥉"
                    count={Number(stats.medals.bronze)}
                    label="Bronze"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Notebooks grid */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <p className="text-xs font-mono text-accent uppercase tracking-widest mb-1">
              Published Work
            </p>
            <h2 className="text-display-md text-foreground">Notebooks</h2>
          </div>

          {notebooksLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((k) => (
                <Skeleton key={k} className="h-56 rounded-lg" />
              ))}
            </div>
          ) : !hasNotebooks ? (
            <div
              className="text-center py-24 border border-dashed border-border rounded-xl text-muted-foreground"
              data-ocid="kaggle.notebooks_empty_state"
            >
              <div className="text-4xl mb-4">📓</div>
              <p className="font-display text-xl font-semibold text-foreground mb-2">
                No notebooks yet
              </p>
              <p className="text-sm max-w-xs mx-auto mb-6">
                Notebooks will appear here once added from the admin panel.
              </p>
              {hasStats && stats.profileUrl && (
                <a
                  href={stats.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="kaggle.notebooks_empty_profile_link"
                >
                  <Button variant="outline" size="sm" className="gap-2">
                    <ExternalLink className="w-4 h-4" />
                    View on Kaggle
                  </Button>
                </a>
              )}
            </div>
          ) : (
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              data-ocid="kaggle.notebooks_list"
            >
              {notebooks.map((nb, i) => (
                <div
                  key={nb.id.toString()}
                  className="card-elevated flex flex-col p-5 gap-3 animate-fade-up"
                  style={{ animationDelay: `${i * 0.06}s`, opacity: 0 }}
                  data-ocid={`kaggle.notebook.${i + 1}`}
                >
                  {/* Title */}
                  <h3 className="font-display font-semibold text-base text-foreground leading-snug line-clamp-2 min-w-0">
                    {nb.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground line-clamp-2 flex-1 min-w-0">
                    {nb.description}
                  </p>

                  {/* Tags */}
                  {nb.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {nb.tags.slice(0, 4).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs px-2 py-0.5 font-normal"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {nb.tags.length > 4 && (
                        <span className="badge-skill text-xs">
                          +{nb.tags.length - 4}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Stats + CTA */}
                  <div className="flex items-center justify-between pt-1 border-t border-border mt-auto">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      {nb.votes !== undefined && nb.votes !== null && (
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="w-3.5 h-3.5" />
                          {nb.votes.toString()}
                        </span>
                      )}
                      {nb.views !== undefined && nb.views !== null && (
                        <span className="flex items-center gap-1">
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                          {nb.views.toString()}
                        </span>
                      )}
                    </div>
                    <a
                      href={nb.notebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-ocid={`kaggle.notebook_open_button.${i + 1}`}
                    >
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1.5 text-xs h-7 px-3 border-accent/30 text-accent hover:bg-accent/10"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Open
                      </Button>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
