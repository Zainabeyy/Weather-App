import Navbar from "@/components/Navbar";
import SearchForm from "@/components/SearchForm";
import WeatherDataComp from "@/components/WeatherDataComp";
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
  console.log(city)
  return (
    <div>
      <Navbar />
      <SearchForm query={query}/>
      <WeatherDataComp city={city[0]}/>
    </div>
  );
}
