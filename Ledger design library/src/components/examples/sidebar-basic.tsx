import {
  AppLayout,
  AppLayoutContent,
  AppLayoutPage,
  AppLayoutPageHeader,
} from "@/components/brand/app-layout";
import { Sidebar } from "@/components/examples/sidebar";

export function SidebarBasic() {
  return (
    <AppLayout>
      <Sidebar />
      <AppLayoutContent>
        <AppLayoutPage>
          <AppLayoutPageHeader>Dashboard</AppLayoutPageHeader>
          <div className="p-6">
            <p className="text-muted-foreground text-sm">
              The sidebar provides primary navigation with collapsible icon
              mode.
            </p>
          </div>
        </AppLayoutPage>
      </AppLayoutContent>
    </AppLayout>
  );
}
