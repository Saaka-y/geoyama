// @/hooks/useAutoScrollToDate.js
import { useEffect, useRef } from "react";
import { useFilterStore } from "@/stores/filterStore";

export function useAutoScrollToDate(forecast) {
  const { selectedDate } = useFilterStore();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const el = document.getElementById(`date-${selectedDate.value}`);

    if (el) {
      // Check if horizontal scroll (mobile) or vertical scroll (desktop)
      const isHorizontalScroll = container.scrollWidth > container.clientWidth;

      if (isHorizontalScroll) {
        // Mobile: scroll horizontally to center the element
        const elementCenter = el.offsetLeft + (el.offsetWidth / 2);
        const containerCenter = container.offsetWidth / 2;
        const scrollLeft = elementCenter - containerCenter;

        container.scrollTo({
          left: scrollLeft,
          behavior: "smooth"
        });
      } else {
        // Desktop: scroll vertically to center the element
        const elementCenter = el.offsetTop + (el.offsetHeight / 2);
        const containerCenter = container.offsetHeight / 2;
        const scrollTop = elementCenter - containerCenter;

        container.scrollTo({
          top: scrollTop,
          behavior: "smooth"
        });
      }
    }
  }, [selectedDate, forecast]);

  return scrollRef;
}
