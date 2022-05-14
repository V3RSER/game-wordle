import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse } from "reactstrap";

const Header = () => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };
  const navigate = useNavigate();

  return (
    <header>
      <Navbar
        className="bg-black-trasparent"
        dark
        expand="md"
        fixed="top"
        light>
        <NavbarBrand href={process.env.PUBLIC_URL} style={{ padding: 0 }}>
          <img
            src={`${process.env.PUBLIC_URL}/svg/logo_1.svg`}
            width="100"
            alt=""
            className="d-inline-block align-middle mr-2"
          />
        </NavbarBrand>
        <NavbarToggler
          onClick={() => {
            toggleNavbar();
          }}
        />
        <Collapse isOpen={!collapsed} navbar>
          <Nav className="mx-auto" navbar>
            <button
              className="btn-nav"
              onClick={() => {
                navigate(process.env.PUBLIC_URL);
              }}>
              <FontAwesomeIcon icon={faHouse} />
            </button>
          </Nav>
          <NavLink
            className="navbar-brand"
            to={`${process.env.PUBLIC_URL}/profile`}>
            Perfil
          </NavLink>
        </Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
