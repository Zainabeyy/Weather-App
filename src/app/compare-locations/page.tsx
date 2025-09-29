"use client";

import ComparisonSearch from "@/components/ComparisonSearch";
import useWeatherData from "@/hooks/useWeatherData";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function CompareLocations() {
  const searchParams = useSearchParams();

  const city1 = searchParams.get("City1") || "";
  const city2 = searchParams.get("City2") || "";
  const {
    weatherData: weather1,
    cityInfo: cityInfo1,
    loading: loading1,
    error: error1,
  } = useWeatherData(city1);

  const {
    weatherData: weather2,
    cityInfo: cityInfo2,
    loading: loading2,
    error: error2,
  } = useWeatherData(city2);

  return (
    <div>
      <h1 className="text-preset-2xl text-center mt-16">Compare Cities</h1>
      <p className="text-preset-lg text-center">
        Compare weather between two Cities
      </p>
      <ComparisonSearch />
      <table>
        tr
      </table>
    </div>
  );
}
