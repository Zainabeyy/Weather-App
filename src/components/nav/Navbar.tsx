"use client";

import Image from "next/image";
import React from "react";
import SavedPlaces from "./SavedPlaces";
import Link from "next/link";
import { useTheme } from "next-themes";
import ToggleTheme from "./ToggleTheme";
import SettingCont from "./SettingCont";
import { ChevronLeft } from "lucide-react";

export default function Navbar() {
  const { theme } = useTheme();
  const [showNav, setShowNav] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const isMobile = window.innerWidth < 768;

    if (showNav && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showNav]);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowNav(true); // lg and above
      } else {
        setShowNav(false); // below lg
      }
    };

    handleResize(); // run once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if(!mounted) return null;

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
      <div className="flex content-start flex-wrap sm:items-center gap-2 sm:gap-5 text-preset-base">
        <Link
          href="/compare-locations"
          className="buttonCont bgHover w-auto mr-6 md:mr-0 text-sm sm:text-base whitespace-nowrap"
        >
          Compare Locations
        </Link>
        <div
          className={`md:flex-center flex items-start md:flex-row fixed md:static  left-0 h-full w-full z-[999] top-0 md:w-auto md:h-auto right-0 allTransition ${
            showNav ? "translate-x-0" : "translate-x-[93%]"
          }`}
        >
          <button
            onClick={() => setShowNav((prev) => !prev)}
            aria-label={`${showNav ? 'hide' : 'show'} nav`}
            className={`py-5 px-1 rounded-tl-3xl rounded-bl-3xl bg-black/70 shadow-2xl md:hidden`}
          >
            <ChevronLeft />
          </button>
          <div className="bg-black/70 min-h-full w-[95%] md:h-auto md:w-auto p-3 md:p-0 gap-4 flex flex-col sm:flex-row md:bg-transparent">
            <SettingCont />
            <SavedPlaces />
            <ToggleTheme />
          </div>
        </div>
      </div>
    </header>
  );
}
