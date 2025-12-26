// ui/createPopupElement.js
"use client"

export function createPopupElement(m, onClick) {

      // Popup用のDOM作成
      const popupEl = document.createElement("div");
      popupEl.className = "p-1 bg-gray-300/40 text-black rounded shadow-md";

      // 山情報
      const info = document.createElement("div");
      info.innerHTML = `
        <span class="font-bold">${m.properties.title} (${m.properties.summit}m)</span>
        <span class="italic">${m.properties.routeName ? `- ${m.properties.routeName}` : ""}</span>
        <br/>
        Shinjuku to <a target="_blank" rel="noreferrer" href="${m.properties.carPark ? m.properties.carPark : m.properties.station}" class="underline">${m.properties.carPark ? "car park" : "station"}</a>: ${m.properties.distance} ${m.properties.distance === 1 ? "hr" : "hrs"}
        <br/>
        Total hike time: ${m.properties.courseTime} ${m.properties.courseTime === 1 ? "hr" : "hrs"}
        <br/>
        Elevation gain: ${m.properties.elevation}m
      `;
      popupEl.appendChild(info);

      // ボタン
      const button = document.createElement("button");
      button.className = "underline cursor-pointer mt-1";
      button.textContent = "Weather and trail map";
      button.addEventListener("click", onClick);
      popupEl.appendChild(button);

  return popupEl;
}


