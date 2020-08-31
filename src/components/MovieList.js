import React from 'react';
import Movie from './Movie';

const MovieList = ({ movieList }) => {

    const cardStyle = {height:"300px"};


    // create array of movie components
    const moviesRendered = movieList.map(movie => {
        return (
            <div style={cardStyle} className={`card ${movie.imdbID}`}>
                <Movie 
                    key={movie.imdbID}
                    movie={movie}
                />
            </div>
        )
    });
    
    return (
        <div className="ui cards">
            {moviesRendered}
        </div>
    );
};

export default MovieList;