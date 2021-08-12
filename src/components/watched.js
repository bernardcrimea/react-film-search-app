import React, { useContext } from "react";
import { GlobalContext } from "../context/globalState";
import WatchListCard from "./watchListCard";

const Watched = () => {
  const { watched } = useContext(GlobalContext);

  return (
    <>
      <div className="d-flex justify-content-between ">
        <h2 className="watched">Недавно просмотренные </h2>
        {watched.length > 0 && (
          <span>
            {watched.length} &nbsp;
            <strong>
              {watched.length === 1
                ? "фильм"
                : watched.length >= 5
                ? "фильмов"
                : "фильма"}
            </strong>
          </span>
        )}
      </div>

      {watched.length > 0 ? (
        <ul className="row justify-content-center p-1">
          {watched.map((movie) => (
            <li key={movie.id} className="col-sm-3 m-3 list-unstyled">
              <WatchListCard movie={movie} type="watched" id={movie.id} />
            </li>
          ))}
        </ul>
      ) : (
        <h6>Нет просмотренных фильмов</h6>
      )}
    </>
  );
};

export default Watched;
