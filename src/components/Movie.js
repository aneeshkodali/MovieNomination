import React from 'react';

const Movie = ({ movie, movieButtonText, movieButtonClick }) => {

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
                    <button
                        onClick={()=>movieButtonClick(movie)}
                        className="ui button"
                    >
                        {movieButtonText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Movie;

