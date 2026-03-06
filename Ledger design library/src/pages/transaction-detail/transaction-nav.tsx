import { Settings } from "@/components/icons/settings";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "dashboard",  label: "Dashboard"  },
  { id: "reporting",  label: "Reporting",  disabled: true },
  { id: "cession",    label: "Cession"    },
  { id: "insights",   label: "Insights"   },
  { id: "data",       label: "Data",       disabled: true },
  { id: "forecast",   label: "Forecast"   },
  { id: "query",      label: "Query"      },
] as const;

type TabId = (typeof TABS)[number]["id"];

interface TransactionNavProps {
  activeTab: TabId;
  notifications?: Partial<Record<TabId, number>>;
  onTabChange: (tab: TabId) => void;
  onClearNotification?: (tab: TabId) => void;
}

export function TransactionNav({
  activeTab,
  notifications = {},
  onTabChange,
  onClearNotification,
}: TransactionNavProps) {
  const handleTabClick = (tabId: TabId) => {
    onTabChange(tabId);
    if (notifications[tabId]) {
      onClearNotification?.(tabId);
    }
  };

  return (
    <div className="flex w-full items-center justify-between border-b border-border px-10 py-3 rounded-tl-[24px] rounded-tr-[24px]">
      <div className="flex items-center gap-0.5">
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          const isDisabled = "disabled" in tab && tab.disabled;
          const count = notifications[tab.id];
          return (
            <button
              className={cn(
                "flex h-[30px] items-center gap-2 rounded-full px-5 font-mono text-xs uppercase tracking-[1px] transition-colors",
                isDisabled
                  ? "cursor-not-allowed text-muted-foreground/40"
                  : isActive
                  ? "bg-muted-brand text-foreground"
                  : "bg-transparent text-muted-foreground hover:text-foreground"
              )}
              key={tab.id}
              onClick={() => !isDisabled && handleTabClick(tab.id)}
              disabled={isDisabled}
              type="button"
            >
              {tab.label}
              {count != null && count > 0 && (
                <span className="flex items-center justify-center rounded px-1 py-0.5 bg-[#fcdc6a] font-mono text-[10px] uppercase tracking-[1px] text-foreground leading-none">
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
      <Button size="sm" variant="secondary">
        <Settings className="size-4" />
        Settings
      </Button>
    </div>
  );
}

export { TABS };
export type { TabId };
