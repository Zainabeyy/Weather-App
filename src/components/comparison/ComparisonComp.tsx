"use client";

import { getUVClass } from "@/directives/getUvStyleClass";
import {
  cToF,
  kmhToMph,
  mmToInch,
  mToKm,
  mToMiles,
} from "@/directives/unitConversion";
import useWeatherData from "@/hooks/useWeatherData";
import { useUnits } from "@/providers/UnitsContext";
import { weatherDataType } from "@/types/type";
import { Ban } from "lucide-react";
import React from "react";
import Image from "next/image";
import ComparisonTempChart from "./ComparisonTempChart";
import ComparisonSearch from "./ComparisonSearch";

export default function ComparisonComp({
  city1,
  city2,
}: {
  city1: string;
  city2: string;
}) {
  const { units } = useUnits();

  const {
    weatherData: weather1,
    cityInfo: cityInfo1,
    loading: loading1,
    error: error1,
  } = useWeatherData(city1 || "");
  console.log(cityInfo1);
  const {
    weatherData: weather2,
    cityInfo: cityInfo2,
    loading: loading2,
    error: error2,
  } = useWeatherData(city2 || "");

  // 🔹 Helper function to generate weather details for a city
  const buildWeatherDetails = (weather: weatherDataType | null) => {
    if (!weather) return [];
    const currentHour = new Date().getHours();
    const uvIndex = weather.hourly.uv_index[currentHour] ?? null;

    return [
      {
        title: "Temperature",
        value:
          units.temperature === "metric"
            ? `${Math.round(weather.current_weather.temperature || 0)} °C`
            : `${Math.round(
                cToF(weather.current_weather.temperature || 0)
              )} °F`,
      },
      {
        title: "Humidity",
        value: `${Math.round(weather.hourly.relative_humidity_2m[0] || 0)}%`,
      },
      {
        title: "Wind",
        value:
          units.wind === "metric"
            ? `${Math.round(weather.hourly.wind_speed_10m[0] || 0)} km/h`
            : `${Math.round(
                kmhToMph(weather.hourly.wind_speed_10m[0] || 0)
              )} mph`,
      },
      {
        title: "Precipitation",
        value:
          units.precipitation === "metric"
            ? `${Math.round(weather.hourly.precipitation[0] || 0)} mm`
            : `${Math.round(
                mmToInch(weather.hourly.precipitation[0] || 0)
              )} in`,
      },
      {
        title: "Visibility",
        value:
          units.visibility === "metric"
            ? `${mToKm(weather.hourly.visibility[0] || 0).toFixed(1)} km`
            : `${mToMiles(weather.hourly.visibility[0] || 0).toFixed(1)} mi`,
      },
      {
        title: "UV Index",
        value: uvIndex !== null ? uvIndex.toFixed(1) : "N/A",
        uv: uvIndex, // keep raw value for coloring
      },
    ];
  };

  const details1 = buildWeatherDetails(weather1);
  const details2 = buildWeatherDetails(weather2);
  if (error1 || error2)
    return (
      <div className="mx-auto w-fit text-center flex flex-col gap-6 items-center mt-16">
        <Ban size={50} />
        <h2 className="text-preset-2xl">Something went wrong</h2>
        <p className="text-preset-xl max-w-[50ch] text-neutral-800 dark:text-neutral-200">
          We couldn’t connect to the server (API error). Please try again in a
          few moments.
        </p>
      </div>
    );

  return (
    <div>
      <ComparisonSearch city1={city1} city2={city2} />

      <table
        className={`${
          loading1 || loading2 ? "animate-bgPulse" : ""
        } max-w-[50rem] w-full bgCont rounded-2xl mx-auto mt-12 sm:p-2 border-separate border-spacing-2`}
      >
        <thead>
          <tr>
            <th>Metric</th>
            {[cityInfo1, cityInfo2].map((item, index) => (
              <th key={index}>
                {!loading1 ? (
                  <div className="flex items-center gap-2">
                    <Image
                      src={`https://flagsapi.com/${item?.country_code}/flat/32.png`}
                      alt={item?.country || "flag"}
                      width={32}
                      height={32}
                      className="w-8 h-8 object-cover rounded-full"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display =
                          "none";
                      }}
                    />
                    <p>
                      {item?.name}, {item?.country}
                    </p>
                  </div>
                ) : (
                  "_"
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading1 || loading2
            ? Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  <td>_</td>
                  <td>_</td>
                  <td>_</td>
                </tr>
              ))
            : // render actual details
              details1.map((item, i) => (
                <tr key={i}>
                  <td className="text-neutral-800 dark:text-neutral-200 ">
                    {item.title}
                  </td>
                  <td
                    className={` ${
                      item.title === "UV Index"
                        ? getUVClass(item.uv ?? null)
                        : ""
                    }`}
                  >
                    {item.value}
                  </td>
                  <td
                    className={` ${
                      details2[i].title === "UV Index"
                        ? getUVClass(item.uv ?? null)
                        : ""
                    }`}
                  >
                    {details2[i]?.value ?? "-"}
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
      {weather1?.daily && weather2?.daily && cityInfo1 && cityInfo2 && (
        <ComparisonTempChart
          weather1={weather1.daily}
          weather2={weather2.daily}
          cityInfo1={cityInfo1}
          cityInfo2={cityInfo2}
        />
      )}
    </div>
  );
}
