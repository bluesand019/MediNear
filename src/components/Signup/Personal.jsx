import React, { useState } from "react";

const Personal = ({ setStage }) => {
  const [gender, setGender] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    setStage(2);
  };

  return (
    <div className="w-full">
      <form onSubmit={submitHandler} className="flex flex-col gap-5">
        <h4 className="text-xs font-medium tracking-widest text-teal-600 uppercase">
          Personal information
        </h4>

        {/* Name row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="First-name"
              className="text-xs font-medium text-gray-500"
            >
              First name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="First-name"
              name="First-name"
              placeholder="Ahnaf"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 placeholder-gray-300 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="Last-name"
              className="text-xs font-medium text-gray-500"
            >
              Last name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="Last-name"
              name="Last-name"
              placeholder="Rahman"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 placeholder-gray-300 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
            />
          </div>
        </div>

        {/* Date of birth */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="date-of-birth"
            className="text-xs font-medium text-gray-500"
          >
            Date of birth <span className="text-red-400">*</span>
          </label>
          <input
            type="date"
            name="date-of-birth"
            id="date-of-birth"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
          />
        </div>

        {/* Gender */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-gray-500">
            Gender <span className="text-red-400">*</span>
          </span>
          <div className="grid grid-cols-3 gap-2">
            {["male", "female", "other"].map((option) => (
              <label
                key={option}
                htmlFor={option}
                className={`flex cursor-pointer items-center justify-center rounded-lg border px-3 py-2 text-sm transition
                  ${
                    gender === option
                      ? "border-teal-400 bg-teal-50 font-medium text-teal-800"
                      : "border-gray-200 text-gray-400 hover:border-gray-300 hover:bg-gray-50"
                  }`}
              >
                <input
                  type="radio"
                  id={option}
                  name="gender"
                  value={option}
                  checked={gender === option}
                  onChange={() => setGender(option)}
                  className="sr-only"
                />
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </label>
            ))}
          </div>
        </div>

        {/* Blood group */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="bg" className="text-xs font-medium text-gray-500">
            Blood group
            <span className="ml-1 text-xs font-normal text-gray-300">
              (optional)
            </span>
          </label>
          <select
            name="bg"
            id="bg"
            defaultValue=""
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
          >
            <option value="" disabled>
              Select blood group
            </option>
            {["A+", "A−", "B+", "B−", "AB+", "AB−", "O+", "O−"].map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-300">
            Helps hospitals serve you faster in emergencies
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit" // This triggers submitHandler which calls Stepper's next step
          className="mt-1 w-full rounded-lg bg-teal-600 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700 active:scale-95 shadow-md shadow-teal-100"
        >
          Continue →
        </button>
      </form>
    </div>
  );
};

export default Personal;
