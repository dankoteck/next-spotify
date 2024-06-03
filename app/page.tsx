import PlaylistSection from "@/components/shared/playlist-section";
import { getHeaders } from "@/lib/utils";
import { Category } from "@/types/category";

async function loadData(): Promise<{
  categories: Category;
}> {
  const response = await fetch(
    `${process.env.API_URL}/${process.env.API_VERSION}/browse/categories?limit=15&offset=0&locale=en_VI`,
    { headers: getHeaders() },
  );
  return await response.json();
}

export default async function Home() {
  const categoryData = await loadData();
  const { items } = categoryData.categories;

  return (
    <main className="relative h-full min-h-0 min-w-0 space-y-[30px] overflow-auto rounded-lg pl-4 pt-4 [grid-area:main] lg:mx-2 lg:border lg:border-[#202020] lg:px-6 lg:py-4">
      {items.map((item) => (
        <PlaylistSection key={item.id} title={item.name} categoryId={item.id} />
      ))}
    </main>
  );
}
