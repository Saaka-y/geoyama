// /utils/groupForecastByDate.js
import { getLocalDate } from "./getLocalDate";

export function groupForecastByDate(list) {
  return list.reduce((acc, item) => {
    const { date } = getLocalDate(item.dt);
    if (!acc[date]) acc[date] = [];
    acc[date].push(item);
    return acc;
  }, {});
}