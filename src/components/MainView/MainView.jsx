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

  return (
    <div className="w-screen h-screen flex flex-col md:flex-row-reverse justify-center bg-(--color-background)">

      {/* Map */}
      <div className="h-2/3 md:h-full w-full md:w-2/3 relative z-10">
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
      <div className="h-1/3 md:h-full w-full md:w-1/3  p-6 md:p-8 flex flex-col justify-start items-center md:justify-start gap-4 bg-(--color-surface)">
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
