import React from 'react';

const MovieList = ({ searchTerm, movieList }) => {
    return (
        <div>
            {searchTerm}
            {movieList.length}
        </div>
    );
};

export default MovieList;