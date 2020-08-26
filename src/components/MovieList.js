import React from 'react';
import Movie from './Movie';

const MovieList = ({ searchTerm, movieList }) => {

    // create array of movie components
    const moviesRendered = movieList.map(movie => {
        return (
            <Movie key={movie.imdbID} movie={movie} />
        )
    });
    

    return (
        <div>
           {`Results for ${searchTerm}`}
            {moviesRendered}
        </div>
    );
};

export default MovieList;