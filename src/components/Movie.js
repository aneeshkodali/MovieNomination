import React, { useState, useContext } from 'react';

import ButtonContext from '../contexts/ButtonContext';
import { tmdbPoster } from '../apis/tmdb';
import './Movie.css';
import Button from './Button';

const Movie = ({ movie }) => {

    // get button attributes from Context
    const context = useContext(ButtonContext);
    const { buttonClass, buttonClick, buttonText} = context;

    // parse out movie data
    const { poster_path, title, genres, overview, release_date, tagline, runtime } = movie;

    // get movie poster path; if no poster - use the 'not found' image
    const posterImg = poster_path ? tmdbPoster(poster_path) : '/imageNotFound.jpg';
        
    // combine genre array into string
    const genreString = genres.map(genre => genre.name).join(' | ');

    // format overview
    const maxCharLen = 100;
    const overviewNew = overview.length > maxCharLen ? `${overview.substring(0,maxCharLen)}...` : overview;

    // create div to show the image
    const divImg = (<div style={{height:"100%", width:"100%"}}>
                        <img 
                            style={{height:"100%", width:"100%"}}
                            src={posterImg}  
                            alt={title} 
                        />
                </div>);

    // create div to show the movie info
    const divContent = (<div className="content">
                            <Button 
                                buttonClass={`${buttonClass}`}
                                buttonText={buttonText}
                                buttonClick={() => console.log(movie)}
                            />
                            <div className="header">{title} ({release_date.substr(0,4)})</div>
                            <div className="meta">Released: {release_date}</div>
                            <div className="meta">Runtime: {runtime} min.</div>
                            <div className="meta">{genreString}</div>
                            <div className="description">{overviewNew}</div>
                            <div className="extra content">{tagline}</div>
                        </div>);

    // initialize div to show the image
    const [divCard, setDivCard] = useState(divImg);

    // when hover over div, show content
    const hoverEnter = () => {
        setDivCard(divContent);
    };

    // when leave div, show image
    const hoverLeave = () => {
        setDivCard(divImg);
    }


    
    return (
        <div className="card"
            style={{height:"300px", width:"200px", margin:"10px"}} 
            onMouseEnter={hoverEnter}
            onMouseLeave={hoverLeave}
        >
            {divCard}
        </div>       
    );
};

export default Movie;

