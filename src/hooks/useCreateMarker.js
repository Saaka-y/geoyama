// hooks/useCreateMarker.js
"use client"
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';
import { useMapUiStore } from '@/stores/mapUiStore';
import { useMountainStore } from '@/stores/mountainStore';
import { markerPopupEl } from '@/utils/markerPopupEl';


export function useCreateMarker(japanMapRef) {
  const { setShowFocusMap, japanMapInitialView } = useMapUiStore();
  const { filteredMountains, setSelectedMountain } = useMountainStore();

  const markerRef = useRef([]);

  // Marker 作成、フィルターに沿って変更
  useEffect(() => {
    if (!japanMapRef.current) return;

    // 既存のマーカーを消す
    markerRef.current.forEach(m => m.remove());
    markerRef.current = [];

    filteredMountains?.forEach((m) => {
      const coords = m.geometry.coordinates;

      // Popup(markerPopupEl.js)
      const popupEl = markerPopupEl(m, () => {
        setSelectedMountain(m);
        setShowFocusMap(true);
      });

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
        .addTo(japanMapRef.current);

      marker.getElement().addEventListener("click", () => {
        japanMapRef.current.flyTo({
          ...japanMapInitialView,
          center: coords,
        })
      })

      // Marker 管理用配列に追加
      markerRef.current.push(marker);
    })
  }, [filteredMountains]);

  return markerRef;
}


