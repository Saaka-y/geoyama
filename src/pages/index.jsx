// pages/index.jsx
"use client";
import { useState, useRef } from "react";
import { geojson } from "../../data/mountains";
import { MainView } from "@/components/MainView/MainView";

export default function Home() {

  //**************************/
  // Mapbox instance /
  //**************************/
  const japanMapRef = useRef();
  const focusMapRef = useRef();

  //**************************/
  // STATES /
  //**************************/

  // select elements
  const [distance, setDistance] = useState("");
  const [courseTime, setCourseTime] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  // mountain marker state
  const [allMountains] = useState(geojson.features);
  const [filteredMountains, setFilteredMountains] = useState(allMountains);

  // mapView state
  const initialView = {
    center: [139.6917, 35.6895],
    zoom: 7,
    pitch: 50,
    bearing: -17,
    touchZoomRotate: true
  }
  const [mapView, setMapView] = useState(initialView);
  const [selectedMountain, setSelectedMountain] = useState(null);
  const [showFocusMap, setShowFocusMap] = useState(false);

  //**************************/
  // EVENTS /
  //**************************/
  const handleBackToMap = () => {
    setShowFocusMap(false)
    setSelectedMountain(null);
    setMapView(initialView);
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

  return (


    <>
      <MainView
        filterState={filterState}
        // Map インスタンス関連
        japanMapRef={japanMapRef}
        focusMapRef={focusMapRef}
        showFocusMap={showFocusMap}
        setShowFocusMap={setShowFocusMap}
        //mountain marker state
        allMountains={allMountains}
        filteredMountains={filteredMountains}
        setFilteredMountains={setFilteredMountains}
        handleBackToMap={handleBackToMap}
        // mapView state
        mapView={mapView}
        setMapView={setMapView}
        initialView={initialView}
        // mountain focus state
        selectedMountain={selectedMountain}
        setSelectedMountain={setSelectedMountain}
      />
    </>
  );
}
