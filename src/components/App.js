import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import MovieList from './MovieList';
import omdbUrl from '../apis/omdb';
import axios from 'axios';

const App = () => {

    // state for movie search list
    const [movieSearchList, setMovieSearchList] = useState([]);

    // state for nomination list
    const [movieNominationList, setMovieNominationList] = useState([]);

    // state for buttons
    const [buttons, setButtons] = useState([]);

    // state for search result message
    const [resultMessage, setResultMessage] = useState('');

    // state for number of remaining entries
    const MAX_NOMINATIONS = 5;
    const [numNominationsRemaining, setNumNominationsRemaining] = useState(MAX_NOMINATIONS);


    // function to search for movie term
    const search = async term => {
        // prevent api request with blank string
        if (!term) {
            setResultMessage('');
            setMovieSearchList([]);
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
            setResultMessage(`${response.data.Error}`);
            // set movie list to empty array
            setMovieSearchList([]);
           
        } else {
            // otherwise if good request, change states
            // get data from api response
             const { data } = response;
             // update movie list
             setMovieSearchList(data.Search);
             // update search result message
             setResultMessage(`Results for: "${term}"`);
        }
    };

    // function to find button for given movie
    const findButton = (movie) => {
        const button = document.querySelector(`#movie-search-list div.item.${movie.imdbID} button`);
        return button;
    };

    // useEffect to set buttons state when results change or nominations change
    useEffect(() => {

        // initialize array of new buttons
        const buttonsNew = [];
        // loop through each movie in the search list
        movieSearchList.forEach(movie => {
            // get the button element
            const button = findButton(movie);
           // gray out button if # of nominations exceeded or movie already nominated
            if (numNominationsRemaining <= 0 || movieNominationList.map(m => m.imdbID).includes(movie.imdbID)) {
                button.disabled = true;
            } else {
                button.disabled = false;
            }
            // add button to array
            buttonsNew.push(button);
        });
        // set state of new buttons
        setButtons(buttonsNew);
    }, [movieSearchList, movieNominationList]);


    // function to add a movie to the nomination list
    const nominateMovie = (movie) => {
       // update nomination list
        setMovieNominationList([...movieNominationList, movie]);
        // update number of entries
        setNumNominationsRemaining(numNominationsRemaining-1);
    };

    // function to remove movie from nomination list
    const removeNominatedMovie = (movie) => {
        // update nomination list
        setMovieNominationList(movieNominationList.filter(m => m !== movie));
        // update number of entries
        setNumNominationsRemaining(numNominationsRemaining+1);
    };


    return (
        <div className="ui container">
            <h1>The Shoppies Nomination Page</h1>
          
                <Searchbar onSearch={search} />

            <div className="ui two column grid">

                {/*movie list from search results*/}
                <div id="movie-search-list" className="column">
                    <MovieList 
                        resultMessage={resultMessage}
                        movieList={movieSearchList}
                        movieButtonText='Nominate'
                        movieButtonClick={nominateMovie}
                    />
                </div>

                {/*movie list from nominations*/}
                <div id="movie-nomination-list" className="column">
                   <MovieList
                        resultMessage={`Nominations (${numNominationsRemaining} Remaining)`}
                        movieList={movieNominationList}
                        movieButtonText='Remove'
                        movieButtonClick={removeNominatedMovie}
                    />
                </div>
                
            </div>

        </div>
    );
};

export default App;
