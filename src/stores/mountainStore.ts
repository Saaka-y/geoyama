//@/stores/mountainStore.ts

import { create } from 'zustand';
import geojson from "@/data/allMountains.json";

// GeoJSON Feature type (simplified)
type MountainFeature = any; // or use proper GeoJSON type

interface MountainStore {
  // Mountain data
  allMountains: MountainFeature[];
  filteredMountains: MountainFeature[];
  selectedMountain: MountainFeature | null;

  setFilteredMountains: (mountains: MountainFeature[]) => void;
  setSelectedMountain: (mountain: MountainFeature | null) => void;
}

export const useMountainStore = create<MountainStore>((set) => ({
  // Mountain data
  allMountains: geojson.features,
  filteredMountains: geojson.features,
  selectedMountain: null,

  setFilteredMountains: (mountains) => set({ filteredMountains: mountains }),
  setSelectedMountain: (mountain) => set({ selectedMountain: mountain }),

}));