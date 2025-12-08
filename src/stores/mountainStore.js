//@/stores/mountainStore.js

import { create } from "zustand";
import geojson from "@/data/allMountains";

export const useMountainStore = create((set) => ({
  // Mountain data
  allMountains: geojson.features,
  filteredMountains: geojson.features,
  selectedMountain: null,

  setFilteredMountains: (mountains) => set({ filteredMountains: mountains }),
  setSelectedMountain: (mountain) => {
    console.log("setSelectedMountain called with:", mountain);
    set({ selectedMountain: mountain })},

}));