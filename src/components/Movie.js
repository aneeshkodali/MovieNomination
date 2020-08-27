import React from 'react';

const Movie = ({ movie, buttonText, buttonClick }) => {

    // extract keys from movie object
    const { Title, Year, Poster } = movie;

    return (
        <div>
            {/*<img src={Poster} alt={Title} />*/}
            {`${Title} (${Year})`}
            <button onClick={buttonClick}>{buttonText}</button>
        </div>
    );
};

export default Movie;