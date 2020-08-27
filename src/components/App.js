import React, { useState } from 'react';
import Searchbar from './Searchbar';
import MovieList from './MovieList';
import omdbUrl from '../apis/omdb';
import axios from 'axios';

const App = () => {

    // state for movie search list
    const [movieSearchList, setMovieSearchList] = useState([]);

    // state for nomination list
    const [movieNominationList, setMovieNominationList] = useState([]);

    // state for search result message
    const [resultMessage, setResultMessage] = useState('');

    // seed data (delete later)
    const title = "Captain America";
    const poster = 'https://m.media-amazon.com/images/M/MV5BMzA2NDkwODAwM15BMl5BanBnXkFtZTgwODk5MTgzMTE@._V1_.jpg';
    let year = 2011;
    let i = 1;
    const seedMovieList = [];
    while (i <= 10) {
        let movieObj = {
            Title: `${title}: ${i}`,
            Year: year,
            imdbID: i,
            Poster: poster
        };
        seedMovieList.push(movieObj);
        i++;
        year++;
    };



    // function to search for movie term
    const search = async term => {
        // prevent api request with blank string
        if (!term) {
            return;
        };
        setResultMessage(`Results for: "${term}"`);
        setMovieSearchList(seedMovieList);

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

    // function to add a movie to the nomination list
    const nominateMovie = (movie) => {
        // add movie to nominationlist
        const movieNominationListNew=[...movieNominationList, movie]
        setMovieNominationList(movieNominationListNew);
    }

    // function to remove movie from nomination list
    const removeNominatedMovie = (movie) => {
        // update list of nominated movies
        const movieNominationListNew = movieNominationList.filter(m => m!== movie);
        setMovieNominationList(movieNominationListNew);
    }


    return (
        <div>
            <h1>The Shoppies Nomination Page</h1>
          
                <Searchbar onSearch={search} />

            <div className="ui two column grid">
                {/*movie list from search results*/}
                <div className="column">
                    <MovieList 
                        resultMessage={resultMessage}
                        movieList={movieSearchList}
                        movieButtonText='Nominate'
                        movieButtonClick={nominateMovie}
                    />
                </div>
                {/*movie list from nominations*/}
                <div className="column">
                   <MovieList
                        resultMessage='Nomination List'
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
