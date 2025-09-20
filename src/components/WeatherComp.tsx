"use client";

import useWeatherData from "@/hooks/useWeatherData";
import Image from "next/image";
import React from "react";
import DailyForecast from "./DailyForecast";
import HourlyForecast from "./HourlyForecast";
import { getWeatherIcon } from "@/weatherImages";

export default function WeatherComp({ city }: { city: string }) {
  const { weatherData, cityInfo, loading, error } = useWeatherData(city);
  console.log(weatherData);
  const date = new Date();
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long", // "Tuesday"
    year: "numeric", // "2025"
    month: "short", // "Aug"
    day: "numeric", // "5"
  }).format(date);

  const weatherDetail = [
    {
      title: "Feels Like",
      value: `${Math.round(weatherData?.hourly.apparent_temperature[0] || 0)}°`,
    },
    {
      title: "Humidity",
      value: `${Math.round(weatherData?.hourly.relative_humidity_2m[0] || 0)}%`,
    },
    {
      title: "Wind",
      value: `${Math.round(weatherData?.hourly.wind_speed_10m[0] || 0)} km/h`,
    },
    {
      title: "Precipitation",
      value: `${Math.round(weatherData?.hourly.precipitation[0] || 0)} mm`,
    },
  ];
  const imgUrl = getWeatherIcon(weatherData?.current_weather.weathercode || 0);
  if (loading) {
    return (
      <div>
        <h1>Loading</h1>
        <Image src="icon-loading.svg" alt="loading" width={24} height={24} />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>eroor</h1>
        <Image src="icon-error.svg" alt="loading" width={24} height={24} />
      </div>
    );
  }

  return (
    <div className="flex flex-col xl:flex-row items-center xl:items-start justify-center gap-8 max-w-[1216px] mx-auto">
      {/* ---- weather card ---- */}

      <div className="flex-1">
        <section className="max-w-[50rem] mx-auto">
          <div className="bg-[url('/bg-today-small.svg')] sm:bg-[url('/bg-today-large.svg')] bg-center bg-cover bg-no-repeat w-full rounded-[1.25rem] py-10 px-6 mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between sm:py-20">
            <div>
              <p className="font-bold text-[1.75rem] mb-3">
                {cityInfo?.name}, {cityInfo?.country}
              </p>
              <p className="text-preset-lg">{formattedDate}</p>
            </div>
            <div className="flex justify-between items-center gap-5">
              <Image
                src={imgUrl}
                alt="sun icon"
                width={120}
                height={120}
                unoptimized
              />
              <p className="font-semibold italic text-8xl">
                {Math.round(weatherData?.current_weather.temperature || 0)}°
              </p>
            </div>
          </div>

          <ul className="flex flex-wrap items-center justify-between gap-4 mt-5 sm:mt-8">
            {weatherDetail.map((item, index) => (
              <li
                key={index}
                className="bg-neutral-800 rounded-xl p-5 container-border flex-1 min-w-[10.25rem] shrink-0"
              >
                <p className="text-preset-lg">{item.title}</p>
                <p className="font-light text-[2rem]">{item.value}</p>
              </li>
            ))}
          </ul>
        </section>
        {weatherData && <DailyForecast data={weatherData.daily} />}
      </div>
      {weatherData && <HourlyForecast data={weatherData?.hourly} />}
    </div>
  );
}
