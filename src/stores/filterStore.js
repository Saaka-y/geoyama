//@/stores/filterStore.js

import { create } from "zustand";
import { createDateOptions } from "@/utils/createDateOptions";


export const useFilterStore = create((set, get) => ({

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