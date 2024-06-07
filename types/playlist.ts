import { Pagination } from "./common";
import { Track, TrackImage, TrackOwner } from "./track";

export type PlaylistItem = {
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string | null;
    total: number;
  };
  href: string;
  id: string;
  images: TrackImage[];
  name: string;
  primary_color: string;
  public: boolean;
  snapshot_id: string;
  tracks: Track;
  uri: string;
  owner: TrackOwner;
  type: "playlist"; // TODO: CHANGE THIS TO ENUM TYPES
};

export type PlaylistDetail = Pagination & {
  href: string;
  items: PlaylistItem[];
};

export type Playlist = {
  message: string;
  playlists: PlaylistDetail;
};
