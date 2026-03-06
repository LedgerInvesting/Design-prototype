import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

// --- 1. Global Shell (Layout Wrapper) ---

export function AppLayout(props: ComponentProps<typeof SidebarProvider>) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "231px",
        } as React.CSSProperties
      }
      {...props}
    />
  );
}

export function AppLayoutContent({
  className,
  ...props
}: ComponentProps<typeof SidebarInset>) {
  return (
    <SidebarInset
      className={cn(
        "m-0! flex h-svh flex-col overflow-visible md:peer-data-[state=collapsed]:peer-data-[variant=inset]:pl-0 md:peer-data-[variant=inset]:shadow-none!",
        className
      )}
      {...props}
    />
  );
}

// --- 2. Page Layout ---

export function AppLayoutPage({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("flex h-full w-full flex-col overflow-hidden", className)}
      {...props}
    />
  );
}

export function AppLayoutPageHeader({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex h-[80px] min-h-[80px] shrink-0 items-center gap-2 bg-background px-4 md:rounded-tl-xl",
        className
      )}
      {...props}
    />
  );
}

export function AppLayoutPageInner({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex h-full min-h-full w-full flex-col rounded-4xl border border-border",
        className
      )}
      {...props}
    />
  );
}

export function AppLayoutPageInnerHeader({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn("flex items-center border-b px-6 py-4", className)}
      {...props}
    />
  );
}
