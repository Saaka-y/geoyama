// hooks/useMountainMarkers.js

import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';
import { useMapUiStore } from '@/stores/mapUiStore';
import { useMountainStore } from '@/stores/mountainStore';
import { createPopupElement } from '@/ui/createPopupElement';


export function useMountainMarkers({japanMapRef, ready}) {
  const { setShowFocusMap, japanMapInitialView } = useMapUiStore();
  const { filteredMountains, setSelectedMountain } = useMountainStore();

  const markerRef = useRef([]);


  useEffect(() => {
    if (!japanMapRef.current || !ready) return;

    filteredMountains?.forEach((m) => {
      const coords = m.geometry.coordinates;

      // Popup(createPopupElement.js)
      const popupEl = createPopupElement(m, () => {
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


      // Create Marker
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

      // Save marker to ref
      markerRef.current.push(marker);
    })

    // Cleanup markers on unmount or when dependencies change
    return () => {
      markerRef.current.forEach(m => m.remove());
      markerRef.current = [];
  };

  }, [filteredMountains, ready, japanMapInitialView, japanMapRef, setSelectedMountain, setShowFocusMap]);

  return markerRef;
}


