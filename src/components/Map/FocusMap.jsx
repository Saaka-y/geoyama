// components/Map/FocusMap.jsx

"use client"
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export function FocusMap({ showFocusMap, selectedMountain, focusMapRef }) {
  const focusMapContainerRef = useRef();

  useEffect(() => {
    if (!selectedMountain || !showFocusMap) return;
    mapboxgl.accessToken = accessToken;

    focusMapRef.current = new mapboxgl.Map({
      container: focusMapContainerRef.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: selectedMountain.geometry.coordinates,
      zoom: 13,
      pitch: 70,
      bearing: -17,
    });

    focusMapRef.current.on("style.load", () => {
      // DEM ソース追加
      focusMapRef.current.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxzoom: 14,
      });

      // terrain 設定
      focusMapRef.current.setTerrain({ source: "mapbox-dem", exaggeration: 1.4 });

      // hillshade レイヤー追加
      focusMapRef.current.addLayer({
        id: "hillshading",
        type: "hillshade",
        source: "mapbox-dem",
      });
    });

    console.log(focusMapRef.current);

    return () => focusMapRef.current?.remove();
  }, []);

  return (
    <div
      ref={focusMapContainerRef}
      style={{ width: "100%", height: "100%" }}
      className="focus-map"
    />
  );
}


// 3D時のLayer追加

// focusMapRef.current.on("load", () => {
// focusMapRef.current.addSource('geojson-source', {
//         'type': 'geojson',
//         'data': geojson
//       });

// focusMapRef.current.addLayer({
//         id: 'mountain-symbol',
//         type: 'symbol',
//         source: 'geojson-source',
//         layout: {
//           'icon-image': 'mountain-icon', 
//           'icon-size': 0.8,
//           'icon-allow-overlap': true,
//         }
//       })}