//@/stores/mapUiStore.js

import { create } from "zustand";

export const useMapUiStore = create((set) => ({
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