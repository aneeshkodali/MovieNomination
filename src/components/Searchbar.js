import React, { useState } from 'react';
import './Searchbar.css';

const Searchbar = ({ searchBarText, setSearchBarText, search, loading }) => {

  
    const submit = (event) => {
        event.preventDefault();
        search(searchBarText);
    };

    const loadingState = loading ? 'loading' : '';

    return (
        <div className="ui search">
            <form onSubmit={submit}>
                <div className="ui action input">
                    <input
                        type="text"
                        value={searchBarText}
                        placeholder="Enter a seach term..."
                        onChange={(e) => setSearchBarText(e.target.value)}
                    />
                    <button 
                        className={`ui ${loadingState} icon button`}
                        onClick={submit}
                    >
                        <i className="search icon" />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Searchbar;