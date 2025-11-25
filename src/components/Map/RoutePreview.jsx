
import { useEffect, useState } from "react";
import { Source, Layer } from "react-map-gl"

export function RoutePreview({ apiUrl }) {
  const [geojson, setGeojson] = useState(null);

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

  if (!geojson) return null;

  return (
    <Source id="route" type="geojson" data={geojson}>
      <Layer
        id="route-line"
        type="line"
        paint={{
          'line-color': '#FF8C00',
          'line-width': 5
        }}
        layout={{
          'line-cap': 'round',  
          'line-join': 'round'  
        }}
      />
    </Source>
  );
}



