import React, { Component } from "react";
import "./index.css";

import axios from "axios";
import { API_GAMES_URL } from "../../constants";

/* TODO Implement dynamic album item creation */
class GameAlbums extends Component {
  state = {
    games: []
  };

  componentDidMount() {
    this.resetState();
  }

  getGames = () => {
    axios.get(API_GAMES_URL).then(res => this.setState({ games: res.data}))
  }

  resetState = () => {
    this.getGames();
  };

  render() {
    const gamesCards = this.state.games.map((game) => <AlbumItem title={game.title}/>);

    return (
      <body className="game-album">
        <main>
          <section class="py-5 text-center container">
            <div class="row py-lg-5">
              <div class="col-lg-6 col-md-8 mx-auto">
                <h1 class="fw-light">Album example</h1>
                <p class="lead text-muted">
                  Something short and leading about the collection below—its
                  contents, the creator, etc. Make it short and sweet, but not
                  too short so folks don’t simply skip over it entirely.
                </p>
                <p>
                  <a href="#" class="btn btn-primary mt-2 mb-1">
                    Main call to action
                  </a>
                  <a href="#" class="btn btn-secondary mt-2 mb-1">
                    Secondary action
                  </a>
                </p>
              </div>
            </div>
          </section>

          <div class="album py-5 bg-light">
            <div class="container">
              <div class="d-flex flex-row flex-wrap justify-content-center">
                {gamesCards}
              </div>
            </div>
          </div>
        </main>

        <footer class="text-muted py-5">
          <div class="container">
            <p class="float-end mb-1">
              <a href="#">Back to top</a>
            </p>
            <p class="mb-1">
              Album example is &copy; Bootstrap, but please download and
              customize it for yourself!
            </p>
            <p class="mb-0">
              New to Bootstrap? <a href="/">Visit the homepage</a> or read our{" "}
              <a href="../getting-started/introduction/">
                getting started guide
              </a>
              .
            </p>
          </div>
        </footer>

        <script src="../assets/dist/js/bootstrap.bundle.min.js"></script>
      </body>
    );
  }
}

function AlbumItem(props) {
  return (
    <div>
      <div class="card shadow-sm m-3" style={{ width: "18rem" }}>
        <svg
          class="bd-placeholder-img card-img-top"
          width="100%"
          height="225"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Placeholder: Thumbnail"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
        >
          <title>Placeholder</title>
          <rect width="100%" height="100%" fill="#55595c" />
          <text x="50%" y="50%" fill="#eceeef" dy=".3em">
            Thumbnail
          </text>
        </svg>

        <div class="card-body">
          <h6 class="card-text">{props.title}</h6>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              <button type="button" class="btn btn-sm btn-outline-secondary">
                View
              </button>
              <button type="button" class="btn btn-sm btn-outline-secondary">
                Edit
              </button>
            </div>
            <small class="text-muted">9 mins</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameAlbums;
