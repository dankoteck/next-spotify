export type Pagination = {
  limit: number;
  next: null | string;
  offset: number;
  previous: null | string;
  total: number;
};

export type Icon = {
  height: number;
  url: string;
  width: number;
};

export type SpotifyToken = {
  access_token: string;
  token_type: string;
  expires_in: number;
};
