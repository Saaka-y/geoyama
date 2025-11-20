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
            Back to Japan Map
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
      <div className={`${screenSizeState.infoViewClass} p-6 md:p-8 mt-2 flex flex-col justify-start items-center md:justify-start gap-4 bg-(--color-surface)`}>
        <InfoPanel
          mapState={mapState}
          mountainState={mountainState}
          filterState={filterState}
          events={events}
        />
        
      </div>

    </div>
  );
}
