export type selectedUnitsType = {
  Temperature: string;
  "Wind Speed": string;
  Precipitation: string;
};

export type UnitKeys = keyof selectedUnitsType;
