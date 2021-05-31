import React from "react";
import { Link } from "react-router-dom";
import BannerImage from "../../assets/Logo.jpg";
import "../../styles/Home.css";

function Home() {
  return (
    <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
      <div className="headerContainer">
        <h1>Human Resourse</h1>
        <br></br>
        <p>HERE TO EVOLVE</p>
      </div>
</div>
  );
}

export default Home;
