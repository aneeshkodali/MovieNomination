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
                <div className="ui action input">
                    <input
                        type="text"
                        value={term}
                        placeholder="Enter a seach term..."
                        onChange={(e) => setTerm(e.target.value)}
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