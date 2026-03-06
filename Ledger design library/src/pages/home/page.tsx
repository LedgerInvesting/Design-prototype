import {
  AppLayoutPage,
  AppLayoutPageHeader,
} from "@/components/brand/app-layout";
import {
  ColorCard,
  ColorCardContent,
  ColorCardCtaButton,
  ColorCardCtaContainer,
  ColorCardHeader,
  ColorCardHeaderTitle,
  ColorCardPatternLines,
} from "@/components/brand/color-card";
import { SidebarTrigger } from "@/components/brand/sidebar";
import { Plus } from "@/components/icons/plus";
import { TransactionsTable } from "./components/transactions-table";

export default function Page() {
  return (
    <AppLayoutPage>
      <AppLayoutPageHeader>
        <SidebarTrigger />
      </AppLayoutPageHeader>
      <div className="flex h-full flex-col overflow-y-auto pt-2 pl-2 pr-[50px] pb-2">
        <ColorCard>
          <ColorCardPatternLines />
          <ColorCardHeader className="py-7">
            <ColorCardHeaderTitle>
              Transactions Explorer
            </ColorCardHeaderTitle>
            <ColorCardCtaContainer>
              <ColorCardCtaButton>
                <Plus className="mr-2" />
                New Transaction
              </ColorCardCtaButton>
            </ColorCardCtaContainer>
          </ColorCardHeader>
          <ColorCardContent>
            <TransactionsTable />
          </ColorCardContent>
        </ColorCard>
      </div>
    </AppLayoutPage>
  );
}
