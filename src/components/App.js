import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import MovieList from './MovieList';
import Dropdown from './Dropdown';
import SearchHistory from './SearchHistory';
import Button from './Button';
import useMovies from '../hooks/searchMovies';
import ButtonContext from '../contexts/ButtonContext';

import './App.css';

const App = () => {
    
    // bring in variables from created hook to search for movies - initialize with no search
    const [searchResults, setSearchResults, search, resultsText, setResultsText, cache, setCache] = useMovies('');

    
    // initialize category list
    const categoryList = ['Action', 'Best Picture', 'Comedy', 'Drama', 'Worst Picture'];
    // state to control which category label index selected
    const indexInitial="0";
    const [categoryIndexSelected, setCategoryIndexSelected] = useState(indexInitial);
    const nominationListOfListsInitial = categoryList.map(cat => {
        return {category: cat, nominations: []};
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
    const numEntriesLeft = MAX_ENTRIES - nominationListSelected.length;


    // state for buttons
    const [buttons, setButtons] = useState([]);
    // useEffect to set buttons state when results change or nominations change
    useEffect(() => {
        // initialize array of new buttons
        const buttonsNew = [];
        // loop through each movie in the search list
        searchResults.forEach(({ imdbID }) => {
            // get the button element (each movie div has classname of .item.[imdbID])
            const button = document.querySelector(`#movie-search-list .${imdbID} button`);
           // gray out button if # of nominations exceeded or movie already nominated
            if (nominationListSelected > MAX_ENTRIES || nominationListSelected.map(m => m.imdbID).includes(imdbID)) {
                button.disabled = true;
            } else {
                button.disabled = false;
            }
            // add button to array
            buttonsNew.push(button);
        });
        // set state of new buttons
        setButtons(buttonsNew);
    }, [searchResults, nominationListSelected]);

    // function to update page with data from previously searched term
    const retrieveHistory = (searchTermObj) => {
        // extracting keys
        const { term, searchResults, resultsText } = searchTermObj;
        // update the search result list
        setSearchResults(searchResults);
        // update results message
        setResultsText(resultsText);
    };

    // function to remove term and its data from search history
    const removeHistory = (searchTermObj) => {
        // delete term entry in cache
        setCache(cache.filter(termObj => termObj.term !== searchTermObj.term));
    };



    return (
        <div>
            <h1>Movie NomiNATION</h1>
            <div id="searchbar">
                <Searchbar onSearch={search} />
            </div>
            <div className="ui grid">

                {/*div to render movies from search results*/}
                {/*all buttons in this movie list are the same, so it's fine to use context*/}
                <div id="movie-search-list" className="six wide column">
                    <div className="ui header">
                        <h3>{resultsText}</h3>
                    </div>
                    {/*pass button properties so all buttons in child components will be the same*/}
                    <ButtonContext.Provider 
                        value={{
                            buttonText: <i className="ui plus icon" />, 
                            buttonClick: (movie => addNomination(movie)),
                            buttonClass: "ui positive icon button"
                            //buttonClass: "ui positive right floated icon button"
                        }}
                    >
                        <MovieList movieList={searchResults} />
                    </ButtonContext.Provider>
                </div>

                {/*div to show movies that have been nominate*/}
                {/*again, all buttons in this list are the same, so it's fine to use context*/}
                <div className="six wide column">
                    <div id="nomination-header" className="ui header">
                        <h3>
                            Nominations for
                            <Dropdown 
                                options={nominationListOfLists.map(({ category, nominations}) => `${category} (${nominations.length})`)}
                                //options={categoryList}
                                optionSelected={categoryIndexSelected}
                                onSelect={selectCategory}
                            />
                            <span style={{color: numEntriesLeft===0 ? 'red' : ''}}>(LIMIT {MAX_ENTRIES})</span>
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
                <div className="four wide column">
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
