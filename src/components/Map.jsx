// Map/index.jsx
"use client";
import { Map, Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export function JapanMap({ filteredMountains }) {

  return (
    <div className="h-2/3 md:h-full md:w-2/3 relative z-10">
      {/* <div ref={mapContainer} className="w-full h-full" /> */}
      <Map
        initialViewState={{
          latitude: 35.6895,
          longitude: 139.6917,
          zoom: 7,
          pitch: 45,
          bearing: -17,
        }}
        mapStyle="mapbox://styles/mapbox/outdoors-v12"
        mapboxAccessToken={accessToken}
        style={{ width: "100%", height: "100%" }}
      >
        {filteredMountains.map((m, i) => (
          <Marker
            key={i}
            longitude={m.geometry.coordinates[0]}
            latitude={m.geometry.coordinates[1]}
          />
        ))}
      </Map>
    </div>
  );
}
