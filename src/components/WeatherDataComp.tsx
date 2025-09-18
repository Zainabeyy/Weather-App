'use client';

import useWeatherData from "@/hooks/useWeatherData";
import Image from "next/image";
import React from "react";

export default function WeatherDataComp({city}: {city:string}) {
  const { weatherData, cityInfo, loading, error } = useWeatherData(city);
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
      value: `${weatherData?.hourly.apparent_temperature[0]}°`,
    },
    {
      title: "Humidity",
      value: `${weatherData?.hourly.relative_humidity_2m[0]}%`,
    },
    {
      title: "Wind",
      value: `${weatherData?.hourly.wind_speed_10m[0]} km/h`,
    },
    {
      title: "Precipitation",
      value: `${weatherData?.hourly.precipitation[0]} mm`,
    },
  ];

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
    <div>
      {/* ---- weather card ---- */}

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
              src="icon-sunny.webp"
              alt="sun icon"
              width={120}
              height={120}
              unoptimized
            />
            <p className="font-semibold italic text-8xl">
              {weatherData?.current_weather.temperature}°
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 mt-5 sm:mt-8">
          {weatherDetail.map((item, index) => (
            <div
              key={index}
              className="bg-neutral-800 rounded-xl p-5 border-[1px] border-neutral-600 flex-1 min-w-[10.25rem] shrink-0"
            >
              <p className="text-preset-lg">{item.title}</p>
              <p className="font-light text-[2rem]">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---- daily forecast ---- */}

      <section className="mt-8 md:mt-12 mx-auto max-w-[50rem]">
        <h3 className="capitalize text-preset-xl pb-5">daily forecast</h3>
      </section>
    </div>
  );
}
