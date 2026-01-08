// @/components/InfoPanel/Filter/FloatDateSelect.jsx

import { useState } from "react";
import { DateSelect } from "./DateSelect";
import { CiCalendarDate } from "react-icons/ci";

export function FloatDateSelect() {
  const [open, setOpen] = useState(false);

  const handleDateSelect = () => {
    setOpen(false);
  }

  return (
    <div className="absolute bottom-4 right-4 z-20">
      {/* 丸いアイコン */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-12 h-12 rounded-full bg-sky-600 text-white flex items-center justify-center shadow-lg hover:bg-sky-500 transition-colors"
      >
        <CiCalendarDate color="white" size={24} />
      </button>

      {/* ポップアップ */}
      {open && (
        <div className="absolute bottom-full right-0 mb-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg p-3 z-30">
          <DateSelect className="w-full" onSelect={handleDateSelect} />
        </div>
      )}
    </div>
  );
}
