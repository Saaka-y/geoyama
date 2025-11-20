// components/InfoPanel.jsx
"use client";

import { Filter } from "@/components/InfoPanel/Filter/Filter";
import { ShowWeather } from "@/components/InfoPanel/Weather/ShowWeather";

export function InfoPanel({ mapState, mountainState, filterState, screenSizeState }) {
  return (
    <div className={`${screenSizeState.infoViewClass} p-6 md:p-8 mt-2 flex flex-col justify-start items-center md:justify-start gap-4 bg-(--color-surface)`}>
      {!mapState.selectedMountain ? (
        <Filter
          mapState={mapState}
          mountainState={mountainState}
          filterState={filterState}
          screenSizeState={screenSizeState}
        />
      ) : (
        <ShowWeather />
      )}
    </div>
  );
}
