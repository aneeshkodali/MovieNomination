import React from 'react';
import Movie from './Movie';

const MovieList = ({ resultMessage, movieList }) => {

    // create array of movie components
    const moviesRendered = movieList.map(movie => {
        return (
            <Movie key={movie.imdbID} movie={movie} />
        )
    });
    

    return (
        <div>
            {resultMessage}
            {moviesRendered}
        </div>
    );
};

export default MovieList;