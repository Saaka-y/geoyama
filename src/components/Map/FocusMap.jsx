// components/Map/FocusMap.jsx

"use client"
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import * as mountains from "@/data/mountains"; // index.js 経由で全山を import

const mountainGeoMap = {
  "Mt.Jimba": mountains.jimbaGeojson,
  "Mt.Tanigawa": mountains.tanigawaGeojson,
  "Mt.Chausu": mountains.chausuGeojson,
  "Mt.Kinpu": mountains.kinpuGeojson,
  "Mt.Kintoki": mountains.kintokiGeojson,
  "Mt.Nabewari": mountains.nabewariGeojson,
  "Mt.Nantai": mountains.nantaiGeojson,
  // 他の山も同じように追加
};

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export function FocusMap({ showFocusMap, selectedMountain, focusMapRef }) {
  const focusMapContainerRef = useRef();

  useEffect(() => {
    if (!selectedMountain || !showFocusMap) return;
    mapboxgl.accessToken = accessToken;

    focusMapRef.current = new mapboxgl.Map({
      container: focusMapContainerRef.current,
      style: "mapbox://styles/saaka/cmih5nkg600dl01r934o9fiph",
      center: selectedMountain.geometry.coordinates,
      zoom: 13,
      pitch: 60,
      bearing: -17,
    });

    // selectedMountain に応じて GeoJSON を取得
    const mountainGeo = mountainGeoMap[selectedMountain.properties.title] || {
      type: "FeatureCollection",
      features: []
    };

    focusMapRef.current.on("style.load", () => {
      // terrain 設定
      focusMapRef.current.setTerrain({ source: "mapbox-dem", exaggeration: 1.4 });

      // hillshade レイヤー追加
      focusMapRef.current.addLayer({
        id: "hillshading",
        type: "hillshade",
        source: "mapbox-dem",
      });

      //3D時のLayer追加
      focusMapRef.current.addSource('mountain-points', {
        'type': 'geojson',
        'data': selectedMountain
      });

      focusMapRef.current.addLayer({
        id: 'mountain-points',
        type: 'symbol',
        source: 'mountain-points',
        layout: {
          'icon-image': 'mountain-icon',
          'icon-size': 0.8,
          'icon-allow-overlap': true,
        }
      })
    });

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


