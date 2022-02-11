import React from "react";
import { NavBar } from "./NavBar";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import styles from "../../styles/Navbar.module.scss"

export const BlockNavBar = (props) => {
    return (
      <Navbar variant="dark" className={"bg-primary-mix-black-90 " + styles.app_navbar}>
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" className={styles.nav_link}>Home</Nav.Link>
            <Nav.Link href="#link" className={styles.nav_link}>Link</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
  };