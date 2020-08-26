import React, { useState } from 'react';
import Searchbar from './Searchbar';
import MovieList from './MovieList';
import omdbUrl from '../apis/omdb';
import axios from 'axios';

const App = () => {

    // state for movie list
    const [movieList, setMovieList] = useState([]);

    // state for search term
    const [searchTerm, setSearchTerm] = useState('');


    // function to search for movie term
    const search = async term => {
        // make request
        const response = await axios.get(omdbUrl,{
            params: {
                type: 'movie',
                s: term
            }
        });

        // get data from api response
        const { data } = response;

        // update movie list
        setMovieList(data.Search);

        // update search term
        setSearchTerm(term);
    };


    return (
        <div>
            <h1>Shoppies App</h1>
            <Searchbar onFormSubmit={search} />
            <MovieList 
                searchTerm={searchTerm}
                movieList={movieList}
            />
        </div>
    );
};

export default App;
