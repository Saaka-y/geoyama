//@/components/Map/RoutePreview.jsx
import { useEffect } from "react";
import { MapRef } from "@/types/mapbox";
import { useRouteGeo } from "@/hooks/useRouteGeo";

type RoutePreviewProps = {
  focusMapRef: MapRef;
  ready: boolean;
};

export function RoutePreview({ focusMapRef, ready }: RoutePreviewProps) {
  const routeGeo = useRouteGeo();

  useEffect(() => {
    if (!focusMapRef.current || !routeGeo?.features?.length || !ready) return;

    const map = focusMapRef.current;

    // Extract elevations from route coordinates and apply color gradient 
    const elevations = routeGeo.features[0].geometry.coordinates.map((c) => c[2]);
    const colorForElevation = (e: number) => {
      if (e < 500) return "blue";
      if (e < 1000) return "cyan";
      if (e < 1500) return "lime";
      if (e < 2000) return "yellow";
      if (e < 2500) return "orange";
      return "red";
    };

    // Function to add or update the route layer
    const updateRoute = () => {
      if (map.getSource("route")) {
        map.getSource("route").setData(routeGeo); // *** This line is necessary to avoid errors that happen with multiple layers ***
      } else {
        map.addSource("route", { type: "geojson", data: routeGeo, lineMetrics: true });

        map.addLayer({
          id: "route-main",
          type: "line",
          source: "route",
          paint: { "line-color": "white", "line-width": 6, "line-opacity": 1 },
        });

        map.addLayer({
          id: "route-gradient",
          type: "line",
          source: "route",
          layout: { "line-cap": "round", "line-join": "round" },
          paint: {
            "line-width": 4,
            "line-gradient": [
              "interpolate",
              ["linear"],
              ["line-progress"],
              0, colorForElevation(elevations[0]),
              0.1, colorForElevation(elevations[Math.floor(elevations.length * 0.1)]),
              0.3, colorForElevation(elevations[Math.floor(elevations.length * 0.3)]),
              0.5, colorForElevation(elevations[Math.floor(elevations.length * 0.5)]),
              0.7, colorForElevation(elevations[Math.floor(elevations.length * 0.7)]),
              1, colorForElevation(elevations[elevations.length - 1]),
            ],
          },
        });
      }
    };

    updateRoute();

  }, [routeGeo, ready, focusMapRef]);

  return (
    <>
      {/* Elevation meter */}
      <div
        style={{
          position: "absolute",
          top: 30,
          right: 10,
          height: 200,
          width: 90,
          backgroundColor: "rgba(0,0,0,0.3)",
          borderRadius: 6,
          padding: "8px",
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          gap: "8px",
        }}
      >
        <div
          style={{
            width: 30,
            minWidth: 30,
            height: "100%",
            background: "linear-gradient(to top, #0000FF 0%, #00FFFF 20%, #00FF00 40%, #FFFF00 60%, #FFA500 80%, #FF0000 100%)",
            border: "2px solid #fff",
            borderRadius: 4,
            flexShrink: 0,
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column-reverse",
            justifyContent: "space-between",
            height: "100%",
            flex: 1,
          }}
        >
          {[0, 500, 1000, 1500, 2000, 2500, 3000].map((el) => (
            <div key={el} style={{ fontSize: 9, color: "#fff",  whiteSpace: "nowrap" }}>{el}m</div>
          ))}
        </div>
      </div>
    </>
  );
}
