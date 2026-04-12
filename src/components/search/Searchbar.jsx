import React from "react";

const Searchbar = ({ type = "text", placeholder, className }) => {
  return (
    <div className="relative w-full">
      {/* Search Icon */}
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
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
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <input
        type={type}
        placeholder={placeholder}
        className={`
          block w-full rounded-lg border-0 py-4 pl-11 pr-4 
          text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
          placeholder:text-gray-400 
          focus:ring-2 focus:ring-inset focus:ring-green-600 
          sm:text-sm sm:leading-6
          ${className} 
        `}
      />
    </div>
  );
};

export default Searchbar;