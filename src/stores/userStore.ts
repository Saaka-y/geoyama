
import { create } from "zustand";

interface UserStore {
  isLoggedIn: boolean;
  setIsLoggedIn: (bool: boolean) => void;
  favorites: string[]; 
  setFavorites: (favorites: string[]) => void;
  showFavorites?: boolean;
  setShowFavorites?: (bool: boolean) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  isLoggedIn: false,
  favorites: [],
  setIsLoggedIn: (bool) => set({ isLoggedIn: bool }),
  setFavorites: (favorites) => set({ favorites: favorites }),
  showFavorites: false,
  setShowFavorites: (bool) => set({ showFavorites: bool }),
}));

