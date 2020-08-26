import React from 'react';
import Searchbar from './Searchbar';
import omdbUrl from '../apis/omdb';
import axios from 'axios';

const App = () => {


    // function to search for movie term
    const search = async term => {
        // make request
        const response = await axios.get(omdbUrl,{
            params: {
                type: 'movie',
                s: term
            }
        });

        // parse out the data
        const { data } = response;

        console.log(data.Search);
    };


    return (
        <div>
            <h1>Shoppies App</h1>
            <Searchbar onFormSubmit={search} />
        </div>
    );
};

export default App;
