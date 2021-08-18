import React, { useContext } from "react";
import { GlobalContext } from "context/globalState";
import WatchListCard from "components/watchListCard";
import Watched from "components/watched";

export const Favorite = () => {
  const { watchlist } = useContext(GlobalContext);

  return (
    <div className="favorites">
      <div className="d-flex justify-content-between">
        <h1 className="watched"> Мои фильмы </h1>
        {watchlist.length > 0 && (
          <span>
            {watchlist.length} &nbsp;
            <strong>
              {watchlist.length === 1
                ? "фильм"
                : watchlist.length >= 5
                ? "фильмов"
                : "фильма"}
            </strong>
          </span>
        )}
      </div>
      {watchlist.length > 0 ? (
        <ul className="row justify-content-center p-1">
          {watchlist.map((movie) => (
            <li key={movie.id} className="col-sm-3 m-3 list-unstyled">
              <WatchListCard movie={movie} id={movie.id} type="watchlist" />
            </li>
          ))}
        </ul>
      ) : (
        <h6>Нет выбранных фильмов</h6>
      )}
      <Watched />
    </div>
  );
};
