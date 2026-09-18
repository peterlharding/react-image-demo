import Container from 'react-bootstrap/Container';
import { Outlet } from 'react-router';

import { Footer, NavBar } from '../components';

import './App.css';

function App() {
  return (
    <div id="app" className="d-flex flex-column min-vh-100">
      <NavBar />
      <Container as="main" className="flex-grow-1 py-5">
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
}

export default App;
