import Navigation from "@/components/ui/navigation";
import Sidebar from "@/components/ui/sidebar";
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
          <Sidebar />
          <Navigation />
          {children}
        </Providers>
      </body>
    </html>
  );
}
