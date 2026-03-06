import {
  Sidebar as ShadcnSidebar,
  SidebarContent as ShadcnSidebarContent,
  SidebarFooter as ShadcnSidebarFooter,
  SidebarGroup as ShadcnSidebarGroup,
  SidebarGroupContent as ShadcnSidebarGroupContent,
  SidebarGroupLabel as ShadcnSidebarGroupLabel,
  SidebarHeader as ShadcnSidebarHeader,
  SidebarMenu as ShadcnSidebarMenu,
  SidebarMenuAction as ShadcnSidebarMenuAction,
  SidebarMenuButton as ShadcnSidebarMenuButton,
  SidebarMenuItem as ShadcnSidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import type * as React from "react";
import { PanelCollapseLeft } from "../icons/panel-collapse-left";
import { Button } from "../ui/button";

export interface SidebarProps
  extends React.ComponentProps<typeof ShadcnSidebar> {}

export function Sidebar({ className, style, ...props }: SidebarProps) {
  return (
    <ShadcnSidebar
      className={cn(
        "flex! h-full w-[231px] flex-col items-start justify-between",
        "pt-4 pr-[30px] pb-[30px] pl-[30px]",
        "p-[16px_30px_30px_30px]!",
        "border-r-0",
        "**:data-[slot=sidebar-inner]:gap-[30px]",
        "group-data-[collapsible=icon]:p-3!",
        "group-data-[collapsible=icon]:px-3",
        className
      )}
      collapsible="icon"
      style={
        {
          "--sidebar-width-icon": "4rem",
          ...style,
        } as React.CSSProperties
      }
      variant="inset"
      {...props}
    />
  );
}

export function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      className={cn(
        "size-7 text-muted-foreground hover:text-muted-foreground",
        className
      )}
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      size="icon"
      variant="ghost"
      {...props}
    >
      <PanelCollapseLeft />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}

export function SidebarHeader({
  className,
  ...props
}: React.ComponentProps<typeof ShadcnSidebarHeader>) {
  return (
    <ShadcnSidebarHeader
      className={cn(
        "flex flex-row items-center justify-between self-stretch px-0 pt-2 pb-5",
        "group-data-[collapsible=icon]:justify-center",
        "group-data-[collapsible=icon]:mt-[8px]",
        className
      )}
      {...props}
    />
  );
}

export function SidebarContent({
  className,
  ...props
}: React.ComponentProps<typeof ShadcnSidebarContent>) {
  return (
    <ShadcnSidebarContent
      className={cn(
        "gap-[30px] overflow-x-hidden",
        "group-data-[collapsible=icon]:items-center",
        className
      )}
      {...props}
    />
  );
}

export function SidebarFooter({
  className,
  ...props
}: React.ComponentProps<typeof ShadcnSidebarFooter>) {
  return (
    <ShadcnSidebarFooter
      className={cn(
        "border-sidebar-border/50",
        "group-data-[collapsible=icon]:items-center",
        className
      )}
      {...props}
    />
  );
}

export function SidebarGroup({
  className,
  ...props
}: React.ComponentProps<typeof ShadcnSidebarGroup>) {
  return (
    <ShadcnSidebarGroup
      className={cn(
        "p-0",
        "group-data-[collapsible=icon]:items-center",
        className
      )}
      {...props}
    />
  );
}

export function SidebarGroupLabel({
  className,
  ...props
}: React.ComponentProps<typeof ShadcnSidebarGroupLabel>) {
  return (
    <ShadcnSidebarGroupLabel
      className={cn(
        "mb-2.5 h-auto gap-2.5 px-0 pb-1.5",
        "font-medium text-sidebar-primary text-xs uppercase leading-[120%] tracking-[1px]",
        "[font-family:var(--font-sohne-mono)] [leading-trim:both] [text-edge:cap]",
        "[&>svg]:size-4",
        className
      )}
      {...props}
    />
  );
}

export function SidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<typeof ShadcnSidebarGroupContent>) {
  return <ShadcnSidebarGroupContent className={cn(className)} {...props} />;
}

export function SidebarMenu({
  className,
  ...props
}: React.ComponentProps<typeof ShadcnSidebarMenu>) {
  return (
    <ShadcnSidebarMenu
      className={cn(
        "gap-0",
        "group-data-[collapsible=icon]:items-center",
        className
      )}
      {...props}
    />
  );
}

export function SidebarMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof ShadcnSidebarMenuItem>) {
  return (
    <ShadcnSidebarMenuItem
      className={cn(
        "group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center",
        className
      )}
      {...props}
    />
  );
}

export interface SidebarMenuButtonProps
  extends React.ComponentProps<typeof ShadcnSidebarMenuButton> {
  isActive?: boolean;
}

export function SidebarMenuButton({
  isActive,
  className,
  children,
  ...props
}: SidebarMenuButtonProps) {
  return (
    <ShadcnSidebarMenuButton
      className={cn(
        "h-auto rounded-full px-5 py-3.5 transition-colors",
        "gap-2.5 font-semibold text-sm",
        "group-data-[collapsible=icon]:justify-center",
        "group-data-[collapsible=icon]:size-10",
        "group-data-[collapsible=icon]:p-0",
        "group-data-[collapsible=icon]:text-center",
        !isActive && [
          "bg-background text-muted-foreground",
          "hover:bg-sidebar-accent hover:text-foreground",
        ],
        isActive && [
          "bg-primary! text-primary-foreground!",
          "hover:bg-primary!",
        ],
        className
      )}
      isActive={isActive}
      {...props}
    >
      {children}
    </ShadcnSidebarMenuButton>
  );
}

export function SidebarMenuAction({
  className,
  ...props
}: React.ComponentProps<typeof ShadcnSidebarMenuAction>) {
  return (
    <ShadcnSidebarMenuAction
      className={cn("rounded-full", className)}
      {...props}
    />
  );
}
