import React, { useState, useContext } from 'react';

import ButtonContext from '../contexts/ButtonContext';
import { tmdbPoster } from '../apis/tmdb';
//import './Movie.css';
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


    return (
        <div className="card">
            <div className="content">
                <div className="header">
                    {title} ({release_date.substr(0,4)})
                    <Button 
                        buttonClass={`${buttonClass}`}
                        buttonText={buttonText}
                        buttonClick={() => buttonClick(movie)}
                    />
                </div>
            </div>
            <div className="ui fade reveal">
                <div className="visible content" style={{height:"100%", width:"100%"}}>
                    <img src={posterImg} alt={title} style={{height:"100%", width: "100%"}} />
                </div>
                <div className="hidden content">
                    <div className="ui card">
                        <div className="content">
                            <div className="meta">Released: {release_date}</div>
                            <div className="meta">Runtime: {runtime} min.</div>
                            <div className="meta">{genreString}</div>
                            <div className="extra content">{tagline}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

};

export default Movie;

