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
    <div className="absolute bottom-6 right-6 z-20">
      {/* Floating Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-14 h-14 rounded-full bg-(--primary) text-white flex items-center justify-center shadow-(--card-shadow-hover) hover:bg-(--primary-hover) hover:shadow-lg transition-all duration-300 hover:scale-105"
      >
        <CiCalendarDate color="white" size={28} strokeWidth={0.5} />
      </button>

      {/* Popup */}
      {open && (
        <div className="absolute bottom-full right-0 mb-3 w-56 bg-(--card-bg) border border-(--card-border) shadow-(--card-shadow-hover) rounded-xl p-4 z-30 animate-fadeIn">
          <p className="text-sm font-medium text-(--text-primary) mb-3">Select Date</p>
          <DateSelect className="w-full" onSelect={handleDateSelect} />
        </div>
      )}
    </div>
  );
}
