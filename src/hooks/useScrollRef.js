// @/hooks/useScrollRef.js
import { useEffect, useRef } from "react";
import { useMountainStore } from "@/stores/mountainStore";
import { useFilterStore } from "@/stores/filterStore";

export function useScrollRef(forecast) {
  const { selectedMountain } = useMountainStore();
  const { selectedDate } = useFilterStore();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    const el = document.getElementById(`date-${selectedDate.value}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  }, [forecast, selectedDate]);

  if (!selectedMountain || forecast.length === 0) return <p>Loading weather...</p>;

  return scrollRef;
}
