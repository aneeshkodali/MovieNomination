import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import MovieList from './MovieList';
import Dropdown from './Dropdown';
import SearchHistory from './SearchHistory';
import Button from './Button';
import useMovies from '../hooks/searchMovies';
import ButtonContext from '../contexts/ButtonContext';

const App = () => {
    
    // bring in variables from created hook to search for movies - initialize with no search
    const [searchResults, setSearchResults, search, resultsText, setResultsText, cache, setCache] = useMovies('');

    // state for nomination list
    const [nominations, setNominations] = useState([]);
    // state for buttons
    const [buttons, setButtons] = useState([]);
    // state for list of categories
    const [categoryList, setCategoryList] = useState([]);
    const [categorySelected, setCategorySelected] = useState(categoryList[0]);
    
    // state for number of remaining entries
    const MAX_ENTRIES = 5;
    const numEntriesLeft = MAX_ENTRIES - nominations.length;


    // useEffect to set buttons state when results change or nominations change
    useEffect(() => {
        // initialize array of new buttons
        const buttonsNew = [];
        // loop through each movie in the search list
        searchResults.forEach(({ imdbID }) => {
            // get the button element (each movie div has classname of .item.[imdbID])
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

    // function to change which category is currently selected
    const selectCategory = (event) => {
        setCategorySelected(event.target.value);
    };

    // function to add category to list
    const addCategory = (value) => {
        // first check to make sure value is not already in list
        if (categoryList.includes(value)) {
            return;
        };
        // add value to category list
        setCategoryList([...categoryList, value]);

        // change currently selected category
        setCategorySelected(value);
    };
    


    return (
        <div>
            <h1>The Shoppies Nomination Page</h1>
          
                <Searchbar onSearch={search} />

            <div className="ui grid">

                {/*div to render movies from search results*/}
                {/*all buttons in this movie list are the same, so it's fine to use context*/}
                <div id="movie-search-list" className="four wide column">
                    <h3>{resultsText}</h3>
                    {/*pass button properties so all buttons in child components will be the same*/}
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

                {/*div to show movies that have been nominate*/}
                {/*again, all buttons in this list are the same, so it's fine to use context*/}
                <div id="movie-nomination-list" className="eight wide column">
                    <h3 >{`Nominations (${numEntriesLeft} Left)`}</h3>
                    <Button 
                        buttonText="Reset" 
                        buttonClick={() => setNominations([])}
                    />
                    <div id="category-dropdown">
                        <h3>Your Categories</h3>
                        <Dropdown 
                            options={categoryList}
                            optionSelected={categorySelected}
                            onSelect={selectCategory}
                        />
                        {/*button to add category*/}
                        <Button
                            buttonText={<i className="plus icon" />}
                            buttonClick={() => addCategory('Drama')}
                        />
                    </div>
                    {/*pass button properties so all buttons in child components will be the same*/}
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
