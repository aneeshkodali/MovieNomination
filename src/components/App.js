import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import MovieList from './MovieList';
import Dropdown from './Dropdown';
//import omdbUrl from '../apis/omdb';
//import axios from 'axios';
import useMovies from '../hooks/searchMovies';

const App = () => {
    
    // bring in variables from created hook to search for movies - initialize with no search
    const [searchResults, search, resultsText] = useMovies('');

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


    return (
        <div>
            <h1>The Shoppies Nomination Page</h1>
          
                <Searchbar onSearch={search} />

            <div className="ui grid">

                {/*movie list from search results*/}
                <div id="movie-search-list" className="six wide column">
                    <h3>{resultsText}</h3>
                    <MovieList 
                        movieList={searchResults}
                        movieButtonText='Nominate'
                        movieButtonClick={movie => setNominations([...nominations, movie])}
                    />
                </div>

                {/*movie list from nominations*/}
                <div id="movie-nomination-list" className="six wide column">
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
                <div className="4 wide column">
                    <Dropdown />
                </div>

            </div>

        </div>
    );
};

export default App;
