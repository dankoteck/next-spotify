import PlaylistSection from "@/components/shared/playlist-section";
import { getHeaders } from "@/lib/utils";
import { Playlist } from "@/types/playlist";

async function loadFeaturedPlaylist(): Promise<Playlist> {
  const response = await fetch(
    `${process.env.API_URL}/${process.env.API_VERSION}/browse/featured-playlists?limit=10&locale=en_VI`,
    { headers: getHeaders() },
  );
  return await response.json();
}

async function loadCategoryPlaylists(
  categoryId: string,
  limit: number = 10,
): Promise<Playlist> {
  const response = await fetch(
    `${process.env.API_URL}/${process.env.API_VERSION}/browse/categories/${categoryId}/playlists?limit=${limit}&locale=en_VI`,
    { headers: getHeaders() },
  );
  return await response.json();
}

const albumColors = [
  [
    "#2C363F",
    "#004c2f",
    "#9c5800",
    "#9c7a00",
    "#005d70",
    "#94170c",
    "#0b3b91",
    "#4a0078",
    "#9c003f",
    "#007ba7",
  ],
  [
    "#9c7a00",
    "#005d70",
    "#2C363F",
    "#007ba7",
    "#9c5800",
    "#004c2f",
    "#94170c",
    "#0b3b91",
    "#4a0078",
    "#9c003f",
  ],
  [
    "#005d70",
    "#9c5800",
    "#2C363F",
    "#004c2f",
    "#9c7a00",
    "#007ba7",
    "#94170c",
    "#0b3b91",
    "#4a0078",
    "#9c003f",
  ],
  ["#9c003f", "#007ba7", "#9c5800", "#004c2f"],
  ["#4a0078", "#9c003f", "#007ba7", "#9c5800"],
  ["#007ba7", "#005d70", "#2C363F", "#004c2f", "#4a0078"],
];

export default async function Page() {
  const [
    featuredPlaylist,
    focusPlaylist,
    moodPlaylist,
    naturePlaylist,
    moviesPlaylist,
    instrumentalPlaylist,
  ] = await Promise.all([
    loadFeaturedPlaylist(),
    loadCategoryPlaylists("focus"),
    loadCategoryPlaylists("mood"),
    loadCategoryPlaylists("0JQ5DAqbMKFI3pNLtYMD9S", 4), // Nature & Noise
    loadCategoryPlaylists("0JQ5DAqbMKFOzQeOmemkuw", 4), // TV & Movies
    loadCategoryPlaylists("instrumental", 5), // TV & Movies
  ]);

  return (
    <section className="space-y-[28px] lg:space-y-5">
      <h3 className="text-xl font-bold tracking-[0.48px] text-[#E0E0E0]">
        Browse all
      </h3>

      <PlaylistSection
        colors={albumColors[0]}
        as="album"
        title="Featured"
        data={featuredPlaylist}
      />
      <PlaylistSection
        colors={albumColors[1]}
        as="album"
        title="Focus"
        data={focusPlaylist}
      />
      <PlaylistSection
        colors={albumColors[2]}
        as="album"
        title="Mood"
        data={moodPlaylist}
      />
      <PlaylistSection
        as="album"
        title="Nature & Noise"
        data={naturePlaylist}
        colors={albumColors[3]}
      />
      <PlaylistSection
        colors={albumColors[4]}
        as="album"
        title="TV & Movies"
        data={moviesPlaylist}
      />
      <PlaylistSection
        colors={albumColors[5]}
        as="album"
        title="TV & Movies"
        data={instrumentalPlaylist}
      />
    </section>
  );
}
