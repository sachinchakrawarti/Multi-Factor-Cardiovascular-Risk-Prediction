import React from "react";
import HeroSection from "./homepages/HeroSection";
import ConnectDoctors from "./homepages/ConnectDoctors";
import HeroSectionSlider from "./homepages/HeroSectionSlider";

export default function Home() {
  return (
    <>
      <HeroSectionSlider />
      <HeroSection />
      <ConnectDoctors />
    </>
  );
}
