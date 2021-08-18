import React, { useContext } from "react";
import { GlobalContext } from "context/globalState";

import { apiImg200, apiPlh200 } from "components/api/movies";
// import { GenreSelectLinks } from "./ganre";

export const CardResult = ({ movie }) => {
  const isAuth = localStorage.getItem("token");

  const { addMovieToWatchList, watchlist, watched } = useContext(GlobalContext);

  let storedMovie = watchlist.find((o) => o.id === movie.id);

  let storedMovieWatched = watched.find((o) => o.id === movie.id);

  const watchListDisabled = storedMovie
    ? true
    : storedMovieWatched
    ? true
    : false;

  const style = {
    maxWidth: "226px",
  };

  return (
    <div className="card bg-dark text-white" style={style}>
      {movie.poster_path ? (
        <img
          src={`${apiImg200}${movie.poster_path}`}
          alt={`${movie.title} Poster`}
        />
      ) : (
        <img src={apiPlh200} alt={`${movie.title} Poster`} />
      )}

      <div className="card-img-overlay">
        <span className="badge bg-success mb-5">{movie.release_date}</span>
        <ul>{/* <GenreSelectLinks id={movie.genre_ids} /> */}</ul>
      </div>
      {isAuth ? (
        <button
          className="btn btn-primary btn-sm"
          style={{ zIndex: 100 }}
          disabled={watchListDisabled}
          onClick={() => addMovieToWatchList(movie)}
        >
          Добавить в избранное
        </button>
      ) : null}
    </div>
  );
};
