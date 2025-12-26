//@/utils/createDateOptions.js

import { dateToStr } from "@/utils/dateToStr";

export const createDateOptions = () => {
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
      value: dateToStr(date),
      string: date.toLocaleDateString("en-UK", {
        weekday: "short",
        month: "short",
        day: "numeric"
      })
    });
  }

  return options;
}