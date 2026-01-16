import React from "react";
import Navbar from "./layout/navbar/Navbar";
import Approutes from "./routes/Approutes";
import Footer from "./layout/footer/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <Approutes />
      <Footer />
    </>
  );
}
