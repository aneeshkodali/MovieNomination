import React from 'react';

const Movie = ({ movie, buttonText, buttonClick }) => {

    // extract keys from movie object
    const { Title, Year, Poster } = movie;

    return (
        <React.Fragment>
            <div className="image">
                <img src={Poster} alt={Title} />
            </div>
            <div className="content">
                <div className="header">{`${Title} (${Year})`}</div>
                <div className="extra">
                    <div className="extra">
                       <button
                            className="ui floated primary button"
                            onClick={buttonClick}
                        >
                            {buttonText}
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Movie;

