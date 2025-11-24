// pages/index.jsx
"use client";
import { useState } from "react";
import { geojson } from "@/components/data/mountains";
import { MainView } from "@/components/MainView/MainView";

export default function Home() {

  //**************************/
  // STATES /
  //**************************/

  // select elements
  const [distance, setDistance] = useState("");
  const [courseTime, setCourseTime] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  // mountains
  const [allMountains] = useState(geojson.features);
  const [filteredMountains, setFilteredMountains] = useState(allMountains);

  // map
  const initialView = {
    latitude: 35.6895,
    longitude: 139.6917,
    zoom: 7,
    pitch: 45,
    bearing: -17,
  }
  const [mapView, setMapView] = useState(initialView);
  const [selectedMountain, setSelectedMountain] = useState(null);

  // weather
  const [showWeather, setShowWeather] = useState(false)

  //**************************/
  // EVENTS /
  //**************************/
  const handleBackToMap = () => {
    setSelectedMountain(null);
    setMapView(initialView);
    setShowWeather(false)
  }

  //**************************/
  // PROPS  /
  //**************************/
  const filterState = {
    distance,
    setDistance,
    courseTime,
    setCourseTime,
    selectedDate,
    setSelectedDate,
  };

  const mapState = {
    mapView,
    setMapView,
    initialView,
    selectedMountain,
    setSelectedMountain
  };

  const mountainState = {
    allMountains,
    filteredMountains,
    setFilteredMountains
  };

  return (
    <MainView
      filterState={filterState}
      mapState={mapState}
      mountainState={mountainState}
      handleBackToMap={handleBackToMap}
      showWeather={showWeather}
      setShowWeather={setShowWeather}
    />
  );
}
