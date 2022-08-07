import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import "./NavBar.css";
import "bootstrap/dist/css/bootstrap.min.css";

function NavBar() {
  return (
    <div className="nvbr-container">
      <Navbar id="navbar" variant="white">
        <Navbar.Brand> LOGO</Navbar.Brand>
        <Nav>
          <Nav.Link>menu 1</Nav.Link>
          <Nav.Link>menu 2</Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;
