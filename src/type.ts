export type UnitSystem = "imperial" | "metric";


export interface unitType {
  name: string;
  type: UnitSystem;
};


export interface UnitsState {
  temperature: UnitSystem;
  wind: UnitSystem;
  precipitation: UnitSystem;
  visibility:UnitSystem;
  pressure:UnitSystem;
}

export interface UnitsContextType {
  units: UnitsState;
  setUnits: React.Dispatch<React.SetStateAction<UnitsState>>;
  switchAll: (system: UnitSystem) => void;
}

export interface dailyForecastType {
  day: string;
  weatherCode: number;
  maxTemp: number;
  minTemp: number;
}

export type weatherDataType = {
  current_weather: {
    temperature: number;
    weathercode:number;
  };
  hourly: {
    time:string[];
    apparent_temperature: number[];
    relative_humidity_2m: number[];
    weathercode:number[];
    temperature_2m : number[],
    wind_speed_10m: number[];
    precipitation: number[];
    uv_index: number[];
    visibility: number[];
    surface_pressure: number[];
  };
  daily: {
    time:string[]
    weathercode: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
};

export type cityInfoType = {
  id?: number;
  name: string;
  country: string;
};

export interface GeoCodingResult {
  latitude: number;
  longitude: number;
  name: string;
  country: string;
}

export interface ReverseGeocodeResult {
  city: string;
  locality: string;
  countryName: string;
}
