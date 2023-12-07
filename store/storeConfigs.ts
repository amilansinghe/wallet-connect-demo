import { create } from "zustand";

interface StoreState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const useStoreConfig = create<StoreState>((set) => ({
  isSidebarOpen: false,
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  numberOfNfts: 0,
}));
