import {
  HomeIcon,
  LibraryBigIcon,
  SearchIcon,
  SparklesIcon,
  UserIcon,
} from "lucide-react";

const nav = [
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
    <nav className="fixed bottom-0 block w-full bg-[linear-gradient(180deg,_rgba(17,_17,_17,_0.85)_0%,_#111111_42.62%)] px-[28px] pb-6 pt-4 md:hidden">
      <ul className="flex w-full items-center gap-8">
        {nav.map((item) => (
          <li key={item.href} className="flex-1">
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
  return <div className=""></div>;
}

export default function Navigation() {
  return (
    <header>
      <NavigationMobile />
      <NavigationDesktop />
    </header>
  );
}
