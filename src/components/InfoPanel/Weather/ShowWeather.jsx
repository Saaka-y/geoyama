/* eslint-disable @next/next/no-img-element */

// components/ShowWeather.jsx

import { useEffect, useState, useRef } from "react";

export function ShowWeather({ selectedMountain, selectedDate, setSelectedDate }) {
  const [forecast, setForecast] = useState([]);
  const scrollRef = useRef(null);
  const summit = selectedMountain.properties.summit


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
        console.log("3日分", filtered);

      } catch (err) {
        console.error("天気APIのエラー：", err);
      }
    }

    fetchWeather();
  }, [selectedDate, selectedMountain]);

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
    const date = item.dt_txt.slice(0, 10);
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
  const getTimeBackground = (hour) => {
    // hour: 0,3,6,9,12,15,18,21
    if (hour === 0) {
      return { background: "linear-gradient(to right, #2C3E50, #000000)", color: "#fff" }; 
    } else if (hour === 3) {
      return { background: "linear-gradient(to right, #000000, #FFF9C4)", color: "#fff" }; 
    } else if (hour === 6) {
      return { background: "linear-gradient(to right, #FFF9C4, #f7c8ad)", color: "#000" }; 
    } else if (hour === 9) {
      return { background: "linear-gradient(to right, #f7c8ad, #A3E4FF)", color: "#000" }; 
    } else if (hour === 12) {
      return { background: "linear-gradient(to right, #A3E4FF, #00BFFF)", color: "#000" }; 
    } else if (hour === 15) {
      return { background: "linear-gradient(to right, #00BFFF, #FFDAB9)", color: "#000" }; 
    } else if (hour === 18) {
      return { background: "linear-gradient(to right, #FFDAB9, #494ff5)", color: "#000" }; 
    } else if (hour === 21) {
      return { background: "linear-gradient(to right, #494ff5, #000000)", color: "#fff" }; 
    } else {
      return { background: "#ccc", color: "#000" }; // 安全用
    }
  };


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
            {date}<span className="text-gray-400 text-xs"> - Temp: around the summit ({summit}m)</span>
          </p>

          {/* カード群 */}
          <div className="flex flex-row md:flex-col gap-2">
            {grouped[date].map((item, i) => {
              const time = item.dt_txt.slice(11, 16);
              const temp = Math.round(item.wind.speed);
              const timeHour = parseInt(time.slice(0, 2), 10);
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
