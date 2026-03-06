import { create } from "zustand";

export interface Tab {
  id: string;
  name: string;
}

interface TabsState {
  tabs: Tab[];
  openTab: (tab: Tab) => void;
  closeTab: (id: string) => void;
}

export const useTabsStore = create<TabsState>((set) => ({
  tabs: [],
  openTab: (tab) =>
    set((state) => {
      if (state.tabs.some((t) => t.id === tab.id)) {
        return state;
      }
      return { tabs: [...state.tabs, tab] };
    }),
  closeTab: (id) =>
    set((state) => ({
      tabs: state.tabs.filter((t) => t.id !== id),
    })),
}));
