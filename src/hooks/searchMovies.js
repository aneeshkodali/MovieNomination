import { useState, useEffect } from 'react';
import omdbUrl from '../apis/omdb';
import axios from 'axios';

const useMovies = (term) => {

    // state for movie results
    const [searchResults, setSearchResults] = useState([]);
    // state for text to display when term is searched
    const [resultsText, setResultsText] = useState('');

    const [cache, setCache] = useState({});

  
    useEffect(() => {
        search(term);
    }, [term]);

    // function to search for movie term
    const search = async term => {
        // prevent api request with blank string
        if (!term) {
            setSearchResults([]);
            setResultsText('');
            return;
        };

        // if term already searched, retrieve from cache
        if (cache[term]) {
            setSearchResults(cache[term]['searchResults']);
            setResultsText(cache[term]['resultsText']);

        } else {
            cache[term] = {};
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
                // set movie list to empty array
                setSearchResults([]);
                // set cache movie list
                cache[term]['searchResults'] = [];
                // set display text
                setResultsText(response.data.Error);
                // set cache display text
                cache[term]['resultsText'] = response.data.Error;

            } else {
                // otherwise if good request, change states
                // get data from api response
                const { data } = response;
                // update movie list
                setSearchResults(data.Search);
                // set cache movie list
                cache[term]['searchResults'] = data.Search;
                // set display text
                setResultsText(`Results for: "${term}"`);
                // set cache display text
                cache[term]['resultsText'] = `Results for: "${term}"`
            };
            // update cache
            setCache(cache);
        }
    };


    return [searchResults, setSearchResults, search, resultsText, setResultsText, cache, setCache];

};

export default useMovies;