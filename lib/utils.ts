import { Artist } from "@/types/artist";
import * as dayjs from "dayjs";
import durationPlugin from "dayjs/plugin/duration";
import relativeTimePlugin from "dayjs/plugin/relativeTime";

dayjs.extend(durationPlugin);
dayjs.extend(relativeTimePlugin);

export const getHeaders = () => {
  return {
    Authorization: `Bearer ${process.env.API_KEY}`,
  };
};

export const shuffleArray = <T>(array: Array<T>) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const getGenres = (artists: Artist[]) => {
  const genres = new Set<string>();

  for (const artist of artists) {
    for (const genre of artist.genres) {
      genres.add(genre.toUpperCase());
    }
  }

  return Array.from(genres);
};

export const getTrackListeningTime = (duration: number) => {
  return dayjs.duration(duration, "milliseconds").format("m:ss");
};
