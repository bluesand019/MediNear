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



function Badge({ children, variant = "default" }) {
  const styles = {
    default: "bg-gray-100 text-gray-600",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-100",
    warning: "bg-amber-50 text-amber-700 border border-amber-100",
    info: "bg-blue-50 text-blue-700 border border-blue-100",
    primary: "bg-teal-50 text-teal-700 border border-teal-100",
  };

  return (
    <span className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md ${styles[variant]}`}>
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Hospital not found</h2>
          <Link to="/hospital-detail" className="text-teal-600 font-medium mt-4 inline-block">
            ← Return to directory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-20">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/hospital-detail" className="group flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-teal-600 transition-colors">
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
            Directory
          </Link>
          <div className="flex gap-4">
             <Link to="/" className="text-sm font-medium text-gray-500 hover:text-gray-900">Home</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="info">{hospital.type}</Badge>
                {hospital.emergency && <Badge variant="primary">Emergency 24/7</Badge>}
                {hospital.openNow ? <Badge variant="success">Open Now</Badge> : <Badge variant="default">Closed</Badge>}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                {hospital.name}
              </h1>
              
              <div className="mt-4 flex flex-col gap-2 text-gray-600">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  <p className="text-base leading-relaxed">{hospital.address}, {hospital.location}</p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-50">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">About the Facility</h3>
                <p className="text-gray-600 leading-relaxed text-base">
                  {hospital.about}
                </p>
              </div>
            </section>

            {/* Departments Grid */}
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Medical Departments</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {hospital.departments.map((dept) => (
                  <div key={dept} className="flex items-center p-3 rounded-xl bg-gray-50 text-gray-700 text-sm font-medium border border-transparent hover:border-teal-100 hover:bg-teal-50 transition-all">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2" />
                    {dept}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Actions */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-2xl font-bold text-gray-900">★ {hospital.rating}</p>
                  <p className="text-xs text-gray-500 font-medium uppercase">{hospital.reviews} Reviews</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{hospital.dist}km</p>
                  <p className="text-xs text-gray-500 font-medium uppercase">Distance</p>
                </div>
              </div>

              <div className="space-y-3">
                <a 
                  href={`tel:${hospital.phone}`} 
                  className="flex items-center justify-center gap-2 w-full py-4 bg-teal-600 text-white rounded-2xl font-semibold shadow-lg shadow-teal-100 hover:bg-teal-700 hover:shadow-teal-200 transition-all active:scale-[0.98]"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  Call Hospital
                </a>
                <button className="flex items-center justify-center gap-2 w-full py-4 bg-white text-gray-900 border border-gray-200 rounded-2xl font-semibold hover:bg-gray-50 transition-all">
                  Get Directions
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-50 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Business Hours</span>
                  <span className="text-gray-900 font-medium">{hospital.hours}</span>
                </div>
              </div>
            </div>

            {/* Amenities Section */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
               <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Facilities</h3>
               <div className="flex flex-wrap gap-2">
                 {hospital.facilities.map(f => (
                   <span key={f} className="text-xs px-3 py-1.5 bg-gray-50 text-gray-600 rounded-lg border border-gray-100">
                     {f}
                   </span>
                 ))}
               </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}