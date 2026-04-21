import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

// ─── Data ────────────────────────────────────────────────────────────────────

const HOSPITALS = [
  {
    id: 1,
    name: "Rajshahi Medical College Hospital",
    location: "Rajshahi",
    address: "Medical College Rd, Rajshahi 6000",
    phone: "+880 721-XXXXXX",
    hours: "Open 24 hours",
    emergency: true,
    openNow: true,
    rating: 4.5,
    reviews: 1820,
    dist: 1.6,
    type: "Government",
    departments: [
      "Emergency",
      "Cardiology",
      "Neurology",
      "Orthopedics",
      "Pediatrics",
    ],
    facilities: ["ICU", "Ambulance", "Pharmacy", "Lab", "Parking"],
  },
  {
    id: 2,
    name: "Ibn Sina Hospital, Rajshahi",
    location: "Rajshahi",
    address: "Shaheb Bazar, Rajshahi",
    phone: "+880 17XX-XXXXXX",
    hours: "8:00 AM – 10:00 PM",
    emergency: false,
    openNow: true,
    rating: 4.2,
    reviews: 940,
    dist: 2.3,
    type: "Private",
    departments: ["Medicine", "Gynecology", "Pediatrics", "Dermatology"],
    facilities: ["Pharmacy", "Diagnostic", "Parking", "Lab"],
  },
  {
    id: 3,
    name: "Popular Diagnostic Centre",
    location: "Rajshahi",
    address: "Laxmipur, Rajshahi",
    phone: "+880 17XX-XXXXXX",
    hours: "7:00 AM – 11:00 PM",
    emergency: false,
    openNow: true,
    rating: 4.4,
    reviews: 1210,
    dist: 3.1,
    type: "Diagnostic",
    departments: ["Diagnostics", "Radiology", "Pathology", "Cardiology"],
    facilities: [
      "MRI",
      "CT Scan",
      "Lab",
      "Waiting Lounge",
      "Diagnostic",
      "Parking",
    ],
  },
  {
    id: 4,
    name: "Heart Foundation Hospital",
    location: "Dhaka",
    address: "Mirpur, Dhaka",
    phone: "+880 2-XXXXXXX",
    hours: "Open 24 hours",
    emergency: true,
    openNow: true,
    rating: 4.7,
    reviews: 2650,
    dist: 5.4,
    type: "Specialized",
    departments: ["Cardiology", "Cardiac Surgery", "ICU", "Emergency"],
    facilities: ["ICU", "Cath Lab", "Ambulance", "Pharmacy", "Lab", "Parking"],
  },
  {
    id: 5,
    name: "Children Welfare Hospital",
    location: "Rajshahi",
    address: "Kazla, Rajshahi",
    phone: "+880 17XX-XXXXXX",
    hours: "Open 24 hours",
    emergency: true,
    openNow: false,
    rating: 4.3,
    reviews: 780,
    dist: 4.0,
    type: "Specialized",
    departments: ["Pediatrics", "Neonatal", "Emergency"],
    facilities: ["NICU", "Ambulance", "Pharmacy", "Parking", "Lab"],
  },
];

const LOCATIONS = ["All", "Rajshahi", "Dhaka"];

const FACILITY_PILLS = [
  "All",
  "ICU",
  "NICU",
  "Ambulance",
  "Pharmacy",
  "Lab",
  "Diagnostic",
  "MRI",
  "CT Scan",
  "Parking",
];

// ─── UI helpers ──────────────────────────────────────────────────────────────

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

function FacilityChip({ children }) {
  return (
    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
      {children}
    </span>
  );
}

