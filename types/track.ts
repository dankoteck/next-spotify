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

export type Track = {
  href: string;
  total: number;
};
