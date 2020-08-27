import React from 'react';
import Movie from './Movie';

const MovieList = ({ resultMessage, movieList, movieButtonText, movieButtonClick }) => {

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
            <h3>{resultMessage}</h3>
            {moviesRendered}
        </div>
    );
};

export default MovieList;