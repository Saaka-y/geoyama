// components/InfoPanel/Weather/WeatherCard.jsx
import { GroupedForecastByDate } from "@/types/weather";
import { unixToLocalDateTime } from "@/utils/unixToLocalDateTime";
import { degToArrow } from "@/utils/degToArrow";
import { resolveTimeBackground } from "@/ui/resolveTimeBackground";

interface WeatherCardProps {
  date: string;
  grouped: GroupedForecastByDate;
}

export function WeatherCard({ date, grouped }: WeatherCardProps) {

  return (
    <div className="flex gap-3 flex-row md:flex-col landscape:flex-col">

      {grouped[date].map((item, i) => {
        const { time } = unixToLocalDateTime({ dt: item.dt });
        const temp = Math.round(item.main.temp);
        const timeHour = parseInt(time.slice(0, 2), 10);
        const { background, color } = resolveTimeBackground({ isLandscape: false, hour: timeHour });
        const windSpeed = Math.round(item.wind.speed);

        return (
          <div
            key={i}
            className="
              w-[120px]
              md:w-full
              landscape:w-full
              p-2.5
              rounded-xl
              text-center
              shadow-(--card-shadow)
              hover:shadow-(--card-shadow-hover)
              transition-all
              duration-300
              shrink-0
              border
              border-transparent
              hover:border-(--primary)
            "
            style={{ background, color }}
          >
            {/* Time */}
            <p className="text-xs font-bold mb-1.5 opacity-90 tracking-tight">{time}</p>

            {/* Weather Icon */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              alt={item.weather[0].description}
              className="mx-auto w-12 h-12 -my-1"
            />

            {/* Temperature */}
            <p className={`text-xl font-bold mb-1.5 tracking-tight ${temp <= 0 ? "text-blue-400" : ""}`}>
              {temp}°
            </p>

            {/* Wind */}
            <div className="flex items-center justify-center gap-1 mb-1.5">
              <span className="text-sm">{degToArrow(item.wind.deg)}</span>
              <span className="text-xs font-bold tracking-tight">{windSpeed}</span>
              <span className="text-[10px] opacity-75 font-medium">m/s</span>
            </div>

            {/* Description */}
            <p className="text-[10px] opacity-85 capitalize leading-tight font-medium">
              {item.weather[0].description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
