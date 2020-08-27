import React, { useState } from 'react';
import Searchbar from './Searchbar';
import MovieList from './MovieList';
import omdbUrl from '../apis/omdb';
import axios from 'axios';

const App = () => {

    // state for movie list
    const [movieList, setMovieList] = useState([]);

    // state for search result message
    const [resultMessage, setResultMessage] = useState('');


    // function to search for movie term
    const search = async term => {
        // prevent api request with blank string
        if (!term) {
            return;
        };
        // make request
        const response = await axios.get(omdbUrl,{
            params: {
                type: 'movie',
                r: 'json',
                s: term
            }
        });

        // handle bad api requests
        if (response.data.Error) {
            // show error in search result message 
            setResultMessage(`${response.data.Error} Please try another search term.`);
            
            // set movie list to empty array
            setMovieList([]);
           
        } else {
            // otherwise if good request, change states

            // get data from api response
             const { data } = response;

             // update movie list
             setMovieList(data.Search);
 
             // update search result message
             setResultMessage(`Results for: "${term}"`);
        }
    };


    return (
        <div>
            <h1>Shoppies App</h1>
            <Searchbar onSearch={search} />
            <MovieList 
                resultMessage={resultMessage}
                movieList={movieList}
            />
        </div>
    );
};

export default App;
