// components/JapanMap.jsx
"use client";
import { Map, Marker, Source, Layer, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useState, useRef } from 'react';
import { RoutePreview } from '@/components/Map/RoutePreview';
import { GiMountainCave } from "react-icons/gi";


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

export function oldJapanMap({ mapState, mountainState, showWeather, setShowWeather }) {

  const mapRef = useRef();

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
        ref={mapRef}
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
          maxzoom={15}
        />
        {/* sky レイヤー */}
        <Layer {...skyLayer} />


        {/* 山のピン */}
        {!showWeather &&
          <>
            {filteredMountains.map((m, i) => (
              <Marker
                key={i}
                longitude={m.geometry.coordinates[0]}
                latitude={m.geometry.coordinates[1]}
                anchor="center"
                onClick={() => {
                  mapRef.current?.flyTo({
                    center: [
                      m.geometry.coordinates[0],
                      m.geometry.coordinates[1]
                    ],
                    zoom: 7,
                    duration: 900, 
                  });
                }}
              >
                <div
                  className="relative flex items-center justify-center w-8 h-8 bg-white border-1 rounded-tl-[50%] rounded-tr-[50%] rounded-bl-[50%] rotate-45"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedMountain(m)
                  }}
                >
                  <GiMountainCave size={20} className='rotate-[-45deg]' />
                </div>
              </Marker>
            ))}
          </>
        }

        {/* 山が選択され、Weather表示の時だけルート描画 */}
        {showWeather && selectedMountain && (
          <RoutePreview 
            apiUrl={selectedMountain.properties.routeApiUrl} 
            setMapView={setMapView}
            mapRef={mapRef}
          />
        )}

        {!showWeather && selectedMountain && (
          <Popup
            longitude={selectedMountain.geometry.coordinates[0]}
            latitude={selectedMountain.geometry.coordinates[1]}
            onClose={() => { !showWeather && setSelectedMountain(null) }}
            closeOnClick={true} // 画面タップでクローズ
            closeButton={false} //closeボタン表示なし
            anchor="top"
          >
            <div
              className="p-1 m-1 bg-gray-300/40 text-black rounded shadow-md"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="font-bold">{selectedMountain.properties.title} ({selectedMountain.properties.summit}m)</span>
              <span className="italic">{selectedMountain.properties.routeName && `- ${selectedMountain.properties.routeName} `}</span>
              <br />
              Shinjuku to <a target="_blank" href={selectedMountain.properties.carPark} className='underline'>car park</a>: {selectedMountain.properties.distance} {selectedMountain.properties.distance === 1 ? "hr" : "hrs"}
              <br />
              Return walk time: {selectedMountain.properties.courseTime} {selectedMountain.properties.courseTime === 1 ? "hr" : "hrs"}
              <br />
              Elevation gain: {selectedMountain.properties.elevation}m
              <br />
              {!showWeather && (
                <button className="underline cursor-pointer" onClick={() => {
                  setMapView({
                    latitude: selectedMountain.geometry.carParkCoordinates[1],
                    longitude: selectedMountain.geometry.carParkCoordinates[0],
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
