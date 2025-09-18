"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { cityInfoType } from "@/type";

export default function SearchForm({ query }: { query: string }) {
  const [inputValue, setInputValue] = useState(query || "");
  const [suggestions, setSuggestions] = useState<cityInfoType[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  // Fetch city suggestions while typing
  useEffect(() => {
    if (inputValue.length < 2) {
      setSuggestions([]);
      setHighlightedIndex(-1);
      return;
    }

    const fetchCities = async () => {
      try {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
            inputValue
          )}&count=4&language=en&format=json`
        );
        const data = await res.json();
        setSuggestions(data.results || []);
        setHighlightedIndex(-1);
      } catch (err) {
        console.error("Error fetching city suggestions:", err);
      }
    };

    const debounce = setTimeout(fetchCities, 400);
    return () => clearTimeout(debounce);
  }, [inputValue]);

  const handleSelect = (city: cityInfoType) => {
    setInputValue(`${city.name}, ${city.country}`);
    setSuggestions([]);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
        handleSelect(suggestions[highlightedIndex]);
      }
    } else if (e.key === "Escape") {
      setSuggestions([]);
      setHighlightedIndex(-1);
    }
  };

  return (
    <section>
      <h2 className="text-[3.25rem] font-bold font-styled-sans py-12 lg:py-16 m-auto text-center">
        How’s the sky looking today?
      </h2>

      <form
        action="/"
        className="text-preset-xl gap-3 md:gap-4 flex flex-col sm:flex-row justify-center items-center relative"
      >
        <div className="flex flex-col w-full max-w-[32.875rem] relative">
          <div className="flex items-center gap-4 bg-neutral-800 py-4 px-6 rounded-xl">
            <Image src="/icon-search.svg" alt="search" width={20} height={20} />
            <input
              type="text"
              placeholder="Search for a place..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              name="query"
              className="bg-transparent flex-1 outline-none"
              autoComplete="off"
            />
          </div>

          {/* Suggestion dropdown */}
          {suggestions.length > 0 && (
            <ul className="absolute top-full mt-2.5 bg-neutral-800 w-full shadow-lg z-10 max-h-60 overflow-y-auto p-2 rounded-xl">
              {suggestions.map((city, index) => (
                <li
                  key={city.id}
                  className={`cursor-pointer text-preset-base px-2 py-2.5 rounded-lg ${
                    index === highlightedIndex
                      ? "bg-neutral-700"
                      : "hover:bg-neutral-700"
                  }`}
                  onClick={() => handleSelect(city)}
                >
                  {city.name}, {city.country}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 py-4 text-center w-full rounded-xl sm:w-28"
        >
          Search
        </button>
      </form>
    </section>
  );
}
