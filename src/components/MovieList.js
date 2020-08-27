import React from 'react';
import Movie from './Movie';

const MovieList = ({ resultMessage, movieList }) => {

    const nominateMovie = (event) => {
        console.log(event)
    }

    // create array of movie components
    const moviesRendered = movieList.map(movie => {
        return (
            <Movie 
                key={movie.imdbID} 
                movie={movie}
                buttonText='Nominate'
                buttonClick={nominateMovie}
            />
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