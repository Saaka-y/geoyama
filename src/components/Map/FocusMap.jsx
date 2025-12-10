// components/Map/FocusMap.jsx

"use client"
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";
import { useMapUiStore } from "@/stores/mapUiStore";
import { useMountainStore } from "@/stores/mountainStore";
import { useCreateSpotPins } from "@/hooks/useCreateSpotPins";
import { useCreateRoute } from "@/hooks/useCreateRoute";
// import { useFocusPin } from "@/hooks/useFocusPin";
import { MountainInfo } from "@/components/Map/MountainInfo";
import { RoutePreview } from "@/components/Map/RoutePreview";

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export function FocusMap( { focusMapRef }) {
  const { showFocusMap } = useMapUiStore();
  const { selectedMountain } = useMountainStore();
  const spotPinsForEachMountain = useCreateSpotPins();

  const routeGeo = useCreateRoute();
  const features = spotPinsForEachMountain.features;
  // useFocusPin({ focusMapRef, features });
  const focusMapContainerRef = useRef(null);


  // FocusMap instance setup
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

    focusMapRef.current = new mapboxgl.Map({
      container: focusMapContainerRef.current,
      style: "mapbox://styles/mapbox/outdoors-v12",
      center: center,
      zoom: spotPinsForEachMountain.features[0].properties.zoom,
      pitch: 40,
      bearing: -17,
      logoPosition: "top-left",
    });

    const map = focusMapRef.current;
    map.on("load", () => {

      // 3Dソース設定
      map.addSource("terrain-dem", {
        "type": "raster-dem",
        "url": "mapbox://mapbox.mapbox-terrain-dem-v1",
        "tileSize": 512,
        "maxzoom": 14
      });
      // ３Dソースにterrain 設定
      map.setTerrain({ source: "terrain-dem", exaggeration: 1.4 });

      // ピン表示
      
      const layerOrder = ["mountain-icon", "goal-icon", "start-icon"];
      layerOrder.forEach(iconName => {
        const i = iconName === "mountain-icon" ? 0 : iconName === "start-icon" ? 1 : 2;
        const feature = features[i];
        const iconPath = `/icon/${iconName}.png`;

        // icon画像 読み込み
        map.loadImage(iconPath, (err, image) => {
          if (err) throw err;
          if (!map.hasImage(iconName)) {
            map.addImage(iconName, image);
          }
          // icon表示用のsource追加
          map.addSource(`${iconName}-source`, {
            type: "geojson",
            data: feature, //それぞれの山のgeojson（59)
          });
          // icon表示用のlayer（symbol） 設定
          map.addLayer({
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

    return () => map?.remove();
  }, []);

  
  return (
    <>
      <div
        ref={focusMapContainerRef}
        style={{ width: "100%", height: "100%" }}
        className="focus-map"
      />

      {/* 左上に半透明カード */}
      {selectedMountain && (
        <div
          style={{
            position: "absolute",
            top: 30,
            left: 10,
            zIndex: 10,
            backgroundColor: "rgba(0,0,0,0.3)",
            padding: "8px",
            borderRadius: "6px",
            maxWidth: "220px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
          }}
        >
          <MountainInfo />
        </div>
      )}

      <RoutePreview
        focusMapRef={focusMapRef}
        routeGeo={routeGeo}
      />
    </>
  );
}


