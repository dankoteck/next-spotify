export type Artist = {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  popularity: number;
  genres: string[];
  href: string;
  id: string;
  images: {
    height: number;
    url: string;
    width: number;
  }[];
  name: string;
  type: "artist"; // TODO: CHANGE THIS TO ENUM TYPES
  uri: string;
};
