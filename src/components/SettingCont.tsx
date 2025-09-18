"use client";

import React from "react";
import Image from "next/image";
import { unitsType } from "@/type";

export default function SettingCont() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [showSetting, setShowSetting] = React.useState(false);
  const [selectedUnits, setSelectedUnits] = React.useState<
    "imperial" | "metric"
  >("imperial");

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
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSetting(false);
      }
    }

    function handleFocusIn(event: FocusEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSetting(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("focusin", handleFocusIn);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("focusin", handleFocusIn);
    };
  }, []);

  const handleSelect = () => {
    setSelectedUnits((prev) => (prev === "imperial" ? "metric" : "imperial"));
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
        className="flex justify-center items-center gap-1.5 md:gap-2.5 bg-neutral-800 py-2.5 px-2 rounded-md md:rounded-lg md:py-3 md:px-4 w-fit"
      >
        <Image
          src="icon-units.svg"
          alt="setting icon"
          aria-hidden="true"
          width={14}
          height={14}
          className="size-3.5 md:size-4"
        />
        <p className="text-sm text-preset-base font-sans">Units</p>
        <Image
          src="icon-dropdown.svg"
          alt="icon dropdown arrow"
          aria-hidden="true"
          width={9}
          height={14}
          className="w-[0.5625rem] md:w-3"
        />
      </button>

      {/* ---- dropdown menu ---- */}

      <div
        id="units-menu"
        role="menu"
        aria-label="Units settings"
        className={`${
          showSetting ? "visible" : "hidden"
        } py-1.5 px-2 absolute bg-neutral-800 w-[13.375rem] right-0 rounded-xl mt-2.5`}
      >

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
                  onClick={() => setSelectedUnits(unit.type)}
                >
                  <p className="text-preset-base">{unit.name}</p>
                  {selectedUnits === unit.type && (
                    <Image
                      src="icon-checkmark.svg"
                      alt="icon checkmark"
                      aria-hidden="true"
                      width={14}
                      height={14}
                    />
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
  );
}
