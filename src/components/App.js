import React from 'react';
import Searchbar from './Searchbar';

const App = () => {

    // function to search for movie term
    const search = term => {
        console.log(term);
    };

    
    return (
        <div>
            <h1>Shoppies App</h1>
            <Searchbar onFormSubmit={search} />
        </div>
    );
};

export default App;
