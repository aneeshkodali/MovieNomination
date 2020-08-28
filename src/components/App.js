import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import MovieList from './MovieList';
import Dropdown from './Dropdown';
import SearchHistory from './SearchHistory';
//import Button from './Button';
//import omdbUrl from '../apis/omdb';
//import axios from 'axios';
import useMovies from '../hooks/searchMovies';
import ButtonContext from '../contexts/ButtonContext';

const App = () => {
    
    // bring in variables from created hook to search for movies - initialize with no search
    const [searchResults, setSearchResults, search, resultsText, setResultsText, cache] = useMovies('');


    // state for nomination list
    const [nominations, setNominations] = useState([]);
    // state for buttons
    const [buttons, setButtons] = useState([]);
    
    // state for number of remaining entries
    const MAX_ENTRIES = 5;
    const numEntriesLeft = MAX_ENTRIES - nominations.length;


    // useEffect to set buttons state when results change or nominations change
    useEffect(() => {
        // initialize array of new buttons
        const buttonsNew = [];
        // loop through each movie in the search list
        searchResults.forEach(({ imdbID }) => {
            // get the button element
            const button = document.querySelector(`#movie-search-list div.item.${imdbID} button`);
           // gray out button if # of nominations exceeded or movie already nominated
            if (numEntriesLeft <= 0 || nominations.map(m => m.imdbID).includes(imdbID)) {
                button.disabled = true;
            } else {
                button.disabled = false;
            }
            // add button to array
            buttonsNew.push(button);
        });
        // set state of new buttons
        setButtons(buttonsNew);
    }, [searchResults, nominations]);

    // function to update page with data from previously searched term
    const retrievePrevData = (term) => {
        // extracting keys
        const { searchResults, resultsText } = cache[term];
        // update the search result list
        setSearchResults(searchResults);
        // update results message
        setResultsText(resultsText);       
    }


    return (
        <div>
            <h1>The Shoppies Nomination Page</h1>
          
                <div id="movie-search">
                    <Searchbar onSearch={search} />
                </div>

            <div className="ui grid">

                {/*movie list from search results*/}
                <div id="movie-search-list" className="four wide column">
                    <h3>{resultsText}</h3>
                    <MovieList 
                        movieList={searchResults}
                        movieButtonText='Nominate'
                        movieButtonClick={movie => setNominations([...nominations, movie])}
                    />
                </div>

                {/*movie list from nominations*/}
                <div id="movie-nomination-list" className="four wide column">
                    <h3 
                        style={{display:"inline-block", marginRight:"10px"}}
                    >
                        {`Nominations (${numEntriesLeft} Left)`}
                    </h3>
                    <button 
                        onClick={() => setNominations([])}
                    >
                        Reset
                    </button>
                   <MovieList
                        movieList={nominations}
                        movieButtonText='Remove'
                        movieButtonClick={movie => setNominations(nominations.filter(m => m !== movie))}
                    />
                </div>

                {/*select/add nomination lists*/}
                <div className="four wide column">
                    <Dropdown />
                </div>

                {/*previous search terms (these are cached)*/}
                <div className="four wide column">
                    <h3>Previous Search Terms</h3>
                    <ButtonContext.Provider value={{buttonClick: retrievePrevData, buttonText: "Remember Me"}}>
                        <SearchHistory cache={cache} />
                    </ButtonContext.Provider>
                    
                </div>

            </div>

        </div>
    );
};

export default App;
