
import { create } from "zustand";

interface UserStore {
  isLoggedIn: boolean;
  setIsLoggedIn: (bool: boolean) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (bool) => set({ isLoggedIn: bool }),
}));
