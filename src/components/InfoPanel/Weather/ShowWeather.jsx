/* eslint-disable @next/next/no-img-element */

// components/ShowWeather.jsx

import { useEffect, useState } from "react";

export function ShowWeather({ selectedMountain, selectedDate, setSelectedDate }) {
  const [forecast, setForecast] = useState([]);

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


  function degToCardinal(deg) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
  }

  if (!selectedMountain || forecast.length === 0) return <p>Loading weather...</p>;


  return (
    <div className="">
      <div className="flex space-x-3 pb-2">
        {forecast.map((item, i) => {
          const date = item.dt_txt.slice(0, 10);
          const time = item.dt_txt.slice(11, 16);

          return (
            <div
              key={i}
              className="min-w-[120px] h-fit p-2 border rounded text-center bg-white"
            >
              <p className="text-xs font-bold">{date}</p>
              <p className="text-sm">{time}</p>

              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                alt={item.weather[0].description}
                className="mx-auto"
              />

              <p className="text-sm font-bold">{item.main.temp}°C</p>
              <p className="text-sm font-bold">
                <span>{degToCardinal(item.wind.deg)} </span>
                <span>{item.wind.speed} m/s</span>
              </p>
              <p className="text-xs">{item.weather[0].description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
