// components/Map/FocusMap.jsx

"use client"
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import * as mountains from "@/data/spotPins"; // index.js 経由で全山のピン情報を import
import { RoutePreview } from "@/components/Map/RoutePreview";

const spotPins = {
  "Mt.Jinba": mountains.jinbaGeojson,
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

  // mountainGeoはpropsで使いたいから...
  const spotPinsForEachMountain = useMemo(() => {
    return spotPins[selectedMountain?.properties?.title] || {
      type: "FeatureCollection",
      features: []
    };
  }, [selectedMountain]);

  useEffect(() => {
    if (!selectedMountain || !showFocusMap) return;
    mapboxgl.accessToken = accessToken;

    const coords = spotPinsForEachMountain.features.map(f => f.geometry.coordinates);
    // coords = [[lng1, lat1], [lng2, lat2]] の形

    const center = [
      (coords[0][0] + coords[1][0]) / 2, // 経度の平均
      (coords[0][1] + coords[1][1]) / 2  // 緯度の平均
    ];

    focusMapRef.current = new mapboxgl.Map({
      container: focusMapContainerRef.current,
      style: "mapbox://styles/mapbox/outdoors-v12", //vector地図に変更
      center: center, //@/data/allMountains.jsx
      zoom: selectedMountain.properties.description === "kintoki" || "chausu" ? 13.5 : 12.5,
      pitch: 40,
      bearing: -17,
    });

    focusMapRef.current.on("load", () => {
      
      // 3Dソース設定
      focusMapRef.current.addSource("terrain-dem", {
        "type": "raster-dem",
        "url": "mapbox://mapbox.mapbox-terrain-dem-v1",
        "tileSize": 512,
        "maxzoom": 14
      });
      // ↑にterrain 設定
      focusMapRef.current.setTerrain({ source: "terrain-dem", exaggeration: 1.4 });

      // ピン表示
      const features = spotPinsForEachMountain.features;
      features.forEach((feature, i) => {
        const iconName = i === 0 ? "mountain-icon" : "carpark-icon";
        const iconPath = i === 0 ? "/icon/mountain-icon.png" : "/icon/carpark-icon.png";

        // icon読み込み
        focusMapRef.current.loadImage(iconPath, (err, image) => {
          if (err) throw err;
          if (!focusMapRef.current.hasImage(iconName)) {
            focusMapRef.current.addImage(iconName, image);
          }
          // icon表示用のsource登録
          focusMapRef.current.addSource(`${iconName}-source`, {
            type: "geojson",
            data: feature, //それぞれの山のgeojson（59)
          });
          // icon（symbol） layer設定
          focusMapRef.current.addLayer({
            id: `${iconName}-layer`,
            type: "symbol",
            source: `${iconName}-source`,
            layout: { "icon-image": iconName, "icon-size": 0.7, anchor: "top" },
          });
        });
      });

    });

    return () => focusMapRef.current?.remove();
  }, []);

  return (
    <>
      <div
        ref={focusMapContainerRef}
        style={{ width: "100%", height: "100%" }}
        className="focus-map"
      />
      <RoutePreview
        apiUrl={`/api/toGeoJson/${selectedMountain.properties.description}GeoJson`}
        focusMapRef={focusMapRef}
        spotPinsForEachMountain={spotPinsForEachMountain}
        selectedMountain={selectedMountain}
      />
    </>
  );
}


