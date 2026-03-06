import {
  DesignSystemLayoutContent,
  DesignSystemLayoutHeader,
  DesignSystemLayoutHeaderTitle,
  DesignSystemLayoutPage,
} from "@/components/view/design-system-layout";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { blocks, blockComponents } from "@/config/registry";
import { useParams } from "react-router-dom";
import { Suspense } from "react";

export default function BlockPage() {
  const { name } = useParams<{ name: string }>();
  const block = blocks.find((b) => b.name === name);
  const BlockComponent = name ? blockComponents[name] : undefined;

  if (!block || !BlockComponent) {
    return (
      <DesignSystemLayoutPage>
        <DesignSystemLayoutContent>
          <div className="flex items-center justify-center p-12">
            <p className="text-muted-foreground">Block not found: {name}</p>
          </div>
        </DesignSystemLayoutContent>
      </DesignSystemLayoutPage>
    );
  }

  return (
    <DesignSystemLayoutPage>
      <DesignSystemLayoutHeader>
        <SidebarTrigger className="-ml-1" />
        <Separator className="mr-2 data-[orientation=vertical]:h-4" orientation="vertical" />
        <DesignSystemLayoutHeaderTitle>
          {block.title}
        </DesignSystemLayoutHeaderTitle>
      </DesignSystemLayoutHeader>
      <DesignSystemLayoutContent>
        <div className="space-y-4 p-6">
          <div className="space-y-2">
            <h1 className="font-bold text-3xl tracking-tight">
              {block.title}
            </h1>
            <p className="text-lg text-muted-foreground">
              {block.description}
            </p>
          </div>
          <div className="overflow-hidden rounded-lg border" style={{ height: "700px" }}>
            <Suspense
              fallback={
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  Loading block...
                </div>
              }
            >
              <BlockComponent />
            </Suspense>
          </div>
        </div>
      </DesignSystemLayoutContent>
    </DesignSystemLayoutPage>
  );
}
