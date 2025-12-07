// components/InfoPanel.jsx
"use client";

import { Filter } from "@/components/InfoPanel/Filter/Filter";
import { ShowWeather } from "@/components/InfoPanel/Weather/ShowWeather";
import { DateSelect } from "@/components/InfoPanel/Filter/DateSelect";
import { useUiStore } from "@/stores/uiStore";

export function InfoPanel(japanMapRef) {

  const showFocusMap = useUiStore((state) => state.showFocusMap);

  return (
    <>
      {showFocusMap ? (
        <ShowWeather />
      ) : (
        <Filter
          japanMapRef={japanMapRef}
        />
      )
      }

      {!showFocusMap &&
        <div className="w-[90%] flex flex-row md:flex-col justify-center items-center md:items-start gap-2">

          <p className="w-1/2 md:w-full text-left text-xs">Select Date:</p>

          <DateSelect
            className=" w-2/3 md:w-full border border-gray-400 rounded px-2 py-1"
          />
        </div>
      }
    </>
  );
}
