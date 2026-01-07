//@/hooks/useWeatherForecast.js

import { useEffect, useState } from "react";
import { useMountainStore } from "@/stores/mountainStore";
import { useFilterStore } from "@/stores/filterStore";
import { dateToStr } from "@/utils/dateToStr";

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
          datesToShow.push(dateToStr(d));
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

  console.log("Fetched forecast:", forecast);
  return forecast;
}