import React from "react";
import Navbar from "./Components/NavBar/Navbar";
import Home from "./Components/Home/Home";
import Search from "./Components/Search/Search";
// import Suggestions from "./Components/Suggestions/Suggestions";
import Subscribers from "./Components/Subscribers/Subscribers";
import Footer from "./Components/Footer/Footer";

const App = () => {
  return (
    <div>
      <Navbar />
      <Home />
      <Search />
      <Subscribers />
      <Footer />
    </div>
  );
};

export default App;
