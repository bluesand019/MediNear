import React from "react";
import Footer from "../components/layout/Footer";
import GridList from "../components/layout/GridList";
import Hero from "../components/Hero_Layout/Hero";
import StepsStack from "@/components/layout/StepsStack";
import StatsSection from "@/components/layout/Stats";

const Home = () => {
  return (
    <>
      <Hero />
      <GridList
        sub="Common diagnostic and treatment services"
        className="services"
      />

      <StepsStack />
      <StatsSection />
      <Footer />
    </>
  );
};

export default Home;
