import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "context/globalState";

export const Single = () => {
  const [single, setSingleMovie] = useState([]);
  const { watched } = useContext(GlobalContext);

  useEffect(() => {
    setSingleMovie(watched[0]);
  }, [watched]);

  const style = {
    width: "100%",
    minWidth: "250px",
  };

  return (
    <div className="single-page mt-5">
      <div className="single-wrapper mt-5 mb-5 ">
        <div className="single-content row">
          <div className=" col p-3">
            {single.poster_path ? (
              <img
                style={style}
                className="single-img p-1"
                src={`https://image.tmdb.org/t/p/w500${single.poster_path}`}
                alt={`${single.title} Poster`}
              />
            ) : (
              <img
                style={style}
                className="single-img p-1"
                src={`https://via.placeholder.com/500x748`}
                alt={`${single.title} Poster`}
              />
            )}
          </div>
          <div className="col p-3">
            <h1 className="m-3">{single.title}</h1>
            <p>{single.overview}</p>
            <div className="d-flex flex-wrap">
              <span className="m-2">
                Дата выхода: <strong>{single.release_date}</strong>
              </span>
              <span className="m-2">
                Популярность: <strong>{single.popularity}</strong>
              </span>
              <span className="m-2">
                Рейтинг: <strong>{single.vote_average}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
