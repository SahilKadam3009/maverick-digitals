import { Layout } from "@/components/Layout";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const Home = lazy(() =>
  import("@/pages/Home").then((m) => ({ default: m.Home })),
);
const Services = lazy(() =>
  import("@/pages/Services").then((m) => ({ default: m.Services })),
);
const Industries = lazy(() =>
  import("@/pages/Industries").then((m) => ({ default: m.Industries })),
);
const CaseStudies = lazy(() =>
  import("@/pages/CaseStudies").then((m) => ({ default: m.CaseStudies })),
);
const About = lazy(() =>
  import("@/pages/About").then((m) => ({ default: m.About })),
);
const Blog = lazy(() =>
  import("@/pages/Blog").then((m) => ({ default: m.Blog })),
);
const Contact = lazy(() =>
  import("@/pages/Contact").then((m) => ({ default: m.Contact })),
);

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </Layout>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services",
  component: Services,
});
const industriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/industries",
  component: Industries,
});
const caseStudiesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/case-studies",
  component: CaseStudies,
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});
const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog",
  component: Blog,
});
const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: Contact,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  servicesRoute,
  industriesRoute,
  caseStudiesRoute,
  aboutRoute,
  blogRoute,
  contactRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
