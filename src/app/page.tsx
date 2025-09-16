import Navbar from "@/components/Navbar";
import Form from "next/form";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Navbar />
      <section>
        <h2 className="text-[3.25rem] font-bold font-styled-sans py-12 lg:py-16 m-auto text-center">
          How’s the sky looking today?
        </h2>
        <Form action={""} className="text-preset5 gap-3 md:gap-4 flex flex-col sm:flex-row justify-center items-center">
          <div className="flex items-center gap-4 bg-neutral-800 py-4 px-6 rounded-xl flex-1 w-full max-w-[32.875rem]">
            <Image
              src="./icon-search.svg"
              alt="search"
              width={20}
              height={20}
              unoptimized
            />
            <input type="text" placeholder="Search for a place..." />
          </div>
          <button type="submit" className="bg-blue-500 py-4 text-center w-full rounded-xl sm:w-28 max-w-[32.875]">
            Search
          </button>
        </Form>
      </section>
    </div>
  );
}
