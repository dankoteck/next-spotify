import PlaylistSection from "@/components/shared/playlist-section";
import { getHeaders } from "@/lib/utils";
import { Category } from "@/types/category";
import { Playlist } from "@/types/playlist";

async function loadData(): Promise<{
  categories: Category;
}> {
  const response = await fetch(
    `${process.env.API_URL}/${process.env.API_VERSION}/browse/categories?limit=7&offset=0&locale=en_VI`,
    { headers: getHeaders() },
  );
  return await response.json();
}

export default async function Home() {
  const categoryData = await loadData();
  const { items } = categoryData.categories;

  return items.map((item) => (
    <PlaylistDetailSection key={item.id} title={item.name} id={item.id} />
  ));
}

async function loadDataPlaylist(id: string): Promise<Playlist> {
  const response = await fetch(
    `${process.env.API_URL}/${process.env.API_VERSION}/browse/categories/${id}/playlists?limit=10&locale=en_VI`,
    { headers: getHeaders(), cache: "no-store" },
  );
  return await response.json();
}

async function PlaylistDetailSection({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const data = await loadDataPlaylist(id);

  if (data.playlists.items.length === 0) return null;

  return (
    <div className="lg:px-4 lg:py-4 lg:pl-4 lg:pt-4">
      <PlaylistSection title={title} data={data} />
    </div>
  );
}
