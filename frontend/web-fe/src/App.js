import React from "react";
import { Offcanvas } from "bootstrap";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import MasterHome from "./components/MasterHome/";
import { CollapsableNavBar } from "./components/NavBars";

import { useRef, useEffect } from "react";

const App = () => {
  const COLLAPSE_NAVBAR_ID = "collapsable-masterhome-navbar-0001";

  const navBarRef = useRef();
  const navbarToCollapse = useRef();
  const navBarCollapseControl = useRef();

  const navBarStatus = useRef(false);
  const isNavBarHiding = useRef(false);
  const isNavBarShowing = useRef(false);

  useEffect(() => {
    navbarToCollapse.current = document.getElementById(COLLAPSE_NAVBAR_ID);
    navBarCollapseControl.current = Offcanvas.getOrCreateInstance(
      navbarToCollapse.current
    );

    navbarToCollapse.current.addEventListener(
      "shown.bs.offcanvas",
      setShowingNavBarStatus
    );
    navbarToCollapse.current.addEventListener(
      "hidden.bs.offcanvas",
      setHidingNavbarStatus
    );
    window.addEventListener("scroll", toggleNavBar);
  }, []);

  const toggleNavBar = () => {
    let scrolled = document.documentElement.scrollTop;
    let maxHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    let progress = (scrolled / maxHeight) * 100;

    if (progress >= 10 && navBarStatus.current == false) {
      if (isNavBarHiding.current) {
        navbarToCollapse.current.addEventListener(
          "hidden.bs.offcanvas",
          showNavBar
        );
      } else {
        showNavBar();
      }
    } else if (progress < 10 && navBarStatus.current == true) {
      if (isNavBarShowing.current) {
        navbarToCollapse.current.addEventListener(
          "shown.bs.offcanvas",
          hideNavBar
        );
      } else {
        hideNavBar();
      }
    }
  };

  const hideNavBar = () => {
    navBarCollapseControl.current.hide();
    navBarStatus.current = false;
    isNavBarHiding.current = true;
    navbarToCollapse.current.removeEventListener(
      "shown.bs.offcanvas",
      hideNavBar
    );
  };

  const showNavBar = () => {
    navBarCollapseControl.current.show();
    navBarStatus.current = true;
    isNavBarShowing.current = true;
    navbarToCollapse.current.removeEventListener(
      "hidden.bs.offcanvas",
      showNavBar
    );
  };

  const setHidingNavbarStatus = () => {
    isNavBarHiding.current = false;
  };

  const setShowingNavBarStatus = () => {
    isNavBarShowing.current = false;
  };
  return (
    <Router>
      <div>
        <CollapsableNavBar id={COLLAPSE_NAVBAR_ID} refProps={navBarRef} />
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              <MasterHome navBarRefProp={navBarRef}/>
            }
          ></Route>
        </Switch>
      </div>
    </Router>
  );
};
export default App;
