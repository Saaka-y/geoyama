// components/Map/FocusMap.jsx

"use client"
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import * as mountains from "@/data/spotPins"; // index.jsx 経由で全山のピン情報を import
import * as routes from "@/data/routeGeojson"; // index.jsx経由で各山の routeGeojson を import
import { RoutePreview } from "@/components/Map/RoutePreview";

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const spotPins = {
  "jinba": mountains.jinbaGeojson,
  "tanigawa": mountains.tanigawaGeojson,
  "chausu": mountains.chausuGeojson,
  "kinpu": mountains.kinpuGeojson,
  "kintoki": mountains.kintokiGeojson,
  "nabewari": mountains.nabewariGeojson,
  "nantai": mountains.nantaiGeojson,
  "ono": mountains.onoGeojson,
  // 他の山も同じように追加
};

export function FocusMap({ showFocusMap, selectedMountain, focusMapRef }) {
  const focusMapContainerRef = useRef();
  const [routeGeo, setRouteGeo] = useState(null);

  // spot pins
  const spotPinsForEachMountain = useMemo(() => {
    return spotPins[selectedMountain?.properties?.description] || {
      type: "FeatureCollection",
      features: []
    };
  }, [selectedMountain]);

  // routes
  useEffect(() => {
    if (!selectedMountain) return;
    const mountainName = selectedMountain.properties.description;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRouteGeo(routes[mountainName] || { type: "FeatureCollection", features: [] });
  }, [selectedMountain]);



  useEffect(() => {
    if (!selectedMountain || !showFocusMap) return;
    mapboxgl.accessToken = accessToken;

    // zoom 位置決定
    const coords = spotPinsForEachMountain.features.map(f => f.geometry.coordinates);
    // summit, start, goal の中心地
    const center = [
      (coords[0][0] + coords[1][0] + coords[2][0]) / 3, // 経度の平均
      (coords[0][1] + coords[1][1] + coords[2][1]) / 3  // 緯度の平均
    ];

    // focusMap用インスタンス追加
    focusMapRef.current = new mapboxgl.Map({
      container: focusMapContainerRef.current,
      style: "mapbox://styles/mapbox/outdoors-v12",
      center: center,
      zoom: spotPinsForEachMountain.features[0].properties.zoom,
      pitch: 40,
      bearing: -17,
      logoPosition: "top-left",
    });

    focusMapRef.current.on("load", () => {

      // 3Dソース設定
      focusMapRef.current.addSource("terrain-dem", {
        "type": "raster-dem",
        "url": "mapbox://mapbox.mapbox-terrain-dem-v1",
        "tileSize": 512,
        "maxzoom": 14
      });
      // ３Dソースにterrain 設定
      focusMapRef.current.setTerrain({ source: "terrain-dem", exaggeration: 1.4 });

      // ピン表示
      const features = spotPinsForEachMountain.features;
      const layerOrder = ["mountain-icon", "goal-icon", "start-icon"];
      layerOrder.forEach(iconName => {
        const i = iconName === "mountain-icon" ? 0 : iconName === "start-icon" ? 1 : 2;
        const feature = features[i];
        const iconPath = `/icon/${iconName}.png`;

        // icon画像 読み込み
        focusMapRef.current.loadImage(iconPath, (err, image) => {
          if (err) throw err;
          if (!focusMapRef.current.hasImage(iconName)) {
            focusMapRef.current.addImage(iconName, image);
          }
          // icon表示用のsource追加
          focusMapRef.current.addSource(`${iconName}-source`, {
            type: "geojson",
            data: feature, //それぞれの山のgeojson（59)
          });
          // icon表示用のlayer（symbol） 設定
          focusMapRef.current.addLayer({
            id: `${iconName}-layer`,
            type: "symbol",
            source: `${iconName}-source`,
            layout: {
              "icon-image": iconName,
              "icon-size": 0.3,
              "icon-anchor": "bottom",
              "icon-allow-overlap": true,
            },
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
        routeGeo={routeGeo}
        focusMapRef={focusMapRef}
      />
    </>
  );
}


