import React from "react";

const Home = () => {
  return (
    <>
      <div className="hero">
        <div className="hero-tag">Find care near you, instantly</div>
        <h2>Medical services & doctors near Rajshahi</h2>
        <div className="hero-sub">
          <p>
            Search hospitals, diagnostic centers and specialist doctors. Compare
            prices, ratings and availability in one place.
          </p>
        </div>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search: X-ray, blood test, MRI, Cardiologists..."
          />
          <button>Search</button>
        </div>
        <div className="loc-row">
            Your location
            <button>Change city</button>
        </div>
      </div>
    
    <div className="divider"></div>

    <div className="section">
        <p className="sec-title">Search by service type</p>
        <p className="sec-sub">Common diagnostic and treatment services</p>
        <ul>
            <li>Blood test</li>
            <li>Xray</li>
            <li>MRI/CT Scan</li>
            <li>Ultrasound</li>
            <li>ECG</li>
            <li>Consultant</li>
            <li>Pathology</li>
            <li>View all</li>
        </ul>
    </div>

    <div className="divider"></div>

    <div className="section">
        <p className="sec-title">Find doctors by specialization</p>
        <p className="sec-sub">Browse specialists available near you</p>
        <ul>
            <li>Cardiologist</li>
            <li>Neurologist</li>
            <li>Dentist</li>
            <li>Dermatologist</li>
            <li>+More specialists</li>
        </ul>
    </div>

    <div className="divider"></div>

    <div className="section">
        <p>How MediNear works</p>
        <p>Three steps to the right care</p>
        <div className="steps">
            step card - 1 |
            step card - 2 |
            step card - 3
        </div>
    </div>

    </>
  );
};

export default Home;
