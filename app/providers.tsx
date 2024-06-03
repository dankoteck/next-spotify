"use client";

// import { AuthStoreProvider } from "@/providers/auth-store-provider";
import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      {/* <AuthStoreProvider>{children}</AuthStoreProvider> */}
      {children}
    </NextUIProvider>
  );
}
