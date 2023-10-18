import classes from './MainNavigation.module.css';
import { NavLink } from 'react-router-dom';

import { Nav, Navbar, Container }  from 'react-bootstrap';



function MainNavigation() {
  return (
<Navbar collapseOnSelect expand="lg" bg="light" data-bs-theme="light" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Budget App</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link href="#home">How to use this App </Nav.Link>
            <Nav.Link href="#features">Monthly Summary</Nav.Link>
            <Nav.Link href="#pricing">Expense Tracker</Nav.Link>
            <Nav.Link href="#pricing">Budget Planner</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavigation;