"use client";

import { UnitsContextType, UnitsState, UnitSystem } from "@/type";
import React from "react";

const defaultUnits: UnitsState = {
  temperature: "metric",
  wind: "metric",
  precipitation: "metric",
  visibility: "metric",
  pressure: "metric",
};

const UnitsContext = React.createContext<UnitsContextType>({
  units: defaultUnits,
  setUnits: () => {},
  switchAll: () => {},
});

export function UnitsProvider({ children }: { children: React.ReactNode }) {
  const [units, setUnits] = React.useState<UnitsState>(defaultUnits);

  // Load from localStorage
  React.useEffect(() => {
    const stored = localStorage.getItem("units");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as UnitsState;
        setUnits(parsed);
      } catch {
        setUnits(defaultUnits);
      }
    }
  }, []);

  // Save to localStorage
  React.useEffect(() => {
    localStorage.setItem("units", JSON.stringify(units));
  }, [units]);

  const switchAll = (system: UnitSystem) => {
    setUnits({
      temperature: system,
      wind: system,
      precipitation: system,
      visibility: system,
      pressure: system,
    });
  };

  return (
    <UnitsContext.Provider value={{ units, setUnits, switchAll }}>
      {children}
    </UnitsContext.Provider>
  );
}

export function useUnits() {
  const context = React.useContext(UnitsContext);
  if (!context) {
    throw new Error("useUnits must be used inside UnitsProvider");
  }
  return context;
}
