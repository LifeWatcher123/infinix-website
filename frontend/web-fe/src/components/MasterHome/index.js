import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import MasterIndexCarousel from "../MasterIndexCarousel";
import { NavBar, scrollWithNavBarOffset } from "../NavBars";
import { Footer } from "../Footer";

import axios from "axios";
import parse from "html-react-parser";
import { API_ROOT, API_MAIN_HOMEPAGE_URL, NAVBAR_ID } from "../../constants";
import { HashLink } from "react-router-hash-link";
import { withRouter } from "react-router-dom";

const MasterHome = withRouter((props) => {
  const [bannerTitle, setBannerTitle] = useState("");
  const [bannerSubtitle, setBannerSubtitle] = useState("");
  const [bannerImageUrl, setBannerImageUrl] = useState("");
  const [bannerCtaText, setBannerCtaText] = useState("");
  const [bannerCtaUrl, setBannerCtaUrl] = useState("");

  const albumRef = useRef();

  useEffect(() => {
    fetchData();

    // TODO Try to make the scrolling behavior neater. Could implement a subclass of NavLink to do so.
    const el = document.getElementById(props.location.hash.substring(1));
    if (el != null) scrollWithNavBarOffset(el, props.navBarRefProp, window);
    else window.scrollTo(0, 0);
  }, []);

  const fetchData = () => {
    axios
      .get(API_MAIN_HOMEPAGE_URL)
      .then((res) => {
        setBannerTitle(res.data.banner_title);
        setBannerSubtitle(res.data.banner_subtitle);
        setBannerImageUrl(API_ROOT + res.data.banner_image.meta.download_url);
        setBannerCtaText(res.data.banner_cta_text);

        setBannerCtaUrl(
          res.data.banner_cta_link_url == null
            ? res.data.banner_cta_link_page
            : res.data.banner_cta_link_url
        );
      })
      .finally(() => {
        props.loading.setDone(true);
      });
  };

  return (
    <>
      <div className="d-flex flex-column">
        <div
          className="master-head text-center text-white bg-dark d-flex flex-column vh-100"
          style={{
            backgroundImage:
              "linear-gradient(0deg, rgba(36,9,0,0.856162447889312) 0%, " +
              "rgba(121,36,9,0.5648459212786677) 21%, " +
              "rgba(221,68,0,0.18109241987810754) 45%, " +
              "rgba(221,68,0,0.18109241987810754) 82%, " +
              "rgba(13,13,13,0.5508403190377713) 99%), url(" +
              bannerImageUrl +
              ")",
          }}
        >
          <NavBar
            containerId={NAVBAR_ID}
            refProps={props.navBarRefProp}
            loading={props.loading}
          />

          <main className="m-auto pb-5">
            <h1>{bannerTitle}</h1>
            <div className="my-2">{parse(bannerSubtitle)}</div>
            <p className="lead">
              <HashLink
                to="/#featured"
                className="text-dark btn btn-lg btn-secondary fw-bold border-white bg-white"
                scroll={(el) =>
                  scrollWithNavBarOffset(el, props.navBarRefProp, window)
                }
              >
                {bannerCtaText}
              </HashLink>
            </p>
          </main>
        </div>
        <MasterIndexCarousel refProps={albumRef} idProps="featured" />
      </div>
      <Footer />
    </>
  );
});
export default MasterHome;
