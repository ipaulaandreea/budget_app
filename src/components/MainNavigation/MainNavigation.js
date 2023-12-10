import classes from "./MainNavigation.module.css";
import { NavLink } from "react-router-dom";
import logoutFunc from '../../logout'
import { Nav, Navbar, Container } from "react-bootstrap";
import {useState, useEffect} from 'react';


function MainNavigation() {
let user = localStorage.getItem('user')
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
              Categories
            </NavLink>
            <NavLink
              to="tracker"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Tracking Page
            </NavLink>
            <NavLink
              to='set-budget'
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Budget
            </NavLink>
            {/* <NavLink
              to="budget-planner"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Stats
            </NavLink> */}
            <NavLink
              to="auth"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Authentication
            </NavLink>
          
            <NavLink 
              to="logout"
                onClick={logoutFunc}>
              Logout
            </NavLink>

          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavigation;
