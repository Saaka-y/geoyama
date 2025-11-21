/* eslint-disable @next/next/no-img-element */

// components/ShowWeather.jsx

import { useEffect, useState, useRef } from "react";

export function ShowWeather({ selectedMountain, selectedDate, setSelectedDate }) {
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
        console.error(err);
      }
    }

    fetchWeather();
  }, [selectedDate, selectedMountain]);

  //**************************/
  // wind direction /
  //**************************/
  function degToCardinal(deg) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
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

  return (
<div
  ref={scrollRef}
  className="flex md:flex-col gap-4 overflow-x-auto md:overflow-x-hidden md:overflow-y-auto snap-x snap-mandatory px-2 md:px-4"
>
  {Object.keys(grouped).map((date) => (
    <div
      key={date}
      id={`date-${date}`}
      className="snap-start bg-white border-2 rounded-lg p-2 flex flex-col gap-2"
      style={{
        backgroundColor: date === selectedDate.value ? "cadetblue" : "#BDB76B",
        borderColor: date === selectedDate.value ? "black" : "gray"
      }}
    >
      {/* 日付ヘッダー */}
      <p className="text-sm font-bold mb-2 text-center">{date}</p>

      {/* カード群 */}
      <div className="flex flex-row md:flex-col gap-2">
        {grouped[date].map((item, i) => {
          const time = item.dt_txt.slice(11, 16);
          return (
            <div
              key={i}
              className="w-[120px] md:w-full border rounded p-2 text-center bg-gray-300 flex-shrink-0"
            >
              <p className="text-xs mb-1">{time}</p>
              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                alt={item.weather[0].description}
                className="mx-auto"
              />
              <p className="text-sm font-bold">{item.main.temp}°C</p>
              <p className="text-sm font-bold">
                {degToCardinal(item.wind.deg)} {item.wind.speed} m/s
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
