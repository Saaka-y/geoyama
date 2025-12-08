//@/hooks/useGetDateOptions.js
import { useState, useEffect } from "react";
import { useFilterStore } from "@/stores/filterStore";
import { dayToStr } from "@/utils/dayToStr";

export function useGetDateOptions() {
  const { selectedDate, setSelectedDate } = useFilterStore();
  const [dateOptions, setDateOptions] = useState([]);

  useEffect(() => {
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDateOptions(options);

    if (!selectedDate) {
      setSelectedDate(options[0]);
    }

  }, []);

  return { dateOptions, setDateOptions };
}