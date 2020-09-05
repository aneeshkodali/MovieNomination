import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import MovieList from './MovieList';
import Dropdown from './Dropdown';
import SearchHistory from './SearchHistory';
import Button from './Button';
import ButtonContext from '../contexts/ButtonContext';
import axios from 'axios';
import { tmdbSearchUrl, tmdbMovieUrl } from '../apis/tmdb';

import './App.css';


const App = () => {
    
    
    const [searchResults, setSearchResults] = useState([]);
    const [cache, setCache] = useState([]);

    const MAX_PAGES = 5;
    const MAX_RESULTS_PER_PAGE = 10;

    // function to search for a term
    const getResults = (searchTerm) => {
        // if term is empty string do nothing
        if (!searchTerm) return;

        // check if terms already in cache (i.e. already searched)
        const termRecord = cache.find(({ term }) => term === searchTerm);
        // if so, update state with that object
        if (termRecord) {
            setSearchResults(searchResults);
        } else {
            // else search api
            searchTMDB(searchTerm);
        };
    };

    // function to search TMDB
    const searchTMDB = async (term) => {

        // make request
        const response = await axios.get(tmdbSearchUrl, {
            params: {
                query: term
            }
        });
        const {data} = response;
        const movies = data.results;
        const promises = await Promise.all(
            movies.map(({ id }) => {
                const url = tmdbMovieUrl(id);
                return axios.get(url);
            })
        );
        setSearchResults(promises.map(promise => promise.data));

        // update cache
        const cacheObj = {'term': term, 'searchResults': searchResults};
        addHistory(cacheObj);
     
    }

    //// function to search api
    //const searchOMDB = async (term) => {

    //    // make axios request
    //    const response = await axios.get(omdbUrl,{
    //        params: {
    //            type: 'movie',
    //            r: 'json',
    //            s: term
    //            }
    //        });

    //    // get data from response
    //    const { data } = response;
    //    // update state for results and text
    //    const resultsText = data.Error ? data.Error : `Results for "${term}"`;
    //    setResultsText(resultsText);
    //    const searchResults = data.Error ? [] : data.Search;
    //    setSearchResults(searchResults);

    //    // update cache
    //    const cacheObj = {'term': term, 'resultsText': resultsText, 'searchResults': searchResults};
    //    addHistory(cacheObj);
    //};

    // function to add term object to cache
    const addHistory = cacheObj => {
        setCache([...cache, cacheObj]);
    };

    // function to update page with data from previously searched term
    const retrieveHistory = (cacheObj) => {
        // extracting keys
        const { term, searchResults } = cacheObj;
        // update the search result list
        setSearchResults(searchResults);
        // update results message
        //setResultsText(resultsText);
    };

    // function to remove term and its data from search history
    const removeHistory = (cacheObj) => {
        // delete term entry in cache
        setCache(cache.filter(termObj => termObj.term !== cacheObj.term));
    };
    

    // initialize category list
    const categoryList = ['Best Picture', 'Animated Feature Film', 'Cinematography', 'Costume Design'
                            , 'Directing', 'Documentary', 'Film Editing'
                        ].sort();
    // state to control which category label index selected
    const indexInitial="0";
    const [categoryIndexSelected, setCategoryIndexSelected] = useState(indexInitial);
    const nominationListOfListsInitial = categoryList.map(category => {
        return {'category': category, 'nominations': []};
    });
    const [nominationListOfLists, setNominationListofLists] = useState(nominationListOfListsInitial);
    const nominationListSelectedInitial = nominationListOfLists[indexInitial].nominations
    const [nominationListSelected, setNominationListSelected] = useState(nominationListSelectedInitial);



    // function to change which category is currently selected
    const selectCategory = (event) => {
        const index = event.target.value;
        setCategoryIndexSelected(index);
        setNominationListSelected(nominationListOfLists[index].nominations);
    };

    // function to add movie to nomination list
    const addNomination = (movie) => {
        nominationListOfLists[categoryIndexSelected].nominations = [...nominationListOfLists[categoryIndexSelected].nominations, movie];
        setNominationListSelected(nominationListOfLists[categoryIndexSelected].nominations);
        setNominationListofLists(nominationListOfLists);
    };

    // function to reset nomination list
    const resetNominations = () => {
        nominationListOfLists[categoryIndexSelected].nominations = [];
        setNominationListSelected(nominationListOfLists[categoryIndexSelected].nominations);
        setNominationListofLists(nominationListOfLists);
    };

    // function to reset ALL nomination list
    const resetNominationsAll = () => {
        setNominationListSelected([]);
        setNominationListofLists(nominationListOfListsInitial);
    };

    // function to remove nomination from list
    const removeNomination = (movie) => {
        nominationListOfLists[categoryIndexSelected].nominations = nominationListOfLists[categoryIndexSelected].nominations.filter(m => m !== movie);
        setNominationListSelected(nominationListOfLists[categoryIndexSelected].nominations);
        setNominationListofLists(nominationListOfLists);
    };



    
    // state for number of remaining entries
    const MAX_ENTRIES = 5;


    // state for buttons
    const [buttons, setButtons] = useState([]);
    // useEffect to set buttons state when results change or nominations change
    useEffect(() => {
        // find all buttons in results => check if max nominations exceeded or result already nominated and disable
        const buttonsArr = document.querySelectorAll(`#movie-search-list-div button`).forEach((button, index) => {
            button.disabled = nominationListSelected.length >= MAX_ENTRIES || nominationListSelected.map(movie => movie.imdbID).includes(searchResults[index].imdbID);
            return button;
        });

        setButtons(buttonsArr);
    }, [searchResults, nominationListSelected]);




    return (
        <div>
            <div id="main-header" className="ui header">
                <h1>Movie NomiNATION</h1>
                <div id="divider"></div>
            </div>
            <div id="searchbar">
                <Searchbar onSearch={getResults} />
            </div>
            <div className="ui grid">

                {/*div to render movies from search results*/}
                {/*all buttons in this movie list are the same, so it's fine to use context*/}
                <div id="movie-search-list-div" className="six wide column">
                    <div className="ui header">
                        <h3>PLACEHOLDER</h3>
                    </div>
                    {/*pass button properties so all buttons in child components will be the same*/}
                    <ButtonContext.Provider 
                        value={{
                            buttonText: <i className="ui add icon" />, 
                            buttonClick: (movie => addNomination(movie)),
                            buttonClass: "mini ui positive right floated button icon"
                            //buttonClass: "ui positive right floated icon button"
                        }}
                    >
                        <MovieList movieList={searchResults} />
                    </ButtonContext.Provider>
                </div>

                {/*div to show movies that have been nominate*/}
                {/*again, all buttons in this list are the same, so it's fine to use context*/}
                <div id="nomination-list-div" className="six wide column">
                    <div id="nomination-header" className="ui header">
                        <h3>
                            Nominations for
                            <Dropdown 
                                options={nominationListOfLists.map(({ category, nominations}) => `${category} (${nominations.length})`)}
                                //options={categoryList}
                                optionSelected={categoryIndexSelected}
                                onSelect={selectCategory}
                            />
                            <span style={{color: nominationListSelected.length >= MAX_ENTRIES ? 'red' : ''}}>(LIMIT {MAX_ENTRIES})</span>
                            <Button 
                                buttonText="Reset" 
                                buttonClick={resetNominations}
                            />
                            {/*<Button 
                                buttonText="RESET ALL" 
                                buttonClick={resetNominationsAll}
                            />*/}
                        </h3>
                        
                    </div>
                    
                    {/*pass button properties so all buttons in child components will be the same*/}
                   <ButtonContext.Provider 
                        value={{
                            buttonText: <i className="ui minus icon" />, 
                            buttonClick: (movie => removeNomination(movie)),
                            buttonClass: "ui negative icon button"
                        }}
                    >
                        <MovieList movieList={nominationListSelected} />
                    </ButtonContext.Provider>
                </div>

               

                {/*previous search terms (these are cached)*/}
                <div id="prev-search-list-div" className="four wide column">
                        <div className="ui header">
                            <h3>Previous Search Terms</h3>
                        </div>
                    <div id="search-history">
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
