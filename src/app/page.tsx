import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";
import React from "react";


const WeatherDataComp = dynamic(() => import("@/components/WeatherComp"), {
  loading: () => <p>Loading weather module...</p>,
});

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
