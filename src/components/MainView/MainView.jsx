// components/MainView.jsx
"use client";

import { JapanMap } from "@/components/Map/JapanMap";
import { InfoPanel } from "@/components/InfoPanel/InfoPanel";

export function MainView({
  mapState,
  mountainState,
  filterState,
  screenSizeState,
  events
}) {

  return (
    <div className="w-screen h-screen flex flex-col md:flex-row-reverse justify-center bg-(--color-background)">
      
      {/* Map */}
      <div className={`${screenSizeState.mapViewClass} md:h-full w-full relative z-10`}>
        <JapanMap
          mapState={mapState}
          mountainState={mountainState}
        />
      </div>

      {/* Fullscreen / Info Buttons + Panel */}
      {mapState.selectedMountain && (
        <div className="flex">
          <button
            className="bg-white border w-1/2 cursor-pointer"
            onClick={events.handleBackToMap}
          >
            Back to Map
          </button>

          {!screenSizeState.isFullScreen ? (
            <button
              className="bg-white border w-1/2 cursor-pointer"
              onClick={events.handleToFullScreen}
            >
              See with full screen
            </button>
          ) : (
            <button
              className="bg-white border w-1/2 cursor-pointer"
              onClick={events.handleShrinkScreen}
            >
              See Map
            </button>
          )}
        </div>
      )}

      {/* Info Panel */}
      <InfoPanel
        mapState={mapState}
        mountainState={mountainState}
        filterState={filterState}
        screenSizeState={screenSizeState}
      />

    </div>
  );
}
