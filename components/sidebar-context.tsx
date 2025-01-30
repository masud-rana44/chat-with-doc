"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type SideBarContextType = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const SidebarContext = createContext<SideBarContextType | null>(null);

function SidebarContextProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        onOpen: () => setIsOpen(true),
        onClose: () => setIsOpen(false),
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

function useSidebar() {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("Sidebar context can't access outside sidebar provider.");
  }

  return context;
}

export { SidebarContextProvider, useSidebar };
