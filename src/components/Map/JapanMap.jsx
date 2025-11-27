// components/Map/JapanMapView.jsx
"use client"
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef } from 'react';

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export function JapanMap({ japanMapRef, filteredMountains, initialView, selectedMountain, setSelectedMountain, setShowFocusMap }) {

  const japanMapContainerRef = useRef();
  const markerRef = useRef([]);

  //Map インスタンス作成
  useEffect(() => {
    mapboxgl.accessToken = accessToken;

    japanMapRef.current = new mapboxgl.Map({
      ...initialView, // homeで state管理 => [mapView, setMapView] = useState(initialView)
      container: japanMapContainerRef.current, // container ID
      style: 'mapbox://styles/saaka/cmigzixmw00d701r9d48afpqe', // style URL
    });
  }, [])

  // Marker 作成、フィルターに沿って変更
  useEffect(() => {
    if (!japanMapRef.current) return;

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
    Shinjuku to <a target="_blank" href="${m.properties.carPark}" class="underline">car park</a>: ${m.properties.distance} ${m.properties.distance === 1 ? "hr" : "hrs"}
    <br/>
    Return walk time: ${m.properties.courseTime} ${m.properties.courseTime === 1 ? "hr" : "hrs"}
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
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setDOMContent(popupEl);

      // Marker作成、Popupを紐付ける
      const marker = new mapboxgl.Marker()
        .setLngLat(coords)
        .setPopup(popup)
        .addTo(japanMapRef.current);

      marker.getElement().addEventListener("click", () => {
        japanMapRef.current.flyTo({
          ...initialView,
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


