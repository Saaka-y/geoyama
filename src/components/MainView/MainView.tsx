// components/MainView/MainView.tsx

import { useMapUiStore } from "@/stores/mapUiStore";
import { JapanMapView } from "@/components/Map/JapanMap";
import { FocusMap } from "@/components/Map/FocusMap";
import { InfoPanel } from "@/components/InfoPanel/InfoPanel";
import MapErrorBoundary from "@/components/ErrorBoundary/MapErrorBoundary";

export function MainView({ japanMapRef, focusMapRef }) {
  const { showFocusMap } = useMapUiStore();

  return (
    <div className="w-screen h-dvh flex flex-col md:flex-row-reverse landscape:flex-row-reverse bg-(--background)">
      {/* Map - Full screen on mobile, right side on desktop */}
      <div className="absolute inset-0 md:relative md:flex-2 z-0 overflow-hidden">
        {!showFocusMap ? (
          <JapanMapView japanMapRef={japanMapRef} />
        ) : (
          <MapErrorBoundary>
            <FocusMap focusMapRef={focusMapRef} />
          </MapErrorBoundary>
        )}
      </div>

      {/* Info Panel - Bottom sheet on mobile, left panel on desktop */}
      <InfoPanel japanMapRef={japanMapRef} />
    </div>
  );
}
