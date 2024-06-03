import {
  BookAudioIcon,
  BookmarkIcon,
  Disc3Icon,
  FolderIcon,
  HeartIcon,
  MicIcon,
  Music4Icon,
  PinIcon,
  SquareLibraryIcon,
} from "lucide-react";
import Link from "next/link";

const aside = [
  {
    name: "Pins",
    href: "/",
    icon: <PinIcon color="#898989" size={20} />,
  },
  {
    name: "Playlists",
    href: "/",
    icon: <SquareLibraryIcon color="#898989" size={20} />,
  },
  {
    name: "Liked songs",
    href: "/",
    icon: <HeartIcon color="#898989" size={20} />,
  },
  {
    name: "Saves",
    href: "/",
    icon: <BookmarkIcon color="#898989" size={20} />,
  },
  {
    name: "Albums",
    href: "/",
    icon: <Disc3Icon color="#898989" size={20} />,
  },
  {
    name: "Folders",
    href: "/",
    icon: <FolderIcon color="#898989" size={20} />,
  },
  {
    name: "Podcasts",
    href: "/",
    icon: <MicIcon color="#898989" size={20} />,
  },
  {
    name: "Audiobooks",
    href: "/",
    icon: <BookAudioIcon color="#898989" size={20} />,
  },
  {
    name: "Artists",
    href: "/",
    icon: <Music4Icon color="#898989" size={20} />,
  },
];

export default function LeftSidebar() {
  return (
    <aside className="hidden w-[273px] px-1.5 py-0.5 [grid-area:left-sidebar] lg:block">
      <ul className="space-y-3 p-2">
        {aside.map((item, idx) => (
          <li key={idx} className="py-2.5">
            <Link href="/" className="flex items-center gap-5">
              {item.icon}
              <span className="text-sm tracking-[0.48px] text-[#898989]">
                {item.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
