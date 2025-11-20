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

  const initialView = {
    latitude: 35.6895,
    longitude: 139.6917,
    zoom: 7,
    pitch: 45,
    bearing: -17,
  }

  // map
  const [mapView, setMapView] = useState(initialView);
  const [selectedMountain, setSelectedMountain] = useState(null);

  // screen size
  const smallScreenClass = "w-full md:w-1/3 h-1/3 md:h-full";
  const fullScreenClass = "h-full md:w-full  p-0 m-0";
  const normalMapClass = " h-2/3 md:w-2/3";
  const zeroMapClass = "h-0 md:w-0";

  const [infoViewClass, setInfoViewClass] = useState(smallScreenClass)
  const [mapViewClass, setMapViewClass] = useState(normalMapClass)
  const [isFullScreen, setIsFullScreen] = useState(false)


  //**************************/
  // EVENTS /
  //**************************/
  const handleBackToMap = () => {
    setSelectedMountain(null);
    setMapView(initialView);
    setInfoViewClass(smallScreenClass);
    setIsFullScreen(false);
    setMapViewClass(normalMapClass);
  }

  const handleToFullScreen = () => {
    if (!isFullScreen) setIsFullScreen(true);
    setInfoViewClass(fullScreenClass);
    setMapViewClass(zeroMapClass);
  }

  const handleShrinkScreen = () => {
    if (isFullScreen) setIsFullScreen(false);
    setInfoViewClass(smallScreenClass);
    setMapViewClass(normalMapClass);
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
    setSelectedDate
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

  const screenSizeState = {
    infoViewClass,
    setInfoViewClass,
    mapViewClass,
    setMapViewClass,
    isFullScreen,
    setIsFullScreen
  }

  const events = {
    handleBackToMap,
    handleToFullScreen,
    handleShrinkScreen,
  }

  return (
    <MainView
      filterState={filterState}
      mapState={mapState}
      mountainState={mountainState}
      screenSizeState={screenSizeState}
      events={events}
    />
  );
}
