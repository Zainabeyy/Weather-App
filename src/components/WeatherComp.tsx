"use client";

import useWeatherData from "@/hooks/useWeatherData";
import Image from "next/image";
import React from "react";
import DailyForecast from "./DailyForecast";
import HourlyForecast from "./HourlyForecast";
import { getWeatherIcon } from "@/directives/weatherImages";
import CurrentWeatherDetail from "./CurrentWeatherDetail";
import { useUnits } from "@/hooks/UnitsContext";
import { cToF } from "@/directives/unitConversion";
import SearchForm from "./SearchForm";
import Link from "next/link";
import { Ban, RotateCcw, Star } from "lucide-react";
import { useSavedPlaces } from "@/hooks/savedPlaces";

export default function WeatherComp({
  city,
  query,
}: {
  city: string;
  query: string;
}) {
  const { units } = useUnits();
  const { addPlace, removePlace, savedPlaces } = useSavedPlaces(); // <-- hook
  const { weatherData, cityInfo, loading, error } = useWeatherData(city);
  const imgUrl = getWeatherIcon(weatherData?.current_weather.weathercode || 0);
  const currentWeatherTemp = weatherData?.current_weather.temperature || 0;
  const date = new Date();
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);

  // check if current city is already saved
  const isSaved = cityInfo && savedPlaces.includes(cityInfo.name);

  function handleSavedPlace() {
    if (!cityInfo?.name) return; // safety check

    if (isSaved) {
      removePlace(cityInfo.name);
    } else {
      addPlace(cityInfo.name);
    }
  }

  if (error && error !== "City not found.")
    return (
      <div className="mx-auto w-fit text-center flex flex-col gap-6 items-center mt-16">
        <Ban size={50} />
        <h2 className="text-preset-2xl">Something went wrong</h2>
        <p className="text-preset-xl max-w-[50ch] text-neutral-200">
          We couldn’t connect to the server (API error). Please try again in a
          few moments.
        </p>
        <Link
          href={"/"}
          className="rounded-lg bg-neutral-800 py-3 px-4 flex justify-center items-center gap-2"
        >
          <RotateCcw size={16} />
          Retry
        </Link>
      </div>
    );

  return (
    <div>
      <SearchForm query={query} />
      {!weatherData || error === "City not found." ? (
        <div>
          <h2 className="text-[28px] font-bold mt-12 text-center">
            No search result found!
          </h2>
        </div>
      ) : (
        <div className="flex flex-col xl:flex-row items-center xl:items-start justify-center gap-8 max-w-[1216px] mx-auto">
          {/* ---- weather card ---- */}
          <div className="flex-1">
            <section className="max-w-[50rem] mx-auto mt-8">
              {loading ? (
                <div className="rounded-[1.25rem] w-full h-[286px] bg-[url('/Noise.svg')] bg-cover bg-neutral-900 bg-no-repeat flex flex-col justify-center items-center">
                  <div
                    className="dots"
                    aria-hidden="false"
                    aria-label="Loading"
                  >
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                  <h2 className="text-preset-lg text-neutral-200">
                    Loading...
                  </h2>
                </div>
              ) : (
                <div className="bg-[url('/bg-today-small.svg')] sm:bg-[url('/bg-today-large.svg')] bg-center bg-cover bg-no-repeat w-full rounded-[1.25rem] py-10 px-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-between sm:py-20">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <button
                        onClick={handleSavedPlace}
                        title={
                          isSaved
                            ? `${cityInfo?.name} already saved`
                            : "Save this place"
                        }
                      >
                        <Star
                          size={24}
                          className={
                            isSaved ? "fill-yellow-400 text-yellow-400" : ""
                          }
                        />
                      </button>
                      <p className="font-bold text-[1.75rem]">
                        {cityInfo?.name}, {cityInfo?.country}
                      </p>
                    </div>
                    <p className="text-preset-lg">{formattedDate}</p>
                  </div>
                  <div className="flex justify-between items-center gap-5">
                    <Image
                      src={imgUrl}
                      alt="weather icon"
                      width={120}
                      height={120}
                      unoptimized
                    />
                    <p className="font-semibold italic text-8xl">
                      {units === "metric"
                        ? `${Math.round(currentWeatherTemp)}`
                        : `${Math.round(cToF(currentWeatherTemp))}`}
                      °
                    </p>
                  </div>
                </div>
              )}
              <CurrentWeatherDetail
                data={weatherData.hourly}
                loading={loading}
              />
            </section>
            <DailyForecast data={weatherData.daily} loading={loading} />
          </div>
          <HourlyForecast data={weatherData.hourly} loading={loading} />
        </div>
      )}
    </div>
  );
}
