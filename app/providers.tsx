"use client";

import ActiveRightSidebarProvider from "@/providers/active-right-sidebar";
import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider
      className="relative flex h-full min-h-full grid-cols-[auto_1fr] grid-rows-[auto_1fr] flex-col p-2 lg:grid lg:gap-1"
      style={{
        gridTemplateAreas:
          "'header header header' 'left-sidebar main right-sidebar'",
      }}
    >
      <ActiveRightSidebarProvider>{children}</ActiveRightSidebarProvider>
    </NextUIProvider>
  );
}
