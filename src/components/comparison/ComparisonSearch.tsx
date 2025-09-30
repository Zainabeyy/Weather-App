"use client";

import { useCitySuggestions } from "@/hooks/useCitySuggestions";
import { cityInfoType } from "@/types/type";
import React from "react";
import VoiceSearch from "../VoiceSearch";

export default function ComparisonSearch() {
  const [cityNames, setCityNames] = React.useState({
    City1: "",
    City2: "",
  });

  // Hooks for each input
  const city1Suggestions = useCitySuggestions(cityNames.City1);
  const city2Suggestions = useCitySuggestions(cityNames.City2);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setCityNames((prev) => ({ ...prev, [name]: value }));
  }

  function handleVoiceResult(cityKey: "City1" | "City2", query: string) {
    setCityNames((prev) => ({ ...prev, [cityKey]: query }));
  }

  function handleSelect(cityKey: "City1" | "City2", city: cityInfoType) {
    setCityNames((prev) => ({ ...prev, [cityKey]: city.name }));
    if (cityKey === "City1") city1Suggestions.clearSuggestions();
    else city2Suggestions.clearSuggestions();
  }
  return (
    <form
      action={"/compare-locations"}
      className="text-preset-xl gap-3 md:gap-4 flex-center flex-col max-w-[40rem] w-full mx-auto mt-14"
    >
      {(["City1", "City2"] as const).map((item) => {
        const {
          suggestions,
          highlightedIndex,
          setHighlightedIndex,
          clearSuggestions,
        } = item === "City1" ? city1Suggestions : city2Suggestions;

        function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
          if (suggestions.length === 0) return;

          if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightedIndex((prev) =>
              prev < suggestions.length - 1 ? prev + 1 : 0
            );
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightedIndex((prev) =>
              prev > 0 ? prev - 1 : suggestions.length - 1
            );
          } else if (e.key === "Enter") {
            if (highlightedIndex >= 0) {
              e.preventDefault();
              handleSelect(item, suggestions[highlightedIndex]);
            }
          } else if (e.key === "Escape") {
            clearSuggestions();
            setHighlightedIndex(-1);
          }
        }

        return (
          <div key={item} className="relative w-full">
            <div className="flex-between w-full gap-4 bgCont focus:bg-neutral-700 py-2.5 px-6 rounded-xl focus-within:outline-1">
              <input
                type="text"
                name={item}
                placeholder={`Enter ${item === "City1" ? "1st" : "2nd"} city`}
                value={cityNames[item]}
                onChange={handleChange}
                onFocus={() => setHighlightedIndex(-1)}
                onBlur={clearSuggestions}
                onKeyDown={handleKeyDown}
                required
                className="bg-transparent flex-1 outline-none min-w-0"
                autoComplete="off"
              />
              <VoiceSearch
                onResult={(query) => handleVoiceResult(item, query)}
              />
            </div>

            {suggestions.length > 0 && (
              <ul className="absolute top-full mt-2.5 bgCont w-full shadow-lg z-10 max-h-60 overflow-y-auto p-2 rounded-xl">
                {suggestions.map((city, index) => (
                  <li
                    key={city.id}
                    className={`cursor-pointer text-preset-base px-2 py-2.5 rounded-lg ${
                      index === highlightedIndex
                        ? "bgContChild"
                        : "hover:bg-blue-200 dark:hover:bg-neutral-700"
                    }`}
                    onClick={() => handleSelect(item, city)}
                  >
                    {city.name}, {city.country}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}

      <button
        type="submit"
        className="bg-blue-400 hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-700 py-4 text-center w-full rounded-xl sm:w-28 allTransition text-white"
      >
        Search
      </button>
    </form>
  );
}
