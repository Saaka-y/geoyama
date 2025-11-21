// components/MainView.jsx
"use client";

import { JapanMap } from "@/components/Map/JapanMap";
import { InfoPanel } from "@/components/InfoPanel/InfoPanel";

export function MainView({
  mapState,
  mountainState,
  filterState,
  screenSizeState,
  showWeather,
  setShowWeather,
  events
}) {

  return (
    <div className="w-screen h-screen flex flex-col md:flex-row-reverse justify-center bg-(--color-background)">

      {/* Map */}
      <div className={`${screenSizeState.mapViewClass} md:h-full w-full relative z-10`}>
        <JapanMap
          mapState={mapState}
          mountainState={mountainState}
          showWeather={showWeather}
          setShowWeather={setShowWeather}
        />
      </div>

      {/* Fullscreen / Info Buttons + Panel */}
      {showWeather && (
        <div className="flex">
          <button
            className="bg-white border w-1/2 cursor-pointer"
            onClick={events.handleBackToMap}
          >
            Back to Japan Map
          </button>

          {!screenSizeState.isFullScreen ? (
            <button
              className="bg-white border w-1/2 cursor-pointer"
              onClick={events.handleToFullScreen}
            >
              Show weather with full screen
            </button>
          ) : (
            <button
              className="bg-white border w-1/2 cursor-pointer"
              onClick={events.handleShrinkScreen}
            >
              Show Map
            </button>
          )}
        </div>
      )}

      {/* Info Panel */}
      <div className={`${screenSizeState.infoViewClass} p-6 md:p-8 mt-2 flex flex-col justify-start items-center md:justify-start gap-4 bg-(--color-surface)`}>
        <InfoPanel
          mapState={mapState}
          mountainState={mountainState}
          filterState={filterState}
          events={events}
          showWeather={showWeather}
          screenSizeState={screenSizeState}
        />

      </div>

    </div>
  );
}
