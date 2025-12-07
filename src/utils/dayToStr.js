//@/utils/dayToStr.js

import dayjs from "dayjs";

export function dayToStr(date) {
  return dayjs(date).format("YYYY-MM-DD");
}

