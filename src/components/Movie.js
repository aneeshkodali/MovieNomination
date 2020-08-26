import React from 'react';

const Movie = ({ movie }) => {

    // extract keys from movie object
    const { Title, Year, Poster } = movie;

    return (
        <div>
            <img src={Poster} alt={Title} />
            {`${Title} (${Year})`}
            <button>Nominate</button>
        </div>
    );
};

export default Movie;