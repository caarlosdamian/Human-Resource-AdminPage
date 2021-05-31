import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReorderIcon from "@material-ui/icons/Reorder";
import Logo from "../assets/miniatura.png";
import "../styles/Navbar.css";

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);
  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };

  return (
    <div className="navbar">
      <div className="leftSide" id={openLinks ? "open" : "close"}>
        <img  className="logo" src={Logo} alt="foto"></img>
        <div className="hiddenLinks">
          <Link to="/">Home</Link>
          <Link to="/Employees">Employees</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
      <div className="rightSide">
        <Link to="/">Home</Link>
        <Link to="/Employees">Employees</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <button onClick={toggleNavbar}>
          <ReorderIcon />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
