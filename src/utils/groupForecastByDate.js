// /utils/groupForecastByDate.js
import { unixToLocalDateTime } from "./unixToLocalDateTime";

export function groupForecastByDate(list) {
  return list.reduce((acc, item) => {
    const { date } = unixToLocalDateTime(item.dt);
    if (!acc[date]) acc[date] = [];
    acc[date].push(item);
    return acc;
  }, {});
}