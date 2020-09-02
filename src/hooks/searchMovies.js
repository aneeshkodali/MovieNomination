import { useState, useEffect } from 'react';
import omdbUrl from '../apis/omdb';
import getTMDBUrl from '../apis/tmdb'
import axios from 'axios';

const useMovies = (term) => {

    // state for movie results
    const [searchResults, setSearchResults] = useState([]);
    // state for text to display when term is searched
    const [resultsText, setResultsText] = useState('');
    // state for cache
    const [cache, setCache] = useState([]);

    //const search = term => {
       
        //const searchOMDB = async (term) => {
        //    const response = await axios.get(omdbUrl,{
        //    params: {
        //        type: 'movie',
        //        r: 'json',
        //        s: term
        //        }
        //    });
        //    const { data } = response;
        //    const message = data.Error ? data.Error : `Results for ${term}`;
        //    setResultsText(message);

        //    const results = data.Error ? [] : data.Search;
        //    if (!results.length) {
        //        setSearchResults([]);
        //        return;
        //    };
        //    results.forEach(movie => {
        //        const { imdbID } = movie;
        //        const searchTMDB = async (imdbID) => {
        //            const tmdbUrl = getTMDBUrl(imdbID);
        //            const response = await axios.get(tmdbUrl);
        //            const { data } = response;
        //            const movieObj = {...movie, ...data};
        //            //searchResults.push(movieObj);
        //            setSearchResults([...searchResults, movieObj]);
        //        };
        //        searchTMDB(imdbID);
        //    });
        //    //setSearchResults(results);
        //};
        //searchOMDB(term);
    //}

  
    //useEffect(() => {
    //    search(searchTerm);
    //}, [searchTerm]);

    // function to search for movie term
    const search = async searchTerm => {
        // prevent api request with blank string
        if (!searchTerm) {
            //setSearchResults([]);
            //setResultsText('');
            return;
        };

        const termRecord = cache.find(({ term }) => term === searchTerm);

        // if term already searched, retrieve from cache
        if (termRecord) {
            setSearchResults(termRecord['searchResults']);
            setResultsText(termRecord['resultsText']);

        } else {
            // initialize new object
            const termObj = {};
            termObj['term'] = searchTerm;
            // make request
            const response = await axios.get(omdbUrl,{
                params: {
                    type: 'movie',
                    r: 'json',
                    s: searchTerm
                }
            });
            // handle bad api requests
            if (response.data.Error) {
                // set movie list to empty array
                setSearchResults([]);
                // set cache movie list
                termObj['searchResults'] = [];
                // set display text
                setResultsText(response.data.Error);
                // set cache display text
                termObj['resultsText'] = response.data.Error;

            } else {
                // otherwise if good request, change states
                // get data from api response
                const { data } = response;
                // update movie list
                setSearchResults(data.Search);
                // set cache movie list
                termObj['searchResults'] = data.Search;
                // set display text
                setResultsText(`Results for: "${searchTerm}"`);
                // set cache display text
                termObj['resultsText'] = `Results for: "${searchTerm}"`
            };
            // update cache
            setCache([...cache, termObj]);
        }
    };


    return [searchResults, setSearchResults, search, resultsText, setResultsText, cache, setCache];

};

export default useMovies;