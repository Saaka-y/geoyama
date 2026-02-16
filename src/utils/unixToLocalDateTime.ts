//@/utils/unixToLocalDateTime.js
import { dateToStr } from "@/utils/dateToStr";

interface Props {
  dt: number; 
}

export function unixToLocalDateTime({ dt }: Props) {
  const local = new Date(dt * 1000); // JS内で自動的にローカル時間になる
  const date = dateToStr(local);
  // time: HH:MM
  const hh = String(local.getHours()).padStart(2, "0");
  const mi = String(local.getMinutes()).padStart(2, "0");
  const time = `${hh}:${mi}`;

  return { date, time, local };
}

