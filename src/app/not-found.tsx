import { Ban } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-screen overflow-hidden text-center flex flex-col gap-6 items-center mt-16">
      <Ban size={50} />
      <h2 className="text-preset-2xl">404 page not found!</h2>
      <p className="text-preset-xl max-w-[50ch] text-neutral-800 dark:text-neutral-200">
        Could not find requested resource
      </p>
      <Link className="buttonCont bgHover" href="/">
        Return Home
      </Link>
    </div>
  );
}
