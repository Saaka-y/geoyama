// components/Map/JapanMapView.jsx
"use client"
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef } from 'react';
import { useMapStore } from '@/stores/mapStore';
import { useUiStore } from '@/stores/uiStore';
import { useMountainStore } from '@/stores/mountainStore';

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export function JapanMap() {
  const {japanMap,setJapanMap} = useMapStore();
  const { setShowFocusMap, japanMapInitialView } = useUiStore();
  const { filteredMountains, setSelectedMountain } = useMountainStore();
  const japanMapContainerRef = useRef(null);
  const markerRef = useRef([]);

  //Map インスタンス作成
  useEffect(() => {
    mapboxgl.accessToken = accessToken;

    const map = new mapboxgl.Map({
      ...japanMapInitialView,
      container: japanMapContainerRef.current, // container ID
      style: 'mapbox://styles/mapbox/outdoors-v12', // style URL
    });

    setJapanMap(map); // mapStoreに保存
    return () => map.remove();
  }, [])

  // Marker 作成、フィルターに沿って変更
  useEffect(() => {
    if (!japanMap) return;

    // 既存のマーカーを消す
    markerRef.current.forEach(m => m.remove());
    markerRef.current = [];

    filteredMountains?.forEach((m) => {
      const coords = m.geometry.coordinates;

      // Popup用のDOM作成
      const popupEl = document.createElement("div");
      popupEl.className = "p-1 bg-gray-300/40 text-black rounded shadow-md";

      // 山情報
      const info = document.createElement("div");
      info.innerHTML = `
        <span class="font-bold">${m.properties.title} (${m.properties.summit}m)</span>
        <span class="italic">${m.properties.routeName ? `- ${m.properties.routeName}` : ""}</span>
        <br/>
        Shinjuku to <a target="_blank" rel="noreferrer" href="${m.properties.carPark ? m.properties.carPark : m.properties.station}" class="underline">${m.properties.carPark ? "car park" : "station"}</a>: ${m.properties.distance} ${m.properties.distance === 1 ? "hr" : "hrs"}
        <br/>
        Total hike time: ${m.properties.courseTime} ${m.properties.courseTime === 1 ? "hr" : "hrs"}
        <br/>
        Elevation gain: ${m.properties.elevation}m
      `;
      popupEl.appendChild(info);

      // ボタン
      const button = document.createElement("button");
      button.className = "underline cursor-pointer mt-1";
      button.textContent = "Weather and trail map";
      button.addEventListener("click", () => {
        setSelectedMountain(m);
        setShowFocusMap(true)
      });
      popupEl.appendChild(button);

      // Popup
      const popup = new mapboxgl.Popup({ offset: 25, anchor: "top" })
        .setDOMContent(popupEl)

      const el = document.createElement("div");
      el.className = "custom-marker";
      el.style.width = "50px"; // サイズ調整
      el.style.height = "50px";
      el.style.backgroundImage = "url('/icon/japanmap-icon.png')"; // 画像指定
      el.style.backgroundSize = "contain"; // 画像をフィット
      el.style.backgroundRepeat = "no-repeat";
      el.style.backgroundPosition = "center";
      el.style.cursor = "pointer";


      // Marker作成、Popupを紐付ける
      const marker = new mapboxgl.Marker(el)
        .setLngLat(coords)
        .setPopup(popup)
        .addTo(japanMap);

      marker.getElement().addEventListener("click", () => {
        japanMap.flyTo({
          ...japanMapInitialView,
          center: coords,
        })
      })

      // Marker 管理用配列に追加
      markerRef.current.push(marker);
    })
  }, [filteredMountains]);


  return (
    <div
      style={{ height: '100%', width: "100%" }}
      ref={japanMapContainerRef}
      className="map-container"
    />

  );
}


