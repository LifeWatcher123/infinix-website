import React, { Component } from "react";
import "./index.css";

import axios from "axios";
import {
  API_ROOT,
  API_GAMEBLOGPAGES_WITH_THUMBNAIL_URL,
} from "../../constants";
/**
 * This implements a dynamic rendering of album items from an API.
 * The following props must be supplied:
 *  - albumDataUrl
 *  -
 */
class GameAlbums extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inProgress: true,
      games: [],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios.get(API_GAMEBLOGPAGES_WITH_THUMBNAIL_URL).then((res) => {
      this.setState({ games: res.data.items, inProgress: false });
    });
  };

  render() {
    const gamesCards = this.state.games.map((game) => (
      <AlbumItem key={game.id} title={game.title} url={game.album_image.url} />
    ));

    return (
      <div className="game-album py-5">
        <section className="text-center container">
          <div className="row py-lg-5">
            <div className="col-lg-6 col-md-8 mx-auto">
              <h1 className="fw-light">Album example</h1>
              <p className="lead text-muted">
                Something short and leading about the collection below—its
                contents, the creator, etc. Make it short and sweet, but not too
                short so folks don’t simply skip over it entirely.
              </p>
            </div>
          </div>
        </section>

        <div className="album py-5 bg-light">
          <div className="container">
            <div className="d-flex flex-row flex-wrap justify-content-center">
              {gamesCards}
            </div>
          </div>
        </div>

        <script src="../assets/dist/js/bootstrap.bundle.min.js"></script>
      </div>
    );
  }
}
/**
 * Component for dynamic album content.
 * Should have the following properties:
 *  - url
 *  - title
 */
const AlbumItem = (props) => {
  return (
    <div>
      <div className="card shadow-sm m-3" style={{ width: "22rem" }}>
        <img
          className="bd-placeholder-img card-img-top"
          width="100%"
          height="225"
          src={API_ROOT + props.url}
          role="img"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
        />

        <div className="card-body">
          <h6 className="card-text">{props.title}</h6>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <button type="button" className="btn btn-outline-primary">
                Open
              </button>
            </div>
            <small className="text-muted">9 mins</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameAlbums;
