/* eslint-disable react-hooks/exhaustive-deps */
// components/WeatherInfo.jsx

import { useEffect, useState } from "react";

export function ShowWeather() {

  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch("/api/weather");
        const data = await res.json();
        console.log(data)
        setWeather(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchWeather();
  }, []);

  if (!weather) return <p>Loading...</p>;

  return (
    <div>
      <h1>陣馬山の5日間予報（3時間ごと）</h1>
      <div>
        {weather.list.map((item, idx) => (
          <div key={idx} style={{ borderBottom: "1px solid #ccc", marginBottom: "8px", padding: "4px" }}>
            <p><strong>{item.dt_txt}</strong></p>
            <p>気温: {item.main.temp}°C</p>
            <p>天気: {item.weather[0].description}</p>
            <p>風速: {item.wind.speed} m/s</p>
            <p>降水確率: {item.pop * 100}%</p>
          </div>
        ))}
      </div>

    </div>
  );
}
