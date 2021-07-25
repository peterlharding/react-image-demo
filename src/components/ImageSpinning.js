import React from 'react';

import Container from "react-bootstrap/Container";

import cleo from '../assets/cleopatra.jpg';


const ImageSpinning = () => {

  return (
    <Container className="flex-grow-1 mt-5">
      <h1>Image Spinning</h1>
      <img src={cleo} className="app-logo" alt="Spinning" style={{margin: '200px'}}/>
    </Container>
  );
}

export default ImageSpinning;

