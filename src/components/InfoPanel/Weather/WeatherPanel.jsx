// components/InfoPanel/Weather/WeatherPanel.jsx
import { useMountainStore } from "@/stores/mountainStore";
import { useFilterStore } from "@/stores/filterStore";
import { useFetchWeather } from "@/hooks/useFetchWeather";
import { useScrollRef } from "@/hooks/useScrollRef";
import { groupForecastByDate } from "@/utils/groupForecastByDate";
import { WeatherDate } from "@/components/InfoPanel/Weather/WeatherDate";
import { WeatherCard } from "@/components/InfoPanel/Weather/WeatherCard";


export function WeatherPanel() {
  // stores
  const { selectedMountain } = useMountainStore();
  const { selectedDate } = useFilterStore();
  // hooks
  const forecast = useFetchWeather();
  const grouped = groupForecastByDate(forecast);
  const scrollRef = useScrollRef(forecast);
  // mountain info
  const summit = selectedMountain.properties.summit;

  if (!selectedMountain || forecast.length === 0) return <p>Loading weather...</p>;

  const className = [
    "flex",
    "gap-4",
    "px-4",
    "pb-4",
    "mt-4",
    "flex-row",
    "overflow-x-auto",
    "md:flex-col",
    "md:overflow-y-auto",
    "md:overflow-x-hidden",
    "md:h-[90%]",
    "landscape:flex-col",
    "landscape:overflow-y-auto",
    "landscape:overflow-x-hidden",
    "landscape:h-[90%]"
  ].join(" ")

  
  return (

    <div
      ref={scrollRef}
      className={className}
    >

      {/* 天気スクロールカードと画面端の距離を変える場合、親ではなく ↑ のpaddingを変える。親のMainView divを変えるとカードが見切れてしまう */}
      {/* Grouped weather lists */}
      {Object.keys(grouped).map((date) => (
        <div
          key={date}
          id={`date-${date}`}
          className="snap-start bg-white p-2 flex flex-col gap-1 shadow-sm"
          style={{
            border: date === selectedDate.value
              ? "2px solid #6495ED"
              : "1px solid #e5e7eb"
          }}
        >
          <WeatherDate date={date} grouped={grouped} summit={summit} />
          <WeatherCard date={date} grouped={grouped} />
        </div>
      ))}
    </div>
  );
}
