import { cToF } from "@/directives/unitConversion";
import { getWeatherIcon } from "@/directives/weatherImages";
import { useEscapeFocusNext } from "@/hooks/useEscapeFocusNext";
import { useUnits } from "@/providers/UnitsContext";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import React, { useRef } from "react";

interface hourlyForecastProp {
  data: {
    time: string[];
    temperature_2m: number[];
    weathercode: number[];
  };
  loading: boolean;
}

export default function HourlyForecast({ data, loading }: hourlyForecastProp) {
  const { units } = useUnits();
  const contRef = useRef<HTMLDivElement | null>(null);
  const [days, setShowDays] = React.useState(false);
  const [selectedDay, setSelectedDay] = React.useState("");

  const today = React.useMemo(() => new Date(), []);
  const dayFormatter = React.useMemo(
    () =>
      new Intl.DateTimeFormat("en-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
    []
  );
  const weekdayFormatter = React.useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        weekday: "long",
      }),
    []
  );

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
  }, [data, dayFormatter]);

  React.useEffect(() => {
    setSelectedDay(dayFormatter.format(today));
  }, [today, dayFormatter]);

  function handleSelectedDay(value: string) {
    setSelectedDay(value);
    setShowDays(false);
  }

  const hourlyForecast = groupedByDay[selectedDay] || [];

  useEscapeFocusNext(contRef, () => setShowDays(false));

  return (
    <section className="bgCont rounded-[1.25rem] px-4 py-5 mt-14 xl:mt-8 max-w-4xl xl:flex-1 xl:max-w-[364px] w-full max-h-[693px] overflow-y-scroll">
      <div className="flex-between mb-4">
        <h3 className="text-preset-xl">Hourly forecast</h3>
        <div
          ref={contRef}
          className="relative"
          onFocus={(e) => {
            const target = e.target as HTMLElement;
            const triggerButton = contRef.current?.querySelector("button");
            if (contRef.current && target !== triggerButton) {
              setShowDays(true);
            }
          }}
          onBlur={(e) => {
            if (
              contRef.current &&
              !contRef.current.contains(e.relatedTarget as Node)
            ) {
              setShowDays(false);
            }
          }}
        >
          <button
            type="button"
            className="bgContChild rounded-lg py-2 px-2.5 text-preset-base flex items-center gap-3 hover:bg-blue-300 dark:hover:bg-neutral-700 allTransition"
            onClick={() =>
              loading ? setShowDays(false) : setShowDays((prev) => !prev)
            }
          >
            <span>
              {loading
                ? "-"
                : weekDays.find((d) => d.value === selectedDay)?.label}
            </span>
            <ChevronDown
              size={18}
              className={`${!days ? "rotate-180" : "rotate-0"} allTransition`}
            />
          </button>
          <div
            className={`absolute ${
              days
                ? "max-h-[322px] container-border opacity-100"
                : "max-h-0 border-0 border-neutral-600 opacity-0"
            } right-0 mt-2 bgCont rounded-xl w-[214px] overflow-hidden allTransition`}
          >
            <ul className="p-2 flex flex-col gap-1">
              {weekDays.map((d) => (
                <li key={d.value}>
                  <button
                    type="button"
                    onClick={() => handleSelectedDay(d.value)}
                    className={`text-preset-base hover:bg-blue-200 dark:hover:bg-neutral-700 px-2.5 py-2 rounded-lg w-full allTransition text-left ${
                      selectedDay === d.value ? "bgContChild" : ""
                    }`}
                  >
                    {d.label}
                  </button>
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
              className="bgContChild rounded-lg container-border gap-2 py-2.5 px-3 flex-1 min-h-[60px] animate-bgPulse"
            >
              <div className="flex-between"></div>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="flex flex-col gap-4">
          <AnimatePresence>
            {hourlyForecast.map((item, index) => (
              <motion.li
                key={item.time + index + selectedDay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className="bgContChild rounded-lg container-border gap-2 py-2.5 px-3 flex-1 min-h-[60px] "
              >
                <div className="flex-between">
                  <Image
                    src={item.iconUrl}
                    alt="weather icon"
                    width={40}
                    height={40}
                    unoptimized
                  />
                  <p className="text-preset-xl flex-1">{item.time}</p>
                  <p className="text-preset-base">
                    {units.temperature === "metric"
                      ? Math.round(item.temperature)
                      : Math.round(cToF(item.temperature))}
                    °
                  </p>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </section>
  );
}
