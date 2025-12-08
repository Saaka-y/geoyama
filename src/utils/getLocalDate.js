//@/utils/getLocalDate.js
import { dayToStr } from "@/utils/dayToStr";

export function getLocalDate(dt) {
  const local = new Date(dt * 1000); // JS内で自動的にローカル時間になる
  const date = dayToStr(local);
  // time: HH:MM
  const hh = String(local.getHours()).padStart(2, "0");
  const mi = String(local.getMinutes()).padStart(2, "0");
  const time = `${hh}:${mi}`;

  return { date, time, local };
}

