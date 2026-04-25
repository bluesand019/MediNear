import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { DOCTORS } from "../data/doctors";

// ─── Data ────────────────────────────────────────────────────────────────────

const SPECIALIZATIONS = [
  "All",
  "Cardiologist",
  "Neurologist",
  "Dentist",
  "Dermatologist",
  "Gynecologist",
  "Pediatrician",
  "Orthopedist",
];

const LOCATIONS = ["All", "Rajshahi", "Dhaka"];

// ─── Sub-components ──────────────────────────────────────────────────────────

function StarRating({ rating }) {
  return (
    <span className="flex items-center gap-0.5 text-amber-500 text-xs">
      {"★".repeat(Math.floor(rating))}
      {rating % 1 >= 0.5 ? "½" : ""}
    </span>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative w-9 h-5 rounded-full transition-colors duration-200 focus:outline-none flex-shrink-0 ${
        checked ? "bg-teal-500" : "bg-gray-200"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
          checked ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  );
}

function DoctorCard({ doctor }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 hover:border-teal-200 hover:shadow-sm transition-all duration-150 cursor-pointer">
      {/* Top row */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex gap-3 min-w-0">
          {/* Avatar */}
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center font-medium text-sm flex-shrink-0 ${doctor.color}`}
          >
            {doctor.initials}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-sm font-medium text-gray-900">
                {doctor.name}
              </span>
              {/* verified */}
              <span className="w-4 h-4 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 10 10"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <path d="M2 5l2.5 2.5L8 3" />
                </svg>
              </span>
              {doctor.female && (
                <span className="text-xs px-2 py-0.5 bg-pink-50 text-pink-700 rounded-full">
                  Female
                </span>
              )}
              {doctor.online && (
                <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full">
                  Online
                </span>
              )}
            </div>

            <p className="text-xs font-medium text-teal-600 mt-0.5">
              {doctor.spec}
            </p>
            <p className="text-xs text-gray-400">
              {doctor.exp} years experience
            </p>

            {/* Meta chips */}
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <StarRating rating={doctor.rating} />
                <span className="text-gray-900 font-medium">
                  {doctor.rating}
                </span>
                <span className="text-gray-300">({doctor.reviews})</span>
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M8 1.5C5.5 1.5 3.5 3.5 3.5 6C3.5 9.5 8 14.5 8 14.5C8 14.5 12.5 9.5 12.5 6C12.5 3.5 10.5 1.5 8 1.5Z" />
                  <circle cx="8" cy="6" r="1.5" />
                </svg>
                {doctor.dist} km
              </span>

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
          </div>
        </div>

        {/* Fee */}
        <div className="text-left sm:text-right flex-shrink-0">
          <p className="text-sm font-medium text-gray-900">৳{doctor.fee}</p>
          <p className="text-xs text-gray-400">per visit</p>
        </div>
      </div>

      {/* Slots */}
      {doctor.slots.length > 0 ? (
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          {doctor.slots.map((slot) => (
            <span
              key={slot}
              className="text-xs px-2.5 py-1 rounded-lg bg-teal-50 text-teal-700 border border-teal-200"
            >
              {slot}
            </span>
          ))}
          <span className="text-xs px-2.5 py-1 rounded-lg border border-gray-100 text-gray-400">
            + more
          </span>
        </div>
      ) : (
        <p className="mt-3 text-xs text-gray-300">
          No slots today — check tomorrow
        </p>
      )}

      {/* Bottom row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3 pt-3 border-t border-gray-50 gap-3">
        <span className="flex items-center gap-1.5 text-xs text-gray-400 min-w-0">
          <svg
            width="11"
            height="11"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            className="flex-shrink-0"
          >
            <rect x="2" y="4" width="12" height="10" rx="1" />
            <path d="M5 14V9h2.5v5M8.5 14V9H11v5M5 4V2h6v2" />
          </svg>
          <span className="truncate">{doctor.hospital}</span>
        </span>
        <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
          <Link
            to={`/doctor/${doctor.id}`}
            className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors no-underline"
          >
            View profile
          </Link>
          <button className="text-xs px-3 py-1.5 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-700 active:scale-95 transition-all">
            {doctor.availableToday ? "Book now" : "Check schedule"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function DoctorsPage() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("Rajshahi");
  const [activeSpec, setActiveSpec] = useState("All");
  const [sortBy, setSortBy] = useState("rating");
  const [maxFee, setMaxFee] = useState(2000);
  const [minRating, setMinRating] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // New state for collapse
  
  const [filters, setFilters] = useState({
    availableToday: true,
    online: false,
    femaleOnly: false,
  });

  const toggleFilter = (key) =>
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));

  const results = useMemo(() => {
    let list = DOCTORS.filter((d) => {
      if (location !== "All" && d.location !== location) return false;
      if (activeSpec !== "All" && d.spec !== activeSpec) return false;
      if (filters.availableToday && !d.availableToday) return false;
      if (filters.online && !d.online) return false;
      if (filters.femaleOnly && !d.female) return false;
      if (d.fee > maxFee) return false;
      if (d.rating < minRating) return false;
      if (
        query &&
        !d.name.toLowerCase().includes(query.toLowerCase()) &&
        !d.spec.toLowerCase().includes(query.toLowerCase())
      )
        return false;
      return true;
    });

    if (sortBy === "rating") list.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "fee") list.sort((a, b) => a.fee - b.fee);
    else if (sortBy === "exp") list.sort((a, b) => b.exp - a.exp);

    return list;
  }, [query, location, activeSpec, sortBy, maxFee, minRating, filters]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-0">
      {/* ── Top bar ── */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3 sticky top-0 z-30">
        <Link
          to="/"
          className="flex items-center gap-1.5 text-xs text-gray-400 border border-gray-100 rounded-lg px-3 py-2 hover:bg-gray-50 transition flex-shrink-0 no-underline"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M8 2L4 6l4 4" />
          </svg>
          Home
        </Link>

        <div className="w-full sm:flex-1 min-w-0 flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 bg-white focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-100 transition">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-300 flex-shrink-0">
            <circle cx="6.5" cy="6.5" r="4.5" />
            <path d="M10.5 10.5L14 14" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or specialization…"
            className="flex-1 min-w-0 text-sm text-gray-800 placeholder-gray-300 outline-none bg-transparent"
          />
        </div>

        {/* Mobile Filter Toggle (Visible only on mobile/tablet) */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden flex items-center justify-center gap-2 px-4 py-2 bg-teal-50 text-teal-700 rounded-xl text-sm font-medium border border-teal-100"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h10M4 18h7" />
          </svg>
          Filters
        </button>
      </div>

      {/* ── Specialization pills ── */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {SPECIALIZATIONS.map((spec) => (
          <button
            key={spec}
            onClick={() => setActiveSpec(spec)}
            className={`flex-shrink-0 text-xs px-4 py-1.5 rounded-full border transition-all ${
              activeSpec === spec
                ? "bg-teal-600 text-white border-teal-600 font-medium"
                : "border-gray-200 text-gray-500 hover:border-teal-300 hover:text-teal-700"
            }`}
          >
            {spec}
          </button>
        ))}
      </div>

      {/* ── Body ── */}
      <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col lg:flex-row gap-5 relative">
        
        {/* ── Collapsible Sidebar ── */}
        <aside className={`
          fixed inset-y-0 left-0 z-40 w-72 bg-white p-6 transform transition-transform duration-300 ease-in-out border-r border-gray-100
          lg:relative lg:translate-x-0 lg:z-0 lg:w-56 lg:p-0 lg:bg-transparent lg:border-none
          ${isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"}
        `}>
          <div className="bg-white lg:border lg:border-gray-100 lg:rounded-2xl lg:p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-gray-900 lg:font-medium">Filters</span>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden text-gray-400 p-1"
              >
                ✕
              </button>
              <button
                onClick={() => {
                  setFilters({ availableToday: false, online: false, femaleOnly: false });
                  setMaxFee(2000);
                  setMinRating(0);
                  setActiveSpec("All");
                  setQuery("");
                }}
                className="hidden lg:block text-xs text-teal-600 hover:text-teal-800 transition"
              >
                Clear all
              </button>
            </div>

            {/* Filter Content (Reuse your existing filter UI here) */}
            <div className="space-y-6">
              {/* Availability */}
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Availability</p>
                <div className="flex flex-col gap-3">
                  {[{ key: "availableToday", label: "Available today" }, { key: "online", label: "Online consult" }, { key: "femaleOnly", label: "Female doctors" }].map(({ key, label }) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{label}</span>
                      <Toggle checked={filters[key]} onChange={() => toggleFilter(key)} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Fee Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Max fee</p>
                  <span className="text-xs font-bold text-teal-600">৳{maxFee}</span>
                </div>
                <input type="range" min={200} max={2000} step={100} value={maxFee} onChange={(e) => setMaxFee(Number(e.target.value))} className="w-full accent-teal-500" />
              </div>

              {/* Rating */}
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Min rating</p>
                <div className="grid grid-cols-2 gap-2">
                  {[0, 3, 4, 4.5].map((val) => (
                    <button key={val} onClick={() => setMinRating(val)} className={`text-xs py-2 rounded-lg border transition-all ${minRating === val ? "bg-teal-50 border-teal-400 text-teal-700 font-bold" : "border-gray-100 text-gray-400"}`}>
                      {val === 0 ? "Any" : `${val}+`}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="w-full lg:hidden bg-teal-600 text-white py-3 rounded-xl font-medium mt-4"
              >
                Show {results.length} Results
              </button>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* ── Results ── */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium text-gray-900">{results.length}</span> doctors
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              Sort by
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-gray-200 rounded-lg px-2 py-1.5 text-gray-700 outline-none bg-white"
              >
                <option value="rating">Highest rated</option>
                <option value="fee">Lowest fee</option>
                <option value="exp">Experience</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {results.length > 0 ? (
              results.map((doctor) => <DoctorCard key={doctor.id} doctor={doctor} />)
            ) : (
              <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center text-gray-400">
                No doctors match your filters.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
