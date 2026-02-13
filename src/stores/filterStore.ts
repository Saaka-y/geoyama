//@/stores/filterStore.ts

import { create } from "zustand";
import { createDateOptions, DateOption } from "@/utils/createDateOptions";

interface FilterStore {
  // Filter states
  distance: string;
  courseTime: string;
  selectedDate: DateOption | null;
  dateOptions: DateOption[];

  // Setters for filter states
  setDistance: (distance: string) => void;
  setCourseTime: (courseTime: string) => void;
  setSelectedDate: (selectedDate: DateOption | null) => void;
  setDateOptions: (options: DateOption[]) => void;
  initDateOptions: () => void;
}

export const useFilterStore = create<FilterStore>((set, get) => ({

  // Filter states
  distance: "",
  courseTime: "",
  selectedDate: null,
  dateOptions: [],

  // Setters for filter states
  setDistance: (distance) => set({ distance }),
  setCourseTime: (courseTime) => set({ courseTime }),
  setSelectedDate: (selectedDate) => set({ selectedDate }),
  setDateOptions: (options) => set({ dateOptions: options }),

  initDateOptions: () => {
    const { dateOptions, selectedDate } = get();
    if (dateOptions.length > 0) return;

    const options = createDateOptions();

    set({
      dateOptions: options,
      selectedDate: selectedDate ?? options[0] // 初回だけ自動セット
    });
  },

}));