import React, { useState, useEffect } from "react";
import axios from "axios";

import { CardResult } from "components/cardResult";

import Loader from "containers/Loader/Loader";
import Pagination from "containers/Pagination/Pagination";

import { apiRated } from "components/api/movies";

const TopRated = () => {
  const [raited, setReited] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`${apiRated}${currentPage}`)
        .then((res) => {
          setReited(res.data.results);
          setPageCount(res.data.total_pages);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setReited([]);
        });
    };
    getData();
  }, [currentPage]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="most-popular mt-5 mb-5">
      <h1 className="m-2">Фильмы с высоким рейтингом.</h1>

      <ul className="results row justify-content-center p-1">
        {loading ? (
          <Loader />
        ) : (
          raited.map((film) => (
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
            paginate={paginate}
            carrentPage={currentPage}
          />
        </div>
      )}
    </div>
  );
};

export default TopRated;
