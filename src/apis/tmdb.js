const KEY = '43c78173e43c75f7171a9bafc4777d31';
const baseUrl = 'https://api.themoviedb.org/3/movie/';

const getTMDBUrl = (imdbID) => {
    const url = `${baseUrl}${imdbID}?api_key=${KEY}`
    return url;
};

export default getTMDBUrl;