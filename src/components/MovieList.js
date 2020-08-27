import React from 'react';
import Movie from './Movie';

const MovieList = ({ movieList, movieButtonText, movieButtonClick }) => {

    // create array of movie components
    const moviesRendered = movieList.map(movie => {
        return (
                <Movie 
                    key={movie.imdbID}
                    movie={movie}
                    movieButtonText={movieButtonText}
                    movieButtonClick={movieButtonClick}
                />
        )
    });
    
    return (
        <div className="ui divided items">
            {moviesRendered}
        </div>
    );
};

export default MovieList;