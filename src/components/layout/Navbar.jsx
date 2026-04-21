import { Outlet, useLocation } from "react-router";
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

export default function Root() {
  const location = useLocation();
  const navRef = useRef(null);
  const [navHeight, setNavHeight] = useState(64);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (navRef.current) {
      setNavHeight(navRef.current.offsetHeight);
    }
  }, []);

  // Close menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

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
        <nav className="flex items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr] px-4 sm:px-6 py-3 max-w-7xl mx-auto">
          <Link
            to="/"
            className="flex items-center gap-2 no-underline text-black font-bold text-lg"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            MediNear
          </Link>

          <ul className="hidden lg:flex gap-1 list-none m-0 p-0 relative">
            {mainLinks.map(({ label, href }) => {
              const isActive = location.pathname === href;
              return (
                <li key={href} className="relative">
                  <Link
                    to={href}
                    className={`relative block px-4 py-2 no-underline text-sm font-medium transition-colors z-10 ${
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
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center justify-end gap-4">
            <div className="hidden lg:flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-1.5 text-sm font-medium text-gray-600"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="px-4.5 py-1.5 rounded-lg text-sm font-medium text-emerald-500 border-2 border-emerald-500 hover:bg-emerald-50"
              >
                Sign up
              </Link>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                {mainLinks.map(({ label, href }) => (
                  <Link
                    key={href}
                    to={href}
                    className={`text-lg font-medium ${location.pathname === href ? "text-emerald-600" : "text-gray-600"}`}
                  >
                    {label}
                  </Link>
                ))}
                <hr className="border-gray-100" />
                <div className="flex flex-col gap-3">
                  <Link
                    to="/login"
                    className="w-full py-3 text-center font-medium text-gray-600 bg-gray-50 rounded-lg"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    className="w-full py-3 text-center font-medium text-white bg-emerald-500 rounded-lg"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main style={{ marginTop: navHeight }}>
        <Outlet />
      </main>
    </>
  );
}
