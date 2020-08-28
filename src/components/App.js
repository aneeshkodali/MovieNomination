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
    const [movieNominationList, setMovieNominationList] = useState([]);
    // state for buttons
    const [buttons, setButtons] = useState([]);
    
    // state for number of remaining entries
    const MAX_NOMINATIONS = 5;
    const numNominationsRemaining = MAX_NOMINATIONS - movieNominationList.length;


    // useEffect to set buttons state when results change or nominations change
    useEffect(() => {
        // initialize array of new buttons
        const buttonsNew = [];
        // loop through each movie in the search list
        searchResults.forEach(({ imdbID }) => {
            // get the button element
            const button = document.querySelector(`#movie-search-list div.item.${imdbID} button`);
           // gray out button if # of nominations exceeded or movie already nominated
            if (numNominationsRemaining <= 0 || movieNominationList.map(m => m.imdbID).includes(imdbID)) {
                button.disabled = true;
            } else {
                button.disabled = false;
            }
            // add button to array
            buttonsNew.push(button);
        });
        // set state of new buttons
        setButtons(buttonsNew);
    }, [searchResults, movieNominationList]);


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
                        movieButtonClick={movie => setMovieNominationList([...movieNominationList, movie])}
                    />
                </div>

                {/*movie list from nominations*/}
                <div id="movie-nomination-list" className="six wide column">
                    <h3 
                        style={{display:"inline-block", marginRight:"10px"}}
                    >
                        {`Nominations (${numNominationsRemaining} Left)`}
                    </h3>
                    <button 
                        onClick={() => setMovieNominationList([])}
                    >
                        Reset
                    </button>
                   <MovieList
                        movieList={movieNominationList}
                        movieButtonText='Remove'
                        movieButtonClick={movie => setMovieNominationList(movieNominationList.filter(m => m !== movie))}
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
