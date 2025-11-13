// pages/index.jsx
"use client";
import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { Filter } from "../components/Filter";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function Home() {
  const mapContainer = useRef(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/outdoors-v12", // 自然向けスタイル
      center: [139.6917, 35.6895], // 東京中心
      zoom: 6, // 初期ズーム
      pitch: 45, // 3D 表示用
      bearing: -12, // 地図の傾き
      antialias: false
    });

    return () => map.remove();
  }, []);

  const [distance, setDistance] = useState("");
  const [courseTime, setCourseTime] = useState("");

  return (
    <div className="w-screen h-screen flex flex-col bg-(var(--color-background))">
      {/* 上部：フィルター */}
      <Filter
        distance={distance}
        setDistance={setDistance}
        courseTime={courseTime}
        setCourseTime={setCourseTime} />

      {/* 下部：地図 */}
      <div className="h-2/3 relative z-10">
        <div ref={mapContainer} className="w-full h-full" />
      </div>
    </div>
  );
}
