import { getHeaders } from "@/lib/utils";
import { Playlist } from "@/types/playlist";
import { Button } from "@nextui-org/react";
import { EllipsisIcon } from "lucide-react";
import Image from "next/image";
import { CSSProperties } from "react";

type Props = {
  title: string;
  categoryId: string;
};

export async function loadData(categoryId: string): Promise<Playlist> {
  const response = await fetch(
    `${process.env.API_URL}/${process.env.API_VERSION}/browse/categories/${categoryId}/playlists?limit=5&offset=0&locale=en_VI`,
    { headers: getHeaders(), cache: "no-store" },
  );
  return await response.json();
}

export default async function PlaylistSection({ title, categoryId }: Props) {
  const data = await loadData(categoryId);

  if (data.playlists.items.length === 0) return null;

  return (
    <section className="space-y-3 pl-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold tracking-[0.48px]">{title}</h3>
        <Button isIconOnly aria-label={title} variant="light">
          <EllipsisIcon color="#898989" />
        </Button>
      </div>

      <ul className="md:grid-cols-base-fr no-scrollbar flex gap-2 overflow-scroll pr-4 pt-3 md:grid md:grid-flow-col md:grid-rows-1">
        {data.playlists.items.map((item) => (
          <li key={item.id} className="relative flex-shrink-0 space-y-1.5">
            <div
              style={
                {
                  "--image-url": `url('${item.images[0].url}')`,
                  minInlineSize: "150px",
                } as CSSProperties
              }
              className={`relative aspect-square rounded-md bg-[image:var(--image-url)] bg-cover bg-no-repeat before:absolute before:inset-0 before:-top-[6px] before:-z-[1] before:mx-auto before:aspect-square before:w-[calc(100%-6px)] before:rounded-md before:bg-contain before:bg-center before:bg-no-repeat before:opacity-30 before:bg-img-inherit after:absolute after:inset-0 after:-top-[12px] after:-z-[2] after:mx-auto after:aspect-square after:w-[calc(100%-12px)] after:rounded-md after:bg-contain after:bg-center after:bg-no-repeat after:opacity-15 after:bg-img-inherit`}
            />
            <span className="line-clamp-2 max-w-[150px]">{item.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
