import Image from "next/image";
import React from "react";

interface sunTimeProp {
  sunrise: string;
  sunset: string;
}

export default function SunTime({ sunrise, sunset }: sunTimeProp) {
  function getHoursMin(time: string) {
    if(!time) return '_'
    const date = new Date(time);
    const hours = date.getHours().toString().padStart(2, "0");

    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  const times = [
    {
      title: "sunrise",
      time: getHoursMin(sunrise),
    },
    {
      title: "sunset",
      time: getHoursMin(sunset),
    },
  ];
  return (
    <div className="bgCont mt-8 md:mt-12 max-w-[50rem] rounded-2xl p-6 xl:pr-10 ">
      <h3 className="capitalize text-preset-xl pb-5">Sun Times</h3>
      <div className="flex flex-wrap justify-between items-center gap-y-5">
        {times.map((item) => (
          <div
            key={item.title}
            className="grid grid-cols-2 items-center gap-x-2.5"
          >
            <p className="text-neutral-600 dark:text-neutral-200 font-light capitalize">
              {item.title}
            </p>
            <Image
              src={`/${item.title}.png`}
              alt="sunset"
              width={50}
              height={50}
              className="row-span-2 justify-self-center"
            />
            <p className="text-preset-xl">{item.time} {item.title === 'sunrise' ? 'AM' : 'PM'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
