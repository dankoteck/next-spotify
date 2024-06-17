"use client";

import { PlaylistItem } from "@/types/playlist";
import { TrackItem } from "@/types/track";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
} from "@nextui-org/react";
import * as dayjs from "dayjs";
import durationPlugin from "dayjs/plugin/duration";
import relativeTimePlugin from "dayjs/plugin/relativeTime";
import { HeartIcon } from "lucide-react";
import { useCallback, useMemo } from "react";

dayjs.extend(durationPlugin);
dayjs.extend(relativeTimePlugin);

type Props = {
  data: PlaylistItem;
};
type CellData = ReturnType<typeof mapFn>;

const columns = [
  { key: "order", label: "#" },
  { key: "title", label: "Title" },
  { key: "album", label: "Album" },
  { key: "duration", label: "Duration" },
];

const mapFn = (item: TrackItem, idx: number) => ({
  order: idx + 1,
  thumbnail: item.track.album.images[0].url,
  title: item.track.name,
  artist: item.track.artists.map((artist) => artist.name).join(", "),
  album: item.track.album.name,
  duration: dayjs
    .duration(item.track.duration_ms, "milliseconds")
    .format("m:ss"),
});

export default function TableTracks({ data }: Props) {
  const rows = useMemo(
    () =>
      data.tracks.items
        .filter((item) => item.track)
        .map((item, idx) => mapFn(item, idx)),
    [data.tracks.items],
  );

  const renderCell = useCallback(
    (item: CellData, columnKey: string | number) => {
      const cellData = item[columnKey as keyof CellData];

      switch (columnKey) {
        case "order":
          return (
            <span className="text-center text-base/5 tracking-[0.48px]">
              {cellData}
            </span>
          );
        case "title":
          return (
            <User
              avatarProps={{ radius: "sm", src: item["thumbnail"] }}
              description={item["artist"]}
              name={cellData}
              className="gap-2.5 [&>div_span]:line-clamp-1"
            >
              <span className="line-clamp-1 text-sm tracking-[0.48px]">
                {item["artist"]}
              </span>
            </User>
          );
        case "album":
          return (
            <span className="line-clamp-1 text-sm tracking-[0.48px]">
              {cellData}
            </span>
          );
        case "duration":
          return (
            <div className="flex items-center gap-2.5">
              <span className="min-w-[70px] text-sm tracking-[0.48px]">
                {cellData}
              </span>
              <span className="p-2">
                <HeartIcon color="#898989" size={24} />
              </span>
            </div>
          );
        default:
          return cellData;
      }
    },
    [],
  );

  return (
    <Table
      radius="none"
      shadow="none"
      aria-label="Playlist Tracks"
      removeWrapper
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            className="bg-transparent text-sm font-normal tracking-[0.48px]"
            key={column.key}
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody className="text-[#e0e0e0bf]" items={rows}>
        {(item) => (
          <TableRow key={item.order}>
            {(columnKey) => (
              <TableCell align={columnKey === "order" ? "right" : "left"}>
                {renderCell(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
