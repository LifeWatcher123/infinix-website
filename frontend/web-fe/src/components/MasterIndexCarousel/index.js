import React, { useEffect, useState } from "react";

import axios from "axios";
import parse from "html-react-parser";

import {
  API_GAMEINDEXPAGES_WITH_FIELDS,
  API_ROOT,
  WEBPAGE_COLLECTIONS,
} from "../../constants";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { delay } from "../NavBars";

const MasterIndexCarousel = (props) => {
  const [indices, setIndices] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get(API_GAMEINDEXPAGES_WITH_FIELDS).then((res) => {
      setIndices(res.data.items);
    });
  };

  return (
    <div
      id={props.idProps}
      className="master-index-carousel carousel slide"
      data-bs-interval="3000"
      data-bs-ride="carousel"
      ref={props.refProps}
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target={`#${props.idProps}`}
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target={`#${props.idProps}`}
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target={`#${props.idProps}`}
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner">
        {typeof indices !== "undefined"
          ? indices.map((gameIndex, iterIndex) => {
              return (
                <CarouselItem
                  key={gameIndex.id}
                  className={iterIndex == 0 ? " active" : ""}
                  imageUrl={gameIndex.image.url}
                  carouselTitle={gameIndex.title}
                  carouselIntro={gameIndex.introduction}
                  captionClass=" text-start"
                  redirectTargetId={gameIndex.id}
                  loading={props.loading}
                />
              );
            })
          : null}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target={`#${props.idProps}`}
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target={`#${props.idProps}`}
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};
export default MasterIndexCarousel;

/**
 * Component for dynamic carousel content.
 * Should have the following properties:
 *  - className
 *  - imageUrl
 *  - carouselTitle
 *  - carouselIntro
 *  - captionClass
 *  - url
 */
const CarouselItem = (props) => {
  const history = useHistory();
  const location = useLocation();

  return (
    <div
      className={"carousel-item" + props.className}
      style={{
        backgroundImage:
          "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 60%, rgba(188,178,173,0.19509802211900384) 82%, rgba(47,15,0,0.7) 100%), url(" +
          API_ROOT +
          props.imageUrl +
          ")",
        backgroundSize: "cover",
      }}
    >
      <div className={"carousel-caption" + props.captionClass}>
        <h1>{props.carouselTitle}</h1>
        {parse(props.carouselIntro)}
        <p>
          <Link
            to={"/collections/" + props.redirectTargetId}
            className="btn btn-lg btn-primary mt-5"
            onClick={(e) => {
              if (location.pathname.split("/")[1] != "collections")
                delay(e, `/collections/${props.redirectTargetId}`, props.loading, history);
            }}
          >
            Go to the list
          </Link>
        </p>
      </div>
    </div>
  );
};
CarouselItem.defaultProps = {
  className: "",
};
