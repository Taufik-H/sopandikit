import React from "react";
import Navbar from "./components/Navbar";
import Content from "./components/Content";
import Footer from "./components/Footer";
function App() {
  return (
    <div className="App   w-full bg-white">
      <div className="mb-20">
        <Navbar />
        <Content />
      </div>
      <Footer />
    </div>
  );
}

export default App;
