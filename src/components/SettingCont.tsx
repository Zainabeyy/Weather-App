"use client";

import React from "react";
import { useUnits } from "@/providers/UnitsContext";
import { useClickOutside } from "@/hooks/useClickOutside";
import { Check, ChevronDown, Settings } from "lucide-react";

export default function SettingCont() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [showSetting, setShowSetting] = React.useState(false);
  const { units, setUnits, switchAll } = useUnits();

  const unitCategories = [
    {
      key: "temperature",
      title: "Temperature",
      unit1: { name: "Celsius (°C)", type: "metric" },
      unit2: { name: "Fahrenheit (°F)", type: "imperial" },
    },
    {
      key: "wind",
      title: "Wind Speed",
      unit1: { name: "km/h", type: "metric" },
      unit2: { name: "mph", type: "imperial" },
    },
    {
      key: "precipitation",
      title: "Precipitation",
      unit1: { name: "Millimeters (mm)", type: "metric" },
      unit2: { name: "Inches (in)", type: "imperial" },
    },
    {
      key: "pressure",
      title: "Air Pressure",
      unit1: { name: "hPa (millibars)", type: "metric" },
      unit2: { name: "inHg", type: "imperial" },
    },
    {
      key: "visibility",
      title: "Visibility",
      unit1: { name: "Kilometers (km)", type: "metric" },
      unit2: { name: "Miles (mi)", type: "imperial" },
    },
  ] as const;

  // close on outside click or focus out
  useClickOutside(containerRef, () => setShowSetting(false));

  const globalSystem =
    units.temperature === "imperial" &&
    units.wind === "imperial" &&
    units.precipitation === "imperial"
      ? "imperial"
      : units.temperature === "metric" &&
        units.wind === "metric" &&
        units.precipitation === "metric"
      ? "metric"
      : null; // mixed state

  const handleSwitchAll = () => {
    switchAll(globalSystem === "imperial" ? "metric" : "imperial");
  };

  return (
    <div className="relative" ref={containerRef}>
      {/* ---- trigger button ---- */}
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={showSetting}
        aria-controls="units-menu"
        aria-label="Open units settings"
        onClick={() => setShowSetting((prev) => !prev)}
        className="flex-center gap-1.5 md:gap-2.5 w-fit buttonCont bgCont bgHover allTransition"
      >
        <Settings size={16} />
        <p className="text-preset-base font-sans">Units</p>
        <ChevronDown
          size={18}
          className={`${
            !showSetting ? "rotate-180" : "rotate-0"
          } allTransition`}
        />
      </button>

      {/* ---- dropdown menu ---- */}
      <div
        id="units-menu"
        role="menu"
        aria-label="Units settings"
        className={`${
          showSetting ? "opacity-100" : "max-h-0 opacity-0"
        } absolute bgCont w-[13.375rem] right-0 rounded-xl mt-2.5 z-[9999] overflow-hidden shadow-2xl allTransition`}
      >
        <div className="py-1.5 px-2">
          {/* ---- Switch all ---- */}
          <button
            type="button"
            role="menuitem"
            onClick={handleSwitchAll}
            aria-label="Switch all units"
            className="text-preset-base py-2.5 px-2 capitalize flex-between w-full bgHover allTransition rounded-lg"
          >
            Switch to {globalSystem === "imperial" ? "metric" : "imperial"}
            <div className="p-1 bg-neutral-600 w-9 rounded-full">
              <div
                className={`size-3 rounded-full bg-neutral-0 allTransition ${
                  globalSystem === "imperial"
                    ? "translate-x-0"
                    : "translate-x-[130%]"
                }`}
              />
            </div>
          </button>

          {/* ---- Per-category ---- */}
          {unitCategories.map((item, index) => (
            <div key={item.key}>
              <p className="pl-2 pt-1.5 text-sm font-medium text-neutral-600 dark:text-neutral-300 mb-2">
                {item.title}
              </p>
              {[item.unit1, item.unit2].map((unit, i) => (
                <button
                  key={i}
                  role="menuitemradio"
                  aria-checked={units[item.key] === unit.type}
                  aria-label={`Select ${unit.name}`}
                  onClick={() =>
                    setUnits((prev) => ({
                      ...prev,
                      [item.key]: unit.type,
                    }))
                  }
                  className={`py-2.5 px-2 flex-between w-full text-left rounded-lg bgHover allTransition mb-1
                    ${
                      units[item.key] === unit.type
                        ? "bgContChild"
                        : "text-neutral-700 dark:text-neutral-300"
                    }`}
                >
                  <p className="text-preset-base">{unit.name}</p>
                  {units[item.key] === unit.type && (
                    <Check size={16} strokeWidth={2} />
                  )}
                </button>
              ))}
              <div
                className={`seprator h-[1px] my-1 ${
                  index === unitCategories.length - 1 ? "hidden" : "visible"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
