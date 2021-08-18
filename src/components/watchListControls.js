import React, { useContext } from "react";
import { GlobalContext } from "context/globalState";

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const WatchListControls = ({ movie, type, id }) => {
  const {
    removeMovieFromWatchlist,
    addToWatched,
    moveToWatchList,
    removeMovieFromWatched,
    watchlist,
    // watched,
  } = useContext(GlobalContext);

  let storedMovie = watchlist.find((o) => o.id === movie.id);

  // let storedMovieWatched = watched.find((o) => o.id === movie.id);

  const watchListDisabled = storedMovie ? true : false;
  // : storedMovieWatched
  // ? true

  return (
    <div>
      {type === "watchlist" && (
        <div className="constrols d-flex justify-content-start m-2">
          <Link
            onClick={() => addToWatched(movie)}
            className="btn btn-outline-success me-2"
            style={{ zIndex: 100 }}
            to="/single"
          >
            <FontAwesomeIcon icon={faEye} />
          </Link>
          <button
            onClick={() => removeMovieFromWatchlist(id)}
            className="btn btn-outline-danger"
            style={{ zIndex: 100 }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      )}

      {type === "watched" && (
        <div className="constrols d-flex justify-content-start m-2">
          <button
            onClick={() => moveToWatchList(movie)}
            disabled={watchListDisabled}
            className="btn btn-outline-success me-2"
            style={{ zIndex: 100 }}
          >
            <FontAwesomeIcon icon={faArrowUp} />
          </button>

          <button
            onClick={() => removeMovieFromWatched(id)}
            className="btn btn-outline-danger"
            style={{ zIndex: 100 }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      )}
    </div>
  );
};

export default WatchListControls;
