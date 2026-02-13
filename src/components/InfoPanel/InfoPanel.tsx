// components/InfoPanel/InfoPanel.tsx

import { useState, useRef } from "react";
import { useMapUiStore } from "@/stores/mapUiStore";
import { useMountainStore } from "@/stores/mountainStore";
import { Filter } from "@/components/InfoPanel/Filter/Filter";
import { WeatherPanel } from "@/components/InfoPanel/Weather/WeatherPanel";
import { FloatDateSelect } from "@/components/InfoPanel/Filter/FloatDateSelect";

type SheetState = 'closed' | 'half';

export function InfoPanel({ japanMapRef }) {
  const showFocusMap = useMapUiStore((state) => state.showFocusMap);
  const { backToMap, japanMapInitialView } = useMapUiStore();
  const { setSelectedMountain } = useMountainStore();
  const [sheetState, setSheetState] = useState<SheetState>('half');
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleBackToMap = () => {
    backToMap();
    setSelectedMountain(null);
    if (japanMapRef.current) {
      japanMapRef.current.flyTo({
        ...japanMapInitialView,
      });
    }
  };

  // Height mappings for different states
  const heights = {
    closed: 80,  // Just handle visible
    half: 400,   // Half screen
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setCurrentY(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    const deltaY = currentY - startY;
    const threshold = 50;

    if (deltaY > threshold) {
      // Swiped down
      if  (sheetState === 'half') setSheetState('closed');
    } else if (deltaY < -threshold) {
      // Swiped up
      if (sheetState === 'closed') setSheetState('half');
    }

    setIsDragging(false);
    setStartY(0);
    setCurrentY(0);
  };

  const currentHeight = heights[sheetState];

  return (
    <>
      {/* Desktop layout - traditional side panel */}
      <div className="hidden md:flex landscape:flex flex-1 flex-col overflow-y-auto mb-2">
        {/* Back Button - Desktop (top of panel) */}
        {showFocusMap && (
          <div className="px-4 pt-4 pb-3">
            <button
              className="w-full bg-(--card-bg) backdrop-blur-sm border-2 border-(--border) shadow-(--card-shadow) flex items-center justify-center gap-2 px-5 py-2 text-sm font-semibold text-(--text-primary) hover:bg-(--primary) hover:text-white hover:border-(--primary) hover:shadow-(--card-shadow-hover) transition-all duration-300 cursor-pointer rounded-full"
              onClick={handleBackToMap}
            >
              <span className="text-base">&larr;</span>
              <span>Back</span>
            </button>
          </div>
        )}

        {showFocusMap ? (
          <>
            <FloatDateSelect />
            <WeatherPanel />
          </>
        ) : (
          <Filter japanMapRef={japanMapRef} />
        )}
      </div>

      {/* Mobile layout - bottom sheet */}
      <div
        ref={panelRef}
        className="md:hidden landscape:hidden fixed bottom-0 left-0 right-0 bg-(--card-bg) rounded-t-3xl shadow-2xl z-50 transition-all duration-300 ease-out backdrop-blur-md"
        style={{
          height: `${currentHeight}px`,
          transform: isDragging ? `translateY(${Math.max(0, currentY - startY)}px)` : 'none',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
        </div>

        {/* Back & Forecast label - Mobile */}
        {showFocusMap && (
          <div
            className="px-4 py-2 flex items-center justify-center gap-3 text-sm"
            onTouchStart={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
          >
            <button
              className="flex items-center gap-1.5 text-(--text-primary) font-semibold hover:text-(--primary) transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handleBackToMap();
              }}
            >
              <span>&larr;</span>
              <span>Back</span>
            </button>
            <span className="text-(--text-muted)">|</span>
            <button
              className="flex items-center gap-1.5 text-(--text-muted) font-semibold hover:text-(--primary) transition-colors cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setSheetState(sheetState === 'half' ? 'closed' : 'half');
              }}
            >
              <span>Forecast</span>
              <span>&darr;</span>
            </button>
          </div>
        )}

        {/* Content */}
        <div className={`overflow-y-auto h-full pb-4 ${!showFocusMap && 'pb-20'}`}>
          {showFocusMap ? (
            <>
              <FloatDateSelect />
              <WeatherPanel />
            </>
          ) : (
            <Filter japanMapRef={japanMapRef} />
          )}
        </div>
      </div>

      {/* Backdrop for mobile when sheet is open */}
      {sheetState !== 'closed' && (
        <div
          className="md:hidden landscape:hidden fixed inset-0 bg-black/20 z-40 transition-opacity duration-300"
          onClick={() => setSheetState('closed')}
        />
      )}
    </>
  );
}
