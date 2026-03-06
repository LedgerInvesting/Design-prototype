import { KLogo, KorraLogo } from "@/components/icons/korra-logo";
import { ArrowDown } from "@/components/icons/arrow-down";
import { ArrowLeft } from "@/components/icons/arrow-left";
import { ArrowRight } from "@/components/icons/arrow-right";
import { ArrowUp } from "@/components/icons/arrow-up";
import { Attach } from "@/components/icons/attach";
import { Ban } from "@/components/icons/ban";
import { Bell } from "@/components/icons/bell";
import { Book } from "@/components/icons/book";
import { Bookmark } from "@/components/icons/bookmark";
import { Calculator } from "@/components/icons/calculator";
import { Calendar } from "@/components/icons/calendar";
import { Car } from "@/components/icons/car";
import { Card } from "@/components/icons/card";
import { ChartArea } from "@/components/icons/chart-area";
import { ChartBars } from "@/components/icons/chart-bars";
import { ChartBarsNoAxis } from "@/components/icons/chart-bars-no-axis";
import { ChartCandles } from "@/components/icons/chart-candles";
import { ChartPie } from "@/components/icons/chart-pie";
import { Chat } from "@/components/icons/chat";
import { Check } from "@/components/icons/check";
import { ChevronDown } from "@/components/icons/chevron-down";
import { ChevronLeft } from "@/components/icons/chevron-left";
import { ChevronRight } from "@/components/icons/chevron-right";
import { ChevronUp } from "@/components/icons/chevron-up";
import { ChevronsUpDown } from "@/components/icons/chevrons-up-down";
import { CircleAlert } from "@/components/icons/circle-alert";
import { CircleCheck } from "@/components/icons/circle-check";
import { CircleDashed } from "@/components/icons/circle-dashed";
import { CirclePlus } from "@/components/icons/circle-plus";
import { Clock } from "@/components/icons/clock";
import { Cloud } from "@/components/icons/cloud";
import { Contract } from "@/components/icons/contract";
import { Copy } from "@/components/icons/copy";
import { Document } from "@/components/icons/document";
import { Dot } from "@/components/icons/dot";
import { Download } from "@/components/icons/download";
import { Ellipsis } from "@/components/icons/ellipsis";
import { EllipsisVertical } from "@/components/icons/ellipsis-vertical";
import { Email } from "@/components/icons/email";
import { Eraser } from "@/components/icons/eraser";
import { Expand } from "@/components/icons/expand";
import { ExternalLink } from "@/components/icons/external-link";
import { Folder } from "@/components/icons/folder";
import { Globe } from "@/components/icons/globe";
import { GraphArrow } from "@/components/icons/graph-arrow";
import { Home } from "@/components/icons/home";
import { List } from "@/components/icons/list";
import { Lock } from "@/components/icons/lock";
import { Minus } from "@/components/icons/minus";
import { Pencil } from "@/components/icons/pencil";
import { Pin } from "@/components/icons/pin";
import { Plus } from "@/components/icons/plus";
import { Portfolio } from "@/components/icons/portfolio";
import { Printer } from "@/components/icons/printer";
import { Reload } from "@/components/icons/reload";
import { Search } from "@/components/icons/search";
import { Sent } from "@/components/icons/sent";
import { Settings } from "@/components/icons/settings";
import { Sidebar } from "@/components/icons/sidebar";
import { Slash } from "@/components/icons/slash";
import { Talk } from "@/components/icons/talk";
import { Terminal } from "@/components/icons/terminal";
import { Trash } from "@/components/icons/trash";
import { Unlock } from "@/components/icons/unlock";
import { Upload } from "@/components/icons/upload";
import { X } from "@/components/icons/x";
import type { IconProps, IconVariant } from "@/components/icons/types";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  DesignSystemLayoutContent,
  DesignSystemLayoutPage,
} from "@/components/view/design-system-layout";

