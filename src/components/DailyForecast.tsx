import { dailyForecastType } from "@/type";
import { getWeatherIcon } from "@/weatherImages";
import Image from "next/image";
import React from "react";

interface dailyForecastProp {
  data: {
    time: string[];
    weathercode: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  } ;
}

export default function DailyForecast({ data }:dailyForecastProp) {
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
              className="px-2.5 py-4 flex flex-col items-between justify-center shrink-0 flex-1 gap-2.5 bg-neutral-800 rounded-xl min-w-[90px] max-w-[104px] container-border"
            >
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
                <p>{Math.round(item.maxTemp)}°</p>
                <p>{Math.round(item.minTemp)}°</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
