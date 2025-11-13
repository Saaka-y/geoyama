// Map/index.jsx
"use client";
import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export function Map({ mountains }) {
  const mapContainer = useRef(null);

  useEffect(() => {
    if (!mapContainer.current) return;


    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/outdoors-v12", // 自然向けスタイル
      center: [139.6917, 35.6895], // 東京中心
      zoom: 7, // 初期ズーム
      pitch: 45, // 3D 表示用
      bearing: -17, // 地図の傾き
      antialias: false
    });

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
        description: 'Mount Chausu'
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
        description: 'Mount Tanigawa'
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
        description: 'Mount Jimba'
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
        description: 'Mount Nabewari'
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
        description: 'Mount Kintoki'
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
        description: 'Mount Kinpu'
      }
    },
  ]
};

for (const feature of geojson.features) {
    new mapboxgl.Marker().setLngLat(feature.geometry.coordinates).addTo(map);
  }

    return () => map.remove();
  }, []);

  return (
      <div className="h-2/3 relative z-10">
        <div ref={mapContainer} className="w-full h-full" />
      </div>
  );
}
