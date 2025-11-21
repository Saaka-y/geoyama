// components/Map.jsx
"use client";
import { Map, Marker, Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MountainInfoBox } from '@/components/Map/MountainInfoBox';

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

  const handleSelectedMountain = (m) => {
    setSelectedMountain(m)
  }

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
          >
            <div className="relative">
              {/* カスタムピン */}
              <div
                className="w-4 h-4 bg-blue-600 rounded-full cursor-pointer"
                onClick={() => handleSelectedMountain(m)}
              />
              {selectedMountain === m && (
                <MountainInfoBox 
                  mountain={m} 
                  selectedMountain={selectedMountain} 
                  showWeather={showWeather}
                  setShowWeather={setShowWeather}
                  setMapView={setMapView}
                />
              )}
            </div>
          </Marker>
        ))}
      </Map>
    </>
  );
}
