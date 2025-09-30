"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

export default function ToggleTheme() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // Only set theme based on time if user hasn't chosen before
    const savedTheme = localStorage.getItem("theme");

    if (!savedTheme) {
      const hour = new Date().getHours();
      if (hour >= 6 && hour < 18) {
        setTheme("light");
      } else {
        setTheme("dark");
      }
    }
  }, [setTheme]);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="toggle theme"
      className="bgCont rounded-full w-16 p-1 h-8 "
    >
      <div
        className={`w-fit p-0.5 flex-center bgContChild rounded-full allTransition ${
          isDark ? "translate-x-0" : "translate-x-[140%]"
        }`}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </div>
    </button>
  );
}
