import React from 'react';
import Movie from './Movie';

const MovieList = ({ resultMessage, movieList }) => {

    const nominateMovie = (event) => {
        console.log(event)
    }

    // create array of movie components
    const moviesRendered = movieList.map(movie => {
        return (
            <div 
                className="item"
                key={movie.imdbID} 
            >
                <Movie 
                movie={movie}
                buttonText='Nominate'
                buttonClick={nominateMovie}
                />
            </div>
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