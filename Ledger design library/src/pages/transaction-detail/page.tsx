import {
  AppLayoutPage,
  AppLayoutPageHeader,
} from "@/components/brand/app-layout";
import { SidebarTrigger } from "@/components/brand/sidebar";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { CessionTab } from "./tabs/cession-tab";
import { ForecastTab } from "./tabs/forecast-tab";
import { InsightsTab } from "./tabs/insights-tab";
import { QueryTab } from "./tabs/query-tab";
import { TransactionNav, type TabId } from "./transaction-nav";

// Demo notifications — replace with real data from your API/store
const MOCK_NOTIFICATIONS: Partial<Record<TabId, number>> = {
  query: 4,
};

function TabContent({ tab, transactionId }: { tab: TabId; transactionId: string }) {
  if (tab === "cession")  return <CessionTab transactionId={transactionId} />;
  if (tab === "insights") return <InsightsTab transactionId={transactionId} />;
  if (tab === "forecast") return <ForecastTab transactionId={transactionId} />;
  if (tab === "query")    return <QueryTab transactionId={transactionId} />;
  // Placeholder for tabs not yet implemented
  return (
    <p className="text-muted-foreground text-sm capitalize py-4">{tab}</p>
  );
}

export default function TransactionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<TabId>("dashboard");
  const [notifications, setNotifications] = useState<Partial<Record<TabId, number>>>(MOCK_NOTIFICATIONS);

  const handleClearNotification = (tabId: TabId) => {
    setNotifications((prev) => ({ ...prev, [tabId]: 0 }));
  };

  return (
    <AppLayoutPage className="overflow-y-auto">
      <AppLayoutPageHeader className="bg-transparent">
        <SidebarTrigger />
      </AppLayoutPageHeader>
      <div className="relative z-20 w-full pt-2 pl-2 pr-[50px] pb-9">
        <div
          className="w-full"
          style={{
            display: "flex",
            padding: "0",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "20px",
            borderRadius: "24px",
            background: "#FFF",
            boxShadow: "0 0 36px 0 rgba(0, 0, 0, 0.07)",
          }}
        >
          <TransactionNav
            activeTab={activeTab}
            notifications={notifications}
            onClearNotification={handleClearNotification}
            onTabChange={setActiveTab}
          />
          <div className="w-full px-10 pb-10">
            <TabContent tab={activeTab} transactionId={id ?? ""} />
          </div>
        </div>
      </div>
    </AppLayoutPage>
  );
}
