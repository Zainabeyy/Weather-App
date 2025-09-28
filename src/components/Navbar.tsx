import Image from "next/image";
import React from "react";
import SettingCont from "./SettingCont";
import SavedPlaces from "./SavedPlaces";
import ToggleTheme from "./ToggleTheme";

export default function Navbar() {
  return (
    <header className="flex justify-between items-start sm:items-center">
      <Image
        src="logo.svg"
        alt="logo"
        width={138}
        height={28}
        className="w-[8.625rem] md:w-[12.25rem]"
      />
      <div className="flex items-start sm:items-center gap-2 sm:gap-5 text-preset-base">
        <ToggleTheme />
        <div className="flex-center flex-col sm:flex-row gap-5">
          <SavedPlaces />
          <SettingCont />
        </div>
      </div>
    </header>
  );
}
