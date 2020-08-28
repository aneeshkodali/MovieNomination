import React, { useContext } from 'react';
import ButtonContext from '../contexts/ButtonContext';
import Button from './Button';

const Movie = ({ movie }) => {

    // bring in Button attributes
    const context = useContext(ButtonContext);
    const { buttonText, buttonClick, buttonClass } = context;

    // extract keys from movie object
    const { Title, Year, Poster, imdbID } = movie;

    return (
        <div className={`item ${imdbID}`}>
            <div className="image">
                <img src={Poster} alt={Title} />
            </div>
            <div className="content">
                <div className="header">{`${Title} (${Year})`}</div>
                <div className="extra">
                    <Button
                        buttonClass={buttonClass}
                        buttonClick={() => buttonClick(movie)}
                        buttonText={buttonText}
                    />
                </div>
            </div>
        </div>
    );
};

export default Movie;

