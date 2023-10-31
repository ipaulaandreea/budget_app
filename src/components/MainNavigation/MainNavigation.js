import classes from "./MainNavigation.module.css";
import { NavLink } from "react-router-dom";

import { Nav, Navbar, Container } from "react-bootstrap";

function MainNavigation() {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="light"
      data-bs-theme="light"
      className="bg-body-tertiary"
    >
      <Container>
        <Navbar.Brand>Budget App</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home{" "}
            </NavLink>
            <NavLink
              to="instructions"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Instructions{" "}
            </NavLink>
            <NavLink
              to="budget-categories"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Budget Categories
            </NavLink>
            <NavLink
              to="tracker"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Expense Tracker
            </NavLink>
            <NavLink
              to='set-budget'
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Set Budget
            </NavLink>
            <NavLink
              to="budget-planner"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Budget Planner
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavigation;
