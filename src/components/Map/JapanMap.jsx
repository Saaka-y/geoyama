// components/Map.jsx
"use client";
import { Map, Marker, Source, Layer, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useState } from 'react';
import { RoutePreview } from '@/components/Map/RoutePreview';


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

export function JapanMap({ mapState, mountainState, showWeather, setShowWeather }) {

  //**************************/
  // PROPS  /
  //**************************/
  const {
    mapView,
    setMapView,
    initialView,
    selectedMountain,
    setSelectedMountain
  } = mapState;

  const {
    allMountains,
    filteredMountains,
    setFilteredMountains
  } = mountainState;

  const [showPopup, setShowPopup] = useState(false);

  //***** parent div ******/
  // relative flex-2 z-10

  return (
    <>
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
            anchor="center"
          >
            <div
              className="w-4 h-4 bg-blue-600 rounded-full cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedMountain(m)
              }}
            />
          </Marker>
        ))}

        {/* 山が選択され、Weather表示の時だけルート描画 */}
        {showWeather && selectedMountain && (
          <RoutePreview apiUrl={selectedMountain.properties.routeApiUrl} />
        )}

        {selectedMountain && !showWeather && (
          <Popup
            longitude={selectedMountain.geometry.coordinates[0]}
            latitude={selectedMountain.geometry.coordinates[1]}
            onClose={() => { !showWeather && setSelectedMountain(null) }}
            closeOnClick={true}
            closeButton={false}
            anchor="top"
          >
            <div className="p-2 bg-gray-300/40 text-black rounded shadow-md">
              <span className="font-bold">{selectedMountain.properties.title} ({selectedMountain.properties.summit}m)</span>
              <span className="italic">{selectedMountain.properties.routeName && `- ${selectedMountain.properties.routeName} `}</span>
              <br />
              Shinjuku to car park: {selectedMountain.properties.distance} {selectedMountain.properties.distance === 1 ? "hr" : "hrs"}
              <br />
              Return walk time: {selectedMountain.properties.courseTime} {selectedMountain.properties.courseTime === 1 ? "hr" : "hrs"}
              <br />
              Elevation gain: {selectedMountain.properties.elevation}m
              <br />
              {!showWeather && (
                <button className="underline" onClick={() => {
                  setMapView({
                    latitude: selectedMountain.geometry.coordinates[1],
                    longitude: selectedMountain.geometry.coordinates[0],
                    zoom: 13,
                    pitch: 60,
                    bearing: 0
                  });
                  setShowWeather(true);
                }}>Weather and trail map</button>
              )}
            </div>
          </Popup>
        )}
      </Map>
    </>
  );
}
