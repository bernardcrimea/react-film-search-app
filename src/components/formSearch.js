import React, { useState } from "react";
import axios from "axios";
import { CardResult } from "./cardResult";
import Loader from "../containers/Loader/Loader";

export default function FormSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const onSearchResult = (e) => {
    e.preventDefault();

    setQuery(e.target.value);

    const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${e.target.value}`;

    try {
      axios
        .get(SEARCH_URL)
        .then((data) => {
          setResults(data.data.results);
          setLoading(false);
        })
        .catch(() => {
          setResults([]);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form className="d-flex m-4">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Искать фильм или сериал"
          aria-label="Search"
          value={query}
          onChange={onSearchResult}
        />
      </form>

      {results.length > 0 && (
        <ul className="results row justify-content-center">
          {loading ? (
            <Loader />
          ) : (
            results.map((movie) => (
              <li key={movie.id} className="col mb-4 list-unstyled">
                <CardResult movie={movie} />
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}