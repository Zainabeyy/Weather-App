export type unitType = {
  name: string;
  type: "imperial" | "metric";
};

export type unitsType = {
  title: string;
  unit1: unitType;
  unit2: unitType;
};

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
