// @/hooks/useAutoScrollToDate.js
import { useEffect, useRef } from "react";
import { WeatherForecast} from "@/types/weather";
import { useFilterStore } from "@/stores/filterStore";

type ScrollRef = React.RefObject<HTMLDivElement | null>;

export function useAutoScrollToDate(forecast: WeatherForecast[]) {
  const { selectedDate } = useFilterStore();
  const scrollRef: ScrollRef = useRef(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const el = document.getElementById(`date-${selectedDate && selectedDate.value}`);

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
