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

    const seedMovieList = [
        {
            Title: 'Captain America: 1',
            Year: 2011,
            imdbID: 1
        },
        {
            Title: 'Captain America: 2',
            Year: 2012,
            imdbID: 2
        },
        {
            Title: 'Captain America: 3',
            Year: 2013,
            imdbID: 3
        },
        {
            Title: 'Captain America: 4',
            Year: 2014,
            imdbID: 4
        },
        {
            Title: 'Captain America: 5',
            Year: 2015,
            imdbID: 5
        },
        {
            Title: 'Captain America: 6',
            Year: 2016,
            imdbID: 6
        },
        {
            Title: 'Captain America: 7',
            Year: 2017,
            imdbID: 7
        }
    ]


    // function to search for movie term
    const search = async term => {
        // prevent api request with blank string
        if (!term) {
            return;
        };
        setResultMessage(`Results for: "${term}"`);
        setMovieList(seedMovieList);

        //// make request
        //const response = await axios.get(omdbUrl,{
        //    params: {
        //        type: 'movie',
        //        r: 'json',
        //        s: term
        //    }
        //});

        //// handle bad api requests
        //if (response.data.Error) {
        //    // show error in search result message 
        //    setResultMessage(`${response.data.Error} Please try another search term.`);
            
        //    // set movie list to empty array
        //    setMovieList([]);
           
        //} else {
        //    // otherwise if good request, change states

        //    // get data from api response
        //     const { data } = response;

        //     // update movie list
        //     setMovieList(data.Search);
 
        //     // update search result message
        //     setResultMessage(`Results for: "${term}"`);
        //}
    };


    return (
        <div>
            <h1>The Shoppies Nomination Page</h1>
          
                <Searchbar onSearch={search} />
            
                <MovieList 
                    resultMessage={resultMessage}
                    movieList={movieList}
                />

                <MovieList 
                    resultMessage={resultMessage}
                    movieList={movieList}
                />
        </div>
    );
};

export default App;
