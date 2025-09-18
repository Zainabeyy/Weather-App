export type unitType = {
  name: string;
  type: "imperial" | "metric";
};

export type unitsType = {
  title: string;
  unit1: unitType;
  unit2: unitType;
};

export type weatherDataType = {
  current_weather: {
    temperature: number;
  };
  hourly: {
    apparent_temperature: number[];
    relative_humidity_2m: number[];
    wind_speed_10m: number[];
    precipitation: number[];
  };
};

export type cityInfoType ={
  id?:number;
  name: string;
  country: string;
}