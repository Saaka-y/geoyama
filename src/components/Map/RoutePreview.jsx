//@/components/Map/RoutePreview.jsx
import { useEffect, useState, useRef } from "react";

export function RoutePreview({ apiUrl, focusMapRef }) {
  const [trailGeojson, settrailGeojson] = useState(null);


  // ルートデータを取得
  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        settrailGeojson(data.trailGeojson);
        console.log("トレイルジオ：", data.trailGeojson);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRoute();
  }, [apiUrl]);

  //ルート表示
  useEffect(() => {
    if (!focusMapRef.current || !trailGeojson) return;

    const map = focusMapRef.current
    //ルートの標高だけを取得
    const elevations = trailGeojson.features[0].geometry.coordinates.map(c => c[2]);

    // "There is already a source with ID "route"." のエラーに悩まされた結果…
    const addRoute = () => {
      // 古いレイヤーとソースを削除
      if (map.getLayer("route-gradient")) map.removeLayer("route-gradient");
      if (map.getLayer("route-main")) map.removeLayer("route-main");
      if (map.getSource("route")) map.removeSource("route");

      map.addSource("route", {
        type: "geojson",
        data: trailGeojson,
        "lineMetrics": true
      });

      map.addLayer({
        id: "route-main",     // 白線を下に
        type: "line",
        source: "route",
        paint: {
          "line-color": "black",
          "line-width": 6,      // 緑線より少し太めに
          "line-opacity": 0.9
        }
      });

      // 線の進行度ごとに色を作る
      map.addLayer({
        id: "route-gradient",
        type: "line",
        source: "route",
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-width": 4,
          "line-gradient": [
            "interpolate",
            ["linear"],
            ["line-progress"],  // 線の進行度
            0, colorForElevation(elevations[0]),
            0.1, colorForElevation(elevations[Math.floor(elevations.length * 0.1)]),
            0.3, colorForElevation(elevations[Math.floor(elevations.length * 0.3)]),
            0.5, colorForElevation(elevations[Math.floor(elevations.length * 0.5)]),
            0.7, colorForElevation(elevations[Math.floor(elevations.length * 0.7)]),
            1, colorForElevation(elevations[elevations.length - 1])
          ]
        }
      });

      // 標高を色に変換する関数（0〜1をカラーグラデーションにマッピング）
      function colorForElevation(e) {
        if (e < 500) return "blue";
        if (e < 1000) return "cyan";
        if (e < 1500) return "lime";
        if (e < 2000) return "yellow";
        if (e < 2500) return "orange";
        return "red"; //2500m以上は赤
      }

    };

    // "There is already a source with ID "route"." のエラーに悩まされた結果…
    if (map.isStyleLoaded()) {
      addRoute();           // マップロード済みなら即追加
    } else {
      map.once("load", addRoute); // 未ロードなら once で1回だけ
    }
  }, [trailGeojson])
  

  return (
    <>
      {/* 標高バロメーター */}
      <div
        style={{
          position: "absolute",
          top: 30,
          right: 10,
          height: 200,
          width: 60, // ラベル含めて少し広め
          backgroundColor: "rgba(0,0,0,0.3)",
          borderRadius: 6,
          padding: "5px",
          display: "flex",
          flexDirection: "row-reverse", // ラベルを右に
          alignItems: "flex-end",
        }}
      >
        {/* グラデーションバー */}
        <div
          style={{
            width: 20,
            height: "100%",
            background: "linear-gradient(to top, blue, cyan, lime, yellow, orange, red)",
            border: "1px solid #000",
            borderRadius: 4,
          }}
        />

        {/* ラベル */}
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
            <div key={el} style={{ fontSize: 12, color: "#fff" }}>
              {el}m
            </div>
          ))}
        </div>
      </div>

    </>
  );
}



