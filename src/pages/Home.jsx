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
    </>
  );
};

export default Home;
