// components/ShowWeather.jsx

import { useEffect, useState, useRef } from "react";
import { useMountainStore } from "@/stores/mountainStore";
import { useFilterStore } from "@/stores/filterStore";

export function ShowWeather() {
  const { selectedMountain } = useMountainStore();
  const { selectedDate } = useFilterStore();
  const [forecast, setForecast] = useState([]);
  const scrollRef = useRef(null);

  //**************************/
  // fetch /
  //**************************/
  useEffect(() => {

    if (!selectedMountain || !selectedDate) return;

    const fetchWeather = async () => {
      const { geometry } = selectedMountain;
      const lat = geometry.coordinates[1];
      const lon = geometry.coordinates[0];

      try {
        const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
        const data = await res.json();

        if (data.list?.[0]) {
  const item = data.list[0];
  console.log("dt_txt:", item.dt_txt);
  console.log(
    "dt (→ JST):",
    new Date(item.dt * 1000).toLocaleString("ja-JP", {
      timeZone: "Asia/Tokyo"
    })
  );
}

        const targetDate = new Date(selectedDate.value);

        const datesToShow = [];
        for (let i = -1; i <= 1; i++) {
          const d = new Date(targetDate);
          d.setDate(d.getDate() + i);
          datesToShow.push(d.toISOString().slice(0, 10)); // YYYY-MM-DD 
        }

        const filtered = data.list.filter(item =>
          datesToShow.some(d => item.dt_txt.startsWith(d))
        );

        setForecast(filtered);

      } catch (err) {
        console.error("天気APIのエラー：", err);
      }
    }

    fetchWeather();
  }, [selectedDate, selectedMountain]);


  //**************************/
  // Local date and time /
  //**************************/
  function getLocalDateParts(dt) {
  const local = new Date(dt * 1000); // dt は秒
  const yyyy = local.getFullYear();
  const mm = String(local.getMonth() + 1).padStart(2, "0");
  const dd = String(local.getDate()).padStart(2, "0");

  // date: YYYY-MM-DD
  const date = `${yyyy}-${mm}-${dd}`;

  // time: HH:MM
  const hh = String(local.getHours()).padStart(2, "0");
  const mi = String(local.getMinutes()).padStart(2, "0");
  const time = `${hh}:${mi}`;

  return { date, time, local };
}


  //**************************/
  // wind direction /
  //**************************/
  function degToCardinal(deg) {
    const directions = ['↓', '↙︎', '←', '↖︎', '↑', '↗︎', '→', '↘︎'];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
  }

  //**************************/
  // Group forecast by date  /
  //**************************/
  const grouped = forecast.reduce((acc, item) => {
  const { date } = getLocalDateParts(item.dt);
  if (!acc[date]) acc[date] = [];
  acc[date].push(item);
  return acc;
}, {});


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

  //**************************/
  // background gradient depenging on the time  /
  //**************************/
  const isMd = typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches;
  const getTimeBackground = (hour) => {
    const direction = isMd ? "to bottom" : "to right";
    if (hour === 0) {
      return { background: `linear-gradient(${direction}, #2C3E50, #000000)`, color: "#fff" };
    } else if (hour === 3) {
      return { background: `linear-gradient(${direction}, #000000, #FFF9C4)`, color: "#fff" };
    } else if (hour === 6) {
      return { background: `linear-gradient(${direction}, #FFF9C4, #f7c8ad)`, color: "#000" };
    } else if (hour === 9) {
      return { background: `linear-gradient(${direction}, #f7c8ad, #A3E4FF)`, color: "#000" };
    } else if (hour === 12) {
      return { background: `linear-gradient(${direction}, #A3E4FF, #00BFFF)`, color: "#000" };
    } else if (hour === 15) {
      return { background: `linear-gradient(${direction}, #00BFFF, #FFDAB9)`, color: "#000" };
    } else if (hour === 18) {
      return { background: `linear-gradient(${direction}, #FFDAB9, #494ff5)`, color: "#000" };
    } else if (hour === 21) {
      return { background: `linear-gradient(${direction}, #494ff5, #000000)`, color: "#fff" };
    } else {
      return { background: "#ccc", color: "#000" };
    }
  };

  const summit = selectedMountain.properties.summit;
  
  // ****** parent div ******
  // flex-1 bg-(--color-surface)` +
  //   (showFocusMap? ` pt-5` ...)　

  return (
    <div
      ref={scrollRef}
      className="
        flex md:flex-col gap-4 
        overflow-x-auto md:overflow-x-hidden md:overflow-y-auto 
        px-4 pb-4 md:px-4 md:h-full 
      "
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
          <div className="flex flex-row md:flex-col gap-2">
            {grouped[date].map((item, i) => {
              const { time } = getLocalDateParts(item.dt); //時間
              const temp = Math.round(item.main.temp); //気温
              const timeHour = parseInt(time.slice(0, 2), 10); //時間（hourだけ取り出す）
              const { background, color } = getTimeBackground(timeHour);
              return (
                <div
                  key={i}
                  className="w-[120px] md:w-full p-3 
                    border border-gray-300 rounded-lg 
                    text-center shadow-sm shrink-0 
                    hover:shadow-md transition-shadow"
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
