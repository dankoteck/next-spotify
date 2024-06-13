import TableTracks from "@/components/shared/table-tracks";
import { getHeaders } from "@/lib/utils";
import { Artist } from "@/types/artist";
import { PlaylistItem } from "@/types/playlist";
import * as dayjs from "dayjs";
import durationPlugin from "dayjs/plugin/duration";
import relativeTimePlugin from "dayjs/plugin/relativeTime";
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
    <div className="base:grid-cols-[1fr_minmax(auto,_370px)] grid h-full grid-cols-[1fr_minmax(auto,_248px)] gap-6 bg-[linear-gradient(180deg,_#1ED76040_0%,_#06060678_100%)] bg-fixed px-[25px] py-[22px] lg:gap-2">
      <section className="relative h-full max-h-full min-w-0 overflow-auto">
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

        <TableTracks data={data} />
      </section>

      <aside className="flex h-full max-h-full justify-center overflow-y-auto py-[22px] pl-[28px] lg:block">
        <Image
          alt=""
          src={data.images[0].url}
          className="aspect-square w-full rounded-[10px] object-cover"
          width={1}
          height={1}
          priority
        />

        <ul className="base:mt-[30px] mt-5 hidden flex-wrap gap-2.5 lg:flex">
          {genres.map((genre, idx) => (
            <li
              className="base:px-5 base:py-2.5 base:text-sm rounded-full border border-[#e0e0e0] px-2.5 py-1.5 text-xs tracking-[0.48px] text-[#e0e0e0]"
              key={idx}
            >
              {genre}
            </li>
          ))}
        </ul>

        <ul className="base:mt-[30px] mt-5 hidden flex-col gap-[15px] lg:flex">
          {artists.map((artist, idx) => (
            <li key={idx}>
              <Link
                href={`/artist/${artist.id}`}
                className="base:gap-5 flex items-center gap-3 text-[#E0E0E0]"
              >
                <Image
                  alt=""
                  src={artist.images[0].url}
                  width={1}
                  height={1}
                  className="base:size-[60px] aspect-square size-[52px] rounded-full object-cover"
                />
                <span className="base:text-base text-sm font-medium tracking-[0.48px] text-[#898989]">
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
