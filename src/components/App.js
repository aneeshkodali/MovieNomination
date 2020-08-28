import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import MovieList from './MovieList';
import Dropdown from './Dropdown';
import SearchHistory from './SearchHistory';
import Button from './Button';
//import omdbUrl from '../apis/omdb';
//import axios from 'axios';
import useMovies from '../hooks/searchMovies';
import ButtonContext from '../contexts/ButtonContext';

const App = () => {
    
    // bring in variables from created hook to search for movies - initialize with no search
    const [searchResults, setSearchResults, search, resultsText, setResultsText, cache, setCache] = useMovies('');

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
    const retrieveHistory = (term) => {
        //// extracting keys
        //const { searchResults, resultsText } = cache[term];
        //// update the search result list
        //setSearchResults(searchResults);
        //// update results message
        //setResultsText(resultsText);
        console.log(term);
    };

    // function to remove term and its data from search history
    const removeHistory = (term) => {
        // delete term entry in cache
        //delete cache[term];
        //setCache(Object.keys(cache).filter(t => t !== term));
        console.log(term);
    };

    return (
        <div>
            <h1>The Shoppies Nomination Page</h1>
          
                <Searchbar onSearch={search} />

            <div className="ui grid">

                {/*movie list from search results*/}
                <div id="movie-search-list" className="four wide column">
                    <h3>{resultsText}</h3>
                    <ButtonContext.Provider 
                        value={{
                            buttonText: "Nominate", 
                            buttonClick: (movie => setNominations([...nominations, movie])),
                            buttonClass: "ui positive button"
                        }}
                    >
                        <MovieList movieList={searchResults} />
                    </ButtonContext.Provider>
                </div>

                {/*movie list from nominations*/}
                <div id="movie-nomination-list" className="four wide column">
                    <h3 
                        style={{display:"inline-block", marginRight:"10px"}}
                    >
                        {`Nominations (${numEntriesLeft} Left)`}
                    </h3>
                    <Button 
                        buttonText="Reset" 
                        buttonClick={() => setNominations([])}
                    />
                   <ButtonContext.Provider 
                        value={{
                            buttonText: "Remove", 
                            buttonClick: (movie => setNominations(nominations.filter(m => m !== movie))),
                            buttonClass: "ui negative button"
                        }}
                    >
                        <MovieList movieList={nominations} />
                    </ButtonContext.Provider>
                </div>

                {/*select/add nomination lists*/}
                <div className="four wide column">
                    <Dropdown />
                </div>

                {/*previous search terms (these are cached)*/}
                <div className="four wide column">
                    <h3>Previous Search Terms</h3>
                    <div>
                        {/*{histRendered}*/}
                        <SearchHistory
                            cache={cache}
                            retrieveHistory={retrieveHistory}
                            removeHistory={removeHistory}         
                        />
                    </div>

                    
                </div>

            </div>

        </div>
    );
};

export default App;
