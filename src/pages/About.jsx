import { Link } from "react-router-dom";

export default function About() {
  const highlights = [
    {
      title: "Search fast",
      desc: "Find doctors, hospitals, and diagnostic services quickly using search + filters.",
    },
    {
      title: "Compare easily",
      desc: "Compare by rating, distance, price/fee, availability, and verification status.",
    },
    {
      title: "Take action",
      desc: "Open details pages, call providers, and (soon) book appointments.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          <Link
            to="/"
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
            Home
          </Link>

          <span className="text-sm font-medium text-gray-900">
            About MediNear
          </span>

          <Link
            to="/contact"
            className="text-xs text-teal-600 hover:text-teal-800 font-medium no-underline"
          >
            Contact
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
            MediNear helps you find healthcare providers and services near you.
          </h1>

          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            MediNear is a simple healthcare discovery app where you can browse
            doctors, hospitals, and diagnostic/service providers and quickly
            narrow results using filters like city, availability, and rating.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-xs px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
              Doctors
            </span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
              Hospitals
            </span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
              Diagnostics & Services
            </span>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              to="/doctor-search"
              className="text-xs px-3 py-2 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-700 active:scale-95 transition-all no-underline"
            >
              Browse doctors
            </Link>
            <Link
              to="/hospital-detail"
              className="text-xs px-3 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition no-underline"
            >
              Browse hospitals
            </Link>
            <Link
              to="/service-search"
              className="text-xs px-3 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition no-underline"
            >
              Browse services
            </Link>
          </div>

          <p className="mt-4 text-xs text-gray-400 leading-relaxed">
            Note: Information shown in this app may be sample/demo data. Always
            verify medical information directly with the provider.
          </p>
        </div>

        {/* Highlights */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          {highlights.map((h) => (
            <div
              key={h.title}
              className="bg-white border border-gray-100 rounded-2xl p-5"
            >
              <p className="text-sm font-medium text-gray-900">{h.title}</p>
              <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                {h.desc}
              </p>
            </div>
          ))}
        </div>

        {/* How to use */}
        <div className="mt-5 bg-white border border-gray-100 rounded-2xl p-6">
          <p className="text-sm font-medium text-gray-900">How to use</p>
          <ol className="mt-3 space-y-2 text-sm text-gray-600 list-decimal pl-5">
            <li>Go to Doctors, Hospitals, or Services.</li>
            <li>Use search + filters (city, rating, open now, etc.).</li>
            <li>
              Open “View details” to see more information or call a provider.
            </li>
          </ol>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-400">© 2026 MediNear All Rights Reserved</div>
      </div>
    </div>
  );
}
