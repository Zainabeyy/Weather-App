import { getWeatherIcon } from "@/directives/weatherImages";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import React from "react";

interface hourlyForecastProp {
  data: {
    time: string[];
    temperature_2m: number[];
    weathercode: number[];
  };
  loading: boolean;
}

export default function HourlyForecast({ data, loading }: hourlyForecastProp) {
  const [days, setShowDays] = React.useState(false);
  const [selectedDay, setSelectedDay] = React.useState("");

  const today = new Date();
  const weekdayFormatter = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  });
  const dayFormatter = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }); // yyyy-mm-dd

  // list of next 7 days
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return {
      label: weekdayFormatter.format(date),
      value: dayFormatter.format(date),
    };
  });

  // group data by date (safe: only if data exists)
  const groupedByDay = React.useMemo(() => {
    if (!data) return {};
    return data.time.reduce(
      (
        acc: Record<
          string,
          { time: string; temperature: number; iconUrl: string }[]
        >,
        timeString,
        index
      ) => {
        const date = new Date(timeString);
        const dateKey = dayFormatter.format(date);
        const hour = date.getHours();
        const ampm = hour >= 12 ? "PM" : "AM";
        const displayHour = hour % 12 || 12;

        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push({
          time: `${displayHour} ${ampm}`,
          temperature: data.temperature_2m[index],
          iconUrl: getWeatherIcon(data.weathercode[index]),
        });

        return acc;
      },
      {}
    );
  }, [data]);

  React.useEffect(() => {
    setSelectedDay(dayFormatter.format(today));
  }, []);

  function handleSelectedDay(value: string) {
    setSelectedDay(value);
    setShowDays(false);
  }

  const hourlyForecast = groupedByDay[selectedDay] || [];

  return (
    <section className="bg-neutral-800 rounded-[1.25rem] px-4 py-5 mt-14 xl:mt-8 max-w-[50rem] xl:flex-1 xl:max-w-[364px] w-full max-h-[693px] overflow-y-scroll">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-preset-xl">Hourly forecast</h3>
        <div className="relative">
          <button
            className="bg-neutral-600 rounded-lg py-2 px-2.5 text-preset-base flex items-center gap-3"
            onClick={() =>
              loading ? setShowDays(false) : setShowDays((prev) => !prev)
            }
          >
            <p>{weekDays.find((d) => d.value === selectedDay)?.label}</p>
            <ChevronDown
              size={18}
              className={`${
                !days ? "rotate-180" : "rotate-0"
              } transition-all duration-300`}
            />
          </button>
          <div
            className={`absolute ${
              days
                ? "max-h-[322px] container-border opacity-100"
                : "max-h-0 border-0 border-neutral-600 opacity-0"
            } right-0 mt-2 bg-neutral-800 rounded-xl w-[214px] overflow-hidden transition-all duration-500`}
          >
            <ul className="p-2 flex flex-col gap-1">
              {weekDays.map((d) => (
                <li
                  key={d.value}
                  onClick={() => handleSelectedDay(d.value)}
                  className={`text-preset-base hover:bg-neutral-700 px-2.5 py-2 rounded-lg w-full ${
                    selectedDay === d.value ? "bg-neutral-700" : ""
                  }`}
                >
                  {d.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Skeletons */}
      {loading ? (
        <ul className="flex flex-col gap-4">
          {[...Array(8)].map((_, index) => (
            <li
              key={index}
              className="bg-neutral-700 rounded-lg container-border gap-2 py-2.5 px-3 flex-1 min-h-[60px] animate-bgPulse"
            >
              <div className="flex justify-between items-center"></div>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="flex flex-col gap-4">
          {hourlyForecast.map((item, index) => (
            <li
              key={index}
              className="bg-neutral-700 rounded-lg container-border gap-2 py-2.5 px-3 flex-1 min-h-[60px]"
            >
              <div className="flex justify-between items-center">
                <Image
                  src={item.iconUrl}
                  alt="weather icon"
                  width={40}
                  height={40}
                  unoptimized
                />
                <p className="text-preset-xl flex-1">{item.time}</p>
                <p className="text-preset-base">
                  {Math.round(item.temperature)}°
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
