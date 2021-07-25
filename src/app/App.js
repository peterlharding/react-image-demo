
import React from 'react';

import {Route, Switch} from "react-router-dom";
import Container from "react-bootstrap/Container";

import {NavBar, Footer, Home, ImageCrop, ImageSpinning, ImageUploadAndCrop} from "../components";

import './App.css';

function App() {
  return (
    <div id="app" className="d-flex flex-column h-100">
      <NavBar />
      <Container className="flex-grow-1 mt-5">
        <Switch>
          <Route path="/"                  exact component={Home} />
          <Route path="/home"              exact component={Home} />
          <Route path="/image-spinning"    exact component={ImageSpinning} />
          <Route path="/image-crop"        exact component={ImageCrop} />
          <Route path="/upload-and-crop"   exact component={ImageUploadAndCrop} />
        </Switch>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
