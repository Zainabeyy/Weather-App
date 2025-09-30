import { cityInfoType } from "@/types/type";
import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ComparisonTempChartProp = {
  weather1: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
  weather2: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
  cityInfo1: cityInfoType;
  cityInfo2: cityInfoType;
};

export default function ComparisonTempChart({
  weather1,
  weather2,
  cityInfo1,
  cityInfo2,
}: ComparisonTempChartProp) {
  function buildTemperatureChartData() {
    // Take the daily dates as labels
    const dates = weather1.time.map((d) =>
      new Date(d).getDate().toString().padStart(2, "0")
    );

    return dates.map((date: string, i: number) => {
      // Average temperature for city1
      const avgTemp1 =
        (weather1.temperature_2m_max[i] + weather1.temperature_2m_min[i]) / 2;

      // Average temperature for city2
      const avgTemp2 =
        (weather2.temperature_2m_max[i] + weather2.temperature_2m_min[i]) / 2;

      return {
        date,
        [cityInfo1?.name || "City1"]: Math.round(avgTemp1),
        [cityInfo2?.name || "City2"]: Math.round(avgTemp2),
      };
    });
  }

  const chartData = buildTemperatureChartData();
  if (chartData && chartData.length > 0)
    return (
      <div className="max-w-4xl mx-auto mt-16">
        <h2 className="text-2xl font-semibold text-center mb-4">
          7-Day Temperature Comparison
        </h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="5 2" strokeWidth={1} />
            <XAxis dataKey="date" interval={0} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey={cityInfo1?.name || "City1"}
              stroke="#8884d8"
            />
            <Line
              type="monotone"
              dataKey={cityInfo2?.name || "City2"}
              stroke="#82ca9d"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  else
    return (
      <p className="text-center mt-8 text-neutral-500">Loading chart data...</p>
    );
}
