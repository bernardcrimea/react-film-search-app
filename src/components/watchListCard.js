import React from "react";

import WatchListControls from "components/watchListControls";

const WatchListCard = ({ movie, type, id }) => {
  const style = {
    padding: "1rem",
    border: "1px solid #000",
    color: "#fff",
    background: "#282c34",
    borderRadius: "5px",
    opacity: "0.8",
  };

  return (
    <div className="card bg-dark text-white">
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={`${movie.title} Poster`}
        />
      ) : (
        <img
          src={`https://via.placeholder.com/245x370`}
          alt={`${movie.title} Poster`}
        />
      )}

      <div className="card-img-overlay">
        <h5 className="card-title  " style={style}>
          {movie.title}
        </h5>
        <span className="badge bg-success mb-5">{movie.release_date}</span>
      </div>
      <WatchListControls type={type} id={id} movie={movie} />
    </div>
  );
};

export default WatchListCard;
