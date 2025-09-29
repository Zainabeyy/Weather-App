"use client";

import Image from "next/image";
import React from "react";
import SavedPlaces from "./SavedPlaces";
import Link from "next/link";
import { useTheme } from "next-themes";
import ToggleTheme from "./ToggleTheme";
import SettingCont from "./SettingCont";

export default function Navbar() {
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // ensure this only runs on client
  React.useEffect(() => {
    setMounted(true);
  }, []);
  const logo = mounted
    ? theme === "light"
      ? "/logoLight.svg"
      : "/logo.svg"
    : "/logo.svg";
  return (
    <header className="flex justify-between items-start sm:items-center">
      <Link href="/">
        <Image
          src={logo}
          alt="logo"
          width={138}
          height={28}
          className="w-[8.625rem] md:w-[12.25rem]"
        />
      </Link>
      <div className="flex items-start sm:items-center gap-2 sm:gap-5 text-preset-base">
        <ToggleTheme />
        <div className="flex-center flex-col sm:flex-row gap-5">
          <SavedPlaces />
          <SettingCont />
          <Link href="/compare-locations" className="buttonCont bgCont bgHover">
            Compare Locations
          </Link>
        </div>
      </div>
    </header>
  );
}
