import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import {
  AppLayout,
  AppLayoutContent,
} from "./components/brand/app-layout";
import { Sidebar } from "./pages/home/components/sidebar";
import { DesignSystemLayout } from "./components/view/design-system-layout";
import { DesignSystemSidebar } from "./components/view/design-system-sidebar";
import { components, blocks } from "./config/registry";
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("./pages/home/page"));
const TransactionDetailPage = lazy(
  () => import("./pages/transaction-detail/page")
);
const DesignSystemIndex = lazy(
  () => import("./pages/design-system/index")
);
const ComponentPage = lazy(
  () => import("./pages/design-system/component-page")
);
const BlockPage = lazy(
  () => import("./pages/design-system/block-page")
);
const ColorsPage = lazy(
  () => import("./pages/design-system/colors-page")
);
const IconsPage = lazy(
  () => import("./pages/design-system/icons-page")
);

function AppShell() {
  return (
    <AppLayout>
      <Sidebar />
      <AppLayoutContent>
        <Suspense
          fallback={
            <div className="flex h-full items-center justify-center text-muted-foreground">
              Loading...
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </AppLayoutContent>
    </AppLayout>
  );
}

function DesignSystemShell() {
  return (
    <DesignSystemLayout
      sidebar={<DesignSystemSidebar blocks={blocks} components={components} />}
    >
      <Suspense
        fallback={
          <div className="flex h-full items-center justify-center text-muted-foreground">
            Loading...
          </div>
        }
      >
        <Routes>
          <Route element={<DesignSystemIndex />} index />
          <Route element={<ComponentPage />} path="components/:name" />
          <Route element={<BlockPage />} path="blocks/:name" />
          <Route element={<ColorsPage />} path="colors" />
          <Route element={<IconsPage />} path="icons" />
        </Routes>
      </Suspense>
    </DesignSystemLayout>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route element={<HomePage />} index />
          <Route element={<TransactionDetailPage />} path="transactions/:id" />
        </Route>
        <Route element={<DesignSystemShell />} path="/design-system/*" />
      </Routes>
    </BrowserRouter>
  );
}
