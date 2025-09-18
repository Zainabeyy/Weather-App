// hooks/useWeatherData.ts
"use client";

import { cityInfoType, weatherDataType } from "@/type";
import { useState, useEffect } from "react";

export default function useWeatherData(cityName?: string) {
  const [weatherData, setWeatherData] = useState<weatherDataType | null>(null);
  const [cityInfo, setCityInfo] = useState<cityInfoType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWeatherDataByCity(city: string) {
      setLoading(true);
      setError(null);
      try {
        // 1. Get city info
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
        );
        const geoData = await geoRes.json();

        if (!geoData.results || geoData.results.length === 0) {
          throw new Error("City not found.");
        }

        const { latitude, longitude, name, country } = geoData.results[0];
        setCityInfo({ name, country });

        // 2. Get weather data
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,apparent_temperature`
        );
        const data = await res.json();
        setWeatherData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch weather data.");
      } finally {
        setLoading(false);
      }
    }

    async function fetchWeatherDataByCoords(lat: number, lon: number) {
      setLoading(true);
      setError(null);
      try {
        // 1. Get city name (BigDataCloud API)
        const locationRes = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
        );
        const locationData = await locationRes.json();
        setCityInfo({
          name: locationData.city || locationData.locality || "Unknown",
          country: locationData.countryName,
        });

        // 2. Get weather data
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,apparent_temperature`
        );
        const data = await res.json();
        setWeatherData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch weather data.");
      } finally {
        setLoading(false);
      }
    }

    if (cityName) {
      // If city is provided, fetch by city
      fetchWeatherDataByCity(cityName);
    } else {
      // Otherwise try geolocation
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            fetchWeatherDataByCoords(pos.coords.latitude, pos.coords.longitude);
          },
          (err) => {
            setError("Location access denied. Please search by city.");
            console.error('Error :' ,err)
            setLoading(false);
          }
        );
      } else {
        setError("Geolocation not supported by your browser.");
        setLoading(false);
      }
    }
  }, [cityName]);

  return { weatherData, cityInfo, loading, error };
}
