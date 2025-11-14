// Map/index.jsx
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

export function JapanMap({ filteredMountains, mapView, setMapView }) {


  const handleMarkerClick = (m) => {
    setMapView({
      latitude: m.geometry.coordinates[1],
      longitude: m.geometry.coordinates[0],
      zoom: 14,
      pitch: 60, // 3D 表示寄り
      bearing: 0
    })
  }

  return (
    <div className="h-2/3 md:h-full md:w-2/3 relative z-10">
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
            onClick={() => handleMarkerClick(m)}
          />
        ))}
      </Map>
    </div>
  );
}
