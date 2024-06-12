import { getHeaders } from "@/lib/utils";
import { Artist } from "@/types/artist";
import { PlaylistItem } from "@/types/playlist";
import * as dayjs from "dayjs";
import durationPlugin from "dayjs/plugin/duration";
import relativeTimePlugin from "dayjs/plugin/relativeTime";
import { HeartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

dayjs.extend(durationPlugin);
dayjs.extend(relativeTimePlugin);

type Props = {
  params: {
    id: string;
  };
};

async function loadData(id: string): Promise<[PlaylistItem, string[]]> {
  const res = await fetch(
    `${process.env.API_URL}/${process.env.API_VERSION}/playlists/${id}`,
    { headers: getHeaders() },
  );
  const data = (await res.json()) as PlaylistItem;
  const artistIds = new Set<string>();

  for (const item of data.tracks.items) {
    for (const artist of item.track.artists) {
      if (artistIds.size < 5) {
        artistIds.add(artist.id);
      } else break;
    }
  }

  return [data, Array.from(artistIds)];
}

async function loadDataArtists(
  artistIds: string[],
): Promise<[Artist[], string[]]> {
  const res = await fetch(
    `${process.env.API_URL}/${process.env.API_VERSION}/artists?ids=${artistIds.join(",")}`,
    { headers: getHeaders() },
  );

  const artists = (await res.json()) as { artists: Artist[] };
  const genres = new Set<string>();

  for (const artist of artists.artists) {
    for (const genre of artist.genres) {
      genres.add(genre.toUpperCase());
    }
  }

  const listArtists = artists.artists.toSorted(
    (a, b) => b.popularity - a.popularity,
  );

  return [listArtists, Array.from(genres)];
}

export default async function Page({ params }: Props) {
  const [data, artistIds] = await loadData(params.id);
  const [artists, genres] = await loadDataArtists(artistIds);

  return (
    <div
      className="grid h-full grid-cols-1 gap-6 px-[25px] py-[22px] lg:grid-cols-[1fr_minmax(auto,_370px)] lg:gap-2"
      style={{
        background: `linear-gradient(180deg, #1ED76040 0%, rgba(6, 6, 6, 0.47) 100%) fixed`, // `78` at the end of the color is the alpha value
      }}
    >
      <section className="relative h-full max-h-full min-w-0 overflow-scroll">
        <h1 className="text-xl font-bold text-[#E0E0E0] lg:text-4xl/[48.6px]">
          {data.name}
        </h1>

        <div className="my-5 flex items-center gap-2.5 tracking-[0.48px] text-[#898989]">
          <div className="text-sm font-medium tracking-[0.48px]">
            <span>By </span>
            <Link href="/" className="inline text-[#E0E0E0]">
              {data.owner.display_name}
            </Link>
          </div>
          <span>&bull;</span>
          <span className="text-sm">{data.tracks.total} songs</span>
          <span>&bull;</span>
          <span className="text-sm">
            {dayjs
              .duration(
                data.tracks.items.reduce(
                  (acc, item) => acc + item.track.duration_ms,
                  0,
                ),
                "milliseconds",
              )
              .format("H [hr] m [min]")}
          </span>
        </div>

        <ul className="flex h-fit flex-col gap-3 text-[#e0e0e0bf]">
          <li className="grid grid-cols-[minmax(auto,_42px)_minmax(auto,_400px)_minmax(auto,_400px)_minmax(auto,_70px)] items-center gap-5 border-b border-[#89898926] py-3 text-sm tracking-[0.48px] text-[#e0e0e0bf]">
            <span className="text-center">#</span>
            <span className="">Title</span>
            <span className="hidden">Album</span>
            <span className="">Duration</span>
          </li>

          {data.tracks.items.map((item, idx) => (
            <li key={item.track.id}>
              <Link
                href={`/playlist/${params.id}/track/${item.track.id}`}
                className="grid grid-cols-[minmax(auto,_42px)_minmax(auto,_50px)_minmax(auto,_340px)_minmax(auto,_400px)_minmax(auto,_70px)_minmax(auto,_160px)] items-center gap-5"
              >
                <span className="text-center text-base/5 tracking-[0.48px]">
                  {idx + 1}
                </span>

                <Image
                  alt=""
                  src={item.track.album.images[0].url}
                  width={1}
                  height={1}
                  className="aspect-square w-full rounded-sm object-cover"
                />

                <span>
                  <span className="line-clamp-1 text-base/6 font-medium tracking-[0.48px] text-white">
                    {item.track.name}
                  </span>

                  <span className="line-clamp-1 text-sm tracking-[0.48px]">
                    {item.track.artists.map((artist) => artist.name).join(", ")}
                  </span>
                </span>

                <span className="line-clamp-1 hidden text-sm tracking-[0.48px]">
                  {item.track.album.name}
                </span>

                <span className="text-sm tracking-[0.48px]">
                  {dayjs
                    .duration(item.track.duration_ms, "milliseconds")
                    .format("m:ss")}
                </span>

                <span className="p-4">
                  <HeartIcon color="#898989" size={24} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <aside className="flex h-full max-h-full justify-center overflow-scroll py-[22px] pl-[28px] lg:block">
        <Image
          alt=""
          src={data.images[0].url}
          className="aspect-square w-full rounded-[10px] object-cover"
          width={1}
          height={1}
          priority
        />

        <ul className="mt-[30px] hidden flex-wrap gap-2.5 lg:flex">
          {genres.map((genre, idx) => (
            <li
              className="rounded-full border border-[#e0e0e0] px-5 py-2.5 text-sm tracking-[0.48px] text-[#e0e0e0]"
              key={idx}
            >
              {genre}
            </li>
          ))}
        </ul>

        <ul className="mt-[30px] hidden flex-col gap-[15px] lg:flex">
          {artists.map((artist, idx) => (
            <li key={idx}>
              <Link
                href={`/artist/${artist.id}`}
                className="flex items-center gap-5 text-[#E0E0E0]"
              >
                <Image
                  alt=""
                  src={artist.images[0].url}
                  width={1}
                  height={1}
                  className="aspect-square h-[60px] w-[60px] rounded-full object-cover"
                />
                <span className="text-base font-medium tracking-[0.48px] text-[#898989]">
                  {artist.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
