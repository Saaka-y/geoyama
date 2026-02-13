//@/utils/dayToStr.js

import dayjs from "dayjs";

export function dateToStr(date) {
  return dayjs(date).format("YYYY-MM-DD");
}

