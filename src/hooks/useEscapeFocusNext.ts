import { useEffect } from "react";

export function useEscapeFocusNext(
  containerRef: React.RefObject<HTMLDivElement | null>,
  onClose: () => void
) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && containerRef.current?.contains(document.activeElement)) {
        e.preventDefault();
        onClose();

        const focusableSelectors = [
          "a[href]",
          "button:not([disabled])",
          "input:not([disabled])",
          "select:not([disabled])",
          "textarea:not([disabled])",
          "[tabindex]:not([tabindex='-1'])",
        ];
        const allFocusable = Array.from(
          document.querySelectorAll<HTMLElement>(focusableSelectors.join(","))
        );

        // Find the last focusable element inside this container
        const insideFocusable = allFocusable.filter((el) =>
          containerRef.current?.contains(el)
        );
        const lastInside = insideFocusable[insideFocusable.length - 1];

        const startIndex = allFocusable.indexOf(lastInside);

        // Focus the next focusable element outside this container
        for (let i = startIndex + 1; i < allFocusable.length; i++) {
          if (!containerRef.current?.contains(allFocusable[i])) {
            allFocusable[i].focus();
            break;
          }
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [containerRef, onClose]);
}
