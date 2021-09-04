import React from "react";
import { Offcanvas, Collapse } from "bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import MasterHome from "./components/MasterHome/";
import GameAlbums from "./components/GameAlbums/";
import { CoverSpinner } from "./components/Generics/";
import {
  CollapsableNavBar,
  scrollWithNavBarOffset,
} from "./components/NavBars";
import {
  API_GAMEBLOGPAGES_WITH_THUMBNAIL_URL,
  API_GAMEINDEXPAGES_WITH_FIELDS,
  API_ROOT,
  COLLAPSE_NAVBAR_ID,
  SPINNER_ID,
} from "./constants";

import { useRef, useEffect, useState } from "react";
import { sleep } from "./components/Generics/";

import { offset } from "@popperjs/core";

export const App = () => {
  const [done, setDone] = useState();

  const navBarRef = useRef();
  const navbarToCollapse = useRef();
  const navBarCollapseControl = useRef();

  const navBarStatus = useRef(false);
  const isNavBarHiding = useRef(false);
  const isNavBarShowing = useRef(false);

  const spinner = useRef();

  useEffect(() => {
    spinner.current = Collapse.getOrCreateInstance(
      document.getElementById(SPINNER_ID),
      { toggle: false }
    );
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

    window.addEventListener("hashchange", offsetFragmentScroll);
  }, []);

  useEffect(() => {
    if (done)
      sleep(500).then(() => {
        spinner.current.hide();
      });
    else {
      spinner.current.show();

      if (navBarStatus.current == true) {
        if (isNavBarShowing.current) {
          navbarToCollapse.current.addEventListener(
            "shown.bs.offcanvas",
            hideNavBar
          );
        } else {
          hideNavBar();
        }
      }
    }
  }, [done]);

  const offsetFragmentScroll = () => {
    if (window.location.hash) {
      var hash = window.location.hash.substring(1);
      if (document.getElementById(hash) == null)
        scrollWithNavBarOffset(
          document.getElementById(hash),
          navBarRef,
          window
        );
    }
  };

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
        <CoverSpinner id={SPINNER_ID} />
        <CollapsableNavBar
          containerId={COLLAPSE_NAVBAR_ID}
          refProps={navBarRef}
          loading={{ setDone }}
        />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <MasterHome navBarRefProp={navBarRef} loading={{ setDone }} />
            )}
          ></Route>
          <Route
            exact
            path="/collections"
            render={() => (
              <GameAlbums
                navBarRefProp={navBarRef}
                loading={{ setDone }}
                albumDataUrl={API_GAMEINDEXPAGES_WITH_FIELDS}
                albumBannerUrl={
                  API_ROOT +
                  "/media/original_images/Top-10-Best-Optimized-PC-Games-2020.jpg"
                }
                idProps={"carousel-collections"}
              />
            )}
          ></Route>
        </Switch>
      </div>
    </Router>
  );
};
