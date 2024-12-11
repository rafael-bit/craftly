'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import { PlayCircleIcon } from "@heroicons/react/20/solid";
import { SiAzuredataexplorer } from "react-icons/si";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <div id="hero" className="w-[90%] xs:w-[95%] mx-auto m-5 flex items-center justify-center h-[70vh]">
        <div
          className={`w-full flex items-start xs:justify-center transition-all duration-1000 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          <div className="pr-4 sm:pr-5 lg:pr-10">
            <h1 className="text-7xl xs:text-6xl sm:text-7xl lg:text-9xl font-bold">Craftly</h1>
            <div className="block xs:hidden mt-5 xs:mt-0 p-3 sm:p-5 pt-0 sm:pt-2 md:pt-0 lg:p-10 border-l border-secondary w-full xs:w-1/2 text-justify">
              <p className="text-xs lg:text-base">
                Bring your ideas to life with our collection of highly customizable components, optimized for speed, accessibility, and design. Compose full pages in minutes, save time, and focus on what truly matters: the user experience.
              </p>

              <p className="text-xs lg:text-base font-medium md:font-bold pt-3">
                Elevate your projects. Create with ease. Lead the digital future.
              </p>
            </div>
            <div className="flex gap-2 xs:gap-3 sm:gap-4 lg:gap-7 mt-8 md:mt-10 lg:mt-12">
              <Link
                href=""
                className="flex items-center gap-2 lg:gap-3 p-2 lg:p-3 px-3 lg:px-5 bg-primary border border-primary rounded-3xl relative overflow-hidden hover:shadow-md transition-all duration-300 group transform hover:-translate-y-1 ml-2"
              >
                <PlayCircleIcon className="w-5 xs:w-4 lg:w-6 h-5 xs:h-4 lg:h-5" />
                <span className="relative text-sm xs:text-[11px] sm:text-xs lg:text-sm">Watch Demo</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl blur-sm"></div>
              </Link>
              <Link
                href=""
                className="flex items-center gap-3 lg:gap-4 xs:p-2 lg:p-3 px-4 xs:px-3 lg:px-5 bg-primary border border-primary rounded-3xl relative overflow-hidden hover:shadow-md transition-all duration-300 group transform hover:-translate-y-1 ml-2"
              >
                <SiAzuredataexplorer className="w-4 xs:w-3 lg:w-5 h-4 xs:h-3 lg:h-5" />
                <span className="relative text-sm xs:text-[11px] sm:text-xs lg:text-sm">Explorer</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl blur-sm"></div>
              </Link>
            </div>
          </div>
          <div className="hidden xs:block xs:p-3 sm:p-5 pt-0 sm:pt-2 md:pt-0 lg:p-10 border-l border-secondary w-1/2 text-justify">
            <p className="text-xs lg:text-base">
              Bring your ideas to life with our collection of highly customizable components, optimized for speed, accessibility, and design. Compose full pages in minutes, save time, and focus on what truly matters: the user experience.
            </p>

            <p className="text-xs lg:text-base font-medium md:font-bold pt-3">
              Elevate your projects. Create with ease. Lead the digital future.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}