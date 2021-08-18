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

export const apiSearch = `${apiBase}${apiFilmSearch}${apiKey}&query=`;

export const apiPopular = `${apiBase}${apiMostPopular}${apiKey}${apiLang}&page=`;

export const apiRated = `${apiBase}${apiTopRaited}${apiKey}${apiLang}&page=`;

export const apiGenre = `${apiBase}${apiGenreList}${apiKey}${apiLang}`;
