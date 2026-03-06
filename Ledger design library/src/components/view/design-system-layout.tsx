import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function DesignSystemLayout({
  children,
  sidebar,
  defaultOpen = true,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      {sidebar}
      <div className="relative flex h-svh w-full flex-1 flex-col md:peer-data-[state=collapsed]:peer-data-[variant=inset]:pl-0 md:peer-data-[variant=inset]:p-2 md:peer-data-[variant=inset]:pl-0">
        <SidebarInset className="overflow-hidden rounded-xl bg-background shadow">
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

export function DesignSystemLayoutPage({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex h-full w-full flex-col overflow-hidden", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function DesignSystemLayoutHeader({
  className,
  children,
  ...props
}: React.ComponentProps<"header">) {
  return (
    <header
      className={cn(
        "flex h-12 shrink-0 items-center gap-2 border-b bg-background px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12",
        className
      )}
      {...props}
    >
      {children}
    </header>
  );
}

export function DesignSystemLayoutHeaderTitle({
  className,
  children,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      className={cn("truncate font-medium text-foreground text-sm", className)}
      {...props}
    >
      {children}
    </h1>
  );
}

export function DesignSystemLayoutContent({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex min-h-0 w-full flex-1 flex-col overflow-auto",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
