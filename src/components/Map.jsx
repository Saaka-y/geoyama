// components/Map.jsx
"use client";
import { Map, Marker, Source, Layer } from 'react-map-gl';
import { useState } from "react"
import 'mapbox-gl/dist/mapbox-gl.css';

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

// 外部 "https://visgl.github.io/react-map-gl/examples/mapbox/terrain" を参照
const skyLayer = {
  id: "sky",
  type: "sky",
  paint: {
    'sky-type': 'atmosphere',
    'sky-atmosphere-sun': [0.0, 0.0],
    'sky-atmosphere-sun-intensity': 15
  }
}

export function JapanMap({ filteredMountains, mapView, setMapView, selectedMountain, setSelectedMountain, selectedDate }) {

  const handleMarkerClick = (m) => {
    setMapView({
      latitude: m.geometry.coordinates[1],
      longitude: m.geometry.coordinates[0],
      zoom: 10,
      pitch: 40, // 3D 表示寄り
      bearing: 0
    })
    setSelectedMountain(m)
  }

  return (
    <div className="h-2/3 md:h-full w-full md:w-2/3 relative z-10">
      <Map
        {...mapView}
        onMove={evt => setMapView(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/outdoors-v12"
        mapboxAccessToken={accessToken}
        style={{ width: "100%", height: "100%" }}
        maxPitch={85}
        terrain={{ source: 'mapbox-dem', exaggeration: 1.3 }}
      >
        {/* DEM地形データ */}
        <Source
          id="mapbox-dem"
          type="raster-dem"
          url="mapbox://mapbox.mapbox-terrain-dem-v1"
          tileSize={512}
          maxzoom={14}
        />
        {/* sky レイヤー */}
        <Layer {...skyLayer} />
        {/* 山のピン */}
        {filteredMountains.map((m, i) => (
          <Marker
            key={i}
            longitude={m.geometry.coordinates[0]}
            latitude={m.geometry.coordinates[1]}
          // onClick={() => handleMarkerClick(m)}
          >
            <div className="relative">
              {/* カスタムピン */}
              <div
                className="w-4 h-4 bg-blue-600 rounded-full cursor-pointer"
                onClick={() => handleMarkerClick(m)}
              />

              {/* 選択中の山だけ情報ボックス表示 */}
              {selectedMountain?.properties.description === m.properties.description && (
                <div className="absolute top-0 left-full w-30 ml-2 p-2 bg-white/70 text-black rounded shadow-md z-20">
                  Shinjuku to car park: {m.properties.distance} {m.properties.distance === 1 ? "hr" : "hrs"}
                  <br/>
                  Duration to return: {m.properties.courseTime} {m.properties.courseTime === 1 ? "hr" : "hrs"}
                </div>
              )}
            </div>
          </Marker>
        ))}
      </Map>
    </div>
  );
}
