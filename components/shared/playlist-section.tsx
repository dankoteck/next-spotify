import { getHeaders } from "@/lib/utils";
import { Playlist } from "@/types/playlist";
import { Button } from "@nextui-org/react";
import { EllipsisIcon } from "lucide-react";
import Link from "next/link";
import { CSSProperties } from "react";

type Props = {
  title: string;
  categoryId: string;
};

export async function loadData(categoryId: string): Promise<Playlist> {
  const response = await fetch(
    `${process.env.API_URL}/${process.env.API_VERSION}/browse/categories/${categoryId}/playlists?limit=10&locale=en_VI`,
    { headers: getHeaders(), cache: "no-store" },
  );
  return await response.json();
}

export default async function PlaylistSection({ title, categoryId }: Props) {
  const data = await loadData(categoryId);

  if (data.playlists.items.length === 0) return null;

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold tracking-[0.48px]">{title}</h3>
        <Button isIconOnly aria-label={title} variant="light">
          <EllipsisIcon color="#898989" />
        </Button>
      </div>

      <ul className="grid-cols-base-fr no-scrollbar grid grid-flow-col grid-rows-1 overflow-scroll pt-3">
        {data.playlists.items.map((item, idx) => (
          <li
            key={idx}
            className="group relative block h-full w-full space-y-1.5 p-1.5 [max-inline-size:170px] lg:[max-inline-size:none]"
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
        ))}
      </ul>
    </section>
  );
}
