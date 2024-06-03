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

const navDesktopLeft = [
  {
    name: "Home",
    href: "/",
    icon: <HomeIcon color="#898989" size={20} />,
  },
  {
    name: "Discover",
    href: "/discover",
    icon: <SparklesIcon color="#898989" size={20} />,
  },
  {
    name: "Search",
    href: "/search",
    icon: <SearchIcon color="#898989" size={20} />,
  },
];

const navDesktopRight = [
  {
    name: "Notifications",
    href: "/",
    icon: <BellIcon color="#898989" size={20} />,
  },
  {
    name: "Lock",
    href: "/",
    icon: <LockOpenIcon color="#898989" size={20} />,
  },
  {
    name: "Users",
    href: "/",
    icon: <UsersIcon color="#898989" size={20} />,
  },
  {
    name: "Settings",
    href: "/",
    icon: <SettingsIcon color="#898989" size={20} />,
  },
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
  return (
    <nav className="hidden items-center justify-between pl-4 pr-2.5 lg:flex">
      <div className="flex items-center">
        <Link
          href="/"
          className="flex items-center gap-2.5 py-4 [min-inline-size:262px]"
        >
          <LibraryBigIcon color="#898989" size={20} />
          <span className="text-sm tracking-[0.48px] text-[#898989]">
            My Library
          </span>
        </Link>

        <ul className="flex items-center">
          {navDesktopLeft.map((item, idx) => (
            <li key={idx} className="py-4 [min-inline-size:210px]">
              <Link href="/" className="flex items-center gap-2.5">
                {item.icon}
                <span className="text-sm tracking-[0.48px] text-[#898989]">
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <ul className="flex items-center justify-end">
        {navDesktopRight.map((item, idx) => (
          <li key={idx} className="p-4">
            <Link href="/" className="flex items-center gap-2.5">
              {item.icon}
            </Link>
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
