import { Link } from "react-router-dom";

export default function About() {
  const highlights = [
    {
      title: "Search fast",
      desc: "Find doctors, hospitals, and diagnostic services quickly using search + filters.",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="7" cy="7" r="4.5" />
          <path d="M10.5 10.5L14 14" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: "Compare easily",
      desc: "Compare by rating, distance, price/fee, availability, and verification status.",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M2.5 12.5V6.5" strokeLinecap="round" />
          <path d="M6.5 12.5V3.5" strokeLinecap="round" />
          <path d="M10.5 12.5V8.5" strokeLinecap="round" />
          <path d="M14 12.5V5.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: "Take action",
      desc: "Open details pages, call providers, and (soon) book appointments.",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M6.5 9.5l2-2" strokeLinecap="round" />
          <path d="M7.5 2.5h1A4 4 0 0 1 12.5 6.5v1" strokeLinecap="round" />
          <path d="M6.5 13.5h-1A4 4 0 0 1 2.5 9.5v-1" strokeLinecap="round" />
          <path d="M10.5 10.5l3 3" strokeLinecap="round" />
          <path d="M13.5 10.5l-3 3" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  const steps = [
    {
      n: "01",
      title: "Choose a category",
      desc: "Start with Doctors, Hospitals, or Services depending on what you need.",
    },
    {
      n: "02",
      title: "Filter & search",
      desc: "Narrow results by city, rating, price/fee, and availability toggles.",
    },
    {
      n: "03",
      title: "Open details",
      desc: "View provider information, call instantly, and soon book appointments.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white/80 backdrop-blur border-b border-gray-100 px-4 py-3 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
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

      <div className="px-4 pt-8 pb-6">
        <div className="max-w-6xl mx-auto">
          <div className="cursor-pointer relative overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-br from-teal-600 via-emerald-600 to-teal-700 text-white">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/20 blur-2xl" />
              <div className="absolute -bottom-28 -left-28 w-72 h-72 rounded-full bg-white/20 blur-2xl" />
            </div>

            <div className="relative p-7 sm:p-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs">
                <span className="w-2 h-2 rounded-full bg-white/80" />
                Healthcare discovery, simplified
              </div>

              <h1 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight">
                Find the right healthcare provider near you — faster.
              </h1>

              <p className="mt-3 text-sm sm:text-base text-white/85 leading-relaxed max-w-2xl">
                MediNear helps you browse doctors, hospitals, and diagnostic
                services, then quickly narrow results using filters like city,
                availability, rating, and pricing.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/doctor-search"
                  className="text-sm px-4 py-2.5 rounded-xl bg-white text-teal-700 font-medium hover:bg-white/90 transition no-underline text-center"
                >
                  Browse doctors
                </Link>
                <Link
                  to="/hospital-detail"
                  className="text-sm px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white font-medium hover:bg-white/15 transition no-underline text-center"
                >
                  Browse hospitals
                </Link>
                <Link
                  to="/service-search"
                  className="text-sm px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white font-medium hover:bg-white/15 transition no-underline text-center"
                >
                  Browse services
                </Link>
              </div>

              <p className="mt-5 text-xs text-white/70 leading-relaxed max-w-2xl">
                Note: Information shown may be sample/demo data. Always verify
                medical information directly with the provider.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          {highlights.map((h) => (
            <div
              key={h.title}
              className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-sm transition-shadow"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 border border-teal-100 flex items-center justify-center">
                {h.icon}
              </div>
              <p className="mt-3 text-sm font-medium text-gray-900">
                {h.title}
              </p>
              <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                {h.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 pb-6">
        <div className="max-w-6xl mx-auto bg-white border border-gray-100 rounded-3xl p-6 sm:p-8">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <p className="text-sm font-medium text-gray-900">How it works</p>
              <p className="text-sm text-gray-600 mt-1">
                A simple flow designed to get you to the right option quickly.
              </p>
            </div>

            <Link
              to="/service-search"
              className="text-xs px-3 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition no-underline"
            >
              Try it now →
            </Link>
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            {steps.map((s) => (
              <div
                key={s.n}
                className="rounded-2xl border border-gray-100 p-5 bg-gradient-to-b from-white to-gray-50"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-teal-700 bg-teal-50 border border-teal-100 px-2.5 py-1 rounded-full">
                    {s.n}
                  </span>
                  <p className="text-sm font-medium text-gray-900">{s.title}</p>
                </div>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 pb-10">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-gray-900">
                Ready to explore providers near you?
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Use MediNear’s search and filters to find what fits your needs.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/doctor-search"
                className="text-sm px-4 py-2.5 rounded-xl bg-teal-600 text-white font-medium hover:bg-teal-700 active:scale-95 transition-all no-underline text-center"
              >
                Get started
              </Link>
              <Link
                to="/contact"
                className="text-sm px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition no-underline text-center"
              >
                Contact us
              </Link>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-gray-400">
            © 2026 MediNear. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
