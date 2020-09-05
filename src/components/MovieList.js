import React, { useState, useEffect, useContext } from 'react';
import Movie from './Movie';
//import './MovieList.css';

const MovieList = ({ movieList }) => {



    // create array of movie components
    const moviesRendered = movieList.map((movie) => {
        const { id, title } = movie;
        return (
            <Movie key={id} movie={movie} />
        )
    });
    
    return (
        <div className="ui cards">
            {moviesRendered}
        </div>
    );
};

export default MovieList;