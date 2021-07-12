import React from "react";
import "./index.css";
import NavBar from "../NavBar";

const MasterHome = () => {
  const fullHeight = {
    height: "100vh",
  };
  return (
    <body
      className="master-head text-center text-white bg-dark d-flex flex-column"
      style={fullHeight}
    >
      <header>
        <NavBar />
      </header>

      <main className="m-auto">
        <h1>Cover your page.</h1>
        <p className="lead">
          Cover is a one-page template for building simple and beautiful home
          pages. Download, edit the text, and add your own fullscreen background
          photo to make it your own.
        </p>
        <p className="lead">
          <a
            href="#"
            className="text-dark btn btn-lg btn-secondary fw-bold border-white bg-white"
          >
            Learn more
          </a>
        </p>
      </main>
    </body>
  );
};

export default MasterHome;
