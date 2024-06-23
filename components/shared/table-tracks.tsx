"use client";

import { getTrackListeningTime } from "@/lib/utils";
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
import { useMediaQuery } from "@uidotdev/usehooks";
import { EllipsisIcon, HeartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

type Props = {
  data: PlaylistItem;
};
type CellData = ReturnType<typeof mapFn>;

const mapFn = (item: TrackItem, idx: number) => ({
  id: item.track.id,
  order: idx + 1,
  thumbnail: item.track.album.images[0].url,
  title: item.track.name,
  artist: item.track.artists.map((artist) => artist.name).join(", "),
  album: item.track.album.name,
  duration: getTrackListeningTime(item.track.duration_ms),
});

export default function TableTracks({ data }: Props) {
  const router = useRouter();
  const isExtraSmallDevice = useMediaQuery(
    "only screen and (max-width : 640px)",
  );
  const isSmallDevice = useMediaQuery("only screen and (max-width: 1023px)");
  const isMediumDevice = useMediaQuery(
    "only screen and (min-width: 1024px) and (max-width: 1279px)",
  );

  const columns = useMemo(() => {
    if (isMediumDevice) {
      return [
        { key: "title", label: "Title" },
        { key: "album", label: "Album" },
        { key: "action", label: "" },
      ];
    }

    if (isSmallDevice) {
      return [
        { key: "title", label: "Title" },
        { key: "action", label: "" },
      ];
    }

    return [
      { key: "order", label: "#" },
      { key: "title", label: "Title" },
      { key: "album", label: "Album" },
      { key: "duration", label: "Duration" },
    ];
  }, [isMediumDevice, isSmallDevice]);

  const rows = useMemo(
    () => data.tracks.items.filter((item) => item.track).map(mapFn),
    [data.tracks.items],
  );

  const handleRowClick = useCallback(
    (item: CellData) => {
      router.push(`/track/${item.id}`);
    },
    [router],
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
        case "action":
          return <EllipsisIcon color="#898989" size={24} />;
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
      hideHeader={isExtraSmallDevice}
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
          <TableRow key={item.order} onClick={handleRowClick.bind(null, item)}>
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
