import React, { useContext } from 'react';

import ButtonContext from '../contexts/ButtonContext';
import { tmdbPoster } from '../apis/tmdb';
//import './Movie.css';
import Button from './Button';

const Movie = ({ movie }) => {

    const context = useContext(ButtonContext);
    const { buttonClass, buttonClick, buttonText} = context;


    const { poster_path, title, genres, overview, release_date, tagline, runtime } = movie;

    const posterImg = poster_path ? tmdbPoster(poster_path) : '/imageNotFound.jpg';
    
    console.log(movie);
    
    const genreString = genres.map(genre => genre.name).join(' | ');

    return (
        <div className="ui card fade reveal" style={{height:"300px", width:"200px"}}>
            <img src={posterImg} alt={title} className="visible content" style={{height:"100%", width:"100%"}} />
            <div className="hidden content">
                <Button 
                    buttonClass={buttonClass}
                    buttonText={buttonText}
                    buttonClick={buttonClick}
                />
                <div className="header">
                    {title} ({release_date.substr(0,4)})
                </div>
                <div className="meta">Released: {release_date}</div>
                <div className="meta">Runtime: {runtime} min.</div>
                <div className="meta">{genreString}</div>
                <div className="description">{tagline}</div>
            </div>     
        </div>       
         //<div className="ui card">
        //    <div className="content">
        //        <Button 
        //            buttonClass={buttonClass}
        //            buttonText={buttonText}
        //            buttonClick={buttonClick}
        //        />
        //        <div className="header">{title}</div>
        //        <div className="meta">
        //        {genreString}
        //        {release_date}
        //        </div>
        //        <div className="description">{tagline}</div>
        //    </div>
        //</div>
    );
};

export default Movie;

