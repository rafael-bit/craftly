'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import { PlayCircleIcon } from "@heroicons/react/20/solid";
import { SiAzuredataexplorer } from "react-icons/si";

export default function Home() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Email sent successfully!');
        setEmail('');
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred while sending the email.');
    }
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <div id="hero" className="w-[90%] xs:w-[95%] mx-auto m-5 flex items-center justify-center h-[75vh] text-primary">
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
      <div className="mb-28 relative w-[80%] mx-auto">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 blur-3xl opacity-20 transition-transform duration-500 -z-10"></div>
        <div className="flex flex-col justify-center items-center text-primary px-4 z-10">
          <h1 className="text-4xl font-bold text-center">Sign up for our newsletter</h1>
          <p className="text-center w-full max-w-lg py-6">
            Do you want to be notified when a new component is added to Craftly? Sign up for our newsletter and you’ll
            be among the first to find out about new features.
          </p>
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="outline-none border border-neutral-600 rounded-lg text-sm bg-neutral-800 text-primary p-2 w-full"
            />
            <button
              type="submit"
              className="mt-4 bg-blue-700 hover:bg-blue-600 text-white p-2 rounded-lg w-full"
            >
              Sign Up
            </button>
          </form>
          {message && <p className="mt-4 text-sm text-green-500">{message}</p>}
        </div>
      </div>
    </>
  );
}