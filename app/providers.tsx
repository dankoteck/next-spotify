"use client";

import ActiveRightSidebarProvider from "@/providers/active-right-sidebar";
import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider
      className="relative flex h-full min-h-full grid-cols-[minmax(auto,_273px)_1fr_minmax(0,_auto)] grid-rows-[auto_1fr] flex-col px-[15px] py-2.5 lg:grid lg:gap-1 lg:p-2"
      style={{
        gridTemplateAreas: `
          'header header header' 
          'left-sidebar main right-sidebar'
        `,
      }}
    >
      <ActiveRightSidebarProvider>{children}</ActiveRightSidebarProvider>
    </NextUIProvider>
  );
}
