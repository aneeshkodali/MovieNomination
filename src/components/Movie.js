import React, { useContext } from 'react';
import ButtonContext from '../contexts/ButtonContext';
import Button from './Button';
import './Movie.css';

const Movie = ({ movie }) => {

    // bring in Button attributes
    const context = useContext(ButtonContext);
    const { buttonText, buttonClick, buttonClass } = context;

    // extract keys from movie object
    const { Title, Year, Poster, imdbID } = movie;

    const imgDivStyle = {};
    const imgStyle = {height: "100%", width:"100%"};

    return (
        <React.Fragment>
            <div style={imgDivStyle} className="image">
                <img style={imgStyle} src={Poster} alt={Title} />
            </div>
            <div className="content">
                <div className="header">{Title}</div>
                <div className="meta">{Year}</div>
                <div className="description">MAYBE DESCRIPTION GOES HERE</div>
                <Button
                    buttonClass={buttonClass}
                    buttonClick={() => buttonClick(movie)}
                    buttonText={buttonText}
                />
            </div>
        </React.Fragment>
    );
};

export default Movie;

