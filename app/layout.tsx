import LeftSidebar from "@/components/ui/left-sidebar";
import Navigation from "@/components/ui/navigation";
import RightSidebar from "@/components/ui/right-sidebar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Spotify",
  description: "A Spotify clone built with Next.js",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>
          <Navigation />
          <LeftSidebar />
          <main className="relative mb-[84px] h-full min-h-0 min-w-0 space-y-[30px] overflow-auto rounded-[10px] [grid-area:main] lg:border lg:border-[#202020]">
            {children}
          </main>
          <RightSidebar />
        </Providers>
      </body>
    </html>
  );
}
