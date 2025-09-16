"use client";

import React from "react";
import Image from "next/image";
import { selectedUnitsType, UnitKeys } from "@/type";

export default function SettingCont() {
  const [showSetting, setShowSetting] = React.useState(false);
  const [selectedUnits, setSelectedUnits] = React.useState<selectedUnitsType>({
    Temperature: "Celsius (°C)",
    "Wind Speed": "km/h",
    Precipitation: "Millimeters (mm)",
  });


  const units: { title: UnitKeys ; unit1: string; unit2: string }[] = [
    {
      title: "Temperature",
      unit1: "Celsius (°C)",
      unit2: "Fahrenheit (°F)",
    },
    {
      title: "Wind Speed",
      unit1: "km/h",
      unit2: "mph",
    },
    {
      title: "Precipitation",
      unit1: "Millimeters (mm)",
      unit2: "Inches (in)",
    },
  ];

  const handleSelect = (title: UnitKeys, unit: string) => {
    setSelectedUnits((prev) => ({ ...prev, [title]: unit }));
  };
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setShowSetting((prev) => !prev)}
        className="flex justify-center items-center gap-1.5 md:gap-2.5 bg-neutral-800 py-2.5 px-2 rounded-md md:rounded-lg md:py-3 md:px-4 w-fit"
      >
        <Image
          src="./icon-units.svg"
          alt="setting"
          width={14}
          height={14}
          className="size-3.5 md:size-4"
        />
        <p className="text-sm font-medium font-sans md:text-base">Units</p>
        <Image
          src="./icon-dropdown.svg"
          alt="drop down"
          width={9}
          height={14}
          className="w-[0.5625rem] md:w-3"
        />
      </button>
      <div
        className={`${
          showSetting ? "visible" : "hidden"
        } py-1.5 px-2 absolute bg-neutral-800 w-[13.375rem] right-0 rounded-xl mt-2.5`}
      >
        <p className="text-base font-medium py-2.5 px-2">Change Units</p>
        {units.map((item, index) => (
          <div key={index}>
            <p className="pl-2 pt-1.5 text-sm font-medium text-neutral-300">
              {item.title}
            </p>

            {[item.unit1, item.unit2].map((unit, index) => {
              const isSelected = selectedUnits[item.title] === unit;
              return (
                <div
                  key={index}
                  onClick={() => handleSelect(item.title, unit)}
                  className={`py-2.5 px-2 flex justify-between items-center rounded-lg cursor-pointer transition 
                  ${
                    isSelected
                      ? "bg-neutral-700 text-white"
                      : "hover:bg-neutral-700/60 text-neutral-300"
                  }`}
                >
                  <p className="text-base font-medium">{unit}</p>
                  {isSelected && (
                    <Image
                      src="./icon-checkmark.svg"
                      alt="checkmark"
                      width={14}
                      height={14}
                    />
                  )}
                </div>
              );
            })}

            <div className="seprator h-[1px] bg-neutral-700 my-1" />
          </div>
        ))}
      </div>
    </div>
  );
}
