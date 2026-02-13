// components/InfoPanel/Weather/WeatherCard.jsx
import { unixToLocalDateTime } from "@/utils/unixToLocalDateTime";
import { degToArrow } from "@/utils/degToArrow";
import { resolveTimeBackground } from "@/ui/resolveTimeBackground";


export function WeatherCard({ date, grouped }) {

  return (
    <div className="flex gap-3 flex-row md:flex-col landscape:flex-col">

      {grouped[date].map((item, i) => {
        const { time } = unixToLocalDateTime(item.dt);
        const temp = Math.round(item.main.temp);
        const timeHour = parseInt(time.slice(0, 2), 10);
        const { background, color } = resolveTimeBackground(false, timeHour);
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
            <p className="text-xs font-semibold mb-1 opacity-80">{time}</p>

            {/* Weather Icon */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              alt={item.weather[0].description}
              className="mx-auto w-12 h-12 -my-1"
            />

            {/* Temperature */}
            <p className={`text-lg font-bold mb-1 ${temp <= 0 ? "text-blue-400" : ""}`}>
              {temp}°
            </p>

            {/* Wind */}
            <div className="flex items-center justify-center gap-0.5 mb-1">
              <span className="text-sm">{degToArrow(item.wind.deg)}</span>
              <span className="text-xs font-semibold">{windSpeed}</span>
              <span className="text-[10px] opacity-70">m/s</span>
            </div>

            {/* Description */}
            <p className="text-[10px] opacity-80 capitalize leading-tight">
              {item.weather[0].description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
