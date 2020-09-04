import React, { useState, useEffect, useContext } from 'react';
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

    // reset active index if list changes
    useEffect(() => {
        setActiveIndex(null);
    }, [movieList])


    // create array of movie components
    const moviesRendered = movieList.map((movie, index) => {
        const active = index === activeIndex ? 'active' : '';
        const { id, title, release_date } = movie;
        return (
            <div key={id}>
                <div className={`title ${active}`}>
                    <span onClick={() => onTitleClick(index)}>
                        <i className="dropdown icon" />
                        <span className="title-text">{title} ({release_date})</span>
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