// pages/index.jsx
"use client";
import { useState } from "react";
import { Filter } from "@/components/Filter";
import { JapanMap } from "@/components/Map"

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
          title: 'Mapbox',
          description: 'Mount Chausu',
          distance: 5,
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
          title: 'Mapbox',
          description: 'Mount Tanigawa',
          distance: 4,
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
          title: 'Mapbox',
          description: 'Mount Jimba',
          distance: 1,
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
          title: 'Mapbox',
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
          distance: 3,
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
          title: 'Mapbox',
          description: 'Mount Kinpu',
          distance: 4,
          courseTime: 6

        }
      },
    ]
  };

  const [distance, setDistance] = useState("");
  const [courseTime, setCourseTime] = useState("");
  const [allMountains] = useState(geojson.features);
  const [filteredMountains, setFilteredMountains] = useState(allMountains);

  return (
    <div className="w-screen h-screen flex flex-col md:flex-row justify-center bg-(var(--color-background))">
      {/* 上部：フィルター */}
      <Filter
        distance={distance}
        setDistance={setDistance}
        courseTime={courseTime}
        setCourseTime={setCourseTime}
        filteredMountains={filteredMountains}
        setFilteredMountains={setFilteredMountains}
        allMountains={allMountains} />

      {/* 下部：地図 */}
      <JapanMap filteredMountains={filteredMountains}/>
    </div>
  );
}
