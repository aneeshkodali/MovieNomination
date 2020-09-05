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
    
    const MAX_RESULTS_PER_PAGE = 5;
    const [searchResultsSelected, setSearchResultsSelected] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [resultsText, setResultsText] = useState('');
    const [cache, setCache] = useState([]);
    const [loading, setLoading] = useState(false);


    // function to search for a term
    const getResults = (searchTerm) => {
        // if term is empty string do nothing
        if (!searchTerm) return;

        // check if terms already in cache (i.e. already searched)
        const termRecord = cache.find(({ term }) => term === searchTerm);
        // if so, update state with that object
        if (termRecord) {
            const { term, searchResults } = termRecord;
            setResultsText(`Results for: "${searchTerm}"`)
            setSearchResults(searchResults);
            setSearchResultsSelected(searchResults.slice(0, MAX_RESULTS_PER_PAGE));
        } else {
            // else search api
            searchTMDB(searchTerm);
        };
        
    };

    // function to search TMDB
    const searchTMDB = async (searchTerm) => {

        // set loading
        setLoading(true);

        // make request
        const response = await axios.get(tmdbSearchUrl, {
            params: {
                query: searchTerm
            }
        });
        const {data} = response;
        const movies = data.results;
        if (!movies.length) {
            setResultsText('No results found. Please try another search');
            setLoading(false);
            return;
        }
        const promises = await Promise.all(
            movies.map(({ id }) => {
                const url = tmdbMovieUrl(id);
                return axios.get(url);
            })
        );
        setLoading(false);
        setResultsText(`Results for: "${searchTerm}"`);
        const movieData = promises.map(promise => promise.data);
        setSearchResults(movieData);
        setSearchResultsSelected(movieData.slice(0, MAX_RESULTS_PER_PAGE));

        // update cache
        const cacheObj = {'term': searchTerm, 'searchResults': movieData};
        addHistory(cacheObj);
     
    }


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
        setSearchResultsSelected(searchResults.slice(0, MAX_RESULTS_PER_PAGE));
        // update results message
        setResultsText(resultsText);
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
        const buttonsArr = document.querySelectorAll(`#movie-search-list-div .ui.cards button`).forEach((button, index) => {
            button.disabled = nominationListSelected.length >= MAX_ENTRIES || nominationListSelected.map(movie => movie.id).includes(searchResultsSelected[index].id);
            return button;
        });

        setButtons(buttonsArr);
    }, [searchResultsSelected, nominationListSelected]);





    const showPrevResults = () => {
        console.log('PREV RESULTS')
    };

    const showNextResults = () => {
        console.log('NEXT RESULTS')
    };

    const resultsButtons = (
            <span>
                <Button
                    buttonText={<i className="chevron left icon" />}
                    buttonClick={showPrevResults}
                    buttonClass="ui icon button"
                />
                <Button
                    buttonText={<i className="chevron right icon" />}
                    buttonClick={showNextResults}
                    buttonClass="ui icon button"
                />
        </span>
        );
    


    return (
        <div>
            <div id="main-header" className="ui header">
                <h1>Movie NomiNATION</h1>
                <div id="divider"></div>
            </div>
            <div id="searchbar">
                <Searchbar onSearch={getResults} loading={loading} />
            </div>
            <div className="ui grid">

                {/*div to render movies from search results*/}
                {/*all buttons in this movie list are the same, so it's fine to use context*/}
                <div id="movie-search-list-div" className="six wide column">
                    <div className="ui header">
                        <h3>
                            {resultsText}
                           {searchResults.length ? resultsButtons : ''}
                        </h3>
                    </div>
                    {/*pass button properties so all buttons in child components will be the same*/}
                    <ButtonContext.Provider 
                        value={{
                            buttonText: <i className="ui add icon" />, 
                            buttonClick: (movie => addNomination(movie)),
                            buttonClass: "mini ui right floated positive button icon"
                            //buttonClass: "ui positive right floated icon button"
                        }}
                    >
                        <MovieList movieList={searchResultsSelected} />
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
                            buttonClass: "mini ui negative icon button"
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
