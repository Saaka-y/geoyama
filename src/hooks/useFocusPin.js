// // hooks/useFocusPin.js

// "use client"
// import { useEffect } from "react";


// export function useFocusPin({ focusMapRef, features }) {

//   useEffect(() => {

//     if (!focusMapRef.current || !features) return;

//     const map = focusMapRef.current;

//     map.on("load", () => {
//       const layerOrder = ["mountain-icon", "goal-icon", "start-icon"];
//       layerOrder.forEach(iconName => {
//         const i = iconName === "mountain-icon" ? 0 : iconName === "start-icon" ? 1 : 2;
//         const feature = features[i];
//         const iconPath = `/icon/${iconName}.png`;

//         // icon画像 読み込み
//         map.loadImage(iconPath, (err, image) => {
//           if (err) throw err;
//           if (!map.hasImage(iconName)) {
//             map.addImage(iconName, image);
//           }
//           // icon表示用のsource追加
//           map.addSource(`${iconName}-source`, {
//             type: "geojson",
//             data: feature, //それぞれの山のgeojson（59)
//           });
//           // icon表示用のlayer（symbol） 設定
//           map.addLayer({
//             id: `${iconName}-layer`,
//             type: "symbol",
//             source: `${iconName}-source`,
//             layout: {
//               "icon-image": iconName,
//               "icon-size": 0.3,
//               "icon-anchor": "bottom",
//               "icon-allow-overlap": true,
//             },
//           });
//         });
//       });
//     });
//   }, [focusMapRef, features]);
// }