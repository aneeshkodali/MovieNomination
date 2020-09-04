import React, { useContext } from 'react';

import ButtonContext from '../contexts/ButtonContext';
import { tmdbPoster } from '../apis/tmdb';
import './Movie.css';
import Button from './Button';

const Movie = ({ movie }) => {

    const context = useContext(ButtonContext);
    const { buttonClass, buttonClick, buttonText} = context;


    const { poster_path, title, genres, overview, release_date, tagline } = movie;

    const posterImg = poster_path ? tmdbPoster(poster_path) : '/imageNotFound.jpg';
    
    console.log(movie);
    
    const genreString = genres.map(genre => genre.name).join(' | ');
    //{poster_path ? tmdbPoster(poster_path) : '/imageNotFound.jpg'}

    return (
        <div>
            {title}
            {genreString}
            {release_date}
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

