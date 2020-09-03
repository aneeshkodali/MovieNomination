import React from 'react';
import './Movie.css';

const Movie = ({ movie }) => {


    const { Title, Year, Poster, imdbID } = movie;

    return (
        <div className="ui items">
            <div className="item">
                <div className="image">
                    <img src={Poster} alt={Title} />
                </div>
                <div className="content">
                    <div className="header">{Title}</div>
                    <div className="meta">{Year}</div>
                    <div className="description">MAYBE DESCRIPTION GOES HERE</div>
                </div>
            </div>
        </div>
    );
};

export default Movie;

