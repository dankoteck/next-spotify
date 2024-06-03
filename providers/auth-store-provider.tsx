// "use client";

// import { AuthStore, createAuthStore } from "@/stores/auth-store";
// import { ReactNode, createContext, useContext, useRef } from "react";
// import { StoreApi, useStore } from "zustand";

// export const AuthStoreContext = createContext<StoreApi<AuthStore> | null>(null);

// export interface AuthStoreProviderProps {
//   children: ReactNode;
// }

// export const AuthStoreProvider = ({ children }: AuthStoreProviderProps) => {
//   const storeRef = useRef<StoreApi<AuthStore>>();

//   if (!storeRef.current) {
//     storeRef.current = createAuthStore();
//   }

//   return (
//     <AuthStoreContext.Provider value={storeRef.current}>
//       {children}
//     </AuthStoreContext.Provider>
//   );
// };

// export const useAuthStore = <T,>(selector: (state: AuthStore) => T): T => {
//   const authStoreContext = useContext(AuthStoreContext);

//   if (!authStoreContext) {
//     throw new Error("useAuthStore must be used within a AuthStoreProvider");
//   }

//   return useStore(authStoreContext, selector);
// };
