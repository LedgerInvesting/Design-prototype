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
import { Document } from "@/components/icons/document";
import { Home } from "@/components/icons/home";
import { X } from "@/components/icons/x";
import { KLogo, KorraLogo } from "@/components/icons/korra-logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTabsStore } from "@/stores/tabs-store";
import {
  LayoutGrid,
  type LucideIcon,
  Plus,
  Search,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link, useLocation, useNavigate } from "react-router-dom";

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
  href: string;
}[] = [
  { title: "Transactions", icon: Home, href: "/" },
  { title: "Notifications", icon: Bell, href: "/" },
  { title: "Apps", icon: LayoutGrid, href: "/" },
];

export function Sidebar({ activePage = "Transactions" }: SidebarProps) {
  const tabs = useTabsStore((s) => s.tabs);
  const closeTab = useTabsStore((s) => s.closeTab);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleCloseTab = (id: string) => {
    const index = tabs.findIndex((t) => t.id === id);
    const isActive = pathname === `/transactions/${id}`;

    if (isActive) {
      if (tabs.length === 1) {
        navigate("/");
      } else {
        const next = tabs[index - 1] ?? tabs[index + 1];
        if (next) navigate(`/transactions/${next.id}`);
      }
    }

    closeTab(id);
  };

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
                const isActive = !pathname.startsWith("/transactions/") && item.title === activePage;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                    >
                      <Link
                        className="flex w-full items-center gap-2.5 group-data-[collapsible=icon]:w-auto group-data-[collapsible=icon]:justify-center"
                        to={item.href}
                      >
                        <item.icon
                          className={cn(
                            "size-3.5 shrink-0",
                            isActive
                              ? "text-muted-brand"
                              : "text-muted-foreground"
                          )}
                          size={14}
                        />
                        <span className="font-medium text-sm leading-[130%] tracking-0 transition-[opacity,margin] duration-150 ease-linear [leading-trim:both] [text-edge:cap] group-data-[collapsible=icon]:hidden">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {tabs.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>Recent</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {tabs.map((tab) => {
                  const tabPath = `/transactions/${tab.id}`;
                  const isActive = pathname === tabPath;
                  return (
                    <SidebarMenuItem key={tab.id}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SidebarMenuButton
                            asChild
                            isActive={isActive}
                            tooltip={tab.name}
                          >
                            <Link
                              className="flex w-full items-center gap-2.5 group-data-[collapsible=icon]:w-auto group-data-[collapsible=icon]:justify-center"
                              to={tabPath}
                            >
                              <Document
                                className={cn(
                                  "size-3.5 shrink-0",
                                  isActive ? "text-muted-brand" : "text-muted-foreground"
                                )}
                              />
                              <span className="font-medium text-sm leading-[130%] tracking-0 truncate transition-[opacity,margin] duration-150 ease-linear [leading-trim:both] [text-edge:cap] group-data-[collapsible=icon]:hidden">
                                {tab.name}
                              </span>
                            </Link>
                          </SidebarMenuButton>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          {tab.name}
                        </TooltipContent>
                      </Tooltip>
                      <button
                        className={cn(
                          "absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-0.5 transition-opacity hover:bg-sidebar-accent group-data-[collapsible=icon]:hidden",
                          isActive ? "opacity-100" : "opacity-0 group-hover/menu-item:opacity-100"
                        )}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleCloseTab(tab.id);
                        }}
                        type="button"
                      >
                        <X className="size-3 text-muted-foreground" />
                      </button>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
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
