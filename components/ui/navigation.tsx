"use client";

import { useActiveRightSidebar } from "@/providers/active-right-sidebar";
import { Button, cn } from "@nextui-org/react";
import {
  BellIcon,
  HomeIcon,
  LibraryBigIcon,
  LockOpenIcon,
  SearchIcon,
  SettingsIcon,
  SparklesIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cloneElement } from "react";

const navDesktopLeft = [
  { name: "Home", href: "/", icon: <HomeIcon size={20} /> },
  { name: "Discover", href: "/discover", icon: <SparklesIcon size={20} /> },
  { name: "Search", href: "/search", icon: <SearchIcon size={20} /> },
];

const navDesktopRight = [
  { name: "Notifications", icon: <BellIcon size={20} /> },
  { name: "Lock", icon: <LockOpenIcon size={20} /> },
  { name: "Friendlist", icon: <UsersIcon size={20} /> },
  { name: "Settings", icon: <SettingsIcon size={20} /> },
];

const navMobile = [
  {
    name: "Home",
    href: "/",
    icon: <HomeIcon color="#898989" />,
  },
  {
    name: "Discover",
    href: "/discover",
    icon: <SparklesIcon color="#898989" />,
  },
  {
    name: "Search",
    href: "/search",
    icon: <SearchIcon color="#898989" />,
  },
  {
    name: "Library",
    href: "/library",
    icon: <LibraryBigIcon color="#898989" />,
  },
  {
    name: "Me",
    href: "/me",
    icon: <UserIcon color="#898989" />,
  },
];

function NavigationMobile() {
  return (
    <nav className="fixed bottom-0 z-[9999] block w-full bg-[linear-gradient(180deg,_rgba(17,_17,_17,_0.85)_0%,_#111111_42.62%)] px-[28px] pb-6 pt-4 lg:hidden">
      <ul className="flex w-full items-center gap-8">
        {navMobile.map((item, idx) => (
          <li key={idx} className="flex-1">
            <a href="/" className="flex flex-col items-center gap-1">
              {item.icon}
              <span className="text-xs tracking-[0.48px] text-[#898989]">
                {item.name}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function NavigationDesktop() {
  const pathname = usePathname();
  const context = useActiveRightSidebar();

  if (!context) return null;

  return (
    <nav className="hidden items-center justify-between pl-4 pr-2.5 lg:flex">
      <div className="flex items-center">
        <Link
          href="/"
          className="flex items-center gap-5 py-4 [min-inline-size:262px]"
        >
          <LibraryBigIcon color="#898989" size={20} />
          <span className="text-sm tracking-[0.48px] text-[#898989]">
            My Library
          </span>
        </Link>

        <ul className="flex items-center">
          {navDesktopLeft.map((item, idx) => (
            <li
              key={idx}
              className={cn(
                "rounded-lg text-[#898989] [min-inline-size:210px]",
                { "bg-[#111111] text-white": item.href === pathname },
              )}
            >
              <Link href={item.href} className="flex items-center gap-5 p-4">
                {cloneElement(item.icon, {
                  color: item.href === pathname ? "#fff" : "#898989",
                })}
                <span className="text-sm tracking-[0.48px]">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <ul className="flex items-center justify-end gap-3">
        {navDesktopRight.map((item, idx) => (
          <li key={idx}>
            <Button
              isIconOnly
              variant="light"
              aria-label={item.name}
              onClick={() => context.onChange(item.name)}
              className="flex items-center gap-5"
            >
              {cloneElement(item.icon, {
                color: context.activeItem === item.name ? "#fff" : "#898989",
              })}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Navigation() {
  return (
    <header className="[grid-area:header]">
      <NavigationMobile />
      <NavigationDesktop />
    </header>
  );
}
