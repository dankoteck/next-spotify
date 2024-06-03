"use client";

// import { AuthStoreProvider } from "@/providers/auth-store-provider";
import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider
      className="relative flex h-full min-h-full flex-col lg:grid"
      style={{
        gridTemplateAreas: "'header header header' 'sidebar main main'",
      }}
    >
      {/* <AuthStoreProvider>{children}</AuthStoreProvider> */}
      {children}
    </NextUIProvider>
  );
}
