"use client";

import React from "react";

type Units = "imperial" | "metric";

interface UnitsContextType {
  units: Units;
  setUnits: React.Dispatch<React.SetStateAction<Units>>;
}

const UnitsContext = React.createContext<UnitsContextType | undefined>(
  undefined
);

export function UnitsProvider({ children }: { children: React.ReactNode }) {
  const [units, setUnits] = React.useState<Units>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("units");
      if (stored === "imperial" || stored === "metric") {
        return stored;
      }
    }
    return "imperial"; // default
  });

  React.useEffect(() => {
    localStorage.setItem("units", units);
  }, [units]);

  return (
    <UnitsContext.Provider value={{ units, setUnits }}>
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
