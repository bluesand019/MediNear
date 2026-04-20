import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { DOCTORS } from "../data/doctors";

// Keep a simple hardcoded dataset here for now (later this comes from API)


function StarRating({ rating }) {
  return (
    <span className="flex items-center gap-0.5 text-amber-500 text-xs">
      {"★".repeat(Math.floor(rating))}
      {rating % 1 >= 0.5 ? "½" : ""}
    </span>
  );
}

function Chip({ children, className = "" }) {
  return (
    <span
      className={`text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 ${className}`}
    >
      {children}
    </span>
  );
}

export default function DoctorDetail() {
  const { id } = useParams();

  const doctor = useMemo(() => {
    const numericId = Number(id);
    return DOCTORS.find((d) => d.id === numericId);
  }, [id]);

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-10">
          <div className="bg-white border border-gray-100 rounded-2xl p-10 text-center">
            <p className="text-gray-500 text-sm">Doctor not found.</p>
            <Link
              to="/doctor-search"
              className="inline-block mt-4 text-sm font-medium text-teal-600 hover:text-teal-800 no-underline"
            >
              Back to doctor search →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Top nav */}
        <div className="flex items-center justify-between mb-4">
          <Link
            to="/doctor-search"
            className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700 no-underline"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M8 2L4 6l4 4" />
            </svg>
            Back
          </Link>

          <Link
            to="/"
            className="text-xs text-gray-500 hover:text-gray-700 no-underline"
          >
            Home
          </Link>
        </div>

        {/* Header card */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg md:text-xl font-semibold text-gray-900 truncate">
                  {doctor.name}
                </h1>

                {doctor.female && (
                  <Chip className="bg-pink-50 text-pink-700">Female</Chip>
                )}
                {doctor.online && (
                  <Chip className="bg-blue-50 text-blue-700">Online</Chip>
                )}
                <Chip className="bg-teal-50 text-teal-700">{doctor.spec}</Chip>

                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    doctor.availableToday
                      ? "bg-teal-50 text-teal-700"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {doctor.availableToday ? "Available today" : "Next available"}
                </span>
              </div>

              <div className="mt-2 flex items-center gap-3 flex-wrap text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <StarRating rating={doctor.rating} />
                  <span className="font-medium text-gray-900">
                    {doctor.rating}
                  </span>
                  <span className="text-gray-300">({doctor.reviews})</span>
                </span>

                <span className="text-gray-300">•</span>

                <span>{doctor.exp} years experience</span>

                <span className="text-gray-300">•</span>

                <span className="truncate">
                  {doctor.hospital} — {doctor.location}
                </span>
              </div>

              <div className="mt-3 flex items-end gap-8">
                <div>
                  <p className="text-xs text-gray-400">Consultation fee</p>
                  <p className="text-base font-semibold text-gray-900">
                    ৳{doctor.fee}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 flex-shrink-0">
              <button className="text-xs px-3 py-2 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-700 active:scale-95 transition-all">
                Book appointment
              </button>
              <button className="text-xs px-3 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                Message
              </button>
            </div>
          </div>
        </div>

        {/* Slots */}
        <div className="mt-4 bg-white border border-gray-100 rounded-2xl p-5">
          <p className="text-sm font-medium text-gray-900">Available slots</p>
          {doctor.slots?.length ? (
            <div className="flex flex-wrap gap-2 mt-3">
              {doctor.slots.map((slot) => (
                <button
                  key={slot}
                  className="text-xs px-3 py-2 rounded-lg bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100 transition"
                >
                  {slot}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400 mt-2">
              No slots today — check tomorrow.
            </p>
          )}
        </div>

        {/* About */}
        <div className="mt-4 bg-white border border-gray-100 rounded-2xl p-5">
          <p className="text-sm font-medium text-gray-900">About</p>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
            {doctor.about}
          </p>
        </div>

        {/* Extra info */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-gray-100 rounded-2xl p-5">
            <p className="text-sm font-medium text-gray-900">Education</p>
            <ul className="mt-2 text-sm text-gray-600 list-disc pl-5">
              {doctor.education.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-5">
            <p className="text-sm font-medium text-gray-900">Languages</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {doctor.languages.map((l) => (
                <Chip key={l}>{l}</Chip>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
