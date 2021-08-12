import React, { useState, useEffect } from "react";
import axios from "axios";

export const GenreSelectLinks = ({ id }) => {
  const [genres, setGenre] = useState([]);

  useEffect(() => {
    const genreListsUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;
    axios
      .get(genreListsUrl)
      .then((res) => setGenre(res.data.genres))
      .catch((error) => {
        console.log(error);
        setGenre([]);
      });
  }, []);

  const genreIndex = id.id;

  const genreList = [];

  console.log(genreIndex);

  genreList.map((genre) => (
    <>
      <li key={genre.id} className="list-unstyled me-1">
        <span className="badge bg-dark text-decoration-none">{genre.name}</span>
      </li>
    </>
  ));
};
