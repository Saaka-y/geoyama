// /utils/groupForecastByDate.js
import { unixToLocalDateTime } from "./unixToLocalDateTime";


export function groupForecastByDate(list) {
  const grouped = {};
  for(const item of list) {
    const { date } = unixToLocalDateTime(item.dt);
    if(!grouped[date]) {
      grouped[date] = [];  // Initialize an empty array if the date key does not exist
    }
    grouped[date].push(item);
  }

  console.log("Grouped forecast by date:", grouped);
  return grouped;
}

// Example output:
// {
//   '2026-01-07': [
//     { dt: 1704600000, temp: 5, ... },
//     { dt: 1704610800, temp: 6, ... },
//     { dt: 1704621600, temp: 7, ... }
//   ],
//   '2026-01-08': [
//     { dt: 1704686400, temp: 4, ... },
//     { dt: 1704697200, temp: 5, ... }
//   ]
// }