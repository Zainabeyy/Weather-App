import { cToF, kmhToMph, mmToInch } from "@/directives/unitConversion";
import { useUnits } from "@/hooks/UnitsContext";
import React from "react";

interface currentWeatherDetailProp {
  loading: boolean;
  data: {
    apparent_temperature: number[];
    relative_humidity_2m: number[];
    wind_speed_10m: number[];
    precipitation: number[];
  };
}

export default function CurrentWeatherDetail({
  data,
  loading,
}: currentWeatherDetailProp) {
  const { units } = useUnits();

  const feelsLike = data.apparent_temperature[0] || 0;
  const humidity = data.relative_humidity_2m[0] || 0;
  const wind = data.wind_speed_10m[0] || 0;
  const precipitation = data.precipitation[0] || 0;

  const weatherDetail = [
    {
      title: "Feels Like",
      value:
        units === "metric"
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
        units === "metric"
          ? `${Math.round(wind)} km/h`
          : `${Math.round(kmhToMph(wind))} mph`,
    },
    {
      title: "Precipitation",
      value:
        units === "metric"
          ? `${Math.round(precipitation)} mm`
          : `${Math.round(mmToInch(precipitation))} in`,
    },
  ];

  return (
    <ul className="flex flex-wrap items-center justify-between gap-4 mt-5 sm:mt-8">
      {weatherDetail.map((item, index) => (
        <li
          key={index}
          className={`bg-neutral-800 rounded-xl p-5 container-border flex-1 min-w-[10.25rem] shrink-0 ${loading && 'animate-bgPulse'}`}
        >
          <p className="text-preset-lg">{item.title}</p>
          <p className="font-light text-[2rem]">{loading ? '_' : item.value}</p>
        </li> 
      ))}
    </ul>
  );
}
