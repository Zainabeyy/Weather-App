"use client";

import React, { useState } from "react";
import { cityInfoType } from "@/types/type";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import VoiceSearch from "../VoiceSearch";
import { useCitySuggestions } from "@/hooks/useCitySuggestions";
import Image from "next/image";


export default function SearchForm({ query }: { query: string }) {
  const router = useRouter();
  const [inputValue, setInputValue] = useState(query || "");
  const [isFocused, setIsFocused] = useState(false);
  const {
    suggestions,
    highlightedIndex,
    setHighlightedIndex,
    clearSuggestions,
  } = useCitySuggestions(inputValue);

  const handleSelect = (city: cityInfoType) => {
    setHighlightedIndex(-1);
    setInputValue(city.name);
    router.push(`/?query=${encodeURIComponent(city.name)}`);
  };

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
        handleSelect(suggestions[highlightedIndex]);
      }
    } else if (e.key === "Escape") {
      clearSuggestions();
      setHighlightedIndex(-1);
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      router.push(`/?query=${encodeURIComponent(inputValue)}`);
    }
    clearSuggestions();
  };

  function handleVoiceResult(query: string) {
    setInputValue(query);
    if (query.trim() !== "") {
      router.push(`/?query=${encodeURIComponent(query)}`);
    }
    clearSuggestions();
  }

  return (
    <section>
      <h2 className="text-preset-2xl py-12 lg:py-16 m-auto text-center">
        How’s the sky looking today?
      </h2>

      <form
        onBlur={clearSuggestions}
        className="text-preset-xl gap-3 md:gap-4 flex-center flex-col sm:flex-row"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col w-full max-w-[32.875rem] relative">
          <div className="flex items-center gap-4 bgCont focus:bg-neutral-700 py-2.5 px-6 rounded-xl focus-within:outline-1">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search for a place..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 150)}
              name="query"
              className="bg-transparent flex-1 outline-none min-w-0"
              autoComplete="off"
              required
            />
            <VoiceSearch onResult={handleVoiceResult} />
          </div>

          {/* Suggestion dropdown */}
          {isFocused && suggestions.length > 0 && (
            <ul
              className="absolute top-full mt-2.5 bgCont w-full shadow-lg z-10 max-h-60 overflow-y-auto p-2 rounded-xl"
              onMouseDown={(e) => e.preventDefault()}
            >
              {suggestions.map((city, index) => (
                <li
                  key={city.id}
                  className={`cursor-pointer text-preset-base px-2 py-2.5 rounded-lg flex items-center gap-2 ${
                    index === highlightedIndex
                      ? "bgContChild"
                      : "hover:bg-blue-200 dark:hover:bg-neutral-600"
                  }`}
                  onClick={() => handleSelect(city)}
                >
                  <Image
                    src={`https://flagsapi.com/${city.country_code}/flat/32.png`}
                    alt={city.country}
                    width={20}
                    height={20}
                    className="w-5 h-5 object-cover rounded-full"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display =
                        "none";
                    }}
                  />
                  <span>
                    {city.name}, {city.country}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-400 hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-700 py-4 text-center w-full rounded-xl sm:w-28  allTransition text-white"
        >
          Search
        </button>
      </form>
    </section>
  );
}
