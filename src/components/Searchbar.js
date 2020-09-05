import React, { useState } from 'react';
import './Searchbar.css';

const Searchbar = ({ onSearch, loading }) => {

    // state for term
    const [term, setTerm] = useState('');
  
    const submit = (event) => {
        event.preventDefault();
        onSearch(term);
    };

    const loadingState = loading ? 'loading' : '';

    return (
        <div className="ui search">
            <form onSubmit={submit}>
                <div className={`ui icon input ${loadingState}`}>
                    <input
                        type="text"
                        value={term}
                        placeholder="Enter a search term..."
                        onChange={(e) => setTerm(e.target.value)}
                    />
                    <i className="search icon" />
                </div>
                <button 
                    onClick={submit}
                    className="ui button"
                >
                    Search
                </button>
            </form>
        </div>
    );
};

export default Searchbar;