
import { useEffect, useState } from "react";
import { Source, Layer } from "react-map-gl"

export function RoutePreview({ apiUrl }) {
  const [geojson, setGeojson] = useState(null);


  // ルートデータを取得
  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        console.log("fetchしてきたデータ:", data)
        setGeojson(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRoute();
  }, [apiUrl]);

  if (!geojson) return null;

  return (
    <Source id="route" type="geojson" data={geojson.geojson}  >
      <Layer
        id="route-line"
        type="line"
        paint={{
          'line-color': 'white',
          'line-width': 5,
        }}
        Layer={{
          'line-cap': 'round',
          'line-join': 'round',
        }}
      />
    </Source>
  );
}



