"use client";

import { shuffleArray } from "@/lib/utils";
import { Playlist, PlaylistItem } from "@/types/playlist";
import { Button, cn } from "@nextui-org/react";
import { EllipsisIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CSSProperties, useMemo, useState } from "react";

type Props = {
  as?: "ghost" | "album";
  title?: string;
  data: Playlist;
  colors: string[];
};

export default function PlaylistSection({
  as = "ghost",
  title,
  data,
  colors,
}: Props) {
  const isRenderedAsAlbum = useMemo(() => as === "album", [as]);

  const renderPlaylistItem = (item: PlaylistItem, idx: number) => {
    if (isRenderedAsAlbum) {
      return (
        <li
          key={idx}
          className="block aspect-video h-full w-full flex-shrink-0 [min-block-size:100px] lg:aspect-square lg:p-1.5 lg:[max-inline-size:170px] lg:[min-block-size:initial]"
        >
          <Link
            href={`/${item.id}`}
            className="relative block h-full overflow-hidden rounded-md bg-white"
            style={{ backgroundColor: colors[idx] }}
          >
            <span className="absolute left-4 right-4 top-4 z-[1] text-lg font-extrabold capitalize tracking-[0.48px] text-white">
              {item.name}
            </span>
            <Image
              src={item.images[0].url}
              alt={item.name}
              width={1}
              height={1}
              priority
              className="absolute left-[70%] top-[50%] aspect-square rotate-[30deg] rounded-md object-cover [min-inline-size:105px] sm:left-[80%] sm:top-[65%]"
            />
          </Link>
        </li>
      );
    }

    return (
      <li
        key={idx}
        className="[&:first-child]:pl-0] group relative block h-full w-full space-y-1.5 p-1.5 [max-inline-size:170px] lg:[max-inline-size:none]"
      >
        {/* Overlay */}
        <div className="absolute inset-0 -z-10 h-full w-full rounded-md bg-gray-100 opacity-0 transition-opacity duration-300 group-hover:opacity-10"></div>

        <Link href={`/${item.id}`} className="block h-full space-y-2">
          <div
            style={
              {
                "--image-url": `url('${item.images[0].url}')`,
              } as CSSProperties
            }
            className={`relative aspect-square rounded-md bg-[image:var(--image-url)] bg-cover bg-no-repeat [min-inline-size:150px] before:absolute before:inset-0 before:-top-[6px] before:-z-[1] before:mx-auto before:aspect-square before:w-[calc(100%-8px)] before:rounded-md before:bg-contain before:bg-center before:bg-no-repeat before:opacity-30 before:bg-img-inherit after:absolute after:inset-0 after:-top-[14px] after:-z-[2] after:mx-auto after:aspect-square after:w-[calc(100%-14px)] after:rounded-md after:bg-contain after:bg-center after:bg-no-repeat after:opacity-15 after:bg-img-inherit lg:[min-inline-size:170px]`}
          />
          <span className="flex items-center justify-between">
            <span className="line-clamp-1 max-w-[120px] text-sm tracking-[0.48px]">
              {item.name}
            </span>
            <span className="text-sm tracking-[0.48px] text-[#1ed760]">
              {item.tracks.total}
            </span>
          </span>
          <span className="line-clamp-2 text-xs tracking-[0.48px] text-[#898989] [min-inline-size:150px] lg:[min-inline-size:170px]">
            {item.description}
          </span>
        </Link>
      </li>
    );
  };

  return (
    <section className="space-y-5 lg:space-y-3">
      {title && (
        <div className="flex items-center justify-between">
          <h3
            className={cn("text-xl font-bold tracking-[0.48px]", {
              "text-lg/6 font-medium text-[#e0e0e0]": isRenderedAsAlbum,
            })}
          >
            {title}
          </h3>
          <Button
            isIconOnly
            aria-label={title}
            variant="light"
            className="!size-5"
          >
            <EllipsisIcon color="#898989" />
          </Button>
        </div>
      )}

      <ul
        className={cn("no-scrollbar grid overflow-scroll lg:flex", {
          "pt-3": !isRenderedAsAlbum,
          "grid-cols-2 gap-x-5 gap-y-3 lg:gap-0": isRenderedAsAlbum,
        })}
      >
        {data.playlists.items.map((item, idx) => renderPlaylistItem(item, idx))}
      </ul>
    </section>
  );
}
