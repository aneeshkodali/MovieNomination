import React, { useState } from 'react';
import Button from './Button';
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
                <div className="ui input">
                    <input
                        type="text"
                        value={term}
                        placeholder="Enter a search term..."
                        onChange={(e) => setTerm(e.target.value)}
                    />
                    <Button 
                        buttonClick={submit} 
                        buttonText={<i className="search icon" />}
                        buttonClass={`ui ${loadingState} icon button`}
                    />
                    
                </div>
                
            </form>
        </div>
    );
};

export default Searchbar;