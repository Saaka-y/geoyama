//@/components/Map/RoutePreview.jsx
import { useEffect, useState, useRef } from "react";
import { Source, Layer, Marker } from "react-map-gl"

export function RoutePreview({ apiUrl, mapRef, setMapView }) {
  const [geojson, setGeojson] = useState(null);
  const [progress, setProgress] = useState(0);
  const animationRef = useRef(null);


  // ルートデータを取得
  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setGeojson(data.geojson);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRoute();
  }, [apiUrl]);

  const coords = geojson?.features[0].geometry.coordinates || [];
  const totalPoints = geojson?.features[0].geometry?.coordinates?.length || 1;

  // ラインアニメーションとカメラ追従
  useEffect(() => {
    if (!geojson || !coords.length) return;
    let idx = 0;

    const animate = () => {
      if (idx < totalPoints) {
        setProgress(idx);

        idx++;
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    animationRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationRef.current);
  }, [geojson, totalPoints]);

  

  const currentPos = geojson?.features[0].geometry.coordinates[progress];

  return (
    <>
      <Source id="route" type="geojson" data={geojson} lineMetrics={true}  >
        <Layer
          id="route-progress"
          type="line"
          layout={{ 'line-cap': 'round', 'line-join': 'round' }}
          paint={{
            'line-width': 3,
            'line-gradient': [
              'interpolate',
              ['linear'],
              ['line-progress'],
              0, 'blue',        // 線の先頭から青
              progress / totalPoints, 'blue', // 進行した部分は青
              progress / totalPoints + 0.0001, 'transparent', // ここから残りは透明
              1, 'transparent'
            ]
          }}
        />
      </Source>
      {currentPos && (
        <Marker
          longitude={currentPos[0]}
          latitude={currentPos[1]}
          pitchAlignment="map"
          anchor="center"
        >
          <div className="w-4 h-4 rotate-45 bg-red-500 clip-path-triangle" />
        </Marker>
      )}
      )
    </>
  );
}



