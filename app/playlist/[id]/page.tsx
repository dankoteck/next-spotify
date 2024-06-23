import TableTracks from "@/components/shared/table-tracks";
import { getGenres, getHeaders } from "@/lib/utils";
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
    if (item.track) {
      for (const artist of item.track.artists) {
        if (artistIds.size < 5) {
          artistIds.add(artist.id);
        } else break;
      }
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
  const listArtists = artists.artists.toSorted(
    (a, b) => b.popularity - a.popularity,
  );

  return [listArtists, getGenres(artists.artists)];
}

export default async function Page({ params }: Props) {
  const [data, artistIds] = await loadData(params.id);
  const [artists, genres] = await loadDataArtists(artistIds);

  return (
    <div className="grid h-full grid-cols-1 gap-6 bg-[linear-gradient(180deg,_#1ED76040_0%,_#06060678_100%)] bg-fixed px-[15px] pt-[22px] lg:grid-cols-[1fr_minmax(auto,_248px)] xl:gap-2 xl:px-[25px] xl:py-[22px] base:grid-cols-[1fr_minmax(auto,_370px)]">
      <section className="lg:order-0 relative order-1 h-full max-h-full min-w-0 overflow-auto">
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
                  (acc, item) =>
                    acc + (item.track ? item.track.duration_ms : 0),
                  0,
                ),
                "milliseconds",
              )
              .format("H [hr] m [min]")}
          </span>
        </div>

        <TableTracks data={data} />
      </section>

      <aside className="order-0 flex h-full max-h-full flex-col justify-center lg:order-1 lg:justify-start lg:overflow-y-auto xl:py-[22px] xl:pl-[28px]">
        <Image
          alt=""
          src={data.images[0].url}
          className="mx-auto aspect-square w-[54%] max-w-[25rem] rounded-[10px] object-cover lg:w-full lg:max-w-full"
          width={1}
          height={1}
          priority
        />

        <ul className="mt-5 hidden flex-wrap gap-2.5 lg:flex base:mt-[30px]">
          {genres.map((genre, idx) => (
            <li
              className="rounded-full border border-[#e0e0e0] px-2.5 py-1.5 text-xs tracking-[0.48px] text-[#e0e0e0] base:px-5 base:py-2.5 base:text-sm"
              key={idx}
            >
              {genre}
            </li>
          ))}
        </ul>

        <ul className="mt-5 hidden flex-col gap-[15px] lg:flex base:mt-[30px]">
          {artists.map((artist, idx) => (
            <li key={idx}>
              <Link
                href={`/artist/${artist.id}`}
                className="flex items-center gap-3 text-[#E0E0E0] base:gap-5"
              >
                <Image
                  alt=""
                  src={artist.images[0].url}
                  width={1}
                  height={1}
                  className="aspect-square size-[52px] rounded-full object-cover base:size-[60px]"
                />
                <span className="text-sm font-medium tracking-[0.48px] text-[#898989] base:text-base">
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
