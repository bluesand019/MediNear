import React from "react";
import Footer from "../components/layout/Footer";
import Searchbar from "../components/search/Searchbar";
import GridList from "../components/layout/GridList";

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
          <Searchbar
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

      <GridList
      title="Search by service type"
      sub="Common diagnostic and treatment services"
      dummy_data={["Blood test", "Xray", "MRI/CT Scan", "Ultrasound", "ECG", "Consultant", "Pathology", "View all"]}
      className="services"
      />

      <div className="divider"></div>

      <GridList
        title="Find doctors by specialization"
        sub="Browse specialists available near you"
        dummy_data={[
          "Cardiologist",
          "Neurologist",
          "Dentist",
          "Dermatologist",
          "+More specialists",
        ]}
        className="specialists"
      />

      <div className="divider"></div>

      <div className="section">
        <p>How MediNear works</p>
        <p>Three steps to the right care</p>
        <div className="steps">
          step card - 1 | step card - 2 | step card - 3
        </div>
      </div>

      <div className="divider"></div>

      <div className="section">
        <p>Trusted across Rajshahi</p>
        <div className="stats-row">Stats</div>
      </div>

      <div className="divider"></div>
      <div className="banner">
        <strong>Are you a hospital or clinic?</strong>
        <p>
          List your services and doctors on MediNear to reach more patients in
          your area.
        </p>
        <button>Join as a provider</button>
      </div>

      <Footer />
    </>
  );
};

export default Home;
