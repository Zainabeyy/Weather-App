"use client";

import React from "react";
import { unitsType } from "@/type";
import { useUnits } from "@/hooks/UnitsContext";
import { useClickOutside } from "@/hooks/useClickOutside";
import { Check, ChevronDown, Settings } from "lucide-react";

export default function SettingCont() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [showSetting, setShowSetting] = React.useState(false);
  const { units: selectedUnits, setUnits } = useUnits();

  const units: unitsType[] = [
    {
      title: "Temperature",
      unit1: { name: "Celsius (°C)", type: "metric" },
      unit2: { name: "Fahrenheit (°F)", type: "imperial" },
    },
    {
      title: "Wind Speed",
      unit1: { name: "km/h", type: "metric" },
      unit2: { name: "mph", type: "imperial" },
    },
    {
      title: "Precipitation",
      unit1: { name: "Millimeters (mm)", type: "metric" },
      unit2: { name: "Inches (in)", type: "imperial" },
    },
  ];

  // close on outside click or focus out
  useClickOutside(containerRef, () => setShowSetting(false));

  const handleSelect = () => {
    setUnits((prev) => (prev === "imperial" ? "metric" : "imperial"));
  };

  return (
    <div className="relative" ref={containerRef}>
      {/* ---- unit setting button ---- */}

      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={showSetting}
        aria-controls="units-menu"
        aria-label="Open units settings"
        onClick={() => setShowSetting((prev) => !prev)}
        className="flex justify-center items-center gap-1.5 md:gap-2.5 w-fit buttonCont"
      >
        <Settings size={16} />
        <p className="text-preset-base font-sans">Units</p>
        <ChevronDown
          size={18}
          className={`${
            !showSetting ? "rotate-180" : "rotate-0"
          } transition-all duration-300`}
        />
      </button>

      {/* ---- dropdown menu ---- */}

      <div
        id="units-menu"
        role="menu"
        aria-label="Units settings"
        className={`${
          showSetting ? "max-h-[440px] opacity-100" : "max-h-0 opacity-0"
        } absolute bg-neutral-800 w-[13.375rem] right-0 rounded-xl mt-2.5 z-[9999] overflow-hidden transition-all duration-500 shadow-2xl`}
      >
        <div className="py-1.5 px-2">
          <button
            type="button"
            onClick={handleSelect}
            aria-pressed={selectedUnits === "metric"}
            aria-label={`Switch to ${
              selectedUnits === "imperial" ? "metric units" : "imperial units"
            }`}
            className="text-preset-base py-2.5 px-2 capitalize flex justify-between items-center w-full"
          >
            Switch to {selectedUnits}
            <div className="p-1 bg-neutral-600 w-9 rounded-full">
              <div
                className={`size-3 rounded-full bg-neutral-0 transition-all duration-300 ${
                  selectedUnits === "imperial"
                    ? "translate-x-0"
                    : "translate-x-[130%]"
                }`}
              />
            </div>
          </button>

          {/* ---- units items ---- */}

          {units.map((item, index) => (
            <div key={index}>
              <p className="pl-2 pt-1.5 text-sm font-medium text-neutral-300 mb-2">
                {item.title}
              </p>

              {[item.unit1, item.unit2].map((unit, i) => {
                return (
                  <button
                    key={i}
                    role="menuitemradio"
                    aria-checked={selectedUnits === unit.type}
                    aria-label={`Select ${unit.name}`}
                    className={`py-2.5 px-2 flex justify-between items-center w-full text-left rounded-lg transition 
                    ${
                      selectedUnits === unit.type
                        ? "bg-neutral-700"
                        : "text-neutral-300"
                    }`}
                    onClick={() => setUnits(unit.type)}
                  >
                    <p className="text-preset-base">{unit.name}</p>
                    {selectedUnits === unit.type && (
                      <Check size={16} strokeWidth={2} />
                    )}
                  </button>
                );
              })}

              <div
                className={`seprator h-[1px] bg-neutral-700 my-1 ${
                  index === 2 ? "hidden" : "visible"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
