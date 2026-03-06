import {
  Sidebar as BrandSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/brand/sidebar";
import { Bell } from "@/components/icons/bell";
import { Home } from "@/components/icons/home";
import { KLogo, KorraLogo } from "@/components/icons/korra-logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  LayoutGrid,
  type LucideIcon,
  Plus,
  Search,
} from "lucide-react";

type ActivePage =
  | "Transactions"
  | "Notifications"
  | "Apps";

interface SidebarProps {
  activePage?: ActivePage;
}

const navItems: {
  title: ActivePage;
  icon: LucideIcon | typeof Home | typeof Bell;
}[] = [
  { title: "Transactions", icon: Home },
  { title: "Notifications", icon: Bell },
  { title: "Apps", icon: LayoutGrid },
];

export function Sidebar({ activePage = "Transactions" }: SidebarProps) {
  return (
    <BrandSidebar>
      <SidebarHeader>
        <span className="relative flex w-full items-center gap-2 group-data-[collapsible=icon]:w-auto group-data-[collapsible=icon]:justify-center">
          <div className="transition-opacity duration-150 ease-linear group-data-[collapsible=icon]:pointer-events-none group-data-[collapsible=icon]:absolute group-data-[collapsible=icon]:opacity-0">
            <KorraLogo className="h-5" />
          </div>
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-150 ease-linear group-data-[collapsible=icon]:pointer-events-auto group-data-[collapsible=icon]:relative group-data-[collapsible=icon]:top-auto group-data-[collapsible=icon]:left-auto group-data-[collapsible=icon]:translate-x-0 group-data-[collapsible=icon]:translate-y-0 group-data-[collapsible=icon]:opacity-100">
            <KLogo className="h-5" />
          </div>
        </span>
        <div className="flex items-center gap-[5px] transition-[opacity,margin] duration-150 ease-linear group-data-[collapsible=icon]:hidden">
          <Button
            className="h-[29px] w-[29px] rounded-full border border-sidebar-border bg-sidebar shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] hover:bg-sidebar-accent"
            size="icon"
            variant="ghost"
          >
            <Search className="size-2.5 text-foreground" strokeWidth={2.5} />
          </Button>
          <Button
            className="h-[29px] w-[29px] rounded-full border border-sidebar-border bg-sidebar shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] hover:bg-sidebar-accent"
            size="icon"
            variant="ghost"
          >
            <Plus className="size-3 text-foreground" strokeWidth={2.5} />
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = item.title === activePage;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                    >
                      <span className="flex w-full cursor-default items-center gap-2.5 group-data-[collapsible=icon]:w-auto group-data-[collapsible=icon]:justify-center">
                        <item.icon
                          className={cn(
                            "size-3.5 shrink-0",
                            isActive
                              ? "text-[#2A84B1]"
                              : "text-muted-foreground"
                          )}
                          size={14}
                        />
                        <span className="font-medium text-sidebar-primary text-sm leading-[130%] tracking-0 transition-[opacity,margin] duration-150 ease-linear [leading-trim:both] [text-edge:cap] group-data-[collapsible=icon]:hidden">
                          {item.title}
                        </span>
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem className="flex group-data-[collapsible=icon]:justify-center">
            <span className="truncate text-muted-foreground text-xs">
              Acme Reinsurance Corp
            </span>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </BrandSidebar>
  );
}
