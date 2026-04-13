import React from "react";
import Footer from "../components/layout/Footer";
import GridList from "../components/layout/GridList";
import Hero from "../components/Hero_Layout/Hero";

const Home = () => {
  return (
    <>
      <Hero />
      <GridList
        sub="Common diagnostic and treatment services"
        className="services"
      />

      <div className="divider"></div>

      {/* <GridList
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
      /> */}

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
