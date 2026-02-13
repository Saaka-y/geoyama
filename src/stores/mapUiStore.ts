//@/stores/mapUiStore.ts

import { create } from "zustand";

interface JapanMapInitialView {
  center: [number, number];
  zoom: number;
  pitch: number;
  bearing: number;
  logoPosition: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

interface MapUiStore {
  // Map view state
  showFocusMap: boolean;
  japanMapInitialView: JapanMapInitialView;

  setShowFocusMap: (bool: boolean) => void;
  backToMap: () => void;
}

export const useMapUiStore = create<MapUiStore>((set) => ({
  // Map view state
  showFocusMap: false,
  japanMapInitialView: {
    center: [139.6917, 35.6895],
    zoom: 7,
    pitch: 50,
    bearing: -17,
    logoPosition: "top-left",
  },

  setShowFocusMap: (bool) => set({ showFocusMap: bool }),

  // Back to map handler
  backToMap: () => set({
    showFocusMap: false,
  })
}));