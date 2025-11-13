// pages/index.jsx
"use client";
import { useState } from "react";
import mapboxgl from "mapbox-gl";
import { Filter } from "../components/Filter";
import { Map } from "@/components/Map";
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function Home() {

  const [distance, setDistance] = useState("");
  const [courseTime, setCourseTime] = useState("");
  const [mountains, setMountains] = useState([]);

  return (
    <div className="w-screen h-screen flex flex-col bg-(var(--color-background))">
      {/* 上部：フィルター */}
      <Filter
        distance={distance}
        setDistance={setDistance}
        courseTime={courseTime}
        setCourseTime={setCourseTime}
        mountains={mountains}
        setMountains={setMountains} />

      {/* 下部：地図 */}
      <Map
        mountains={mountains}
      />
    </div>
  );
}
