import { useState, useEffect } from "react";
import { cityInfoType } from "@/types/type";

export function useCitySuggestions(query: string) {
  const [suggestions, setSuggestions] = useState<cityInfoType[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      setHighlightedIndex(-1);
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    const fetchCities = async () => {
      try {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
            query
          )}&count=4&language=en&format=json`,
          { signal }
        );
        const data = await res.json();
        setSuggestions(data.results || []);
        setHighlightedIndex(-1);
      } catch (err) {
        if (!(err instanceof DOMException && err.name === "AbortError")) {
          console.error("Error fetching city suggestions:", err);
        }
      }
    };

    const debounce = setTimeout(fetchCities, 400);
    return () => {
      clearTimeout(debounce);
      controller.abort();
    };
  }, [query]);

  const clearSuggestions = () => {
    setSuggestions([]);
    setHighlightedIndex(-1);
  };

  return { suggestions, highlightedIndex, setHighlightedIndex, clearSuggestions };
}
