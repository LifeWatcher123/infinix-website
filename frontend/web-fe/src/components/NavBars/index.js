import React from "react";
import { NavLink } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";

import { useRef } from "react";
import "./index.css";

// TODO Implement dynamic items
export const NavBar = (props) => {
  const navBarRef = props.refProps;

  return (
    <div
      className={props.className}
      id={props.id}
      data-bs-toggle="false"
      data-bs-scroll={props.scrollProp == "true" ? "true" : "false"}
      data-bs-backdrop={props.backdropProp == "false" ? "false" : "true"}
      ref={navBarRef}
    >
      <nav className="app-navbar navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavHashLink to="/#top" className="nav-link">
                  Home
                </NavHashLink>
              </li>
              <li className="nav-item">
                <NavHashLink
                  to="/#featured"
                  className="nav-link"
                  scroll={(el) => scrollWithNavBarOffset(el, navBarRef, window)}
                >
                  Featured Collections
                </NavHashLink>
              </li>
              <li className="nav-item dropdown">
                <NavHashLink
                  to="/collections"
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Collections
                </NavHashLink>
                <ul
                  className="dropdown-menu dropdown-menu-dark"
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-primary text-bold" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

/**
 * Component extending the Navbar content with static navbar style.
 * Should have the following properties:
 *  - items
 *  - id
 */
export const CollapsableNavBar = (props) => {
  var customStyle =
    "offcanvas offcanvas-top bg-primary-mix-black-90 text-dark w-100 px-5 fixed-top offcanvas-navbar";
  return (
    <NavBar
      items={props.items}
      className={customStyle}
      id={props.id}
      refProps={props.refProps}
      scrollProp="true"
      backdropProp="false"
    />
  );
};

export const scrollWithNavBarOffset = (el, navBarRef, window) => {
  var headerOffset = navBarRef.current.clientHeight;
  var elementPosition = el.getBoundingClientRect().top;
  var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
};
