// components/InfoPanel/Weather/WeatherPanel.jsx
import { useMountainStore } from "@/stores/mountainStore";
import { useFilterStore } from "@/stores/filterStore";
import { useWeatherForecast } from "@/hooks/useWeatherForecast";
import { useAutoScrollToDate } from "@/hooks/useAutoScrollToDate";
import { groupForecastByDate } from "@/utils/groupForecastByDate";
import { WeatherDate } from "@/components/InfoPanel/Weather/WeatherDate";
import { WeatherCard } from "@/components/InfoPanel/Weather/WeatherCard";
import WeatherErrorBoundary from "@/components/ErrorBoundary/WeatherErrorBoundary";


export function WeatherPanel() {
  // stores
  const { selectedMountain } = useMountainStore();
  const { selectedDate } = useFilterStore();
  // hooks
  const forecast = useWeatherForecast();
  const grouped = groupForecastByDate(forecast);
  const scrollRef = useAutoScrollToDate(forecast);
  // mountain info
  const summit = selectedMountain.properties.summit;

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

  if (!selectedMountain || forecast.length === 0) return <p>Loading weather...</p>;

  return (
    <WeatherErrorBoundary>
      <div
        ref={scrollRef}
        className={className}
      >

        {/* If we want to change the distance between the weather scroll card and the edge of the screen, adjust the padding above, not the parent. Changing the parent MainView div will cause the card to be cut off.*/}
        {/* Grouped weather lists */}
        {Object.keys(grouped).map((date) => ( // each date is the key
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
    </WeatherErrorBoundary>
  );
}
