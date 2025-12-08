// components/InfoPanel/floatDateSelect.jsx
"use client";
import { useState } from "react";
import { DateSelect } from "./DateSelect";
import { CiCalendarDate } from "react-icons/ci";

export function FloatingDateSelect({ containerClass = "" }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`absolute bottom-4 right-4 `}>
      {/* 丸いアイコン */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-12 h-12 rounded-full bg-indigo-800/50 text-white flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-colors z-20"
      >
        <CiCalendarDate color="white" size={24} />
      </button>

      {/* ポップアップ */}
      {open && (
        <div className="mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg p-3 z-30">
          <DateSelect className="w-full" />
        </div>
      )}
    </div>
  );
}
