"use client";

import { useSavedPlaces } from "@/hooks/savedPlaces";
import { useClickOutside } from "@/hooks/useClickOutside";
import { Star, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";

export default function SavedPlaces() {
  const router = useRouter();
  const contRef = useRef<HTMLDivElement>(null);
  const { savedPlaces, removePlace } = useSavedPlaces();
  const [showPlaces, setShowPlaces] = React.useState(false);
  useClickOutside(contRef, () => setShowPlaces(false));
  return (
    <div className="relative">
      <button
        onClick={() => setShowPlaces((prev) => !prev)}
        className="buttonCont flex justify-center items-center gap-2 hover:bg-neutral-700 transition-all duration-300"
      >
        <p>Favourite </p>
        <Star size={16} className="text-yellow-400 fill-yellow-400" />
      </button>
      <div
        ref={contRef}
        className={`${
          showPlaces ? "max-h-[440px] opacity-100" : "max-h-0 opacity-0"
        } absolute bg-neutral-800 w-[13.375rem] right-0 rounded-xl mt-2.5 z-[9999] overflow-hidden transition-all duration-500 shadow-2xl`}
      >
        <ul className="p-2 flex flex-col gap-2">
          {savedPlaces.length > 0 ? (
            savedPlaces.map((item, index) => (
              <div key={index}>
                <div className="p-1 rounded-lg flex items-center justify-between hover:bg-neutral-700 gap-2">
                  <button
                    onClick={() =>
                      router.push(`/?query=${encodeURIComponent(item)}`)
                    }
                    className="flex-1 text-left p-1"
                  >
                    {item}
                  </button>
                  <button
                    onClick={() => removePlace(item)}
                    title="Delete place from saved"
                    className="group p-1"
                  >
                    <Trash size={15} className="group-hover:text-red-700" />
                  </button>
                </div>
                <div
                  className={`seprator h-[1px] bg-neutral-700 my-1 ${
                    index === savedPlaces.length - 1 ? "hidden" : "visible"
                  }`}
                />
              </div>
            ))
          ) : (
            <li className="p-2 rounded-lg text-sm text-neutral-200">
              There is no saved place.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
