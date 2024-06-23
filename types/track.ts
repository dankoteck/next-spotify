import { Album } from "./album";
import { Artist } from "./artist";

export type TrackImage = {
  width: number | null;
  height: number | null;
  url: string;
};

export type TrackOwner = {
  display_name: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  type: "user"; // TODO: CHANGE THIS TO ENUM TYPES
  uri: string;
};

export type TrackAddedBy = {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  type: "user"; // TODO: CHANGE THIS TO ENUM TYPES
  uri: string;
};

export type TrackItem = {
  track: {
    album: Album;
    artists: Artist[];
    added_at: string;
    added_by: TrackAddedBy;
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
      isrc: string;
    };
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: "track";
    uri: string;
    is_local: boolean;
    episode: boolean;
    track: boolean;
  };
};

export type Track = {
  href: string;
  total: number;
  items: TrackItem[];
};
