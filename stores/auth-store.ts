// import { generateAccessToken } from "@/lib/api";
// import { createStore } from "zustand";

// const BASE_URL = "https://accounts.spotify.com/api";
// const DEFAULT_BODY = new URLSearchParams({
//   grant_type: "client_credentials",
//   client_id: process.env.SPOTIFY_CLIENT_ID as string,
//   client_secret: process.env.SPOTIFY_CLIENT_SECRET as string,
// });

// export type AuthState = {
//   accessToken: string;
// };

// export type AuthActions = {
//   getAccessToken: () => void;
// };

// export type AuthStore = AuthState & AuthActions;

// export const defaultInitialState: AuthState = {
//   accessToken: "",
// };

// export const createAuthStore = (initState: AuthState = defaultInitialState) => {
//   return createStore<AuthStore>()((set) => ({
//     ...initState,
//     getAccessToken: async () => {
//       set({ accessToken: await generateAccessToken() });
//     },
//   }));
// };
