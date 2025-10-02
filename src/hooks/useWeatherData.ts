"use client";

import React from "react";
import {
  cityInfoType,
  weatherDataType,
} from "@/types/type";
import fetchWeather from "@/directives/fetchWeather";
import { fetchGeoData, fetchReverseGeocode } from "../directives/geoFunctions";


export default function useWeatherData(cityName?: string) {
  const [weatherData, setWeatherData] = React.useState<weatherDataType | null>(
    null
  );
  const [cityInfo, setCityInfo] = React.useState<cityInfoType | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        // Fetch by city name
        if (cityName) {
          const geoData = await fetchGeoData(cityName, signal);
          setCityInfo({ name: geoData.name, country: geoData.country, country_code: geoData.country_code });
          const weather = await fetchWeather(
            geoData.latitude,
            geoData.longitude,
            signal
          );
          setWeatherData(weather);
        } else if (navigator.geolocation) {
          // Fetch by user's location
          const position = await new Promise<GeolocationPosition>(
            (resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
              });
            }
          );

          const locationData = await fetchReverseGeocode(
            position.coords.latitude,
            position.coords.longitude,
            signal
          );
          setCityInfo({
            name: locationData.city || locationData.locality || "Unknown",
            country: locationData.countryName,
            country_code:locationData.countryCode
          });
          const weather = await fetchWeather(
            position.coords.latitude,
            position.coords.longitude,
            signal
          );
          setWeatherData(weather);
        } else {
          throw new Error("Geolocation not supported. Please search by city.");
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          // Ignore abort errors
        } else if (err instanceof GeolocationPositionError && err.code === 1) {
          const fallbackCity = "London";
          const geoData = await fetchGeoData(fallbackCity, signal);
          setCityInfo({ name: geoData.name, country: geoData.country, country_code: geoData.country_code });
          const weather = await fetchWeather(
            geoData.latitude,
            geoData.longitude,
            signal
          );
          setWeatherData(weather);
        } else {
          setError(
            err instanceof Error ? err.message : "An unexpected error occurred."
          );
          console.log("Error: ", err);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      controller.abort();
    };
  }, [cityName]);

  return { weatherData, cityInfo, loading, error };
}
