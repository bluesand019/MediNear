import { Outlet, useLocation } from "react-router";
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

export default function Root() {
  const location = useLocation();
  const navRef = useRef(null);
  const [navHeight, setNavHeight] = useState(64);

  useEffect(() => {
    if (navRef.current) {
      setNavHeight(navRef.current.offsetHeight);
    }
  }, []);

  const mainLinks = [
    { label: "Services", href: "/service-search" },
    { label: "Doctors", href: "/doctor-search" },
    { label: "Hospitals", href: "/hospital-detail" },
    { label: "About", href: "/about" },
  ];

  return (
    <>
      <header
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[9999] bg-white border-b border-gray-200"
      >
        <nav className="grid grid-cols-[1fr_auto_1fr] items-center px-8 py-3 max-w-7xl mx-auto">
          <Link
            to="/"
            className="flex items-center gap-2 no-underline text-black font-bold text-lg"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            MediNear
          </Link>

          {/* Center - Nav Links */}
          <ul className="flex gap-1 list-none m-0 p-0 relative">
            {mainLinks.map(({ label, href }) => {
              const isActive = location.pathname === href;

              return (
                <li key={href} className="relative">
                  <Link
                    to={href}
                    className={`relative block px-4 py-2 no-underline text-sm font-medium transition-colors duration-200 z-10 ${
                      isActive
                        ? "text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-[#0F6E56] rounded-full -z-10"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right - Auth Links */}
          <div className="flex items-center justify-end gap-2">
            <Link
              to="/login"
              className="px-4 py-1.5 no-underline text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="px-4.5 py-1.5 rounded-lg no-underline text-sm font-medium text-emerald-500 border-1.5 border-emerald-500 hover:bg-emerald-50 transition-colors"
            >
              Sign up
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content Spacer */}
      <main style={{ marginTop: navHeight }}>
        <Outlet />
      </main>
    </>
  );
}
