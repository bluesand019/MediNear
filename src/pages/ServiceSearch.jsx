import { useState, useMemo } from "react";
import { Link } from "react-router-dom";

// ─── Data ────────────────────────────────────────────────────────────────────

const SERVICE_CATEGORIES = [
  "All",
  "Blood test",
  "X-ray",
  "MRI / CT scan",
  "Ultrasound",
  "ECG",
  "Pathology",
  "Endoscopy",
  "Vaccination",
];

const LOCATIONS = ["All", "Rajshahi", "Dhaka"];

const SERVICES = [
  {
    id: 1,
    hospital: "Rajshahi Medical College Hospital",
    initials: "RM",
    color: "bg-teal-50 text-teal-800",
    type: "Government hospital",
    dist: 1.2,
    rating: 4.7,
    reviews: 312,
    openNow: true,
    verified: true,
    services: [
      {
        name: "Complete blood count (CBC)",
        category: "Blood test",
        price: 250,
        available: true,
      },
      {
        name: "Blood glucose (fasting)",
        category: "Blood test",
        price: 120,
        available: true,
      },
      { name: "Chest X-ray", category: "X-ray", price: 300, available: true },
      { name: "ECG (12-lead)", category: "ECG", price: 350, available: false },
    ],
    slots: ["8:00 AM", "10:30 AM", "2:00 PM"],
    address: "Rajshahi Sadar, Rajshahi",
    location: "Rajshahi",
  },
  {
    id: 2,
    hospital: "Popular Diagnostic Centre",
    initials: "PD",
    color: "bg-blue-50 text-blue-800",
    type: "Diagnostic center",
    dist: 0.8,
    rating: 4.8,
    reviews: 198,
    openNow: true,
    verified: true,
    services: [
      {
        name: "MRI brain (without contrast)",
        category: "MRI / CT scan",
        price: 4500,
        available: true,
      },
      {
        name: "CT scan (abdomen)",
        category: "MRI / CT scan",
        price: 3800,
        available: true,
      },
      {
        name: "Ultrasound (abdomen)",
        category: "Ultrasound",
        price: 900,
        available: true,
      },
      {
        name: "Lipid profile",
        category: "Blood test",
        price: 450,
        available: true,
      },
    ],
    slots: ["9:00 AM", "11:00 AM", "3:30 PM"],
    address: "Shaheb Bazar, Rajshahi",
    location: "Rajshahi",
  },
  {
    id: 3,
    hospital: "Ibn Sina Diagnostic Centre",
    initials: "IS",
    color: "bg-purple-50 text-purple-800",
    type: "Diagnostic center",
    dist: 2.1,
    rating: 4.6,
    reviews: 141,
    openNow: true,
    verified: true,
    services: [
      {
        name: "Thyroid function test (TFT)",
        category: "Blood test",
        price: 700,
        available: true,
      },
      { name: "HbA1c", category: "Blood test", price: 550, available: true },
      {
        name: "X-ray (lumbar spine)",
        category: "X-ray",
        price: 400,
        available: true,
      },
      {
        name: "Echocardiogram",
        category: "Ultrasound",
        price: 2200,
        available: false,
      },
    ],
    slots: ["8:30 AM", "12:00 PM"],
    address: "Uposhohor, Rajshahi",
    location: "Rajshahi",
  },
  {
    id: 4,
    hospital: "Rajshahi Labs & Pathology",
    initials: "RL",
    color: "bg-amber-50 text-amber-800",
    type: "Pathology lab",
    dist: 1.5,
    rating: 4.4,
    reviews: 87,
    openNow: false,
    verified: true,
    services: [
      {
        name: "Urine routine examination",
        category: "Pathology",
        price: 150,
        available: true,
      },
      {
        name: "Stool routine examination",
        category: "Pathology",
        price: 180,
        available: true,
      },
      {
        name: "Hepatitis B surface antigen",
        category: "Pathology",
        price: 600,
        available: true,
      },
      {
        name: "COVID-19 PCR test",
        category: "Pathology",
        price: 1200,
        available: false,
      },
    ],
    slots: [],
    address: "Kazla, Rajshahi",
    location: "Rajshahi",
  },
  {
    id: 5,
    hospital: "Prime Health Imaging",
    initials: "PH",
    color: "bg-green-50 text-green-800",
    type: "Imaging center",
    dist: 3.4,
    rating: 4.9,
    reviews: 224,
    openNow: true,
    verified: true,
    services: [
      {
        name: "MRI knee (without contrast)",
        category: "MRI / CT scan",
        price: 5000,
        available: true,
      },
      {
        name: "CT scan (chest)",
        category: "MRI / CT scan",
        price: 4200,
        available: true,
      },
      {
        name: "Whole abdomen ultrasound",
        category: "Ultrasound",
        price: 1100,
        available: true,
      },
      { name: "Mammography", category: "X-ray", price: 1800, available: true },
    ],
    slots: ["9:30 AM", "1:00 PM", "4:00 PM"],
    address: "Binodpur, Rajshahi",
    location: "Rajshahi",
  },
  {
    id: 6,
    hospital: "City Heart & Diagnostic",
    initials: "CH",
    color: "bg-pink-50 text-pink-800",
    type: "Specialty clinic",
    dist: 2.7,
    rating: 4.5,
    reviews: 105,
    openNow: true,
    verified: false,
    services: [
      { name: "ECG (resting)", category: "ECG", price: 280, available: true },
      {
        name: "Stress ECG (treadmill test)",
        category: "ECG",
        price: 1500,
        available: true,
      },
      {
        name: "Holter monitoring (24h)",
        category: "ECG",
        price: 3500,
        available: false,
      },
      {
        name: "Fasting blood sugar",
        category: "Blood test",
        price: 100,
        available: true,
      },
    ],
    slots: ["10:00 AM", "2:30 PM"],
    address: "Motihar, Rajshahi",
    location: "Rajshahi",
  },

  // Add one Dhaka provider so the city filter is obviously working
  {
    id: 7,
    hospital: "Dhaka Diagnostic Hub",
    initials: "DD",
    color: "bg-indigo-50 text-indigo-800",
    type: "Diagnostic center",
    dist: 4.9,
    rating: 4.6,
    reviews: 160,
    openNow: true,
    verified: true,
    services: [
      { name: "CBC", category: "Blood test", price: 300, available: true },
      { name: "Chest X-ray", category: "X-ray", price: 350, available: true },
      {
        name: "CT scan (head)",
        category: "MRI / CT scan",
        price: 4000,
        available: true,
      },
    ],
    slots: ["9:00 AM", "1:30 PM", "6:00 PM"],
    address: "Mirpur, Dhaka",
    location: "Dhaka",
  },
];

