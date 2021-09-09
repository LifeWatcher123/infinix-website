import React from "react";
import { NavLink } from "react-router-dom";
import { genericHashLink, NavHashLink } from "react-router-hash-link";

import { useRef } from "react";
import { withRouter } from "react-router";
import "./index.css";

export const NavBar = withRouter((props) => {
  const navBarRef = props.refProps;

  return (
    <div
      className={props.className}
      id={props.containerId}
      data-bs-toggle="false"
      data-bs-scroll={props.scrollProp == "true" ? "true" : "false"}
      data-bs-backdrop={props.backdropProp == "false" ? "false" : "true"}
      ref={navBarRef}
    >
      <nav
        id={"innernav-" + props.containerId}
        className="app-navbar navbar navbar-expand-lg navbar-dark"
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={"#" + props.containerId + "content"}
            aria-controls={props.containerId + "content"}
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id={props.containerId + "content"}
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavHashLink
                  to="/#top"
                  className="nav-link"
                  onClick={(e) => {
                    if (props.location.pathname != "/")
                      delay(e, "/#top", props.loading, props.history);
                  }}
                >
                  Home
                </NavHashLink>
              </li>
              <li className="nav-item">
                <NavHashLink
                  to="/#featured"
                  smooth
                  className="nav-link"
                  onClick={(e) => {
                    if (props.location.pathname != "/")
                      delay(e, "/#featured", props.loading, props.history);
                  }}
                  scroll={(el) => scrollWithNavBarOffset(el, navBarRef, window)}
                >
                  Featured Collections
                </NavHashLink>
              </li>
              <li className="nav-item">
                <NavHashLink
                  to="/collections/"
                  className="nav-link"
                  delay="5000"
                  onClick={(e) => {
                    if (props.location.pathname != "/collections/")
                      delay(e, "/collections/#", props.loading, props.history);
                  }}
                >
                  Collections
                </NavHashLink>
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
});

/**
 * Component extending the Navbar content with static navbar style.
 * Should have the following properties:
 *  - items
 *  - id
 */
export const CollapsableNavBar = (props) => {
  var customStyle =
    "offcanvas offcanvas-top bg-primary-mix-black-90 text-dark w-100 fixed-top offcanvas-navbar";
  return (
    <NavBar
      className={customStyle}
      containerId={props.containerId}
      refProps={props.refProps}
      loading={props.loading}
      scrollProp="true"
      backdropProp="false"
    />
  );
};

export const BlockNavBar = (props) => {
  return (
    <NavBar
      className="bg-primary-mix-black-90 text-dark w-100"
      containerId={props.containerId}
      refProps={props.refProps}
      loading={props.loading}
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

export const delay = (e, address, loading, history) => {
  loading.setDone(false);
  e.preventDefault();
  setTimeout(() => {
    history.push(address);
  }, 350);
};
