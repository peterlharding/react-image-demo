
import React from 'react';

import Container from "react-bootstrap/Container";

import cleo from '../assets/cleopatra.jpg';


const Home = () => {

  return (
    <Container>
      <h1>Simple Image Display</h1>

      <img src={cleo} alt="Simple" style={{margin: '100px'}}/>

    </Container>
  );
}

export default Home;
