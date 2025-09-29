"use client";

import {
  cToF,
  kmhToMph,
  mmToInch,
  mToMiles,
  mToKm,
  hPaToInHg,
} from "@/directives/unitConversion";
import { useUnits } from "@/providers/UnitsContext";
import React from "react";

interface currentWeatherDetailProp {
  loading: boolean;
  data: {
    apparent_temperature: number[];
    relative_humidity_2m: number[];
    wind_speed_10m: number[];
    precipitation: number[];
    uv_index: number[];
    visibility: number[];
    surface_pressure: number[];
  };
}

export default function CurrentWeatherDetail({
  data,
  loading,
}: currentWeatherDetailProp) {
  const { units } = useUnits();
  const currentHour = new Date().getHours();

  const feelsLike = data.apparent_temperature[0] || 0;
  const humidity = data.relative_humidity_2m[0] || 0;
  const wind = data.wind_speed_10m[0] || 0;
  const precipitation = data.precipitation[0] || 0;
  const uvIndex = data.uv_index[currentHour] ?? null;
  const visibility = data.visibility[0] || 0;
  const pressure = data.surface_pressure[0] || 0;

  // helper function for UV risk category
  function getUVClass(value: number | null) {
    if (value === null) return "text-neutral-800 dark:text-neutral-200"; // fallback
    if (value <= 2) return "text-green-600 dark:text-green-400"; // Low
    if (value <= 5) return "text-yellow-600 dark:text-yellow-400"; // Moderate
    if (value <= 7) return "text-orange-700 dark:text-orange-500"; // High
    if (value <= 10) return "text-red-700 dark:text-red-500"; // Very High
    return "text-purple-800 dark:text-purple-600"; // Extreme
  }

  const weatherDetail = [
    {
      title: "Feels Like",
      value:
        units.temperature === "metric"
          ? `${Math.round(feelsLike)} °C`
          : `${Math.round(cToF(feelsLike))} °F`,
    },
    {
      title: "Humidity",
      value: `${Math.round(humidity)}%`,
    },
    {
      title: "Wind",
      value:
        units.wind === "metric"
          ? `${Math.round(wind)} km/h`
          : `${Math.round(kmhToMph(wind))} mph`,
    },
    {
      title: "Precipitation",
      value:
        units.precipitation === "metric"
          ? `${Math.round(precipitation)} mm`
          : `${Math.round(mmToInch(precipitation))} in`,
    },
    {
      title: "UV Index",
      value: uvIndex !== null ? uvIndex.toFixed(1) : "N/A",
      uv: uvIndex, // keep raw value for coloring
    },
    {
      title: "Visibility",
      value:
        units.visibility === "metric"
          ? `${mToKm(visibility).toFixed(1)} km`
          : `${mToMiles(visibility).toFixed(1)} mi`,
    },
    {
      title: "Air Pressure",
      value:
        units.pressure === "metric"
          ? `${Math.round(pressure)} hPa`
          : `${hPaToInHg(pressure).toFixed(2)} inHg`,
    },
  ];

  return (
    <ul className="flex-wrap flex-between gap-4 mt-5 sm:mt-8">
      {weatherDetail.map((item, index) => (
        <li
          key={index}
          className={`bgCont rounded-xl p-5 container-border flex-1 min-w-[10.25rem] shrink-0 ${
            loading ? "animate-bgPulse" : ""
          }`}
        >
          <p className="text-preset-lg">{item.title}</p>
          <p
            className={`font-light text-[2rem] ${
              item.title === "UV Index" ? getUVClass(item.uv ?? null) : ""
            }`}
          >
            {loading ? "_" : item.value}
          </p>
        </li>
      ))}
    </ul>
  );
}
