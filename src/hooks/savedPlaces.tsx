"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type SavedPlacesContextType = {
  savedPlaces: string[];
  addPlace: (place: string) => void;
  removePlace: (place: string) => void;
  clearPlaces: () => void;
};

const SavedPlacesContext = createContext<SavedPlacesContextType | undefined>(undefined);

export function SavedPlacesProvider({ children }: { children: ReactNode }) {
  const [savedPlaces, setSavedPlaces] = useState<string[]>([]);

  // ✅ Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedPlaces = localStorage.getItem("savedPlaces");
      if (storedPlaces) {
        try {
          setSavedPlaces(JSON.parse(storedPlaces));
        } catch (error) {
          console.error("Error parsing saved places from localStorage", error);
        }
      }
    }
  }, []);

  // ✅ Save to localStorage whenever savedPlaces changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("savedPlaces", JSON.stringify(savedPlaces));
    }
  }, [savedPlaces]);

  const addPlace = (place: string) => {
    setSavedPlaces((prev) => {
      if (!prev.includes(place)) return [...prev, place];
      return prev;
    });
  };

  const removePlace = (place: string) => {
    setSavedPlaces((prev) => prev.filter((p) => p !== place));
  };

  const clearPlaces = () => setSavedPlaces([]);

  return (
    <SavedPlacesContext.Provider value={{ savedPlaces, addPlace, removePlace, clearPlaces }}>
      {children}
    </SavedPlacesContext.Provider>
  );
}

export function useSavedPlaces() {
  const context = useContext(SavedPlacesContext);
  if (!context) {
    throw new Error("useSavedPlaces must be used within a SavedPlacesProvider");
  }
  return context;
}