function HospitalCard({ hospital }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 hover:border-teal-200 hover:shadow-sm transition-all duration-150 cursor-pointer">
      {/* Top row */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-gray-900 truncate">
              {hospital.name}
            </span>

            {hospital.emergency && (
              <span className="text-xs px-2 py-0.5 bg-teal-50 text-teal-700 rounded-full">
                24/7 Emergency
              </span>
            )}

            {hospital.openNow ? (
              <span className="text-xs px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full">
                Open now
              </span>
            ) : (
              <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-400 rounded-full">
                Closed
              </span>
            )}

            <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full">
              {hospital.type}
            </span>
          </div>

          <p className="text-xs font-medium text-teal-600 mt-0.5">
            {hospital.location}
          </p>

          <p className="text-xs text-gray-400 mt-0.5 truncate">
            {hospital.address}
          </p>

          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <StarRating rating={hospital.rating} />
              <span className="text-gray-900 font-medium">
                {hospital.rating}
              </span>
              <span className="text-gray-300">({hospital.reviews})</span>
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
              {hospital.dist} km
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
                <path d="M8 4v4l2.5 1.5" />
                <circle cx="8" cy="8" r="6" />
              </svg>
              {hospital.hours}
            </span>
          </div>

          {/* Departments preview (optional) */}
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            {hospital.departments.slice(0, 4).map((d) => (
              <span
                key={d}
                className="text-xs px-2.5 py-1 rounded-lg bg-teal-50 text-teal-700 border border-teal-200"
              >
                {d}
              </span>
            ))}
            {hospital.departments.length > 4 && (
              <span className="text-xs px-2.5 py-1 rounded-lg border border-gray-100 text-gray-400">
                + more
              </span>
            )}
          </div>

          {/* Facilities */}
          <div className="mt-2 flex flex-wrap gap-2">
            {hospital.facilities.slice(0, 6).map((f) => (
              <FacilityChip key={f}>{f}</FacilityChip>
            ))}
          </div>
        </div>

        {/* Right actions */}
        <div className="flex flex-col items-end flex-shrink-0">
          <a
            href={`tel:${hospital.phone}`}
            className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
          >
            Call
          </a>
          <Link
            to={`/hospital/${hospital.id}`}
            className="mt-2 text-xs px-3 py-1.5 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-700 active:scale-95 transition-all no-underline"
          >
            View details
          </Link>
        </div>
      </div>

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
            <path d="M2.5 6.5h11" />
            <path d="M4.5 3.5h7" />
            <path d="M3.5 13h9" />
            <path d="M2.5 6.5v6c0 .8.7 1.5 1.5 1.5h8c.8 0 1.5-.7 1.5-1.5v-6" />
          </svg>
          <span className="truncate">{hospital.phone}</span>
        </span>

        <span className="text-xs text-gray-300 truncate ml-3">
          {hospital.address}
        </span>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function HospitalDetail() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("Rajshahi"); // change to "All" if you prefer
  const [activeFacility, setActiveFacility] = useState("All");
  const [sortBy, setSortBy] = useState("rating");
  const [minRating, setMinRating] = useState(0);

  const [filters, setFilters] = useState({
    emergencyOnly: false,
    openNow: false,
    onlyGovernment: false,
    onlyPrivate: false,
    onlyDiagnostic: false,
    onlySpecialized: false,
  });

  const toggleFilter = (key) =>
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));

  const results = useMemo(() => {
    let list = HOSPITALS.filter((h) => {
      // Location filter
      if (location !== "All" && h.location !== location) return false;

      // Top pills: facility
      if (activeFacility !== "All" && !h.facilities.includes(activeFacility))
        return false;

      // Sidebar filters (NO facilities here)
      if (filters.emergencyOnly && !h.emergency) return false;
      if (filters.openNow && !h.openNow) return false;

      if (filters.onlyGovernment && h.type !== "Government") return false;
      if (filters.onlyPrivate && h.type !== "Private") return false;
      if (filters.onlyDiagnostic && h.type !== "Diagnostic") return false;
      if (filters.onlySpecialized && h.type !== "Specialized") return false;

      if (h.rating < minRating) return false;

      // Search
      if (
        query &&
        !h.name.toLowerCase().includes(query.toLowerCase()) &&
        !h.location.toLowerCase().includes(query.toLowerCase()) &&
        !h.departments.some((d) =>
          d.toLowerCase().includes(query.toLowerCase()),
        ) &&
        !h.facilities.some((f) => f.toLowerCase().includes(query.toLowerCase()))
      )
        return false;

      return true;
    });

    // Sorting
    if (sortBy === "rating") list.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "distance") list.sort((a, b) => a.dist - b.dist);
    else if (sortBy === "reviews") list.sort((a, b) => b.reviews - a.reviews);

    return list;
  }, [query, location, activeFacility, sortBy, minRating, filters]);

  const clearAll = () => {
    setFilters({
      emergencyOnly: false,
      openNow: false,
      onlyGovernment: false,
      onlyPrivate: false,
      onlyDiagnostic: false,
      onlySpecialized: false,
    });
    setMinRating(0);
    setActiveFacility("All");
    setSortBy("rating");
    setQuery("");
    // keep location as-is (so user doesn't lose it)
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Top bar ── */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
        {/* Home link FIXED */}
        <Link
          to="/"
          className="flex items-center gap-1.5 text-xs text-gray-400 border border-gray-100 rounded-lg px-3 py-2 hover:bg-gray-50 transition flex-shrink-0 no-underline"
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

        {/* Search */}
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
            placeholder="Search by hospital, location, facility…"
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

        {/* Location select FIXED + filters results */}
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

          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-transparent outline-none text-teal-700 text-xs font-medium pr-1"
          >
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Facility pills (horizontal scroll) ── */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {FACILITY_PILLS.map((pill) => (
          <button
            key={pill}
            onClick={() => setActiveFacility(pill)}
            className={`flex-shrink-0 text-xs px-4 py-1.5 rounded-full border transition-all ${
              activeFacility === pill
                ? "bg-teal-600 text-white border-teal-600 font-medium"
                : "border-gray-200 text-gray-500 hover:border-teal-300 hover:text-teal-700"
            }`}
          >
            {pill}
          </button>
        ))}
      </div>

      {/* ── Body ── */}
      <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col lg:flex-row gap-5">
        {/* ── Sidebar ── */}
        <aside className="w-full lg:w-56 flex-shrink-0 self-start">
          <div className="bg-white border border-gray-100 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-900">Filters</span>
              <button
                onClick={clearAll}
                className="text-xs text-teal-600 hover:text-teal-800 transition"
              >
                Clear all
              </button>
            </div>

            {/* Availability */}
            <div className="mb-5">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
                Availability
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { key: "emergencyOnly", label: "24/7 Emergency only" },
                  { key: "openNow", label: "Open now" },
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

            {/* Type */}
            <div className="mb-5">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
                Type
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { key: "onlyGovernment", label: "Government" },
                  { key: "onlyPrivate", label: "Private" },
                  { key: "onlyDiagnostic", label: "Diagnostic" },
                  { key: "onlySpecialized", label: "Specialized" },
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

              <p className="mt-2 text-[11px] text-gray-300 leading-relaxed">
                Note: multiple type toggles currently behave like AND (must
                match all). If you want OR behavior, tell me and I’ll adjust it.
              </p>
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
              <span className="font-medium text-gray-900">
                {results.length}
              </span>{" "}
              hospitals {location === "All" ? "" : `near ${location}`}
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              Sort by
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-gray-200 rounded-lg px-2 py-1.5 text-gray-700 outline-none focus:border-teal-400 transition"
              >
                <option value="rating">Highest rated</option>
                <option value="distance">Nearest</option>
                <option value="reviews">Most reviewed</option>
              </select>
            </div>
          </div>

          {/* Cards */}
          {results.length > 0 ? (
            <div className="flex flex-col gap-3">
              {results.map((hospital) => (
                <HospitalCard key={hospital.id} hospital={hospital} />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center">
              <p className="text-gray-400 text-sm">
                No hospitals match your current filters.
              </p>
              <p className="text-gray-300 text-xs mt-1">
                Try adjusting the facility pills, location, or sidebar filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
