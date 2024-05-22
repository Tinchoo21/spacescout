import React, { useState } from 'react';
import './Navbar.css';
import spacescoutlogo from '../../../images/spacescout_noback.png';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav>
      <div className="jm-logo">
        <a href="/">
          <img src={spacescoutlogo} alt="Logo" />
        </a>
      </div>
      <div className="menu-icon" onClick={toggleMenu} style={{size: '24px'}}>
        {isOpen ? <IoMdClose className="hamburger open" style={{color: 'white'}}/> : <GiHamburgerMenu className="hamburger" />}
      </div>
      <div className={`nav-links ${isOpen ? "show" : ""}`} id="navLinks">
        <ul>
          <li><a href="/properties">PROPERTIES</a></li>
          <li><a href="/aboutus">ABOUT US</a></li>
          <li><a href="/contact">CONTACT</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
