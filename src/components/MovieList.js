import React, { useState, useContext } from 'react';
import ButtonContext from '../contexts/ButtonContext';
import Button from './Button';
import Movie from './Movie';
import './MovieList.css';

const MovieList = ({ movieList }) => {

    

        // bring in Button attributes
        const context = useContext(ButtonContext);
        const { buttonText, buttonClick, buttonClass } = context;

    // Hook to set/update activeIndex
    const [activeIndex, setActiveIndex] = useState(null);

    // add click listener to div
    const onTitleClick = (index) => {
        const setIndex = index === activeIndex ? null : index;
        setActiveIndex(setIndex);
    };


    // create array of movie components
    const moviesRendered = movieList.map((movie, index) => {
        const active = index === activeIndex ? 'active' : '';
        const { imdbID, Title, Year } = movie;
        return (
            <div key={imdbID}>
                <div className={`title ${active}`}>
                    <span onClick={() => onTitleClick(index)}>
                        <i className="dropdown icon" />
                        <span className="title-text">{Title} ({Year})</span>
                    </span>
                    <Button
                        buttonClass={buttonClass}
                        buttonClick={() => buttonClick(movie)}
                        buttonText={buttonText}
                    />
                </div>
                <div className={`content ${active}`}>
                    <Movie movie={movie} />  
                </div>
            </div>
        )
    });
    
    return (
        <div className="ui accordion">
            {moviesRendered}
        </div>
    );
};

export default MovieList;