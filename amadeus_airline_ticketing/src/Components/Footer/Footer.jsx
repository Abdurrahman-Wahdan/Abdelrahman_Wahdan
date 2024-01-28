import React from "react";
import Logo from "../../assets/logo.png";

// icons
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
const Footer = () => {
  return (
    <div className="footer">
      <div className="sectionContainer container grid">
        <div className="gridOne">
          <div className="logoDiv">
            <img src={Logo} className="Logo" />
          </div>
          <p>
            We always wish Your Trip to be with us for a garunted amazing
            experince
          </p>
          <div className="socialIcon flex">
            <FaFacebook className="icon" />
            <FaInstagram className="icon" />
            <FaTwitter className="icon" />
            <FaYoutube className="icon" />
            <FaLinkedin className="icon" />
          </div>
        </div>
        <div className="footerLinks">
          <span className="linkTitle">Information</span>
          <li>
            <a href="">Home</a>
          </li>
          <li>
            <a href="">Book Now</a>
          </li>
          <li>
            <a href="">Sign Up Now</a>
          </li>
        </div>
        <div className="footerLinks">
          <span className="linkTitle">Quik Guide</span>
          <li>
            <a href="">FAQ</a>
          </li>
          <li>
            <a href="">How To</a>
          </li>
          <li>
            <a href="">Features</a>
          </li>
        </div>
        <div className="footerLinks">
          <span className="linkTitle">Information</span>
          <li>
            <a href="">Jobs</a>
          </li>
          <li>
            <a href="">Destinations</a>
          </li>
          <li>
            <a href="">Transportation</a>
          </li>
        </div>
      </div>
    </div>
  );
};

export default Footer;
