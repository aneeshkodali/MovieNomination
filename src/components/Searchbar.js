import React, { useState, useEffect } from 'react';
import Button from './Button';

const Searchbar = ({ onSearch }) => {

    // state for term
    const [term, setTerm] = useState('');
  
    const submit = (event) => {
        event.preventDefault();
        onSearch(term);
    };

    return (
        <div className="ui search">
            <form onSubmit={submit}>
                <div className="ui icon input">
                    <input
                        type="text"
                        value={term}
                        placeholder="Enter a search term..."
                        onChange={(e) => setTerm(e.target.value)}
                    />
                    <i className="search icon" />
                </div>
                <Button buttonClick={submit} buttonText="Submit" />
            </form>
        </div>
    );
};

export default Searchbar;