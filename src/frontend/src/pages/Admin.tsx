import Layout from "@/components/Layout";
import { ProfileTab } from "@/components/admin/ProfileTab";
import { ProjectsTab } from "@/components/admin/ProjectsTab";
import { SkillsTab } from "@/components/admin/SkillsTab";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsAdmin } from "@/hooks/useAdmin";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { LogIn, ShieldAlert } from "lucide-react";

export default function Admin() {
  const { isAuthenticated, login } = useInternetIdentity();
  const { data: isAdmin, isLoading: adminLoading } = useIsAdmin();

  if (!isAuthenticated) {
    return (
      <Layout>
        <div
          className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4"
          data-ocid="admin.login_page"
        >
          <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-5">
            <LogIn className="w-7 h-7 text-accent" />
          </div>
          <h1 className="text-display-lg text-foreground mb-2">Admin Panel</h1>
          <p className="text-muted-foreground text-sm mb-7 max-w-xs leading-relaxed">
            Sign in with Internet Identity to manage your portfolio content.
          </p>
          <Button
            onClick={login}
            className="bg-accent text-accent-foreground hover:bg-accent/90 px-6"
            data-ocid="admin.login_button"
          >
            <LogIn className="w-4 h-4 mr-2" />
            Sign In with Internet Identity
          </Button>
        </div>
      </Layout>
    );
  }

  if (adminLoading) {
    return (
      <Layout>
        <div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-6"
          data-ocid="admin.loading_state"
        >
          <Skeleton className="h-10 w-56" />
          <Skeleton className="h-10 w-72" />
          <Skeleton className="h-64 rounded-lg" />
        </div>
      </Layout>
    );
  }

  if (!isAdmin) {
    return (
      <Layout>
        <div
          className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4"
          data-ocid="admin.access_denied_page"
        >
          <div className="w-16 h-16 rounded-full bg-destructive/10 border border-destructive/20 flex items-center justify-center mb-5">
            <ShieldAlert className="w-7 h-7 text-destructive" />
          </div>
          <h1 className="text-display-lg text-foreground mb-2">
            Access Denied
          </h1>
          <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
            Your account does not have admin privileges for this portfolio.
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-background min-h-screen" data-ocid="admin.page">
        {/* Admin header band */}
        <div className="border-b border-border bg-card">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center gap-3 mb-1">
              <span className="w-2 h-2 rounded-full bg-accent inline-block" />
              <span className="text-xs font-semibold text-accent uppercase tracking-widest">
                Admin
              </span>
            </div>
            <h1 className="text-display-lg text-foreground">Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Manage your ML portfolio content
            </p>
          </div>
        </div>

        {/* Tabbed content */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Tabs defaultValue="projects" data-ocid="admin.tabs">
            <TabsList
              className="mb-8 bg-muted/50 border border-border"
              data-ocid="admin.tab_list"
            >
              <TabsTrigger
                value="projects"
                className="data-[state=active]:bg-card data-[state=active]:shadow-sm"
                data-ocid="admin.projects_tab_trigger"
              >
                Projects
              </TabsTrigger>
              <TabsTrigger
                value="skills"
                className="data-[state=active]:bg-card data-[state=active]:shadow-sm"
                data-ocid="admin.skills_tab_trigger"
              >
                Skills
              </TabsTrigger>
              <TabsTrigger
                value="profile"
                className="data-[state=active]:bg-card data-[state=active]:shadow-sm"
                data-ocid="admin.profile_tab_trigger"
              >
                Profile
              </TabsTrigger>
            </TabsList>

            <TabsContent value="projects">
              <ProjectsTab />
            </TabsContent>
            <TabsContent value="skills">
              <SkillsTab />
            </TabsContent>
            <TabsContent value="profile">
              <ProfileTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
