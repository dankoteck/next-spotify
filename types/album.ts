import { Artist } from "./artist";
import { TrackImage } from "./track";

export type Album = {
  album_type: "compilation"; // TODO: CHANGE THIS TO ENUM TYPES
  total_tracks: number;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: TrackImage[];
  name: string;
  release_date: string;
  release_date_precision: string;
  type: "album";
  uri: string;
  artists: Artist[];
};
