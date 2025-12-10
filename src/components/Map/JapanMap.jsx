// components/Map/JapanMapView.jsx
"use client"
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef } from 'react';
import { useMapUiStore } from '@/stores/mapUiStore';
import { useIsLandscape } from '@/hooks/useIsLandscape';
import { useCreateMarker } from '@/hooks/useCreateMarker';

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export function JapanMap({ japanMapRef }) {
  const { japanMapInitialView } = useMapUiStore();

  const isLandscape = useIsLandscape();
  const markerRef = useCreateMarker(japanMapRef);

  const japanMapContainerRef = useRef(null);

  //Map instance setup
  useEffect(() => {
    mapboxgl.accessToken = accessToken;

    japanMapRef.current = new mapboxgl.Map({
      ...japanMapInitialView,
      container: japanMapContainerRef.current,
      style: 'mapbox://styles/mapbox/outdoors-v12',
    });
  }, [])

  // Mapのリサイズ
  useEffect(() => {
    if (!japanMapRef.current) return;
    japanMapRef.current.resize();
  }, [isLandscape])
  
  
  return (
    <div
      style={{ height: '100%', width: "100%" }}
      ref={japanMapContainerRef}
      className="map-container"
    />
  );
}


