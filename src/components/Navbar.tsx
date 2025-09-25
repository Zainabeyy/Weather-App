import Image from "next/image";
import React from "react";
import SettingCont from "./SettingCont";
import SavedPlaces from "./SavedPlaces";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between">
      <Image
        src="logo.svg"
        alt="logo"
        width={138}
        height={28}
        className="w-[8.625rem] md:w-[12.25rem]"
      />
      <div className="flex flex-col sm:flex-row items-center justify-center gap-5 text-preset-base">
        <SavedPlaces/>
        <SettingCont />
      </div>
    </header>
  );
}
