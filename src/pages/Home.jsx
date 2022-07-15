import React from "react";
import HeroSection from "../components/HomeComponents/HeroSection";
import Section1 from "../components/HomeComponents/Section1";
import Section2 from "../components/HomeComponents/Section2";
import Section3 from "../components/HomeComponents/Section3";
import Footer from "../components/HomeComponents/Footer";
import CircleNav from "../components/CircleNav/CircleNav";

function Home() {
  return (
    <>
      <HeroSection />
      <Section1/>
      <Section2/>
      <Section3/>
    </>
  );
}

export default Home;
