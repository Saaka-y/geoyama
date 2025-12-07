//@/stores/mapStore.js

import { create } from "zustand";

export const useMapStore = create((set) => ({
  // Mapbox instances
  japanMap: null,
  focusMap: null,

  setJapanMap: (mapInstance) => set({ japanMap: mapInstance }),
  setFocusMap: (mapInstance) => set({ focusMap: mapInstance }),
  
}));