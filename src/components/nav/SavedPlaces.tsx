"use client";

import { useSavedPlaces } from "@/providers/savedPlaces";
import { Star, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { useEscapeFocusNext } from "@/hooks/useEscapeFocusNext";

export default function SavedPlaces() {
  const router = useRouter();
  const contRef = useRef<HTMLDivElement>(null);
  const { savedPlaces, removePlace } = useSavedPlaces();
  const [showPlaces, setShowPlaces] = React.useState(false);
  // tab navigation
  useEscapeFocusNext(contRef, () => setShowPlaces(false));
  return (
    <div
      ref={contRef}
      onFocus={(e) => {
        const target = e.target as HTMLElement;
        const triggerButton = contRef.current?.querySelector("button");
        if (contRef.current && target !== triggerButton) {
          setShowPlaces(true);
        }
      }}
      onBlur={(e) => {
        if (
          contRef.current &&
          !contRef.current.contains(e.relatedTarget as Node)
        ) {
          setShowPlaces(false);
        }
      }}
      className="relative"
    >
      <button
        onClick={() => setShowPlaces((prev) => !prev)}
        className="buttonCont bgCont bgHover flex-center gap-2 allTransition"
      >
        <p>Favourite </p>
        <Star size={16} className="text-yellow-400 fill-yellow-400" />
      </button>
      <div
        className={`${
          showPlaces ? "max-h-[440px] opacity-100" : "max-h-0 opacity-0"
        } absolute bgCont w-[13.375rem] right-0 rounded-xl mt-2.5 z-[9999] overflow-hidden allTransition shadow-2xl`}
      >
        <ul className="p-2 flex flex-col gap-2">
          {savedPlaces.length > 0 ? (
            savedPlaces.map((item, index) => (
              <li key={index}>
                <div className="p-1 rounded-lg flex-between bgHover gap-2 allTransition">
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
              </li>
            ))
          ) : (
            <li className="p-2 rounded-lg text-sm text-neutral-600 dark:text-neutral-200">
              There is no saved place.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
