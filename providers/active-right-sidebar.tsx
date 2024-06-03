"use client";

import { PropsWithChildren, createContext, useContext, useState } from "react";

type Props = PropsWithChildren & {};

const RightSidebarContext = createContext<{
  activeItem: string;
  onChange: (item: string) => void;
} | null>(null);

export default function ActiveRightSidebarProvider({ children }: Props) {
  const [activeItem, setActiveItem] = useState<string>("");

  const handleChangeActiveItem = (item: string) => {
    setActiveItem(item);
  };

  return (
    <RightSidebarContext.Provider
      value={{
        activeItem,
        onChange: handleChangeActiveItem,
      }}
    >
      {children}
    </RightSidebarContext.Provider>
  );
}

export function useActiveRightSidebar() {
  const context = useContext(RightSidebarContext);

  if (!context) {
    throw new Error(
      "useActiveRightSidebar must be used within a RightSidebarProvider",
    );
  }

  return context;
}
