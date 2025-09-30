"use client";

import { useSavedPlaces } from "@/providers/savedPlaces";
import { Star, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { useEscapeFocusNext } from "@/hooks/useEscapeFocusNext";
import { AnimatePresence, motion } from "motion/react";

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
      {showPlaces && (
        <ul className="p-2 flex flex-col gap-2 absolute bgCont w-[13.375rem] left-0 md:left-auto md:right-0 rounded-xl mt-2.5 z-[9999] overflow-hidden shadow-2xl">
          <AnimatePresence mode="wait">
            {savedPlaces.length > 0 ? (
              savedPlaces.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                >
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
                  {index !== savedPlaces.length - 1 && (
                    <div className="seprator h-[1px] bg-neutral-700 my-1" />
                  )}
                </motion.li>
              ))
            ) : (
              <li className="p-2 rounded-lg text-sm text-neutral-600 dark:text-neutral-200">
                There is no saved place.
              </li>
            )}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}
