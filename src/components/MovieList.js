//import React, { useState, useEffect, useContext } from 'react';
//import Movie from './Movie';
////import './MovieList.css';

//const MovieList = ({ movieList }) => {



//    // create array of movie components
//    const moviesRendered = movieList.map((movie) => {
//        const { id, title } = movie;
//        return (
//            <Movie key={id} movie={movie} />
//        )
//    });
    
//    return (
//        <div className="ui cards">
//            {moviesRendered}
//        </div>
//    );
//};

//export default MovieList;


import React, { useState, useEffect, useContext } from 'react';
import ButtonContext from '../contexts/ButtonContext';
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
        const year = release_date.substring(0,4);
        return (
            <div key={id}>
                <div className={`title ${active}`}>
                    <span onClick={() => onTitleClick(index)}>
                        <i className="dropdown icon" />
                        <span className="title-text">{title} ({year})</span>
                    </span>
                    <button
                        className={buttonClass}
                        onClick={() => buttonClick(movie)}
                    >
                        {buttonText}
                    </button>
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