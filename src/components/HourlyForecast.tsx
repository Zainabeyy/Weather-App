import { getWeatherIcon } from "@/weatherImages";
import Image from "next/image";
import React from "react";

interface hourlyForecastProp {
  data:{
    time: string[],
    temperature_2m : number[],
    weathercode: number[]
  }
}

export default function HourlyForecast({ data }:hourlyForecastProp) {
  const hourlyForecast = data.time.slice(0, 24).map((timeString, index) => {
    const time = new Date(timeString);
    const hour = time.getHours();
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;

    return {
      time: `${displayHour} ${ampm}`,
      temperature: data.temperature_2m[index],
      iconUrl: getWeatherIcon(data.weathercode[index]),
    };
  });

  return (
    <section className="bg-neutral-800 rounded-[1.25rem] px-4 py-5 mt-14 xl:mt-8 max-w-[50rem] xl:flex-1 xl:max-w-[364px] w-full max-h-[693px] overflow-y-scroll">
      <h3 className="text-preset-xl mb-4">Hourly forecast</h3>
      <ul className="flex flex-col gap-4">
        {hourlyForecast.map((item, index) => (
          <li
            key={index}
            className="bg-neutral-700 rounded-lg container-border gap-2 py-2.5 px-3 flex justify-between items-center flex-1 max-h-[165px]"
          >
              <Image
                src={item.iconUrl}
                alt="weather icon"
                width={40}
                height={40}
                unoptimized
              />
              <p className="text-preset-xl flex-1">{item.time}</p>
            <p className="text-preset-base">{Math.round(item.temperature)}°</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
