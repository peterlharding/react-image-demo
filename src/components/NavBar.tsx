import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router';

import { navItems } from '../app/navigation';

const NavBar = () => (
  <Navbar bg="light" expand="md" className="border-bottom">
    <Container>
      <Navbar.Brand as={NavLink} to="/">
        React Image Demo
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="main-nav" />
      <Navbar.Collapse id="main-nav">
        <Nav className="ms-auto">
          {navItems.map(({ to, label }) => (
            <Nav.Link key={to} as={NavLink} to={to} end>
              {label}
            </Nav.Link>
          ))}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default NavBar;
