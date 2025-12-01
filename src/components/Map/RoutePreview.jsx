import { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

export function RoutePreview({ apiUrl, focusMapRef, spotPinsForEachMountain }) {
  const [routeGeo, setRouteGeo] = useState(null);

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setRouteGeo(data.routeGeojson);
        console.log("トレイルジオ：", data.routeGeojson);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRoute();
  }, [apiUrl]);

  useEffect(() => {
    if (!focusMapRef.current || !routeGeo) return;
    const map = focusMapRef.current;

    const elevations = routeGeo.features[0].geometry.coordinates.map(c => c[2]);
    const colorForElevation = (e) => {
      if (e < 500) return "blue";
      if (e < 1000) return "cyan";
      if (e < 1500) return "lime";
      if (e < 2000) return "yellow";
      if (e < 2500) return "orange";
      return "red";
    };

    const updateRoute = () => {
      if (map.getSource("route")) {
        map.getSource("route").setData(routeGeo);
      } else {
        map.addSource("route", { type: "geojson", data: routeGeo, lineMetrics: true });

        map.addLayer({
          id: "route-main",
          type: "line",
          source: "route",
          paint: { "line-color": "black", "line-width": 6, "line-opacity": 0.9 },
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

      // ルート描画後にカメラをフィットさせ、360度回転
      map.once("idle", () => {
        // const bounds = new mapboxgl.LngLatBounds();
        // routeGeo.features[0].geometry.coordinates.forEach(c => bounds.extend([c[0], c[1]]));
        // map.fitBounds(bounds, { padding: 150, pitch: 40, bearing: 0, duration: 2000 });

        let bearing = 0;
        const rotate = () => {
          bearing += 0.2; // 回転スピード
          map.easeTo({ bearing, duration: 50, easing: t => t });
          requestAnimationFrame(rotate);
        };
        rotate();
      });
    };

    if (map.isStyleLoaded()) {
      updateRoute();
    } else {
      map.once("load", updateRoute);
    }
  }, [routeGeo]);

  return (
    <>
      {/* 標高バロメーター */}
      <div
        style={{
          position: "absolute",
          top: 30,
          right: 10,
          height: 200,
          width: 60,
          backgroundColor: "rgba(0,0,0,0.3)",
          borderRadius: 6,
          padding: "5px",
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "flex-end",
        }}
      >
        <div
          style={{
            width: 20,
            height: "100%",
            background: "linear-gradient(to top, blue, cyan, lime, yellow, orange, red)",
            border: "1px solid #000",
            borderRadius: 4,
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column-reverse",
            justifyContent: "space-between",
            height: "100%",
            marginRight: 5,
          }}
        >
          {[0, 500, 1000, 1500, 2000, 2500, 3000].map((el) => (
            <div key={el} style={{ fontSize: 12, color: "#fff" }}>{el}m</div>
          ))}
        </div>
      </div>
    </>
  );
}
