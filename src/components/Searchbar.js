import React, { useState, useEffect } from 'react';

const Searchbar = ({ onSearch }) => {

    // state for term
    const [term, setTerm] = useState('');
    //const [debouncedTerm, setDebouncedTerm] = useState(term);

    ////  useEffect to set debouncedTerm equal to term after x ms of non-typing
    // useEffct to perform search on debounced term
     useEffect(() => {
        const timerId = setTimeout(() => {
            //setDebouncedTerm(term);
            onSearch(term);
        }, 1000);
        return () => {
            clearTimeout(timerId);
        };
    }, [term]);

    // useEffct to perform search on debounced term
    //useEffect(() => {
    //    onSearch(debouncedTerm);
    //}, [debouncedTerm])

    return (
        <div className="ui search">
            <div className="ui icon input">
                <input
                    type="text"
                    value={term}
                    placeholder="Enter a search term..."
                    onChange={(e) => setTerm(e.target.value)}
                />
                <i className="search icon" />
            </div>
        </div>
    );
};

export default Searchbar;