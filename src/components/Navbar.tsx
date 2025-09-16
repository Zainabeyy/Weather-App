import Image from "next/image";
import React from "react";
import SettingCont from "./SettingCont";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between">
      <Image
        src="./logo.svg"
        alt="logo"
        width={138}
        height={28}
        unoptimized
        className="w-[8.625rem] md:w-[12.25rem]"
      />
      <SettingCont/>
    </header>
  );
}
