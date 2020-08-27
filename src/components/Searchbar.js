import React, { useState, useEffect } from 'react';

const Searchbar = ({ onSearch }) => {

    // state for term
    const [term, setTerm] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState(term);

     // useEffect to set debouncedTerm equal to term after x ms of non-typing
     useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedTerm(term);
        }, 1000);
        return () => {
            clearTimeout(timerId);
        };
    }, [term]);

    // useEffct to perform search on debounced term
    useEffect(() => {
        onSearch(debouncedTerm);
    }, [debouncedTerm])

    return (
        <div>
            <label>Search for a movie</label>
            <input
                type="text"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
            />
        </div>
    );
};

export default Searchbar;