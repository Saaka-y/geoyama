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
    "pb-6",
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

  if (!selectedMountain || forecast.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-[var(--text-secondary)] text-sm">Loading weather...</p>
      </div>
    );
  }

  return (
    <WeatherErrorBoundary>
      <div
        ref={scrollRef}
        className={className}
      >

        {/* Grouped weather lists */}
        {Object.keys(grouped).map((date) => ( // each date is the key
          <div
            key={date}
            id={`date-${date}`}
            className="snap-start bg-[var(--card-bg)] p-3 flex flex-col gap-2 rounded-xl shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-all duration-300"
            style={{
              border: date === selectedDate.value
                ? "2px solid var(--primary)"
                : "2px solid transparent"
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
