// components/Map/FocusMap.jsx

// styleを衛生画像に変える（今のmapは読み込みが遅い）

"use client"
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import * as mountains from "@/data/mountains"; // index.js 経由で全山を import
import { geojson } from "@/data/mountains/allMountains";
import { RoutePreview } from "@/components/Map/RoutePreview";

const mountainGeoMap = {
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
  const mountainGeo = useMemo(() => {
    return mountainGeoMap[selectedMountain?.properties?.title] || {
      type: "FeatureCollection",
      features: []
    };
  }, [selectedMountain]);

  useEffect(() => {
    if (!selectedMountain || !showFocusMap) return;
    mapboxgl.accessToken = accessToken;

    focusMapRef.current = new mapboxgl.Map({
      container: focusMapContainerRef.current,
      style: "mapbox://styles/saaka/cmih5nkg600dl01r934o9fiph",
      center: selectedMountain.geometry.coordinates, //@/data/allMountains.jsx
      zoom: 13,
      pitch: 60,
      bearing: -17,
    });

    // selectedMountain に応じて GeoJSON を取得
    const mountainGeo = mountainGeoMap[selectedMountain.properties.title] || {
      type: "FeatureCollection",
      features: []
    };

    console.log("mountain Geo：", mountainGeo)

    focusMapRef.current.on("load", () => {
      // terrain 設定
      focusMapRef.current.setTerrain({ source: "mapbox-dem", exaggeration: 1.4 });

      // hillshade レイヤー追加
      focusMapRef.current.addLayer({
        id: "hillshading",
        type: "hillshade",
        source: "mapbox-dem",
      });

      //カスタムピン追加 https://docs.mapbox.com/mapbox-gl-js/example/add-image/ 参照
      // imageをMapに読み込み
      focusMapRef.current.loadImage(
        "/icon/mountain-icon.png",
        (error, image) => {
          if (error) throw error;
          focusMapRef.current.addImage("mountain-icon", image);
        }
      )

      // imageを表示する source(geojson)を指定
      // mountain icon
      focusMapRef.current.addSource('mountain-points', {
        'type': 'geojson',
        'data': mountainGeo.features[0]
      });

      // 指定した source に Layer-symbolを追加してMapに表示する
      focusMapRef.current.addLayer({
        id: 'mountain-points',
        type: 'symbol',
        source: 'mountain-points',
        layout: {
          'icon-image': 'mountain-icon',
          'icon-size': 0.7,
          anchor: "top",
          // 'icon-allow-overlap': true,
        }
      })

      // carpark icon
      focusMapRef.current.loadImage(
        "/icon/carpark-icon.png",
        (error, image) => {
          if (error) throw error;
          focusMapRef.current.addImage("carpark-icon", image);
        }
      )

      focusMapRef.current.addSource('carpark-point', {
        'type': 'geojson',
        'data': mountainGeo.features[1]
      });

      focusMapRef.current.addLayer({
        id: 'carpark-point',
        type: 'symbol',
        source: 'carpark-point',
        layout: {
          'icon-image': 'carpark-icon',
          'icon-size': 0.7,
          // 'icon-allow-overlap': true,
        }
      })
      
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
        focusMapRef={focusMapRef}
        apiUrl={`/api/toGeoJson/${mountainGeo.features[0].properties.routeApiUrl}`} />
    </>
  );
}


