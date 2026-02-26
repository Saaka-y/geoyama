
import { create } from "zustand";

interface UserStore {
  isLoggedIn: boolean;
  setIsLoggedIn: (bool: boolean) => void;
  favorite: string[]; 
  setFavorite: (favorites: string[]) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  isLoggedIn: false,
  favorite: [],
  setIsLoggedIn: (bool) => set({ isLoggedIn: bool }),
  setFavorite: (favorites) => set({ favorite: favorites }),
}));

