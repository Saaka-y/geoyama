//@/stores/mountainStore.ts

import { create } from 'zustand';
import { MountainFeature, MountainFeatureCollection } from '@/types/mountain';
import geojson from "@/data/allMountains.json";


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
  allMountains: (geojson as MountainFeatureCollection).features,
  filteredMountains: (geojson as MountainFeatureCollection).features,
  selectedMountain: null,

  setFilteredMountains: (mountains: MountainFeature[]) => set({ filteredMountains: mountains }),
  setSelectedMountain: (mountain: MountainFeature | null) => set({ selectedMountain: mountain }),

}));