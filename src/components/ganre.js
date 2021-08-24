import React, { useState, useEffect } from "react";

import { genreAPI } from "components/api/movies";

export const GenreSelectLinks = ({ id }) => {
  const [genres, setGenre] = useState([]);

  useEffect(() => {
    genreAPI()
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