const SORT_OPTIONS = [
  { value: "distance", label: "Nearest first" },
  { value: "rating", label: "Highest rated" },
  { value: "price_asc", label: "Lowest price" },
  { value: "price_desc", label: "Highest price" },
];

const CATEGORY_ICONS = {
  "Blood test": (
    <svg
      width="16"
      height="16"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <path d="M6 2v7l-2 4h10l-2-4V2" />
      <path d="M6 2h6" />
    </svg>
  ),
  "X-ray": (
    <svg
      width="16"
      height="16"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <rect x="3" y="2" width="12" height="14" rx="2" />
      <path d="M6 6h6M6 9h6M6 12h4" />
    </svg>
  ),
  "MRI / CT scan": (
    <svg
      width="16"
      height="16"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <ellipse cx="9" cy="9" rx="6" ry="4" />
      <path d="M3 9c0 3 2.7 5 6 5s6-2 6-5" />
    </svg>
  ),
  Ultrasound: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <path d="M4 9 Q6 5 9 9 Q12 13 14 9" strokeLinecap="round" />
    </svg>
  ),
  ECG: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <path
        d="M2 9h3l2-4 3 8 2-4h4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Pathology: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <circle cx="9" cy="10" r="4" />
      <path d="M9 6V3M7 3h4" />
    </svg>
  ),
  Endoscopy: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <circle cx="9" cy="9" r="3" />
      <path d="M12 9h4M9 12v4" />
    </svg>
  ),
  Vaccination: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <path d="M11 3l4 4-8 8-4-4 8-8z" />
      <path d="M14 6l1 1M3 15l2-2" />
    </svg>
  ),
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative w-9 h-5 rounded-full transition-colors duration-200 flex-shrink-0 ${
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

function ServiceBadge({ category }) {
  const colors = {
    "Blood test": "bg-teal-50 text-teal-700",
    "X-ray": "bg-blue-50 text-blue-700",
    "MRI / CT scan": "bg-amber-50 text-amber-700",
    Ultrasound: "bg-purple-50 text-purple-700",
    ECG: "bg-pink-50 text-pink-700",
    Pathology: "bg-green-50 text-green-700",
    Endoscopy: "bg-orange-50 text-orange-700",
    Vaccination: "bg-indigo-50 text-indigo-700",
  };
  return (
    <span
      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
        colors[category] || "bg-gray-100 text-gray-500"
      }`}
    >
      {category}
    </span>
  );
}

function ServiceRow({ service }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2.5 border-b border-gray-50 last:border-0 gap-3">
      <div className="flex items-center gap-2 min-w-0">
        <span
          className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
            service.available ? "bg-teal-400" : "bg-gray-200"
          }`}
        />
        <span
          className={`text-sm truncate ${
            service.available ? "text-gray-700" : "text-gray-400 line-through"
          }`}
        >
          {service.name}
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
        <ServiceBadge category={service.category} />
        <span
          className={`text-sm font-medium w-16 text-right ${
            service.available ? "text-gray-900" : "text-gray-300"
          }`}
        >
          ৳{service.price.toLocaleString()}
        </span>
        <button
          disabled={!service.available}
          className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
            service.available
              ? "bg-teal-600 text-white hover:bg-teal-700 active:scale-95"
              : "bg-gray-100 text-gray-300 cursor-not-allowed"
          }`}
        >
          {service.available ? "Book" : "Unavailable"}
        </button>
      </div>
    </div>
  );
}

function HospitalCard({ hospital, activeCategory }) {
  const [expanded, setExpanded] = useState(false);

  const visibleServices =
    activeCategory === "All"
      ? hospital.services
      : hospital.services.filter((s) => s.category === activeCategory);

  const lowestPrice =
    visibleServices.length > 0
      ? Math.min(...visibleServices.map((s) => s.price))
      : null;

  if (visibleServices.length === 0) return null;

  const shown = expanded ? visibleServices : visibleServices.slice(0, 3);

  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-teal-200 hover:shadow-sm transition-all duration-150">
      {/* Card header */}
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center font-medium text-sm flex-shrink-0 ${hospital.color}`}
          >
            {hospital.initials}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-sm font-medium text-gray-900">
                {hospital.hospital}
              </span>
              {hospital.verified && (
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
              )}
              <span className="text-xs text-gray-400">{hospital.type}</span>
            </div>

            <div className="flex items-center gap-3 mt-1.5 flex-wrap">
              {/* Rating */}
              <span className="flex items-center gap-1 text-xs">
                <span className="text-amber-400">★</span>
                <span className="font-medium text-gray-800">
                  {hospital.rating}
                </span>
                <span className="text-gray-300">({hospital.reviews})</span>
              </span>
              {/* Distance */}
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
              {/* Open/Closed */}
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  hospital.openNow
                    ? "bg-teal-50 text-teal-700"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {hospital.openNow ? "Open now" : "Closed"}
              </span>
            </div>

            <p className="text-xs text-gray-300 mt-1">{hospital.address}</p>
          </div>

          {/* Price + CTA */}
          <div className="text-right flex-shrink-0">
            {lowestPrice !== null && (
              <>
                <p className="text-xs text-gray-400">from</p>
                <p className="text-sm font-medium text-gray-900">
                  ৳{lowestPrice.toLocaleString()}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Slots */}
        {hospital.slots.length > 0 && (
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <span className="text-xs text-gray-400 flex-shrink-0">Today:</span>
            {hospital.slots.map((slot) => (
              <span
                key={slot}
                className="text-xs px-2.5 py-1 rounded-lg bg-teal-50 text-teal-700 border border-teal-100 cursor-pointer hover:bg-teal-100 transition"
              >
                {slot}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Services table */}
      <div className="border-t border-gray-50 px-4 pt-1 pb-2">
        <div className="mb-1 flex items-center justify-between gap-3 flex-wrap">
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider py-2">
            Available services ({visibleServices.length})
          </span>
          <div className="flex flex-wrap items-center gap-3">
            <button className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 transition">
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
              Directions
            </button>
            <button className="text-xs text-teal-600 hover:text-teal-800 transition font-medium">
              View full profile →
            </button>
          </div>
        </div>

        {shown.map((service) => (
          <ServiceRow key={service.name} service={service} />
        ))}

        {visibleServices.length > 3 && (
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="mt-2 text-xs text-teal-600 hover:text-teal-800 transition font-medium"
          >
            {expanded
              ? "Show less ↑"
              : `Show ${visibleServices.length - 3} more services ↓`}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("Rajshahi"); // change to "All" if you want
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("distance");
  const [maxPrice, setMaxPrice] = useState(6000);
  const [filters, setFilters] = useState({
    openNow: true,
    verifiedOnly: false,
    availableOnly: false,
  });

  const results = useMemo(() => {
    let list = SERVICES.filter((h) => {
      // Location filter
      if (location !== "All" && h.location !== location) return false;

      if (filters.openNow && !h.openNow) return false;
      if (filters.verifiedOnly && !h.verified) return false;

      const matchingServices =
        activeCategory === "All"
          ? h.services
          : h.services.filter((s) => s.category === activeCategory);

      if (matchingServices.length === 0) return false;

      if (filters.availableOnly && !matchingServices.some((s) => s.available))
        return false;

      const minPrice = Math.min(...matchingServices.map((s) => s.price));
      if (minPrice > maxPrice) return false;

      if (
        query &&
        !h.hospital.toLowerCase().includes(query.toLowerCase()) &&
        !matchingServices.some((s) =>
          s.name.toLowerCase().includes(query.toLowerCase()),
        )
      )
        return false;

      return true;
    });

    if (sortBy === "distance") list.sort((a, b) => a.dist - b.dist);
    else if (sortBy === "rating") list.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "price_asc")
      list.sort((a, b) => {
        const aMin = Math.min(...a.services.map((s) => s.price));
        const bMin = Math.min(...b.services.map((s) => s.price));
        return aMin - bMin;
      });
    else if (sortBy === "price_desc")
      list.sort((a, b) => {
        const aMin = Math.min(...a.services.map((s) => s.price));
        const bMin = Math.min(...b.services.map((s) => s.price));
        return bMin - aMin;
      });

    return list;
  }, [query, location, activeCategory, sortBy, maxPrice, filters]);

  const toggleFilter = (key) =>
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Top bar ── */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3">
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

        <div className="w-full sm:flex-1 min-w-0 flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 bg-white focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-100 transition">
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
            placeholder="Search services or hospitals… e.g. blood test, MRI"
            className="flex-1 min-w-0 text-sm text-gray-800 placeholder-gray-300 outline-none bg-transparent"
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

      {/* ── Category pills ── */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {SERVICE_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex-shrink-0 flex items-center gap-1.5 text-xs px-4 py-1.5 rounded-full border transition-all ${
              activeCategory === cat
                ? "bg-teal-600 text-white border-teal-600 font-medium"
                : "border-gray-200 text-gray-500 hover:border-teal-300 hover:text-teal-700"
            }`}
          >
            {cat !== "All" && (
              <span
                className={
                  activeCategory === cat ? "text-white" : "text-gray-400"
                }
              >
                {CATEGORY_ICONS[cat]}
              </span>
            )}
            {cat}
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
                onClick={() => {
                  setFilters({
                    openNow: false,
                    verifiedOnly: false,
                    availableOnly: false,
                  });
                  setMaxPrice(6000);
                  setActiveCategory("All");
                  setQuery("");
                }}
                className="text-xs text-teal-600 hover:text-teal-800 transition"
              >
                Clear all
              </button>
            </div>

            {/* Toggles */}
            <div className="mb-5">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
                Status
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { key: "openNow", label: "Open now" },
                  { key: "verifiedOnly", label: "Verified only" },
                  { key: "availableOnly", label: "Service available" },
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

            {/* Max price slider */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Max price
                </p>
                <span className="text-xs font-medium text-gray-700">
                  {maxPrice >= 6000 ? "Any" : `৳${maxPrice.toLocaleString()}`}
                </span>
              </div>
              <input
                type="range"
                min={100}
                max={6000}
                step={100}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-teal-500"
              />
              <div className="flex justify-between text-xs text-gray-300 mt-1">
                <span>৳100</span>
                <span>৳6000+</span>
              </div>
            </div>

            {/* Category list (secondary nav) */}
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                Category
              </p>
              <div className="flex flex-col gap-1">
                {SERVICE_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`flex items-center gap-2 text-xs px-2 py-1.5 rounded-lg text-left transition-all ${
                      activeCategory === cat
                        ? "bg-teal-50 text-teal-700 font-medium"
                        : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                    }`}
                  >
                    {cat !== "All" && (
                      <span
                        className={
                          activeCategory === cat
                            ? "text-teal-500"
                            : "text-gray-300"
                        }
                      >
                        {CATEGORY_ICONS[cat]}
                      </span>
                    )}
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* ── Results ─�� */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
            <div>
              <p className="text-sm text-gray-500">
                <span className="font-medium text-gray-900">
                  {results.length}
                </span>{" "}
                {activeCategory === "All"
                  ? "providers"
                  : `${activeCategory} providers`}{" "}
                {location === "All" ? "" : `near ${location}`}
              </p>
              {activeCategory !== "All" && (
                <p className="text-xs text-gray-400 mt-0.5">
                  Showing centers that offer {activeCategory.toLowerCase()}{" "}
                  services
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              Sort
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-gray-200 rounded-lg px-2 py-1.5 text-gray-700 outline-none focus:border-teal-400 transition"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Cards */}
          {results.length > 0 ? (
            <div className="flex flex-col gap-4">
              {results.map((hospital) => (
                <HospitalCard
                  key={hospital.id}
                  hospital={hospital}
                  activeCategory={activeCategory}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-gray-100 rounded-2xl p-14 text-center">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="#9ca3af"
                  strokeWidth="1.5"
                >
                  <circle cx="6.5" cy="6.5" r="4.5" />
                  <path d="M10.5 10.5L14 14" strokeLinecap="round" />
                </svg>
              </div>
              <p className="text-sm text-gray-400">
                No providers match your filters.
              </p>
              <p className="text-xs text-gray-300 mt-1">
                Try changing the category, city, or adjusting the price range.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
