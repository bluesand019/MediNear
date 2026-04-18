import { useState, useMemo } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const DOCTORS = [
  {
    id: 1,
    name: "Dr. Fahmida Hossain",
    initials: "FH",
    color: "bg-teal-50 text-teal-800",
    spec: "Cardiologist",
    exp: 14,
    rating: 4.8,
    reviews: 126,
    fee: 800,
    dist: 1.2,
    availableToday: true,
    online: true,
    female: true,
    hospital: "Rajshahi Medical College Hospital",
    slots: ["10:00 AM", "11:30 AM", "3:00 PM"],
  },
  {
    id: 2,
    name: "Dr. Arif Billah",
    initials: "AB",
    color: "bg-blue-50 text-blue-800",
    spec: "Neurologist",
    exp: 10,
    rating: 4.6,
    reviews: 89,
    fee: 1000,
    dist: 2.1,
    availableToday: true,
    online: false,
    female: false,
    hospital: "Popular Diagnostic Centre",
    slots: ["9:30 AM", "2:00 PM"],
  },
  {
    id: 3,
    name: "Dr. Sadia Islam",
    initials: "SI",
    color: "bg-pink-50 text-pink-800",
    spec: "Gynecologist",
    exp: 8,
    rating: 4.9,
    reviews: 203,
    fee: 600,
    dist: 0.8,
    availableToday: true,
    online: true,
    female: true,
    hospital: "Ibn Sina Hospital, Rajshahi",
    slots: ["8:30 AM", "12:00 PM", "4:30 PM"],
  },
  {
    id: 4,
    name: "Dr. Tanvir Ahmed",
    initials: "TA",
    color: "bg-amber-50 text-amber-800",
    spec: "Dentist",
    exp: 6,
    rating: 4.4,
    reviews: 54,
    fee: 400,
    dist: 1.5,
    availableToday: false,
    online: true,
    female: false,
    hospital: "Smilezone Dental Clinic",
    slots: [],
  },
  {
    id: 5,
    name: "Dr. Rubina Khanam",
    initials: "RK",
    color: "bg-green-50 text-green-800",
    spec: "Dermatologist",
    exp: 11,
    rating: 4.7,
    reviews: 98,
    fee: 750,
    dist: 3.2,
    availableToday: true,
    online: false,
    female: true,
    hospital: "Skin & Care Center",
    slots: ["11:00 AM", "5:00 PM"],
  },
  {
    id: 6,
    name: "Dr. Mahbub Alam",
    initials: "MA",
    color: "bg-purple-50 text-purple-800",
    spec: "Pediatrician",
    exp: 17,
    rating: 4.5,
    reviews: 172,
    fee: 500,
    dist: 2.8,
    availableToday: true,
    online: true,
    female: false,
    hospital: "Children Welfare Hospital",
    slots: ["10:30 AM", "1:00 PM", "3:30 PM"],
  },
  {
    id: 7,
    name: "Dr. Nasrin Sultana",
    initials: "NS",
    color: "bg-teal-50 text-teal-800",
    spec: "Orthopedist",
    exp: 9,
    rating: 4.3,
    reviews: 61,
    fee: 900,
    dist: 4.0,
    availableToday: false,
    online: false,
    female: true,
    hospital: "Bone & Joint Hospital",
    slots: [],
  },
  {
    id: 8,
    name: "Dr. Rezaul Karim",
    initials: "RK",
    color: "bg-blue-50 text-blue-800",
    spec: "Cardiologist",
    exp: 20,
    rating: 4.9,
    reviews: 310,
    fee: 1500,
    dist: 5.1,
    availableToday: true,
    online: true,
    female: false,
    hospital: "Heart Foundation Hospital",
    slots: ["9:00 AM", "4:00 PM"],
  },
];

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
      <div className="flex gap-3">
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
          <p className="text-xs text-gray-400">{doctor.exp} years experience</p>

          {/* Meta chips */}
          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <StarRating rating={doctor.rating} />
              <span className="text-gray-900 font-medium">{doctor.rating}</span>
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

        {/* Fee */}
        <div className="text-right flex-shrink-0">
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
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
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
        <div className="flex items-center gap-2 flex-shrink-0 ml-2">
          <button className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
            View profile
          </button>
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
  const [activeSpec, setActiveSpec] = useState("All");
  const [sortBy, setSortBy] = useState("rating");
  const [maxFee, setMaxFee] = useState(2000);
  const [minRating, setMinRating] = useState(0);
  const [filters, setFilters] = useState({
    availableToday: true,
    online: false,
    femaleOnly: false,
  });

  const toggleFilter = (key) =>
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));

  const results = useMemo(() => {
    let list = DOCTORS.filter((d) => {
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
  }, [query, activeSpec, sortBy, maxFee, minRating, filters]);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Top bar ── */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
        <button className="flex items-center gap-1.5 text-xs text-gray-400 border border-gray-100 rounded-lg px-3 py-2 hover:bg-gray-50 transition flex-shrink-0">
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
        </button>

        <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 bg-white focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-100 transition">
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-gray-300 flex-shrink-0"
          >
            <circle cx="6.5" cy="6.5" r="4.5" />
            <path d="M10.5 10.5L14 14" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or specialization…"
            className="flex-1 text-sm text-gray-800 placeholder-gray-300 outline-none bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-gray-300 hover:text-gray-500 text-xs"
            >
              ✕
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-xs text-teal-700 bg-teal-50 border border-teal-200 rounded-full px-3 py-1.5 flex-shrink-0">
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
          Rajshahi
        </div>
      </div>

      {/* ── Specialization pills (horizontal scroll) ── */}
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
      <div className="max-w-6xl mx-auto px-4 py-5 flex gap-5">

        {/* ── Sidebar ── */}
        <aside className="w-56 flex-shrink-0 self-start">
          <div className="bg-white border border-gray-100 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-900">Filters</span>
              <button
                onClick={() => {
                  setFilters({ availableToday: false, online: false, femaleOnly: false });
                  setMaxFee(2000);
                  setMinRating(0);
                  setActiveSpec("All");
                }}
                className="text-xs text-teal-600 hover:text-teal-800 transition"
              >
                Clear all
              </button>
            </div>

            {/* Availability toggles */}
            <div className="mb-5">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
                Availability
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { key: "availableToday", label: "Available today" },
                  { key: "online", label: "Online consult" },
                  { key: "femaleOnly", label: "Female doctors only" },
                ].map(({ key, label }) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{label}</span>
                    <Toggle
                      checked={filters[key]}
                      onChange={() => toggleFilter(key)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Max fee slider */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Max fee
                </p>
                <span className="text-xs font-medium text-gray-700">
                  {maxFee === 2000 ? "Any" : `৳${maxFee}`}
                </span>
              </div>
              <input
                type="range"
                min={200}
                max={2000}
                step={100}
                value={maxFee}
                onChange={(e) => setMaxFee(Number(e.target.value))}
                className="w-full accent-teal-500"
              />
              <div className="flex justify-between text-xs text-gray-300 mt-1">
                <span>৳200</span>
                <span>৳2000</span>
              </div>
            </div>

            {/* Min rating */}
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                Min rating
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { label: "Any", value: 0 },
                  { label: "3+", value: 3 },
                  { label: "4+", value: 4 },
                  { label: "4.5+", value: 4.5 },
                ].map(({ label, value }) => (
                  <button
                    key={value}
                    onClick={() => setMinRating(value)}
                    className={`text-xs py-1.5 rounded-lg border transition-all ${
                      minRating === value
                        ? "bg-teal-50 border-teal-400 text-teal-700 font-medium"
                        : "border-gray-200 text-gray-400 hover:border-gray-300"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* ── Results ── */}
        <div className="flex-1 min-w-0">
          {/* Results header */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-medium text-gray-900">{results.length}</span>{" "}
              doctors near Rajshahi
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              Sort by
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-gray-200 rounded-lg px-2 py-1.5 text-gray-700 outline-none focus:border-teal-400 transition"
              >
                <option value="rating">Highest rated</option>
                <option value="fee">Lowest fee</option>
                <option value="exp">Most experienced</option>
              </select>
            </div>
          </div>

          {/* Cards */}
          {results.length > 0 ? (
            <div className="flex flex-col gap-3">
              {results.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center">
              <p className="text-gray-400 text-sm">
                No doctors match your current filters.
              </p>
              <p className="text-gray-300 text-xs mt-1">
                Try adjusting the specialization or availability settings.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}