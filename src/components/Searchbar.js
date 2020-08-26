import React, { useState } from 'react';

const Searchbar = () => {

    // state for term
    const [term, setTerm] = useState('');

    // function to handle search form submission
    const onSubmit = (event) => {
        // prevent page from refreshing
        event.preventDefault();
        console.log('submitted', term)
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <label>Search for a movie</label>
                <input
                    type="text"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                />
            </form>
        </div>
    );
};

export default Searchbar;