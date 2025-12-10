// components/InfoPanel/Weather/WeatherCard.jsx
import { useIsMd } from "@/hooks/useIsMd";
import { useIsLandscape } from "@/hooks/useIsLandscape";
import { getLocalDate } from "@/utils/getLocalDate";
import { degToCardinal } from "@/utils/degToCardinal";
import { getTimeBackground } from "@/utils/getTimeBackground";


export function WeatherCard({ date, grouped }) {
  const isMd = useIsMd();
  const isLandscape = useIsLandscape();


  return (
    <div className={`flex gap-2 ${isMd || isLandscape ? "flex-col" : "flex-row"}`}>
      
      {grouped[date].map((item, i) => {
        const { time } = getLocalDate(item.dt); //時間
        const temp = Math.round(item.main.temp); //気温
        const timeHour = parseInt(time.slice(0, 2), 10); //時間（hourだけ取り出す）
        const { background, color } = getTimeBackground(isLandscape, timeHour);
        return (
          <div
            key={i}
            className={`${isMd || isLandscape ? "w-full" : "w-[120px]"}
              p-3 border border-gray-300 rounded-lg 
              text-center shadow-sm shrink-0 
              hover:shadow-md transition-shadow
            `}
            style={{ background, color }}
          >
            <p className="text-xs mb-1">{time}</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              alt={item.weather[0].description}
              className="mx-auto"
            />
            <p className={`text-sm font-bold ${temp <= 0 ? "text-blue-500" : ""}`}>{temp}°C</p>
            <p className="text-sm font-bold">
              {degToCardinal(item.wind.deg)} {Math.round(item.wind.speed)} m/s
            </p>
            <p className="text-xs">{item.weather[0].description}</p>
          </div>
        );
      })}
    </div>
  );
}
