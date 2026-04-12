import { Outlet, useLocation } from "react-router";
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion"; // Import motion

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
    { label: 'Services', href: '/service-search' },
    { label: 'Doctors', href: '/doctor-search' },
    { label: 'Hospitals', href: '/hospital-detail' },
    { label: 'About', href: '/about' },
  ];

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          padding: '12px 32px',
          backgroundColor: '#fff',
          borderBottom: '1px solid #e5e7eb',
        }}
      >
        {/* Left - Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#000', fontWeight: '700', fontSize: '18px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }} />
          MediNear
        </Link>

        {/* Center - Main Links with Sliding Pill */}
        <ul style={{
          display: 'flex',
          gap: '4px',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          position: 'relative',
        }}>
          {mainLinks.map(({ label, href }) => {
            const isActive = location.pathname === href;
            
            return (
              <li key={href} style={{ position: 'relative' }}>
                <Link
                  to={href}
                  style={{
                    position: 'relative',
                    display: 'block',
                    padding: '8px 16px',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: isActive ? '#fff' : '#374151',
                    zIndex: 1, // Ensures text stays above the pill
                    transition: 'color 0.2s ease',
                  }}
                >
                  {label}
                  {/* The Magic Pill */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill" // Links the animation across different elements
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: '#000',
                        borderRadius: '999px',
                        zIndex: -1, // Sits behind the text
                      }}
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
          <Link to="/login" style={{ padding: '6px 16px', textDecoration: 'none', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
            Log in
          </Link>
          <Link to="/register" style={{ padding: '6px 18px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: '500', color: '#10b981', border: '1.5px solid #10b981' }}>
            Sign up
          </Link>
        </div>
      </nav>

      <div style={{ marginTop: navHeight }}>
        <Outlet />
      </div>
    </>
  );
}