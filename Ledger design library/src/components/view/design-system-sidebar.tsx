import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  BookOpen,
  Box,
  ChevronRight,
  Grid3X3,
  MoonIcon,
  Palette,
  Pipette,
  Shapes,
  SunIcon,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

interface RegistryItemSummary {
  name: string;
  title?: string;
  description?: string;
}

interface DesignSystemSidebarProps {
  components: RegistryItemSummary[];
  blocks: RegistryItemSummary[];
}

export function DesignSystemSidebar({
  components,
  blocks,
}: DesignSystemSidebarProps) {
  const location = useLocation();
  const pathname = location.pathname;
  const [theme, setThemeState] = useState<"light" | "dark">("light");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setThemeState(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === "light" ? "dark" : "light";
    setThemeState(next);
    document.documentElement.classList.toggle("dark", next === "dark");
  }, [theme]);

  const isActive = (url: string) => {
    return pathname === url || pathname.startsWith(`${url}/`);
  };

  return (
    <Sidebar collapsible="icon" side="left" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Palette className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
              <span className="block truncate font-semibold">
                Design System
              </span>
              <span className="block truncate text-muted-foreground text-xs">
                Component Library
              </span>
            </div>
            <div className="flex items-center gap-1 group-data-[collapsible=icon]:hidden">
              <SidebarTrigger className="h-8 w-8" />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu className="hidden group-data-[collapsible=icon]:flex">
          <SidebarMenuItem>
            <SidebarTrigger className="h-8 w-8" />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link className="font-medium" to="/design-system">
                  <BookOpen />
                  <span>Introduction</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive("/design-system/colors")}
              >
                <Link to="/design-system/colors">
                  <Pipette />
                  <span>Colors</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive("/design-system/icons")}
              >
                <Link to="/design-system/icons">
                  <Shapes />
                  <span>Icons</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {components.length > 0 && (
              <Collapsible asChild className="group/collapsible" defaultOpen>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="Components">
                      <Box />
                      <span>Components</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {components.map((component) => (
                        <SidebarMenuSubItem key={component.name}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={isActive(
                              `/design-system/components/${component.name}`
                            )}
                          >
                            <Link
                              to={`/design-system/components/${component.name}`}
                            >
                              {component.title || component.name}
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            )}
            {blocks.length > 0 && (
              <Collapsible asChild className="group/collapsible" defaultOpen>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="Blocks">
                      <Grid3X3 />
                      <span>Blocks</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {blocks.map((block) => (
                        <SidebarMenuSubItem key={block.name}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={isActive(
                              `/design-system/blocks/${block.name}`
                            )}
                          >
                            <Link
                              to={`/design-system/blocks/${block.name}`}
                            >
                              {block.title || block.name}
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={toggleTheme}
              size="sm"
              tooltip="Toggle theme"
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
              <span>Toggle theme</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
