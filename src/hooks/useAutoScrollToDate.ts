// @/hooks/useAutoScrollToDate.js
import { useEffect, useRef } from "react";
import { useFilterStore } from "@/stores/filterStore";

export function useAutoScrollToDate(forecast) {
  const { selectedDate } = useFilterStore();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    const el = document.getElementById(`date-${selectedDate.value}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  }, [selectedDate,forecast]);

  return scrollRef;
}
