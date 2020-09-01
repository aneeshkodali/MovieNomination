import React, { useContext } from 'react';
import Movie from './Movie';

const MovieList = ({ movieList }) => {

    const divStyle = {
                        height:"200px"
                        , border:"1px solid black"
                        , padding:"5px"
                    };


    // create array of movie components
    const moviesRendered = movieList.map(movie => {
        const { imdbID } = movie;
        return (
            <div 
                key={imdbID}
                style={divStyle} 
                className={`item ${imdbID}`}
            >
                <Movie 
                    movie={movie}
                />
            </div>
        )
    });
    
    return (
        <div className="ui items">
            {moviesRendered}
        </div>
    );
};

export default MovieList;