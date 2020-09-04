import React, { useState, useEffect, useContext } from 'react';
import Button from './Button';
import Movie from './Movie';
//import './MovieList.css';

const MovieList = ({ movieList }) => {



    // create array of movie components
    const moviesRendered = movieList.map((movie) => {
        const { id, title } = movie;
        return (
            <div key={id}>
               <Movie movie={movie} />
            </div>
        )
    });
    
    return (
        <div>
            {moviesRendered}
        </div>
    );
};

export default MovieList;