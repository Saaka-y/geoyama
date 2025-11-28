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
    <></>
  );
}



