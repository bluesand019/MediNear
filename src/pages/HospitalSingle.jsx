import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";

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
    about:
      "A major government hospital providing emergency services, specialist departments, and essential diagnostics.",
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
    about:
      "A private hospital with common specialist care and diagnostics, offering convenient hours and patient services.",
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
    about:
      "A diagnostic provider offering imaging and lab services with high throughput and convenient time slots.",
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
    about:
      "A specialized cardiac hospital with ICU support, emergency care, and advanced heart-related procedures.",
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
    about:
      "A children-focused hospital offering pediatric and neonatal services, including NICU support.",
  },
];

function Chip({ children, className = "" }) {
  return (
    <span
      className={`text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 ${className}`}
    >
      {children}
    </span>
  );
}

export default function HospitalSingle() {
  const { id } = useParams();

  const hospital = useMemo(() => {
    const numericId = Number(id);
    return HOSPITALS.find((h) => h.id === numericId);
  }, [id]);

  if (!hospital) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-10">
          <div className="bg-white border border-gray-100 rounded-2xl p-10 text-center">
            <p className="text-gray-500 text-sm">Hospital not found.</p>
            <Link
              to="/hospital-detail"
              className="inline-block mt-4 text-sm font-medium text-teal-600 hover:text-teal-800 no-underline"
            >
              Back to hospitals →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Support both "name" and "hospital" keys (in case some data uses hospital:)
  const displayName = hospital.name || hospital.hospital || "Hospital";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          <Link
            to="/hospital-detail"
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
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white border border-gray-100 rounded-2xl p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
                {displayName}
              </h1>

              <p className="text-sm text-teal-700 font-medium mt-1">
                {hospital.location || "Unknown location"}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                {hospital.address || "Address not available"}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                {hospital.type && (
                  <Chip className="bg-blue-50 text-blue-700">
                    {hospital.type}
                  </Chip>
                )}

                {hospital.emergency && (
                  <Chip className="bg-teal-50 text-teal-700">
                    24/7 Emergency
                  </Chip>
                )}

                {typeof hospital.openNow === "boolean" &&
                  (hospital.openNow ? (
                    <Chip className="bg-emerald-50 text-emerald-700">
                      Open now
                    </Chip>
                  ) : (
                    <Chip className="bg-gray-100 text-gray-400">Closed</Chip>
                  ))}

                {typeof hospital.rating === "number" && (
                  <Chip>
                    ★ {hospital.rating}{" "}
                    <span className="text-gray-400">
                      ({hospital.reviews ?? 0})
                    </span>
                  </Chip>
                )}

                {hospital.dist != null && <Chip>{hospital.dist} km</Chip>}
                {hospital.hours && <Chip>{hospital.hours}</Chip>}
              </div>
            </div>

            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              {hospital.phone ? (
                <a
                  href={`tel:${hospital.phone}`}
                  className="text-xs px-3 py-2 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-700 transition no-underline"
                >
                  Call
                </a>
              ) : (
                <button
                  disabled
                  className="text-xs px-3 py-2 rounded-lg bg-gray-100 text-gray-300 cursor-not-allowed"
                >
                  Call
                </button>
              )}

              <button className="text-xs px-3 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition">
                Directions
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-white border border-gray-100 rounded-2xl p-6">
          <p className="text-sm font-medium text-gray-900">About</p>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            {hospital.about || "No description available yet."}
          </p>
        </div>

        <div className="mt-4 bg-white border border-gray-100 rounded-2xl p-6">
          <p className="text-sm font-medium text-gray-900">Departments</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {(hospital.departments || []).length ? (
              hospital.departments.map((d) => (
                <span
                  key={d}
                  className="text-xs px-2.5 py-1 rounded-lg bg-teal-50 text-teal-700 border border-teal-200"
                >
                  {d}
                </span>
              ))
            ) : (
              <p className="text-sm text-gray-400">No departments listed.</p>
            )}
          </div>
        </div>

        <div className="mt-4 bg-white border border-gray-100 rounded-2xl p-6">
          <p className="text-sm font-medium text-gray-900">Facilities</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {(hospital.facilities || []).length ? (
              hospital.facilities.map((f) => (
                <span
                  key={f}
                  className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600"
                >
                  {f}
                </span>
              ))
            ) : (
              <p className="text-sm text-gray-400">No facilities listed.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
