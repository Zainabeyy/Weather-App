import { dailyForecastType } from "@/type";
import { getWeatherIcon } from "@/directives/weatherImages";
import { cToF } from "@/directives/unitConversion";
import Image from "next/image";
import React from "react";
import { useUnits } from "@/hooks/UnitsContext";

interface dailyForecastProp {
  data: {
    time: string[];
    weathercode: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
  loading: boolean;
}

export default function DailyForecast({ data, loading }: dailyForecastProp) {
  const { units } = useUnits();
  // Skeleton version
  if (loading) {
    return (
      <section className="mt-8 md:mt-12 mx-auto max-w-[50rem]">
        <h3 className="capitalize text-preset-xl pb-5">daily forecast</h3>
        <ul className="flex flex-wrap gap-4">
          {[...Array(7)].map((_, index) => (
            <li
              key={index}
              className="px-2.5 py-4 shrink-0 flex-1 gap-2.5 bg-neutral-800 rounded-xl min-w-[90px] max-w-[104px] container-border min-h-40 animate-bgPulse"
            ></li>
          ))}
        </ul>
      </section>
    );
  }

  // Real data version
  const dailyForecast: dailyForecastType[] = data.time.map((time, index) => {
    return {
      day: new Date(time).toLocaleDateString("en-US", { weekday: "short" }),
      weatherCode: data.weathercode[index],
      maxTemp: data.temperature_2m_max[index],
      minTemp: data.temperature_2m_min[index],
    };
  });

  return (
    <section className="mt-8 md:mt-12 mx-auto max-w-[50rem]">
      <h3 className="capitalize text-preset-xl pb-5">daily forecast</h3>
      <ul className="flex flex-wrap gap-4">
        {dailyForecast.map((item, index) => {
          const imgUrl = getWeatherIcon(item.weatherCode);
          return (
            <li
              key={index}
              className="px-2.5 py-4 shrink-0 flex-1 gap-2.5 bg-neutral-800 rounded-xl min-w-[90px] max-w-[104px] container-border min-h-40"
            >
              <div className="flex flex-col justify-center">
                <p className="text-preset-lg text-center">{item.day}</p>
                <Image
                  src={imgUrl}
                  alt="weather icon"
                  width={60}
                  height={60}
                  unoptimized
                  className="mx-auto"
                />
                <div className="text-preset-base flex justify-between items-center flex-wrap w-full">
                  <p>
                    {units.temperature === "metric"
                      ? Math.round(item.maxTemp)
                      : Math.round(cToF(item.maxTemp))}
                    °
                  </p>
                  <p>
                    {units.temperature === "metric"
                      ? Math.round(item.minTemp)
                      : Math.round(cToF(item.minTemp))}
                    °
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
