import { getGenres, getHeaders, getTrackListeningTime } from "@/lib/utils";
import { TrackItem } from "@/types/track";
import * as dayjs from "dayjs";
import { Disc3Icon, HeartIcon, ListMusicIcon, PlayIcon } from "lucide-react";
import Image from "next/image";

type Props = {
  params: {
    id: string;
  };
};

async function getTrack(id: string): Promise<TrackItem["track"]> {
  const res = await fetch(
    `${process.env.API_URL}/${process.env.API_VERSION}/tracks/${id}`,
    { headers: getHeaders() },
  );
  return await res.json();
}

export default async function Page({ params }: Props) {
  const track = await getTrack(params.id);
  const { name, artists, album, duration_ms, added_at, popularity } = track;
  const genres = artists[0].genres ? getGenres(artists) : [];

  return (
    <section className="flex items-center gap-16 p-10">
      <Image
        width={1}
        height={1}
        alt="cover"
        priority
        src={album.images[0].url}
        className="aspect-square w-full max-w-[500px] rounded-lg"
      />

      <div className="flex flex-col gap-5">
        <h1 className="text-4xl font-bold tracking-[0.48px] text-[#E0E0E0]">
          {name}
        </h1>

        <div className="flex items-center gap-2 text-sm font-medium text-[#E0E0E0]">
          <ListMusicIcon size={24} color="#898989" />
          {artists[0].name}
          <span className="text-[#898989]">&bull;</span>
          <Disc3Icon size={24} color="#898989" />
          {album.name}
          <span className="text-[#898989]">&bull;</span>
          <span className="text-[#898989]">
            {dayjs(album.release_date).format("YYYY")}
          </span>
          <span className="text-[#898989]">&bull;</span>
          <span className="text-[#898989]">
            {getTrackListeningTime(duration_ms)}
          </span>
          <span className="text-[#898989]">&bull;</span>
          <span className="text-[#898989]">{popularity}</span>
        </div>

        <ul className="flex items-center gap-4">
          <li className="">
            <PlayIcon
              size={40}
              color="#000"
              fill="#000"
              className="rounded-full bg-[#1ED760] p-3"
            />
          </li>
          <li className="">
            <HeartIcon size={20} color="#898989" />
          </li>
        </ul>
      </div>
    </section>
  );
}
