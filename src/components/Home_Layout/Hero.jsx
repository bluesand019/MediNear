import React from "react";
import stethoscopeImg from "./stethoscope.png";
import Searchbar from "../search/Searchbar";
import Loc from "./Loc";

const Hero = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 pt-5 text-center">
      {/* Badge/Tag */}
      <div className=" rounded-full bg-green-50 px-4 py-1 text-sm font-semibold text-green-600 ring-1 ring-inset ring-blue-700/10">
        Find care near you, instantly
      </div>

      {/* Main Heading */}
      {/* Parent Container: Centers the entire row on the screen */}
      <div className="flex w-full items-center justify-center gap-5 bg-[#cfe4d8]/30 my-5 pt-5 rounded-md">
        {/* Text Content: Left Side */}
        <div className="text-left">
          <h2 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Medical services & doctors near{" "}
            <span className="text-[#0F6E56]">Rajshahi</span>
          </h2>

          {/* Subtext */}
          <div className="mt-6 max-w-xl">
            <p className="text-lg leading-8 text-gray-600">
              Search hospitals, diagnostic centers and specialist doctors.
              Compare prices, ratings and availability in one place.
            </p>
          </div>
        </div>

        {/* Pill Image: Right Side */}
        <img
          className="w-100 h-100 object-contain hidden md:block animate-pulse"
          src={stethoscopeImg}
          alt="3d pill"
        />
      </div>

      {/* Search Container */}
      <div className="flex w-full max-w-2xl flex-col gap-3 sm:flex-row sm:gap-0">
        <div className="relative flex-grow">
          <Searchbar
            className="block w-full rounded-lg border-0 py-4 pl-5 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:rounded-l-lg sm:rounded-r-none sm:text-sm"
            placeholder="Search: X-ray, blood test, MRI, Cardiologists..."
          />
        </div>
        <button className="flex-none rounded-lg bg-[#1D9E75] px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-[#0d4d38] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:rounded-l-none sm:rounded-r-lg">
          Search
        </button>
      </div>

      {/* Location Footer */}
      <div className="mt-8 flex items-center gap-x-2 text-sm text-gray-500">
        <svg
          className="h-5 w-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <span>
          Your location: <strong><Loc /></strong>
        </span>
        <button className="font-medium text-green-600 hover:text-green-500 cursor-pointer underline-offset-4 hover:underline">
          Change city
        </button>
      </div>
    </div>
  );
};

export default Hero;
