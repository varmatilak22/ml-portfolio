import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <Layout>
      <div
        className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4"
        data-ocid="not_found.page"
      >
        <div className="mb-6">
          <span className="font-display text-8xl font-bold text-accent/20 select-none">
            404
          </span>
        </div>
        <h1 className="text-display-lg text-foreground mb-3">Page Not Found</h1>
        <p className="text-body-lg text-muted-foreground max-w-md mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-3">
          <Button
            asChild
            className="bg-accent text-accent-foreground hover:bg-accent/90"
            data-ocid="not_found.home_button"
          >
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Link>
          </Button>
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            data-ocid="not_found.back_button"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    </Layout>
  );
}
