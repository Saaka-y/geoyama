//@/stores/filterStore.js

import { create } from "zustand";

export const useFilterStore = create((set) => ({
  // Filter states
  distance: "",
  courseTime: "",
  selectedDate: null,
  dateOptions: [],

  // Setters for filter states
  setDistance: (distance) => set({ distance }),
  setCourseTime: (courseTime) => set({ courseTime }),
  setSelectedDate: (selectedDate) => set({ selectedDate }),
  setDateOptions: (dateOptions) => set({ dateOptions }),

}));