const icons: {
  name: string;
  component: (props: IconProps) => React.JSX.Element;
}[] = [
  { name: "ArrowDown", component: ArrowDown },
  { name: "ArrowLeft", component: ArrowLeft },
  { name: "ArrowRight", component: ArrowRight },
  { name: "ArrowUp", component: ArrowUp },
  { name: "Attach", component: Attach },
  { name: "Ban", component: Ban },
  { name: "Bell", component: Bell },
  { name: "Book", component: Book },
  { name: "Bookmark", component: Bookmark },
  { name: "Calculator", component: Calculator },
  { name: "Calendar", component: Calendar },
  { name: "Car", component: Car },
  { name: "Card", component: Card },
  { name: "ChartArea", component: ChartArea },
  { name: "ChartBars", component: ChartBars },
  { name: "ChartBarsNoAxis", component: ChartBarsNoAxis },
  { name: "ChartCandles", component: ChartCandles },
  { name: "ChartPie", component: ChartPie },
  { name: "Chat", component: Chat },
  { name: "Check", component: Check },
  { name: "ChevronDown", component: ChevronDown },
  { name: "ChevronLeft", component: ChevronLeft },
  { name: "ChevronRight", component: ChevronRight },
  { name: "ChevronUp", component: ChevronUp },
  { name: "ChevronsUpDown", component: ChevronsUpDown },
  { name: "CircleAlert", component: CircleAlert },
  { name: "CircleCheck", component: CircleCheck },
  { name: "CircleDashed", component: CircleDashed },
  { name: "CirclePlus", component: CirclePlus },
  { name: "Clock", component: Clock },
  { name: "Cloud", component: Cloud },
  { name: "Contract", component: Contract },
  { name: "Copy", component: Copy },
  { name: "Document", component: Document },
  { name: "Dot", component: Dot },
  { name: "Download", component: Download },
  { name: "Ellipsis", component: Ellipsis },
  { name: "EllipsisVertical", component: EllipsisVertical },
  { name: "Email", component: Email },
  { name: "Eraser", component: Eraser },
  { name: "Expand", component: Expand },
  { name: "ExternalLink", component: ExternalLink },
  { name: "Folder", component: Folder },
  { name: "Globe", component: Globe },
  { name: "GraphArrow", component: GraphArrow },
  { name: "Home", component: Home },
  { name: "List", component: List },
  { name: "Lock", component: Lock },
  { name: "Minus", component: Minus },
  { name: "Pencil", component: Pencil },
  { name: "Pin", component: Pin },
  { name: "Plus", component: Plus },
  { name: "Portfolio", component: Portfolio },
  { name: "Printer", component: Printer },
  { name: "Reload", component: Reload },
  { name: "Search", component: Search },
  { name: "Sent", component: Sent },
  { name: "Settings", component: Settings },
  { name: "Sidebar", component: Sidebar },
  { name: "Slash", component: Slash },
  { name: "Talk", component: Talk },
  { name: "Terminal", component: Terminal },
  { name: "Trash", component: Trash },
  { name: "Unlock", component: Unlock },
  { name: "Upload", component: Upload },
  { name: "X", component: X },
];

function IconCell({
  name,
  variant,
  component: Icon,
}: {
  name: string;
  variant: IconVariant;
  component: (props: IconProps) => React.JSX.Element;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(name);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      className={cn(
        "group flex flex-col items-center gap-2 rounded-lg border p-3 text-left transition-colors hover:bg-muted/50",
        copied && "border-green-500/50 bg-green-50/50"
      )}
      onClick={handleCopy}
      type="button"
    >
      <Icon className="size-6 text-foreground" variant={variant} />
      <span className="text-center font-mono text-[10px] text-muted-foreground leading-tight">
        {name}
      </span>
    </button>
  );
}

function IconGrid({
  variant,
  label,
  description,
}: {
  variant: IconVariant;
  label: string;
  description: string;
}) {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="font-semibold text-2xl">{label}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
        {icons.map((icon) => (
          <IconCell key={icon.name} variant={variant} {...icon} />
        ))}
      </div>
    </section>
  );
}

const brandLogos = [
  { name: "KLogo", component: KLogo },
  { name: "KorraLogo", component: KorraLogo },
];

export default function IconsPage() {
  return (
    <DesignSystemLayoutPage>
      <DesignSystemLayoutContent>
        <div className="container mx-auto space-y-10 p-6">
          <div className="space-y-4">
            <h1 className="font-bold text-4xl tracking-tight">Icon Library</h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Custom icon set. {icons.length} stroke-based icons, 24&times;24px.
              Click any icon to copy its name.
            </p>
          </div>

          {/* Brand logos */}
          <section className="space-y-4">
            <div className="space-y-1">
              <h2 className="font-semibold text-2xl">Brand</h2>
              <p className="text-muted-foreground">Logo marks used across the product.</p>
            </div>
            <div className="flex gap-6">
              {brandLogos.map(({ name, component: Logo }) => (
                <div key={name} className="flex flex-col items-center gap-2 rounded-lg border p-4">
                  <Logo className="h-8 w-auto text-foreground" />
                  <span className="font-mono text-[10px] text-muted-foreground">{name}</span>
                </div>
              ))}
            </div>
          </section>

          <IconGrid description="Stroke width 2 — the default variant." label="Heavy" variant="heavy" />
          <IconGrid description="Stroke width 1.5 — a lighter variant." label="Thin" variant="thin" />
        </div>
      </DesignSystemLayoutContent>
    </DesignSystemLayoutPage>
  );
}
