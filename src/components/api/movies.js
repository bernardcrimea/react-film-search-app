import axios from "axios";

const apiBase = `https://api.themoviedb.org/3`;
const apiFilmSearch = `/search/movie?`;
const apiMostPopular = `/movie/popular?`;
const apiTopRaited = `/movie/top_rated?`;
const apiKey = `api_key=${process.env.REACT_APP_TMDB_API_KEY}`;
const apiLang = `&language=en-US`;
const apiGenreList = `/genre/movie/list?`;

export const apiImg200 = `https://image.tmdb.org/t/p/w200`;
export const apiPlh200 = `https://via.placeholder.com/245x370`;

export const apiImg500 = `https://image.tmdb.org/t/p/w500`;

const apiSearch = `${apiBase}${apiFilmSearch}${apiKey}&query=`;

const apiPopular = `${apiBase}${apiMostPopular}${apiKey}${apiLang}&page=`;

const apiRated = `${apiBase}${apiTopRaited}${apiKey}${apiLang}&page=`;

const apiGenre = `${apiBase}${apiGenreList}${apiKey}${apiLang}`;

export const searchAPI = async (e) => {
  return await axios.get(`${apiSearch}${e.target.value}`);
};

export const genreAPI = async () => {
  return await axios.get(apiGenre);
};

export const getRatedAPI = async (currentPage) => {
  return await axios.get(`${apiRated}${currentPage}`);
};

export const mostPopulardAPI = async (currentPage) => {
  return await axios.get(`${apiPopular}${currentPage}`);
};
