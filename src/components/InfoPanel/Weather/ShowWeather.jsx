/* eslint-disable react-hooks/exhaustive-deps */
// components/WeatherInfo.jsx

import { DateSelect } from "@/components/InfoPanel/Filter/DateSelect";
import { useEffect, useState } from "react";

export function ShowWeather({ selectedMountain, selectedDate, setSelectedDate }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {

    if (!selectedMountain || !selectedDate) return;

    const fetchWeather = async () => {
      const { geometry } = selectedMountain;
      const lat = geometry.coordinates[1];
      const lon = geometry.coordinates[0];

      try {
        const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
        const data = await res.json();
        const targetDateStr = selectedDate.value; // YYYY-MM-DD
        const dailyWeather = data.list.find(item => item.dt_txt.startsWith(targetDateStr));
        setWeather(dailyWeather);
      } catch (err) {
        console.error(err);
      }
    }

    fetchWeather();
  }, [selectedDate, selectedMountain]);

  if (!weather) return <p>Loading weather...</p>;

  return (
    <div>
      <h3>{selectedMountain.properties.description} - {selectedDate.string}</h3>
      <p>Temp: {weather.main.temp}°C</p>
      <p>Feels like: {weather.main.feels_like}°C</p>
      <p>Weather: {weather.weather[0].description}</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind: {weather.wind.speed} m/s</p>
    </div>
  );
}
