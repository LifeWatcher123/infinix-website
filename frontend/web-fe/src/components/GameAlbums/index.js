import React, { Component, useEffect, useState, useRef } from "react";
import "./index.css";

import axios from "axios";
import parse from "html-react-parser";
import { useHistory, useLocation } from "react-router";
import {
  API_ROOT,
  API_GAMEBLOGPAGES_WITH_THUMBNAIL_URL,
  NAVBAR_ID,
  API_PAGES_URL,
} from "../../constants";
import { delay, NavBar } from "../NavBars";
import { Footer } from "../Footer";
import { PseudoBackground } from "../Generics";
import { Link } from "react-router-dom";
/**
 * This implements a dynamic rendering of album items from an API.
 * The following props must be supplied:
 *  - albumDataUrl
 */
const GameAlbums = (props) => {
  const [gameAlbumItems, setGameAlbumItems] = useState();
  const [backgroundImageUrl, _setBackgroundImageUrl] = useState("");
  const [activePseudoBackgroundLayer, _setActivePseudoBackgroundLayer] =
    useState(0);

  // For saving previous state
  const prevBackgroundImageUrlRef = React.useRef(backgroundImageUrl);
  const backgroundImageUrlRef = React.useRef(backgroundImageUrl);
  const setBackgroundImageUrl = (data) => {
    prevBackgroundImageUrlRef.current = backgroundImageUrlRef.current;
    backgroundImageUrlRef.current = data;
    _setBackgroundImageUrl(data);
  };

  // For updating inside callbacks
  const activePseudoBackgroundLayerRef = React.useRef(
    activePseudoBackgroundLayer
  );
  const setActivePseudoBackgroundLayer = (data) => {
    activePseudoBackgroundLayerRef.current = data;
    _setActivePseudoBackgroundLayer(data);
  };

  const gameAlbumCarouselRef = useRef();

  useEffect(() => {
    fetchData();

    gameAlbumCarouselRef.current.addEventListener(
      "slide.bs.carousel",
      (domObj) => {
        let banner_image_url =
          API_ROOT + domObj.relatedTarget.getAttribute("banner_image");

        setBackgroundImageUrl(banner_image_url);
        toggleActivePseudoBackground();
      }
    );
  }, []);

  const toggleActivePseudoBackground = () => {
    let currentActive = activePseudoBackgroundLayerRef.current;
    if (currentActive == 0) {
      setActivePseudoBackgroundLayer(1);
    } else {
      setActivePseudoBackgroundLayer(0);
    }
  };

  const fetchData = () => {
    axios
      .get(props.albumDataUrl)
      .then((res) => {
        setGameAlbumItems(
          res.data.items.map((gameAlbumItem, iterIndex) => {
            if (backgroundImageUrlRef.current == "")
              setBackgroundImageUrl(API_ROOT + gameAlbumItem.image.url);
            return (
              <GameAlbumItem
                key={gameAlbumItem.id}
                className={iterIndex == 0 ? " active" : ""}
                banner_title={gameAlbumItem.title}
                banner_subtitle={gameAlbumItem.introduction}
                banner_image={gameAlbumItem.image.url}
                data={gameAlbumItem.children}
                loading={props.loading}
              />
            );
          })
        );
      })
      .finally(() => {
        props.loading.setDone(true);
      });
  };

  return (
    <>
      <PseudoBackground
        backgroundImageUrl={
          activePseudoBackgroundLayer == 0
            ? backgroundImageUrl
            : prevBackgroundImageUrlRef.current
        }
        opacity={activePseudoBackgroundLayer == 0 ? "1" : "0"}
      />
      <PseudoBackground
        backgroundImageUrl={
          activePseudoBackgroundLayer == 1
            ? backgroundImageUrl
            : prevBackgroundImageUrlRef.current
        }
        opacity={activePseudoBackgroundLayer == 1 ? "1" : "0"}
      />
      <div
        className="game-album"
        style={{
          backgroundImage:
            "linear-gradient(0deg, rgba(25,12,0,0.95) 0%, rgba(25,12,0,0.85) 76%, rgba(25,12,0,0.95) 100%)",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <NavBar
          containerId={NAVBAR_ID}
          refProps={props.navBarRefProp}
          loading={props.loading}
        />
        <div
          id={props.idProps}
          className="carousel slide"
          data-bs-interval="3000"
          data-bs-ride="carousel"
          ref={gameAlbumCarouselRef}
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target={"#" + props.idProps}
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target={"#" + props.idProps}
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target={"#" + props.idProps}
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">{gameAlbumItems}</div>
          <button
            className="game-album-header carousel-control-prev"
            type="button"
            data-bs-target={"#" + props.idProps}
            data-bs-slide="prev"
            onClick={window.scrollTo(0, 0)}
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="game-album-header carousel-control-next"
            type="button"
            data-bs-target={"#" + props.idProps}
            data-bs-slide="next"
            onClick={window.scrollTo(0, 0)}
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <Footer />
      </div>
    </>
  );
};

const GameAlbumItem = (props) => {
  const [albumItems, setAlbumItems] = useState();

  useEffect(() => {
    setAlbumItems(
      props.data.map((game) => {
        return (
          <AlbumItem
            key={`album-item-${game.id}`}
            id={game.id}
            title={game.title}
            published_date={game.published_date}
            album_url={game.album_image.url}
            loading={props.loading}
          />
        );
      })
    );
  }, []);

  return (
    <div
      className={"carousel-item" + props.className}
      banner_image={props.banner_image}
    >
      <section className="game-album-header text-center container banner-text-shadow text-light py-5">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">{props.banner_title}</h1>
            <div className="lead">{parse(props.banner_subtitle)}</div>
          </div>
        </div>
      </section>

      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center ">{albumItems}</div>
        </div>
      </div>
    </div>
  );
};
/**
 * Component for dynamic album content.
 * Should have the following properties:
 *  - url
 *  - title
 *  - published_date
 */
const AlbumItem = (props) => {
  const history = useHistory();
  const location = useLocation();
  return (
    <div className="col-lg-4 d-flex align-items-stretch">
      <div className="card shadow-sm m-3" style={{ width: "22rem" }}>
        <img
          className="bd-placeholder-img card-img-top"
          width="100%"
          height="225"
          src={API_ROOT + props.album_url}
          role="img"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
        />

        <div className="card-body">
          <h6 className="card-text">{props.title}</h6>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <Link
                type="button"
                to={`/blog/${props.id}`}
                className="btn btn-outline-primary"
                onClick={(e) => {
                  if (location.pathname.split("/")[1] != "blog")
                    delay(e, `/blog/${props.id}`, props.loading, history);
                }}
              >
                Open
              </Link>
            </div>
            <small className="text-muted">{props.published_date}</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameAlbums;
