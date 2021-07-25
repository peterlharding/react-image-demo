import React from "react";

import {Link} from "react-router-dom";

var style = {
  backgroundColor: "#F8F8F8",
  borderTop: "1px solid #E7E7E7",
  textAlign: "center",
  padding: "20px",
  position: "fixed",
  left: "0",
  bottom: "0",
  height: "100px",
  width: "100%",
};

const Footer = () => (
  <footer className="bg-light p-3 text-center" style={style}>
    <div className="logo" />
    <p>
      Sample project demonstrating image animation and image cropping
      <br />
      <Link to="/home">Home</Link>
      {" "}|{" "}
      <Link to="/image-spinning">Spinning</Link>
      {" "}|{" "}
      <Link to="/image-crop">Cropping</Link>
      {" "}|{" "}
      <Link to="/upload-and-crop">Upload and Crop</Link>
      <br />
      <a target="_blank"  rel="noopener noreferrer" href="https://github.com/peterlharding/react-image-demo/">
        React Image Demo
      </a>
    </p>
  </footer>
);

export default Footer;
