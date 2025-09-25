import Navbar from "@/components/Navbar";
import WeatherDataComp from "@/components/WeatherComp";
import React from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    query: string | undefined;
  }>;
}) {
  const query = (await searchParams)?.query?.trim() || "";
  const city=query.split(',');
  return (
    <div>
      <Navbar />
      <WeatherDataComp city={city[0]} query={query}/>
    </div>
  );
}
