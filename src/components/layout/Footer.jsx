import { Link } from "react-router";

const LINKS = {
  platform: {
    label: "Platform",
    items: [
      { name: "Find a service", href: "/service-search" },
      { name: "Find a doctor", href: "/doctor-search" },
      { name: "Browse hospitals", href: "/hospital-detail" },
      { name: "Specializations", href: "/specializations" },
    ],
  },
  forPatients: {
    label: "For patients",
    items: [
      { name: "Create account", href: "/register" },
      { name: "My appointments", href: "/patient/bookings" },
      { name: "Medical records", href: "/patient/records" },
      { name: "Help & support", href: "/support" },
    ],
  },
  forProviders: {
    label: "For providers",
    items: [
      { name: "List your hospital", href: "/join" },
      { name: "Doctor registration", href: "/join/doctor" },
      { name: "Admin panel", href: "/admin" },
      { name: "Provider docs", href: "/docs" },
    ],
  },
  company: {
    label: "Company",
    items: [
      { name: "About MediNear", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Privacy policy", href: "/privacy" },
      { name: "Terms of service", href: "/terms" },
    ],
  },
};

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "https://x.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

function FooterLinkGroup({ label, items }) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-900 mb-3">{label}</p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.name}>
            <a
              href={item.href}
              className="text-sm text-gray-400 hover:text-teal-600 transition-colors duration-150"
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      {/* Main grid */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">

          {/* Brand column — spans 2 cols on md */}
          <div className="col-span-2">
            <a href="/" className="inline-flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500 flex-shrink-0" />
              <span className="text-base font-medium text-gray-900">MediNear</span>
            </a>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Find hospitals, diagnostic centers, and specialist doctors near
              you. Compare prices, ratings, and availability in one place.
            </p>

            {/* Location badge */}
            <div className="inline-flex items-center gap-1.5 text-xs text-teal-700 bg-teal-50 border border-teal-200 rounded-full px-3 py-1 mb-6">
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
              Serving Rajshahi & nearby areas
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 text-gray-400 hover:text-teal-600 hover:border-teal-200 hover:bg-teal-50 transition-all duration-150"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.values(LINKS).map((group) => (
            <FooterLinkGroup key={group.label} {...group} />
          ))}
        </div>
      </div>

      {/* Provider CTA strip */}
      <div className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-gray-800">
              Are you a hospital or clinic?
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              List your services and doctors to reach more patients.
            </p>
          </div>
          <Link
           to="/provider"
            className="flex-shrink-0 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 active:scale-95 transition-all duration-150 px-5 py-2 rounded-lg"
          >
            Join as a provider →
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-300">
            © {new Date().getFullYear()} MediNear. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {["Privacy", "Terms", "Contact", "Sitemap"].map((item) => (
              <a
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-xs text-gray-300 hover:text-gray-500 transition-colors duration-150"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}