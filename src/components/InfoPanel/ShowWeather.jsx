// components/InfoPanel/ShowWeather.jsx
import { useEffect, useRef } from "react";
import { useMountainStore } from "@/stores/mountainStore";
import { useFilterStore } from "@/stores/filterStore";
import { useWeather } from "@/hooks/useWeather";
import { useIsLandscape } from "@/hooks/useIsLandscape";
import { getLocalDate } from "@/utils/getLocalDate";
import { degToCardinal } from "@/utils/degToCardinal";
import { groupForecastByDate } from "@/utils/groupForecastByDate";
import { getTimeBackground } from "@/utils/getTimeBackground";


export function ShowWeather() {
  const { selectedMountain } = useMountainStore();
  const { selectedDate } = useFilterStore();

  const forecast = useWeather();
  const isLandscape = useIsLandscape();
  const grouped = groupForecastByDate(forecast);

  const scrollRef = useRef(null);
  const summit = selectedMountain.properties.summit;

  //**************************/
  // scroll to selected date  /
  //**************************/
  useEffect(() => {
    if (!scrollRef.current) return;
    const el = document.getElementById(`date-${selectedDate.value}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  }, [forecast, selectedDate]);

  if (!selectedMountain || forecast.length === 0) return <p>Loading weather...</p>;


  return (

    <div
      ref={scrollRef}
      className={`
        flex md:flex-col gap-4 
        overflow-x-auto md:overflow-x-hidden md:overflow-y-auto 
        px-4 pb-4 mt-4 md:px-4 md:h-full 
        ${isLandscape && "flex-col overflow-x-hidden overflow-y-auto px-4 h-full "}
        `}
    >

      {/* 天気スクロールカードと画面端の距離を変える場合、親ではなく ↑ のpaddingを変える。親のMainView divを変えるとカードが見切れてしまう */}
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
          {/* 日付ヘッダー */}
          <p className="text-sm font-bold mb-2 text-center">
            {date}<span className="text-gray-400 text-xs"> {grouped[date] && grouped[date].length > 2 ? ` - Temp: (${summit}m)` : ""}</span>
          </p>

          {/* カード群 */}
          <div className={`flex md:flex-col gap-2 ${isLandscape && "flex-col"}`}>
            {grouped[date].map((item, i) => {
              const { time } = getLocalDate(item.dt); //時間
              const temp = Math.round(item.main.temp); //気温
              const timeHour = parseInt(time.slice(0, 2), 10); //時間（hourだけ取り出す）
              const { background, color } = getTimeBackground(isLandscape, timeHour);
              return (
                <div
                  key={i}
                  className={`w-[120px] md:w-full p-3 
                    border border-gray-300 rounded-lg 
                    text-center shadow-sm shrink-0 
                    hover:shadow-md transition-shadow
                    ${isLandscape && "w-full"}`}
                  style={{ background, color }}
                >
                  <p className="text-xs mb-1">{time}</p>
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
        </div>
      ))}
    </div>

  );
}
