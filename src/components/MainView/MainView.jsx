// components/MainView/MainView.jsx

import { useMapUiStore } from "@/stores/mapUiStore";
import { JapanMapView } from "@/components/Map/JapanMap";
import { FocusMap } from "@/components/Map/FocusMap";
import { InfoPanel } from "@/components/InfoPanel/InfoPanel";
import { BackButton } from "@/components/MainView/BackButton";
import MapErrorBoundary from "@/components/ErrorBoundary/MapErrorBoundary";

export function MainView({ japanMapRef, focusMapRef }) {
  const { showFocusMap } = useMapUiStore();

  return (
    <div className="w-screen h-dvh flex flex-col md:flex-row-reverse landscape:flex-row-reverse bg-(--color-background)">

      {/* Map */}
      <div className="relative flex-2 z-10">
        {!showFocusMap ? (
          <JapanMapView japanMapRef={japanMapRef} />
        ) : (
          <MapErrorBoundary>
            <FocusMap focusMapRef={focusMapRef} />
          </MapErrorBoundary>
        )}
      </div>

      <BackButton japanMapRef={japanMapRef} />

      {/* Info Panel */}
      <div className="flex-1">
        <InfoPanel japanMapRef={japanMapRef} />
      </div>
    </div>
  );
}
