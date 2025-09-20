const weatherIconMap: { [key: string]: number[] } = {
  "icon-sunny": [0],
  "icon-partly-cloudy": [1, 2],
  "icon-overcast": [3],
  "icon-fog": [45, 48],
  "icon-drizzle": [51, 53, 55],
  "icon-rain": [56, 57, 61, 63, 65, 66, 67, 80, 81, 82],
  "icon-snow": [71, 73, 75, 77, 85, 86],
  "icon-storm": [95, 96, 99],
};

export function getWeatherIcon(weatherCode: number) {
  for (const icon in weatherIconMap) {
    if (weatherIconMap[icon].includes(weatherCode)) {
      return `./${icon}.webp`;
    }
  }
  return "./icon-sunny.webp"; // Fallback to a default icon
}
