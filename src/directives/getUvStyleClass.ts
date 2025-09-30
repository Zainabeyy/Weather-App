export function getUVClass(value: number | null) {
  if (value === null) return "text-neutral-800 dark:text-neutral-200"; // fallback
  if (value <= 2) return "text-green-600 dark:text-green-400"; // Low
  if (value <= 5) return "text-yellow-600 dark:text-yellow-400"; // Moderate
  if (value <= 7) return "text-orange-700 dark:text-orange-500"; // High
  if (value <= 10) return "text-red-700 dark:text-red-500"; // Very High
  return "text-purple-800 dark:text-purple-600"; // Extreme
}
