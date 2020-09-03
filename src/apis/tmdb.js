const baseUrl = 'https://api.themoviedb.org/3/movie/';

const getTMDBUrl = (imdbID) => {
    const url = `${baseUrl}${imdbID}?api_key=${process.env.REACT_APP_TMDB_KEY}`
    return url;
};

export default getTMDBUrl;