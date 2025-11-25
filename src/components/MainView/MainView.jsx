// components/MainView.jsx
"use client";

import { JapanMap } from "@/components/Map/JapanMap";
import { InfoPanel } from "@/components/InfoPanel/InfoPanel";

export function MainView({
  mapState,
  mountainState,
  filterState,
  showWeather,
  setShowWeather,
  handleBackToMap
}) {

  // h-1/3 md:h-full w-full md:w-1/3
  // h-2/3 md:h-full w-full md:w-2/3

  return (
    <div className="w-screen h-screen flex flex-col md:flex-row-reverse bg-(--color-background)">

      {/* Map */}
      <div className="relative flex-2 z-10">
        <JapanMap
          mapState={mapState}
          mountainState={mountainState}
          showWeather={showWeather}
          setShowWeather={setShowWeather}
        />
      </div>

      {showWeather && (
        <button
          className="bg-white border w-full md:w-[10%] cursor-pointer"
          onClick={handleBackToMap}
        >
          Back to Japan Map
        </button>
      )}

      {/* Info Panel */}
      <div
        className={
          `flex-1 bg-(--color-surface)` +
          (showWeather
            ? ` pt-5`
            : ` flex flex-col pt-6 md:pt-10 items-center gap-5`
          )
        }
      >
        <InfoPanel
          mapState={mapState}
          mountainState={mountainState}
          filterState={filterState}
          showWeather={showWeather}
        />
      </div>
    </div>
  );
}
