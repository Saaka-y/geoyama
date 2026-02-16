//@/hooks/useWeatherForecast.js

import { useEffect, useState } from "react";
import { useMountainStore } from "@/stores/mountainStore";
import { useFilterStore } from "@/stores/filterStore";
import { dateToStr } from "@/utils/dateToStr";
import { Coordinates } from "@/types/mapbox";

export function useWeatherForecast() {

  const { selectedMountain } = useMountainStore();
  const { selectedDate } = useFilterStore();
  const [forecast, setForecast] = useState([]);

  //**************************/
  // fetch /
  //**************************/
  useEffect(() => {

    if (!selectedMountain || !selectedDate) return;

    const fetchWeather = async () => {
      const { geometry } = selectedMountain;
      const coords: Coordinates = { lat: geometry.coordinates[1], lng: geometry.coordinates[0] };

      try {
        const res = await fetch(`/api/weather?lat=${coords.lat}&lon=${coords.lng}`);
        const data = await res.json();

        // Check if API returned an error
        if (!res.ok || !data.list) {
          console.error("Weather API error:", data.error || "No data available");
          setForecast([]);
          return;
        }

        const targetDate = new Date(selectedDate.value);

        const datesToShow: string[] = [];
        for (let i = -1; i <= 1; i++) {
          const d = new Date(targetDate);
          d.setDate(d.getDate() + i);
          datesToShow.push(dateToStr(d));
        }

        const filtered = data.list.filter((item: { dt_txt: string }) =>
          datesToShow.some(d => item.dt_txt.startsWith(d))
        );

        setForecast(filtered);

      } catch (err) {
        console.error("天気APIのエラー：", err);
        setForecast([]);
      }
    }

    fetchWeather();
  }, [selectedDate, selectedMountain]);

  console.log("Fetched forecast:", forecast);
  return forecast;
}