// components/Map/JapanMapView.jsx

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useState, useRef } from 'react';
import { useMapUiStore } from '@/stores/mapUiStore';
import { useMountainMarkers } from '@/hooks/useMountainMarkers';

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export function JapanMapView({ japanMapRef }) {
  const [isMapReady, setIsMapReady] = useState(false); // A flag that shows if map is ready

  const { japanMapInitialView } = useMapUiStore();
  const japanMapContainerRef = useRef(null);

  useMountainMarkers({ japanMapRef, ready: isMapReady });


  //Map instance setup
  useEffect(() => {
    if (!japanMapContainerRef.current) return;
    mapboxgl.accessToken = accessToken;

    japanMapRef.current = new mapboxgl.Map({
      ...japanMapInitialView,
      container: japanMapContainerRef.current,
      style: 'mapbox://styles/mapbox/outdoors-v12',
    });

    japanMapRef.current.on('load', () => {
      setIsMapReady(true); // A flag that shows if map is ready
    });

    return () => japanMapRef.current?.remove();
  }, [japanMapInitialView, japanMapRef]);


  return (
    <div
      style={{ height: '100%', width: "100%" }}
      ref={japanMapContainerRef}
      className="map-container"
    />
  );
}


