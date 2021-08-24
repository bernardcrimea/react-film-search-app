import React, { useState, useEffect } from "react";

import { CardResult } from "components/cardResult";

import Loader from "containers/Loader/Loader";
import Pagination from "containers/Pagination/Pagination";

import { mostPopulardAPI } from "components/api/movies";

export const MostPopular = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const getData = () => {
      mostPopulardAPI(currentPage)
        .then((res) => {
          setMovies(res.data.results);
          setPageCount(res.data.total_pages);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setMovies([]);
        });
    };

    getData();
  }, [currentPage]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="most-popular mt-5 mb-5">
      <h1 className="m-2">Самые популярные фильмы.</h1>

      <ul className="results row justify-content-center p-1">
        {loading ? (
          <Loader />
        ) : (
          movies.map((film) => (
            <li key={film.id} className="col mb-4 list-unstyled">
              <CardResult movie={film} />
            </li>
          ))
        )}
      </ul>
      {pageCount > 0 && (
        <div className="d-flex justify-content-center">
          <Pagination
            pages={pageCount}
            carrentPage={currentPage}
            paginate={paginate}
          />
        </div>
      )}
    </div>
  );
};
