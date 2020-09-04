const baseUrl = 'https://api.themoviedb.org/3/movie/';

const getTMDBUrl = (imdbID) => {
    const url = `${baseUrl}${imdbID}?api_key=${process.env.REACT_APP_TMDB_KEY}`
    return url;
};

const { REACT_APP_TMDB_KEY } = process.env

export const tmdbSearchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${REACT_APP_TMDB_KEY}`;
export const tmdbMovieUrl = (id) => `https://api.themoviedb.org/3/movie/${id}?api_key=${REACT_APP_TMDB_KEY}`;

export default getTMDBUrl;