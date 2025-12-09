//@/stores/filterStore.js
import { create } from "zustand";
import { dayToStr } from "@/utils/dayToStr";

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
  setDateOptions: (options) => set({ dateOptions: options }),

  initDateOptions: () => set((state) => {
    if (state.dateOptions.length > 0) return state; // 既にあるなら何もしない

    const today = new Date();
    const days = 5;
    const options = [];

    for (let i = 0; i <= days; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const label =
        i === 0 ? "Today" :
        i === 1 ? "Tomorrow" :
        `${i} days later`;

      options.push({
        date,
        label,
        value: dayToStr(date),
        string: date.toLocaleDateString("en-UK", {
          weekday: "short",
          month: "short",
          day: "numeric"
        })
      });
    }

    return {
      dateOptions: options,
      selectedDate: state.selectedDate || options[0] // 初回だけ自動セット
    };
  }),

}));