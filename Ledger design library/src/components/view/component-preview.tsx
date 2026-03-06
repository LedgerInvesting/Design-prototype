import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { highlightCode } from "@/lib/highlight-code";
import { Check, Clipboard } from "lucide-react";
import { Suspense, useEffect, useState, type ComponentType } from "react";

interface ComponentPreviewProps {
  title: string;
  code: string;
  component: React.LazyExoticComponent<ComponentType>;
}

export function ComponentPreview({
  title,
  code,
  component: Component,
}: ComponentPreviewProps) {
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const { copyToClipboard, isCopied } = useCopyToClipboard();
  const [highlightedCode, setHighlightedCode] = useState<string>("");

  useEffect(() => {
    if (tab === "code" && !highlightedCode) {
      highlightCode(code).then(setHighlightedCode);
    }
  }, [tab, code, highlightedCode]);

  return (
    <div className="relative flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-sm text-muted-foreground">{title}</h3>
      </div>
      <Tabs
        className="relative mr-auto w-full"
        onValueChange={(value) => setTab(value as "preview" | "code")}
        value={tab}
      >
        <div className="flex items-center justify-between">
          <TabsList className="justify-start gap-4 rounded-none bg-transparent px-0">
            <TabsTrigger
              className="px-0 text-base text-muted-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none"
              value="preview"
            >
              Preview
            </TabsTrigger>
            <TabsTrigger
              className="px-0 text-base text-muted-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none"
              value="code"
            >
              Code
            </TabsTrigger>
          </TabsList>
          {tab === "code" && (
            <Button
              className="size-7"
              onClick={() => copyToClipboard(code)}
              size="icon"
              variant="ghost"
            >
              {isCopied ? <Check /> : <Clipboard />}
              <span className="sr-only">Copy code</span>
            </Button>
          )}
        </div>
      </Tabs>
      <div
        className="relative overflow-hidden rounded-lg border"
        data-tab={tab}
        style={{ minHeight: "120px" }}
      >
        <div
          className={cn(
            "flex items-center justify-center p-8",
            tab !== "preview" && "hidden"
          )}
        >
          <Suspense
            fallback={
              <div className="text-muted-foreground text-sm">Loading...</div>
            }
          >
            <Component />
          </Suspense>
        </div>
        <div
          className={cn(
            "overflow-hidden bg-zinc-950 text-white",
            tab !== "code" && "hidden"
          )}
        >
          {highlightedCode ? (
            <div
              className="no-scrollbar overflow-auto p-4"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki-highlighted HTML
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />
          ) : (
            <div className="p-4 text-muted-foreground text-sm">
              Loading syntax highlighting...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
