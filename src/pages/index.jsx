// pages/index.jsx
"use client";
import { useState } from "react";
import { Filter } from "@/components/Filter";
import { JapanMap } from "@/components/Map"
import { WeatherInfo } from "@/components/WeatherInfo";

export default function Home() {
  const geojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [139.9629289, 37.1248415]
        },
        properties: {
          title: 'Mt.Chausu',
          description: 'Mount Chausu',
          distance: 3.5,
          courseTime: 3
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [138.9303258224096, 36.83582764641854]
        },
        properties: {
          title: 'Mt.Tanigawa',
          description: 'Mount Tanigawa',
          distance: 3,
          courseTime: 1
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [139.166601, 35.652254]
        },
        properties: {
          title: 'Mt.Jimba',
          description: 'Mount Jimba',
          distance: 1.5,
          courseTime: 2
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [139.14161914045997, 35.445043691827536]
        },
        properties: {
          title: 'Mt.Nabewari',
          description: 'Mount Nabewari',
          distance: 2,
          courseTime: 4
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [139.00452128748336, 35.29100532254763]
        },
        properties: {
          title: 'Mapbox',
          description: 'Mount Kintoki',
          distance: 2.5,
          courseTime: 4
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [138.8289016391101, 35.5275878479893]
        },
        properties: {
          title: 'Mt.Kinpu',
          description: 'Mount Kinpu',
          distance: 3.25,
          courseTime: 6
        }
      },
    ]
  };

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

  const handleBackToMap = () => {
    setSelectedMountain(null);
    setMapView(initialView);
  }

  // props for Filter.jsx
  const filterState = {
    distance,
    setDistance,
    courseTime,
    setCourseTime,
    selectedDate,
    setSelectedDate
  };

  const mapState = {
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
    <div className="w-screen h-screen flex flex-col md:flex-row justify-center bg-[var(--color-background)]">

      {/* Map*/}
      <JapanMap
        filteredMountains={filteredMountains}
        mapView={mapView}
        setMapView={setMapView}
        selectedMountain={selectedMountain}
        setSelectedMountain={setSelectedMountain}
      />

      {selectedMountain && (
        <button
          className="bg-white cursor-pointer"
          onClick={handleBackToMap}
        >
          Back to Map
        </button>
      )}

      {/* Information part */}
      <div className="p-6 md:p-8 mt-2 flex flex-col justify-start items-center md:justify-start gap-4 bg-(--color-surface) w-full md:w-1/3 h-1/3 md:h-full">
        {!selectedMountain ? (
          <Filter
            filterState={filterState}
            mapState={mapState}
            mountainState={mountainState}
          />) : (
          <WeatherInfo
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />)}
      </div>
    </div>
  );
}
