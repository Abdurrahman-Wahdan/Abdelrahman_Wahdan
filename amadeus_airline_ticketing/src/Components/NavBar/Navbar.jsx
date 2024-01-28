import React, { useState } from "react";
// Icons
import { MdOutlineAirplaneTicket } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { GrLanguage } from "react-icons/gr";
import { TbGridDots } from "react-icons/tb";
// Images
import logo from "../../assets/logo.png";

const Navbar = () => {
  const [active, setActive] = useState("navBarMenu");
  const showNavBar = () => {
    setActive("navBarMenu showNavBar");
  };

  const removeNavBar = () => {
    setActive("navBarMenu");
  };

  // nackground for seconf bar
  const [noBg, addBg] = useState("navBarTwo");
  const addBgColor = () => {
    if (window.scrollY >= 10) {
      addBg("navBarTwo navbar_With_Bg");
    } else {
      addBg("navBarTwo");
    }
  };
  window.addEventListener("scroll", addBgColor);
  return (
    <div className="navBar flex">
      <div className="navBarOne flex">
        <div>
          <MdOutlineAirplaneTicket className="icon" />
        </div>

        <div className="none flex">
          <li className="flex">
            <BiSupport className="icon" />
            Support
          </li>
          <li className="flex">
            <GrLanguage className="icon" />
            Languages
          </li>
        </div>

        <div className="atb flex">
          <span>Sign In</span>
          <span>Sign Up</span>
        </div>
      </div>

      <div className={noBg}>
        <div className="logoDiv">
          <img src={logo} className="Logo" />
        </div>

        <div className={active}>
          <ul className="menu flex">
            <li onClick={removeNavBar} className="listItem">
              Home
            </li>
            <li onClick={removeNavBar} className="listItem">
              About
            </li>
            <li onClick={removeNavBar} className="listItem">
              Offers
            </li>
            <li onClick={removeNavBar} className="listItem">
              Seats
            </li>
            <li onClick={removeNavBar} className="listItem">
              Destinations
            </li>
          </ul>

          <button onClick={removeNavBar} className="btn flex btnOne">
            Contact Us
          </button>
        </div>
        <button className="btn flex btnTwo">Conatct Us</button>

        <div onClick={showNavBar} className="toggleIcon">
          <TbGridDots className="icon" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
