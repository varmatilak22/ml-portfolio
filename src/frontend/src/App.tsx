import { Skeleton } from "@/components/ui/skeleton";
import { AuthProvider } from "@/context/AuthContext";
import NotFound from "@/pages/NotFound";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const Home = lazy(() => import("@/pages/Home"));
const Projects = lazy(() => import("@/pages/Projects"));
const Admin = lazy(() => import("@/pages/Admin"));

function PageLoader() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 space-y-6">
      <Skeleton className="h-12 w-64" />
      <Skeleton className="h-6 w-96" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-64 rounded-lg" />
        ))}
      </div>
    </div>
  );
}

const rootRoute = createRootRoute({
  component: () => (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  ),
  notFoundComponent: () => <NotFound />,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Home />
    </Suspense>
  ),
});

const projectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/projects",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Projects />
    </Suspense>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Admin />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  projectsRoute,
  adminRoute,
]);

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: () => <NotFound />,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
