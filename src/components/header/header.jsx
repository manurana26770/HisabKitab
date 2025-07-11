
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { FaBars, FaTimes } from "react-icons/fa"; // Icons for menu toggle
import { AuthContext } from "../authcontext"; // Import Auth Context

import "./Header.css";

const Header = () => {
  const { user } = useContext(AuthContext); // ✅ Now user is globally managed
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle menu
  return (
    <header className="header">

       {/* Hamburger Menu for Mobile */}

       <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>


      <div className="logo">
        <h1>HisabKitab</h1>
      </div>

     

     {/* Navigation */}
     <nav className={menuOpen ? "nav-links nav-active" : "nav-links"}>
        <ul>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/allfriends" onClick={() => setMenuOpen(false)}>Friends</Link></li>
          {/* <li><Link to="/transactions" onClick={() => setMenuOpen(false)}>Shaguns</Link></li> */}
          <li><Link to="/allevent" onClick={() => setMenuOpen(false)}>Functions</Link></li>
        </ul>
      </nav>

      {/* Call to Action Buttons */}
      <div className="cta " >
        {!user ? (
          <>
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              <button className="login-btn">Login</button>
            </Link>
            <Link to="/signup" onClick={() => setMenuOpen(false)}>
              <button className="signup-btn">Signup</button>
            </Link>
          </>
        ) : (
          <Link to="/profile" onClick={() => setMenuOpen(false)}>
            <BsFillPersonFill className="profile-icon" />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
